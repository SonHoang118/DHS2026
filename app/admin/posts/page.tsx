'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ReactQuillComponent from '@/components/ReactQuillComponent';

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

type ToastState = {
  type: 'success' | 'error';
  message: string;
} | null;

const initialForm: PostFormData = {
  imgTitle: '',
  title: '',
  content: '',
  imgsId: [],
  slugify: '',
};

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizePostImages(rawImages: unknown): PostImage[] {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  const normalized = rawImages
    .map((img) => {
      if (typeof img === 'string') {
        const link = img.trim();
        return link ? { link, id: '' } : null;
      }

      if (img && typeof img === 'object') {
        const imageObj = img as Record<string, unknown>;
        const link =
          typeof imageObj.link === 'string'
            ? imageObj.link.trim()
            : typeof imageObj.url === 'string'
              ? imageObj.url.trim()
              : '';
        const id = typeof imageObj.id === 'string' ? imageObj.id.trim() : '';

        if (!link) {
          return null;
        }

        return { link, id };
      }

      return null;
    })
    .filter((item): item is PostImage => Boolean(item));

  const seen = new Set<string>();
  return normalized.filter((image) => {
    const key = image.id || image.link;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

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
  const [toast, setToast] = useState<ToastState>(null);

  const [pendingTitleImageFile, setPendingTitleImageFile] = useState<File | null>(null);
  const [pendingTitleImagePreview, setPendingTitleImagePreview] = useState('');
  const [pendingContentImages, setPendingContentImages] = useState<PendingContentImage[]>([]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    window.setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 2600);
  };

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
        imgsId: normalizePostImages(item?.imgsId),
        slugify: String(item?.slugify || ''),
        createdAt: typeof item?.createdAt === 'string' ? item.createdAt : undefined,
      }));

      setPosts(mapped);
    } catch {
      setPosts([]);
      showToast('error', 'Khong tai duoc danh sach bai viet');
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

    const images = normalizePostImages(data?.images);
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
        showToast('error', data?.error || 'Khong the xoa bai viet');
        return;
      }

      await fetchPosts();
      showToast('success', 'Da xoa bai viet');
    } catch {
      showToast('error', 'Loi ket noi khi xoa bai viet');
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
        showToast('error', data?.error || 'Khong the luu bai viet');
        return;
      }

      await fetchPosts();
      showToast('success', editingPostId ? 'Cap nhat bai viet thanh cong' : 'Tao bai viet thanh cong');
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Loi ket noi khi luu bai viet';
      setFormError(message);
      showToast('error', message);
    } finally {
      setIsSavingPost(false);
      setIsUploadingImages(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed right-4 top-20 z-70 rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.type === 'success'
              ? 'border-[#9ad5b2] bg-[#effaf2] text-[#1b5e3d]'
              : 'border-[#f2b9b4] bg-[#fff3f2] text-[#9a2f24]'
          }`}
        >
          {toast.message}
        </div>
      )}

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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-[#13322f]">
                {editingPostId ? 'Chinh sua bai viet' : 'Them bai viet moi'}
              </h4>
              <button
                type="button"
                onClick={closeModal}
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

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-[#1a3834]">imgTitle</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTitleImageChange}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-[#253f5f] file:px-3 file:py-1.5 file:text-white hover:file:bg-[#1b2f48]"
                />
                <div className="mt-2">
                  {pendingTitleImagePreview ? (
                    <div className="relative w-fit overflow-hidden rounded-lg border border-[#153631]/20">
                      <img src={pendingTitleImagePreview} alt="title-preview" className="h-24 w-36 object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(pendingTitleImagePreview);
                          setPendingTitleImageFile(null);
                          setPendingTitleImagePreview('');
                        }}
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
                        onClick={() => setFormData((prev) => ({ ...prev, imgTitle: '' }))}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      title: value,
                      slugify: createSlug(value),
                    }));
                  }}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-[#1a3834]">content (DraftJS)</label>
                <ReactQuillComponent
                  value={formData.content}
                  onPickImage={handlePickEditorImage}
                  onChange={(nextValue) => setFormData((prev) => ({ ...prev, content: nextValue }))}
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
                  onClick={closeModal}
                  className="rounded-xl border border-[#153631]/20 px-4 py-2 text-sm font-medium text-[#173531] hover:bg-[#eff6f2]"
                >
                  Huy
                </button>
                <button
                  type="submit"
                  disabled={isSavingPost || isUploadingImages}
                  className="rounded-xl bg-[#253f5f] px-4 py-2 text-sm font-medium text-white hover:bg-[#1b2f48]"
                >
                  {isSavingPost
                    ? 'Dang luu...'
                    : editingPostId
                      ? 'Cap nhat bai viet'
                      : 'Luu bai viet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
