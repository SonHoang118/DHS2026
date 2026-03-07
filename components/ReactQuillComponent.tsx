'use client';

import {
  AtomicBlockUtils,
  ContentState,
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

type ReactQuillComponentProps = {
  value: string;
  onChange: (nextValue: string) => void;
  onPickImage?: (file: File) => string | Promise<string>;
  placeholder?: string;
};

type ImageBlockProps = {
  block: any;
  contentState: any;
};

function ImageBlock({ block, contentState }: ImageBlockProps) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const data = entity.getData();
  const src = typeof data?.src === 'string' ? data.src : '';
  const alt = typeof data?.alt === 'string' ? data.alt : 'post-image';

  if (!src) {
    return null;
  }

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-[#153631]/15">
      <img src={src} alt={alt} className="max-h-72 w-full object-contain bg-[#f6f9f7]" />
    </div>
  );
}

function createEditorStateFromValue(value: string) {
  if (!value.trim()) {
    return EditorState.createEmpty();
  }

  try {
    const parsed = JSON.parse(value) as any;
    if (Array.isArray(parsed?.blocks)) {
      return EditorState.createWithContent(convertFromRaw(parsed));
    }
  } catch {
    // Fallback to plain text when value is not valid Draft raw JSON.
  }

  return EditorState.createWithContent(ContentState.createFromText(value));
}

export default function ReactQuillComponent({
  value,
  onChange,
  onPickImage,
  placeholder = 'Nhap noi dung bai viet...',
}: ReactQuillComponentProps) {
  const initialEditorState = useMemo(() => createEditorStateFromValue(value), [value]);
  const [editorState, setEditorState] = useState(initialEditorState);
  const [selectedColor, setSelectedColor] = useState('#173531');
  const [isPickingImage, setIsPickingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setEditorState(createEditorStateFromValue(value));
  }, [value]);

  const handleEditorChange = (nextState: any) => {
    setEditorState(nextState);
    const rawContent = convertToRaw(nextState.getCurrentContent());
    onChange(JSON.stringify(rawContent));
  };

  const toggleInlineStyle = (style: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const styleMap = useMemo(() => {
    const map: Record<string, { color: string }> = {};
    const raw = convertToRaw(editorState.getCurrentContent());

    raw.blocks.forEach((block: any) => {
      block.inlineStyleRanges.forEach((range: any) => {
        if (range.style.startsWith('color-')) {
          map[range.style] = { color: range.style.replace('color-', '') };
        }
      });
    });

    return map;
  }, [editorState]);

  const applyColor = (color: string) => {
    setSelectedColor(color);
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    const contentState = editorState.getCurrentContent();

    let nextContent = contentState;
    currentStyle.forEach((styleName: string) => {
      if (styleName.startsWith('color-')) {
        nextContent = Modifier.removeInlineStyle(nextContent, selection, styleName);
      }
    });

    let nextState = EditorState.push(editorState, nextContent, 'change-inline-style');
    const colorStyle = `color-${color}`;
    nextState = RichUtils.toggleInlineStyle(nextState, colorStyle);
    handleEditorChange(nextState);
  };

  const addLink = () => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      window.alert('Hay boi den doan text truoc khi them link.');
      return;
    }

    const url = window.prompt('Nhap URL (https://...)');
    if (!url) {
      return;
    }

    const contentState = editorState.getCurrentContent();
    const withEntity = contentState.createEntity('LINK', 'MUTABLE', { url: url.trim() });
    const entityKey = withEntity.getLastCreatedEntityKey();
    const withLink = RichUtils.toggleLink(
      EditorState.set(editorState, { currentContent: withEntity }),
      selection,
      entityKey
    );

    handleEditorChange(withLink);
  };

  const removeLink = () => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }

    const nextState = RichUtils.toggleLink(editorState, selection, null);
    handleEditorChange(nextState);
  };

  const pickAndInsertImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsPickingImage(true);

      const imageUrl = onPickImage
        ? await Promise.resolve(onPickImage(file))
        : URL.createObjectURL(file);

      if (!imageUrl) {
        throw new Error('Khong the chen anh vao noi dung');
      }

      const contentState = editorState.getCurrentContent();
      const withEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
        src: imageUrl,
        alt: 'post-image',
      });

      const entityKey = withEntity.getLastCreatedEntityKey();
      const withContent = EditorState.set(editorState, { currentContent: withEntity });
      const withImage = AtomicBlockUtils.insertAtomicBlock(withContent, entityKey, ' ');
      handleEditorChange(withImage);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Them anh vao editor that bai';
      window.alert(message);
    } finally {
      setIsPickingImage(false);
      event.target.value = '';
    }
  };

  const blockRendererFn = (block: any) => {
    if (block.getType() !== 'atomic') {
      return null;
    }

    const contentState = editorState.getCurrentContent();
    const entityKey = block.getEntityAt(0);
    if (!entityKey) {
      return null;
    }

    const entity = contentState.getEntity(entityKey);
    if (entity.getType() !== 'IMAGE') {
      return null;
    }

    return {
      component: ImageBlock,
      editable: false,
    };
  };

  const hasText = editorState.getCurrentContent().hasText();

  return (
    <div className="rounded-xl border border-[#153631]/20 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-[#153631]/15 p-2">
        <button
          type="button"
          onClick={() => toggleInlineStyle('BOLD')}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => toggleInlineStyle('ITALIC')}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => toggleInlineStyle('UNDERLINE')}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType('unordered-list-item')}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType('ordered-list-item')}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          OL
        </button>
        <button
          type="button"
          onClick={addLink}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          Link
        </button>
        <button
          type="button"
          onClick={removeLink}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          Unlink
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]">
          Color
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => applyColor(e.target.value)}
            className="h-5 w-7 rounded border-0 bg-transparent p-0"
          />
        </label>
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          disabled={isPickingImage}
          className="rounded-md border border-[#153631]/25 px-2 py-1 text-xs font-medium text-[#173531]"
        >
          {isPickingImage ? 'Dang chen...' : 'Image'}
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={pickAndInsertImage}
          className="hidden"
        />
      </div>

      <div className="relative min-h-44 px-3 py-2 text-sm text-[#132725]">
        {!hasText && (
          <p className="pointer-events-none absolute text-sm text-[#7f948a]">{placeholder}</p>
        )}
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          customStyleMap={styleMap}
          blockRendererFn={blockRendererFn}
        />
      </div>
    </div>
  );
}
