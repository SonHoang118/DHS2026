import { ChangeEvent, FormEvent } from 'react';
import ReactQuillComponent from '@/components/ReactQuillComponent';

type PostImage = {
  link: string;
  id: string;
};

type PostFormData = {
  imgTitle: string;
  title: string;
  content: string;
  imgsId: PostImage[];
  slugify: string;
};

type PostModalProps = {
  isOpen: boolean;
  editingPostId: string | null;
  formError: string;
  formData: PostFormData;
  isUploadingImages: boolean;
  isSavingPost: boolean;
  pendingTitleImagePreview: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTitleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemovePendingTitleImage: () => void;
  onRemoveCurrentTitleImage: () => void;
  onTitleChange: (value: string) => void;
  onPickEditorImage: (file: File) => string;
  onContentChange: (value: string) => void;
};

export default function PostModal({
  isOpen,
  editingPostId,
  formError,
  formData,
  isUploadingImages,
  isSavingPost,
  pendingTitleImagePreview,
  onClose,
  onSubmit,
  onTitleImageChange,
  onRemovePendingTitleImage,
  onRemoveCurrentTitleImage,
  onTitleChange,
  onPickEditorImage,
  onContentChange,
}: PostModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-[#13322f]">
            {editingPostId ? 'Chinh sua bai viet' : 'Them bai viet moi'}
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#153631]/20 px-3 py-1 text-sm text-[#173531] hover:bg-[#f4f8f6]"
          >
            Dong
          </button>
        </div>

        {formError && (
          <div className="mb-4 rounded-lg border border-[#f2b9b4] bg-[#fff3f2] px-4 py-2 text-sm text-[#9a2f24]">
            {formError}
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-[#1a3834]">imgTitle</label>
            <input
              type="file"
              accept="image/*"
              onChange={onTitleImageChange}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-[#253f5f] file:px-3 file:py-1.5 file:text-white hover:file:bg-[#1b2f48]"
            />
            <div className="mt-2">
              {pendingTitleImagePreview ? (
                <div className="relative w-fit overflow-hidden rounded-lg border border-[#153631]/20">
                  <img src={pendingTitleImagePreview} alt="title-preview" className="h-24 w-36 object-cover" />
                  <button
                    type="button"
                    onClick={onRemovePendingTitleImage}
                    className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white"
                  >
                    X
                  </button>
                </div>
              ) : formData.imgTitle ? (
                <div className="relative w-fit overflow-hidden rounded-lg border border-[#153631]/20">
                  <img src={formData.imgTitle} alt="title" className="h-24 w-36 object-cover" />
                  <button
                    type="button"
                    onClick={onRemoveCurrentTitleImage}
                    className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white"
                  >
                    X
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-[#1a3834]">title</label>
            <input
              value={formData.title}
              onChange={(event) => onTitleChange(event.target.value)}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-[#1a3834]">content (DraftJS)</label>
            <ReactQuillComponent
              value={formData.content}
              onPickImage={onPickEditorImage}
              onChange={onContentChange}
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-[#1a3834]">slugify</label>
            <input
              value={formData.slugify}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-[#153631]/20 bg-[#f4f8f6] px-3 py-2 text-sm text-[#5d756a] outline-none"
            />
            <p className="text-xs text-[#667d73]">Slug duoc tu dong tao theo tieu de bai viet.</p>
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#153631]/20 px-4 py-2 text-sm font-medium text-[#173531] hover:bg-[#eff6f2]"
            >
              Huy
            </button>
            <button
              type="submit"
              disabled={isSavingPost || isUploadingImages}
              className="rounded-xl bg-[#253f5f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1b2f48]"
            >
              {isSavingPost ? 'Dang luu...' : editingPostId ? 'Cap nhat bai viet' : 'Luu bai viet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
