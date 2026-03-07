'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type ProjectImage = {
  link: string;
  id: string;
};

type ProjectFormData = {
  imgs: ProjectImage[];
  name: string;
  investor: string;
  totalCost: string;
  location: string;
  date: string;
  decs: string;
  nFloors: string;
  style: string[];
  category: string[];
  area: string;
  slugify: string;
};

type StyleOption = {
  _id: string;
  name: string;
  id_projects_list?: string[];
};

type CategoryOption = {
  _id: string;
  name: string;
  id_projects_list?: string[];
};

type ProjectItem = ProjectFormData & {
  id: string;
};

type ToastState = {
  type: 'success' | 'error';
  message: string;
} | null;

const initialForm: ProjectFormData = {
  imgs: [],
  name: '',
  investor: '',
  totalCost: '',
  location: '',
  date: '',
  decs: '',
  nFloors: '',
  style: [],
  category: [],
  area: '',
  slugify: '',
};

function normalizeProjectImages(rawImages: unknown): ProjectImage[] {
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
        const link = typeof imageObj.link === 'string' ? imageObj.link.trim() : '';
        const id = typeof imageObj.id === 'string' ? imageObj.id.trim() : '';
        if (!link) {
          return null;
        }
        return { link, id };
      }

      return null;
    })
    .filter((item): item is ProjectImage => Boolean(item));

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

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(initialForm);
  const [formError, setFormError] = useState('');
  const [styles, setStyles] = useState<StyleOption[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoadingStyles, setIsLoadingStyles] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [pendingImageFiles, setPendingImageFiles] = useState<File[]>([]);
  const [pendingImagePreviews, setPendingImagePreviews] = useState<string[]>([]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    window.setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 2600);
  };

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const response = await fetch('/api/projects?skip=0&limit=500');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch projects');
      }

      const items = Array.isArray(data?.items) ? data.items : [];
      const mapped: ProjectItem[] = items.map((item: any) => ({
        id: String(item?._id || item?.id || ''),
        imgs: normalizeProjectImages(item?.imgs),
        name: String(item?.name || ''),
        investor: String(item?.investor || ''),
        totalCost: String(item?.totalCost || ''),
        location: String(item?.location || ''),
        date: String(item?.date || ''),
        decs: String(item?.decs || ''),
        nFloors: String(item?.nFloors || ''),
        style: Array.isArray(item?.style)
          ? item.style.filter((s: unknown) => typeof s === 'string')
          : typeof item?.style === 'string' && item.style
            ? [item.style]
            : [],
        category: Array.isArray(item?.category)
          ? item.category.filter((c: unknown) => typeof c === 'string')
          : typeof item?.category === 'string' && item.category
            ? [item.category]
            : [],
        area: String(item?.area || ''),
        slugify: String(item?.slugify || ''),
      }));

      setProjects(mapped);
    } catch {
      setProjects([]);
      showToast('error', 'Khong tai duoc danh sach du an');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const fetchStyles = async () => {
    try {
      setIsLoadingStyles(true);
      const response = await fetch('/api/styles');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch styles');
      }

      const items = Array.isArray(data?.items) ? data.items : [];
      setStyles(items);
    } catch {
      setStyles([]);
      showToast('error', 'Khong tai duoc danh sach style');
    } finally {
      setIsLoadingStyles(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch categories');
      }

      const items = Array.isArray(data?.items) ? data.items : [];
      setCategories(items);
    } catch {
      setCategories([]);
      showToast('error', 'Khong tai duoc danh sach category');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStyles();
    fetchCategories();
  }, []);

  const handleChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setFormError('');

    const selected = Array.from(files);
    const previewUrls = selected.map((file) => URL.createObjectURL(file));

    setPendingImageFiles((prev) => [...prev, ...selected]);
    setPendingImagePreviews((prev) => [...prev, ...previewUrls]);
    e.target.value = '';
  };

  const resetPendingImages = () => {
    pendingImagePreviews.forEach((previewUrl) => {
      URL.revokeObjectURL(previewUrl);
    });
    setPendingImageFiles([]);
    setPendingImagePreviews([]);
  };

  const uploadPendingImages = async () => {
    if (pendingImageFiles.length === 0) {
      return [] as ProjectImage[];
    }

    const payload = new FormData();
    pendingImageFiles.forEach((file) => payload.append('files', file));

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: payload,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || 'Upload anh that bai');
    }

    const images = normalizeProjectImages(data?.images);
    if (images.length !== pendingImageFiles.length) {
      throw new Error('So luong anh upload khong hop le');
    }

    return images;
  };

  const handleStyleToggle = (styleName: string) => {
    setFormData((prev) => {
      const exists = prev.style.includes(styleName);
      return {
        ...prev,
        style: exists
          ? prev.style.filter((name) => name !== styleName)
          : [...prev.style, styleName],
      };
    });
  };

  const handleCategoryToggle = (categoryName: string) => {
    setFormData((prev) => {
      const exists = prev.category.includes(categoryName);
      return {
        ...prev,
        category: exists
          ? prev.category.filter((name) => name !== categoryName)
          : [...prev.category, categoryName],
      };
    });
  };

  const openModal = () => {
    setFormError('');
    setFormData(initialForm);
    setEditingProjectId(null);
    resetPendingImages();
    setIsOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setFormError('');
    setEditingProjectId(project.id);
    setFormData({
      imgs: project.imgs,
      name: project.name,
      investor: project.investor,
      totalCost: project.totalCost,
      location: project.location,
      date: project.date,
      decs: project.decs,
      nFloors: project.nFloors,
      style: project.style,
      category: project.category,
      area: project.area,
      slugify: project.slugify,
    });
    resetPendingImages();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormError('');
    setEditingProjectId(null);
    resetPendingImages();
  };

  const handleDeleteProject = async (project: ProjectItem) => {
    if (deletingProjectId || isSavingProject || isUploadingImages) {
      return;
    }

    const shouldDelete = window.confirm(`Xoa du an \"${project.name}\"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingProjectId(project.id);
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        showToast('error', data?.error || 'Khong the xoa du an');
        return;
      }

      await Promise.all([fetchProjects(), fetchStyles()]);
      showToast('success', 'Da xoa du an');
    } catch {
      showToast('error', 'Loi ket noi khi xoa du an');
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasImages = formData.imgs.length + pendingImageFiles.length > 0;
    if (!hasImages) {
      setFormError('Vui long upload it nhat 1 anh cho du an.');
      return;
    }

    if (!formData.name.trim()) {
      setFormError('Vui long nhap ten du an.');
      return;
    }

    try {
      setIsSavingProject(true);
      if (pendingImageFiles.length > 0) {
        setIsUploadingImages(true);
      }
      const uploadedImages = await uploadPendingImages();
      const payload = {
        ...formData,
        imgs: [...formData.imgs, ...uploadedImages],
      };
      const isEditing = Boolean(editingProjectId);
      const response = await fetch(
        isEditing ? `/api/projects/${editingProjectId}` : '/api/projects',
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
        setFormError(data?.error || 'Khong the luu du an');
        showToast('error', data?.error || 'Khong the luu du an');
        return;
      }

      await Promise.all([fetchProjects(), fetchStyles(), fetchCategories()]);
      resetPendingImages();
      showToast('success', editingProjectId ? 'Cap nhat du an thanh cong' : 'Tao du an thanh cong');
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Loi ket noi khi luu du an';
      setFormError(message);
      showToast('error', message);
    } finally {
      setIsSavingProject(false);
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

      <section className="rounded-3xl border border-[#153631]/10 bg-[linear-gradient(120deg,#173f3a_0%,#27554e_100%)] p-6 text-white shadow-[0_18px_40px_rgba(14,35,31,0.2)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e8d0b2]">Project management</p>
        <h2 className="mt-3 text-2xl font-semibold">Quan ly du an</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#d9e6df]">Theo doi danh sach du an va cap nhat trang thai nhanh trong mot bang du lieu thong nhat.</p>
      </section>

      <section className="rounded-3xl border border-[#153631]/10 bg-white p-5 shadow-[0_12px_32px_rgba(12,35,30,0.08)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#13322f]">Danh sach du an</h3>
            <p className="text-sm text-[#5d756a]">Tong {projects.length} du an trong he thong.</p>
          </div>

          <button
            type="button"
            onClick={openModal}
            disabled={isSavingProject || isUploadingImages || Boolean(deletingProjectId)}
            className="rounded-xl bg-[#173531] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f2926]"
          >
            + Them du an moi
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#153631]/10">
          {isLoadingProjects && (
            <div className="border-b border-[#153631]/10 bg-[#f8fcfa] px-4 py-2 text-xs text-[#5d756a]">
              Dang tai du lieu du an...
            </div>
          )}
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#f1f6f3] text-left text-[#36544d]">
                <th className="px-4 py-3 font-semibold">STT</th>
                <th className="px-4 py-3 font-semibold">Anh</th>
                <th className="px-4 py-3 font-semibold">Ten du an</th>
                <th className="px-4 py-3 font-semibold">Chu dau tu</th>
                <th className="px-4 py-3 font-semibold">Dia diem</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id} className="border-t border-[#153631]/10 odd:bg-white even:bg-[#fbfdfc]">
                  <td className="px-4 py-3 text-[#4f665d]">{index + 1}</td>
                  <td className="px-4 py-3">
                    {project.imgs[0]?.link ? (
                      <img
                        src={project.imgs[0].link}
                        alt={project.name || `project-${index + 1}`}
                        className="h-12 w-16 rounded-md object-cover border border-[#153631]/20"
                      />
                    ) : (
                      <div className="flex h-12 w-16 items-center justify-center rounded-md border border-dashed border-[#153631]/20 text-[10px] text-[#7b9188]">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0f2a27]">{project.name}</td>
                  <td className="px-4 py-3 text-[#4f665d]">{project.investor}</td>
                  <td className="px-4 py-3 text-[#4f665d]">{project.location}</td>
                  <td className="px-4 py-3 text-[#4f665d]">{project.category.join(', ')}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={isSavingProject || isUploadingImages || deletingProjectId === project.id}
                        onClick={() => openEditModal(project)}
                        className="rounded-lg border border-[#153631]/20 px-3 py-1.5 text-xs font-medium text-[#173531] hover:bg-[#eff6f2]"
                      >
                        Sua
                      </button>
                      <button
                        type="button"
                        disabled={isSavingProject || isUploadingImages || deletingProjectId === project.id}
                        onClick={() => handleDeleteProject(project)}
                        className="rounded-lg border border-[#9a433d]/30 px-3 py-1.5 text-xs font-medium text-[#9a433d] hover:bg-[#fff1f0]"
                      >
                        {deletingProjectId === project.id ? 'Dang xoa...' : 'Xoa'}
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
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-[#13322f]">
                {editingProjectId ? 'Chinh sua du an' : 'Them du an moi'}
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
                <label className="text-sm font-medium text-[#1a3834]">imgs</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesUpload}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-[#173531] file:px-3 file:py-1.5 file:text-white hover:file:bg-[#0f2926]"
                />
                <p className="text-xs text-[#667d73]">
                  {isUploadingImages
                    ? 'Dang upload anh len Cloudinary...'
                    : `Da co ${formData.imgs.length} anh da luu, ${pendingImageFiles.length} anh moi`}
                </p>
                {(formData.imgs.length > 0 || pendingImagePreviews.length > 0) && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {formData.imgs.map((img, idx) => (
                      <div key={`${img.id || img.link}-${idx}`} className="group relative overflow-hidden rounded-lg border border-[#153631]/20">
                        <img src={img.link} alt={`project-${idx}`} className="h-20 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              imgs: prev.imgs.filter((_, imageIdx) => imageIdx !== idx),
                            }))
                          }
                          className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    {pendingImagePreviews.map((img, idx) => (
                      <div key={`${img}-${idx}`} className="group relative overflow-hidden rounded-lg border border-[#153631]/20">
                        <img src={img} alt={`new-project-${idx}`} className="h-20 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(img);
                            setPendingImagePreviews((prev) => prev.filter((_, imageIdx) => imageIdx !== idx));
                            setPendingImageFiles((prev) => prev.filter((_, imageIdx) => imageIdx !== idx));
                          }}
                          className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">name</label>
                <input
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      name: value,
                      slugify: createSlug(value),
                    }));
                  }}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">investor</label>
                <input
                  value={formData.investor}
                  onChange={(e) => handleChange('investor', e.target.value)}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">totalCost</label>
                <input
                  value={formData.totalCost}
                  onChange={(e) => handleChange('totalCost', e.target.value)}
                  placeholder="120 ty VND"
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">location</label>
                <input
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">nFloors</label>
                <input
                  value={formData.nFloors}
                  onChange={(e) => handleChange('nFloors', e.target.value)}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">style</label>
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-[#153631]/20 px-3 py-2">
                  {isLoadingStyles && <p className="text-sm text-[#667d73]">Dang tai style...</p>}
                  {!isLoadingStyles && styles.length === 0 && (
                    <p className="text-sm text-[#667d73]">Khong co style de chon</p>
                  )}
                  {!isLoadingStyles && styles.map((styleOption) => (
                    <label key={styleOption._id} className="flex items-center gap-2 text-sm text-[#1a3834]">
                      <input
                        type="checkbox"
                        checked={formData.style.includes(styleOption.name)}
                        onChange={() => handleStyleToggle(styleOption.name)}
                        className="h-4 w-4 rounded border-[#153631]/30"
                      />
                      <span>{styleOption.name}</span>
                    </label>
                  ))}
                </div>
                {formData.style.length > 0 && (
                  <div className="space-y-1 text-xs text-[#667d73]">
                    {formData.style.map((styleName) => {
                      const selected = styles.find((s) => s.name === styleName);
                      const list = selected?.id_projects_list || [];
                      return (
                        <p key={styleName}>
                          {styleName}: {list.length > 0 ? list.join(', ') : '[]'}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">category</label>
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-[#153631]/20 px-3 py-2">
                  {isLoadingCategories && <p className="text-sm text-[#667d73]">Dang tai category...</p>}
                  {!isLoadingCategories && categories.length === 0 && (
                    <p className="text-sm text-[#667d73]">Khong co category de chon</p>
                  )}
                  {!isLoadingCategories && categories.map((categoryOption) => (
                    <label key={categoryOption._id} className="flex items-center gap-2 text-sm text-[#1a3834]">
                      <input
                        type="checkbox"
                        checked={formData.category.includes(categoryOption.name)}
                        onChange={() => handleCategoryToggle(categoryOption.name)}
                        className="h-4 w-4 rounded border-[#153631]/30"
                      />
                      <span>{categoryOption.name}</span>
                    </label>
                  ))}
                </div>
                {formData.category.length > 0 && (
                  <div className="space-y-1 text-xs text-[#667d73]">
                    {formData.category.map((categoryName) => {
                      const selected = categories.find((c) => c.name === categoryName);
                      const list = selected?.id_projects_list || [];
                      return (
                        <p key={categoryName}>
                          {categoryName}: {list.length > 0 ? list.join(', ') : '[]'}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#1a3834]">area</label>
                <input
                  value={formData.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  placeholder="5400m2"
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-[#1a3834]">slugify</label>
                <input
                  value={formData.slugify}
                  readOnly
                  placeholder="toa-nha-thuong-mai-trung-tam"
                  className="w-full cursor-not-allowed rounded-lg border border-[#153631]/20 bg-[#f4f8f6] px-3 py-2 text-sm text-[#5d756a] outline-none"
                />
                <p className="text-xs text-[#667d73]">Slug duoc tu dong tao theo ten du an.</p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-[#1a3834]">decs</label>
                <textarea
                  rows={4}
                  value={formData.decs}
                  onChange={(e) => handleChange('decs', e.target.value)}
                  className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
                />
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
                  disabled={isSavingProject || isUploadingImages}
                  className="rounded-xl bg-[#173531] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2926]"
                >
                  {isSavingProject
                    ? 'Dang luu...'
                    : editingProjectId
                      ? 'Cap nhat du an'
                      : 'Luu du an'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
