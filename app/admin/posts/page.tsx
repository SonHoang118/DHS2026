'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import PostModal from '@/components/admin/PostModal';
import { normalizeImageRecords } from '@/utils/image';
import { createSlug } from '@/utils/slug';

type PostImage = {
  link: string;
  id: string;
};

type PendingContentImage = {
  file: File;
  previewUrl: string;
};

type PostFormData = {
  imgTitle: string;
  title: string;
  content: string;
  imgsId: PostImage[];
  slugify: string;
};

type PostItem = PostFormData & {
  id: string;
  createdAt?: string;
};

const initialForm: PostFormData = {
  imgTitle: '',
  title: '',
  content: '',
  imgsId: [],
  slugify: '',
};

function contentPreview(rawContent: string) {
  if (!rawContent.trim()) {
    return '';
  }

  try {
    const parsed = JSON.parse(rawContent);
    if (Array.isArray(parsed?.blocks)) {
      return parsed.blocks
        .map((block: { text?: string }) => String(block?.text || '').trim())
        .filter(Boolean)
        .join(' ')
        .slice(0, 120);
    }
  } catch {
    return rawContent.slice(0, 120);
  }

  return '';
}

function extractCloudinaryPublicId(imageUrl: string) {
  const trimmed = imageUrl.trim();
  if (!trimmed.includes('/upload/')) {
    return '';
  }

  const afterUpload = trimmed.split('/upload/')[1]?.split('?')[0] || '';
  if (!afterUpload) {
    return '';
  }

  const segments = afterUpload.split('/').filter(Boolean);
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const idSegments = versionIndex >= 0 ? segments.slice(versionIndex + 1) : segments;
  const fullPath = idSegments.join('/');
  return fullPath.replace(/\.[^.]+$/, '');
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PostFormData>(initialForm);
  const [formError, setFormError] = useState('');
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  const [pendingTitleImageFile, setPendingTitleImageFile] = useState<File | null>(null);
  const [pendingTitleImagePreview, setPendingTitleImagePreview] = useState('');
  const [pendingContentImages, setPendingContentImages] = useState<PendingContentImage[]>([]);

  const fetchPosts = async () => {
    try {
      setIsLoadingPosts(true);
      const response = await fetch('/api/posts?skip=0&limit=500');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch posts');
      }

      const items = Array.isArray(data?.items) ? data.items : [];
      const mapped: PostItem[] = items.map((item: any) => ({
        id: String(item?._id || item?.id || ''),
        imgTitle: String(item?.imgTitle || ''),
        title: String(item?.title || ''),
        content: typeof item?.content === 'string' ? item.content : '',
        imgsId: normalizeImageRecords(item?.imgsId, { includeUrl: true }),
        slugify: String(item?.slugify || ''),
        createdAt: typeof item?.createdAt === 'string' ? item.createdAt : undefined,
      }));

      setPosts(mapped);
    } catch {
      setPosts([]);
      window.alert('Khong tai duoc danh sach bai viet');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetPendingImages = () => {
    if (pendingTitleImagePreview) {
      URL.revokeObjectURL(pendingTitleImagePreview);
    }

    pendingContentImages.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
    });

    setPendingTitleImageFile(null);
    setPendingTitleImagePreview('');
    setPendingContentImages([]);
  };

  const extractDraftBlobUrls = (rawContent: string) => {
    if (!rawContent.trim()) {
      return [] as string[];
    }

    try {
      const parsed = JSON.parse(rawContent) as {
        blocks?: Array<{ entityRanges?: Array<{ key?: number }> }>;
        entityMap?: Record<string, { type?: string; data?: { src?: string } }>;
      };

      const usedEntityKeys = new Set<string>();
      (parsed?.blocks || []).forEach((block) => {
        (block?.entityRanges || []).forEach((range) => {
          const key = typeof range?.key === 'number' ? String(range.key) : '';
          if (key) {
            usedEntityKeys.add(key);
          }
        });
      });

      const entityMap = parsed?.entityMap || {};
      return Array.from(usedEntityKeys)
        .map((key) => entityMap[key])
        .filter((entity) => entity?.type === 'IMAGE')
        .map((entity) => (typeof entity?.data?.src === 'string' ? entity.data.src : ''))
        .filter((src) => src.startsWith('blob:'));
    } catch {
      return [];
    }
  };

  const replaceDraftImageSources = (
    rawContent: string,
    urlMap: Map<string, string>
  ) => {
    if (!rawContent.trim() || urlMap.size === 0) {
      return rawContent;
    }

    try {
      const parsed = JSON.parse(rawContent) as {
        blocks?: Array<{ entityRanges?: Array<{ key?: number }> }>;
        entityMap?: Record<string, { type?: string; data?: { src?: string } }>;
      };
      const entityMap = parsed?.entityMap || {};

      const usedEntityKeys = new Set<string>();
      (parsed?.blocks || []).forEach((block) => {
        (block?.entityRanges || []).forEach((range) => {
          const key = typeof range?.key === 'number' ? String(range.key) : '';
          if (key) {
            usedEntityKeys.add(key);
          }
        });
      });

      usedEntityKeys.forEach((key) => {
        const entity = entityMap[key];
        if (entity?.type !== 'IMAGE') {
          return;
        }

        const currentSrc = typeof entity?.data?.src === 'string' ? entity.data.src : '';
        const nextSrc = urlMap.get(currentSrc);
        if (nextSrc) {
          entityMap[key] = {
            ...entity,
            data: {
              ...(entity.data || {}),
              src: nextSrc,
            },
          };
        }
      });

      return JSON.stringify({
        ...parsed,
        entityMap,
      });
    } catch {
      return rawContent;
    }
  };

  const extractFinalContentImageUrls = (rawContent: string) => {
    if (!rawContent.trim()) {
      return [] as string[];
    }

    try {
      const parsed = JSON.parse(rawContent) as {
        blocks?: Array<{ entityRanges?: Array<{ key?: number }> }>;
        entityMap?: Record<string, { type?: string; data?: { src?: string } }>;
      };

      const usedEntityKeys = new Set<string>();
      (parsed?.blocks || []).forEach((block) => {
        (block?.entityRanges || []).forEach((range) => {
          const key = typeof range?.key === 'number' ? String(range.key) : '';
          if (key) {
            usedEntityKeys.add(key);
          }
        });
      });

      const entityMap = parsed?.entityMap || {};
      return Array.from(usedEntityKeys)
        .map((key) => entityMap[key])
        .filter((entity) => entity?.type === 'IMAGE')
        .map((entity) => (typeof entity?.data?.src === 'string' ? entity.data.src.trim() : ''))
        .filter((src) => src && !src.startsWith('blob:'));
    } catch {
      return [];
    }
  };

  const handlePickEditorImage = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPendingContentImages((prev) => [...prev, { file, previewUrl }]);
    return previewUrl;
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slugify: createSlug(value),
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) {
      return [] as PostImage[];
    }

    const payload = new FormData();
    files.forEach((file) => payload.append('files', file));

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: payload,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || 'Upload anh that bai');
    }

    const images = normalizeImageRecords(data?.images, { includeUrl: true });
    if (images.length !== files.length) {
      throw new Error('So luong anh upload khong hop le');
    }

    return images;
  };

  const handleTitleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFormError('');

    if (pendingTitleImagePreview) {
      URL.revokeObjectURL(pendingTitleImagePreview);
    }

    setPendingTitleImageFile(file);
    setPendingTitleImagePreview(URL.createObjectURL(file));
    event.target.value = '';
  };

  const handleRemovePendingTitleImage = () => {
    if (pendingTitleImagePreview) {
      URL.revokeObjectURL(pendingTitleImagePreview);
    }

    setPendingTitleImageFile(null);
    setPendingTitleImagePreview('');
  };

  const handleRemoveCurrentTitleImage = () => {
    setFormData((prev) => ({ ...prev, imgTitle: '' }));
  };

  const openModal = () => {
    setFormError('');
    setFormData(initialForm);
    setEditingPostId(null);
    resetPendingImages();
    setIsOpen(true);
  };

  const openEditModal = (post: PostItem) => {
    setFormError('');
    setEditingPostId(post.id);
    setFormData({
      imgTitle: post.imgTitle,
      title: post.title,
      content: post.content,
      imgsId: post.imgsId,
      slugify: post.slugify,
    });
    resetPendingImages();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormError('');
    setEditingPostId(null);
    resetPendingImages();
  };

  const handleDeletePost = async (post: PostItem) => {
    if (deletingPostId || isSavingPost || isUploadingImages) {
      return;
    }

    const shouldDelete = window.confirm(`Xoa bai viet \"${post.title}\"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingPostId(post.id);
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        window.alert(data?.error || 'Khong the xoa bai viet');
        return;
      }

      await fetchPosts();
      window.alert('Da xoa bai viet');
    } catch {
      window.alert('Loi ket noi khi xoa bai viet');
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setFormError('Vui long nhap tieu de bai viet.');
      return;
    }

    if (!formData.imgTitle && !pendingTitleImageFile) {
      setFormError('Vui long chon anh tieu de cho bai viet.');
      return;
    }

    try {
      setIsSavingPost(true);
      if (pendingTitleImageFile || pendingContentImages.length > 0) {
        setIsUploadingImages(true);
      }

      let nextTitleImage = formData.imgTitle;
      let uploadedTitleImage: PostImage | null = null;
      if (pendingTitleImageFile) {
        const uploaded = await uploadFiles([pendingTitleImageFile]);
        uploadedTitleImage = uploaded[0] || null;
        nextTitleImage = uploadedTitleImage?.link || '';
      }

      const blobUrlsInContent = new Set(extractDraftBlobUrls(formData.content));
      const usedPendingContentImages = pendingContentImages.filter((item) =>
        blobUrlsInContent.has(item.previewUrl)
      );

      const uploadedEditorImages = await uploadFiles(
        usedPendingContentImages.map((item) => item.file)
      );

      const contentImageMap = new Map<string, string>();
      usedPendingContentImages.forEach((item, index) => {
        const uploaded = uploadedEditorImages[index];
        if (uploaded?.link) {
          contentImageMap.set(item.previewUrl, uploaded.link);
        }
      });

      const payload: PostFormData = {
        ...formData,
        imgTitle: nextTitleImage,
        content: replaceDraftImageSources(formData.content, contentImageMap),
      };

      const finalContentImageUrls = extractFinalContentImageUrls(payload.content);
      const existingByLink = new Map(formData.imgsId.map((img) => [img.link, img] as const));
      const nextImgsId: PostImage[] = [];

      const addUniqueImage = (image: PostImage | null) => {
        if (!image?.link) {
          return;
        }
        if (nextImgsId.some((item) => item.link === image.link)) {
          return;
        }
        nextImgsId.push(image);
      };

      const titleImageEntry: PostImage | null = payload.imgTitle
        ? uploadedTitleImage ||
          existingByLink.get(payload.imgTitle) ||
          {
            link: payload.imgTitle,
            id: extractCloudinaryPublicId(payload.imgTitle),
          }
        : null;
      addUniqueImage(titleImageEntry);

      finalContentImageUrls.forEach((link) => {
        const uploaded = uploadedEditorImages.find((img) => img.link === link);
        const existing = existingByLink.get(link);
        addUniqueImage(
          uploaded ||
            existing ||
            {
              link,
              id: extractCloudinaryPublicId(link),
            }
        );
      });

      payload.imgsId = nextImgsId;

      const isEditing = Boolean(editingPostId);
      const response = await fetch(
        isEditing ? `/api/posts/${editingPostId}` : '/api/posts',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setFormError(data?.error || 'Khong the luu bai viet');
        window.alert(data?.error || 'Khong the luu bai viet');
        return;
      }

      await fetchPosts();
      window.alert(editingPostId ? 'Cap nhat bai viet thanh cong' : 'Tao bai viet thanh cong');
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Loi ket noi khi luu bai viet';
      setFormError(message);
      window.alert(message);
    } finally {
      setIsSavingPost(false);
      setIsUploadingImages(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#153631]/10 bg-[linear-gradient(120deg,#253f5f_0%,#364f77_100%)] p-6 text-white shadow-[0_18px_40px_rgba(23,43,69,0.22)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e6ddbf]">Content desk</p>
        <h2 className="mt-3 text-2xl font-semibold">Quan ly bai viet</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#dfe6f3]">
          Tao va cap nhat bai viet voi title image va noi dung DraftJS.
        </p>
      </section>

      <section className="rounded-3xl border border-[#153631]/10 bg-white p-5 shadow-[0_12px_32px_rgba(12,35,30,0.08)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#13322f]">Danh sach bai viet</h3>
            <p className="text-sm text-[#5d756a]">Tong {posts.length} bai viet trong kho noi dung.</p>
          </div>

          <button
            type="button"
            onClick={openModal}
            disabled={isSavingPost || isUploadingImages || Boolean(deletingPostId)}
            className="rounded-xl bg-[#253f5f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1b2f48]"
          >
            + Viet bai moi
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#153631]/10">
          {isLoadingPosts && (
            <div className="border-b border-[#153631]/10 bg-[#f8fcfa] px-4 py-2 text-xs text-[#5d756a]">
              Dang tai du lieu bai viet...
            </div>
          )}

          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#f2f5fb] text-left text-[#334560]">
                <th className="px-4 py-3 font-semibold">STT</th>
                <th className="px-4 py-3 font-semibold">Anh</th>
                <th className="px-4 py-3 font-semibold">Tieu de</th>
                <th className="px-4 py-3 font-semibold">Mo ta ngan</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id} className="border-t border-[#153631]/10 odd:bg-white even:bg-[#fbfcff]">
                  <td className="px-4 py-3 text-[#4f665d]">{index + 1}</td>
                  <td className="px-4 py-3">
                    {post.imgTitle ? (
                      <img
                        src={post.imgTitle}
                        alt={post.title || `post-${index + 1}`}
                        className="h-12 w-16 rounded-md border border-[#153631]/20 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-16 items-center justify-center rounded-md border border-dashed border-[#153631]/20 text-[10px] text-[#7b9188]">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0f2a27]">{post.title}</td>
                  <td className="px-4 py-3 text-[#4f665d]">{contentPreview(post.content) || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={isSavingPost || isUploadingImages || deletingPostId === post.id}
                        onClick={() => openEditModal(post)}
                        className="rounded-lg border border-[#253f5f]/30 px-3 py-1.5 text-xs font-medium text-[#253f5f] hover:bg-[#eff4fd]"
                      >
                        Sua
                      </button>
                      <button
                        type="button"
                        disabled={isSavingPost || isUploadingImages || deletingPostId === post.id}
                        onClick={() => handleDeletePost(post)}
                        className="rounded-lg border border-[#9a433d]/30 px-3 py-1.5 text-xs font-medium text-[#9a433d] hover:bg-[#fff1f0]"
                      >
                        {deletingPostId === post.id ? 'Dang xoa...' : 'Xoa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PostModal
        isOpen={isOpen}
        editingPostId={editingPostId}
        formError={formError}
        formData={formData}
        isUploadingImages={isUploadingImages}
        isSavingPost={isSavingPost}
        pendingTitleImagePreview={pendingTitleImagePreview}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onTitleImageChange={handleTitleImageChange}
        onRemovePendingTitleImage={handleRemovePendingTitleImage}
        onRemoveCurrentTitleImage={handleRemoveCurrentTitleImage}
        onTitleChange={handleTitleChange}
        onPickEditorImage={handlePickEditorImage}
        onContentChange={handleContentChange}
      />
    </div>
  );
}
