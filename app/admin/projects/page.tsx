'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ProjectModal from '@/components/admin/ProjectModal';
import { normalizeImageRecords } from '@/utils/image';
import { createSlug } from '@/utils/slug';

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
  const [pendingImageFiles, setPendingImageFiles] = useState<File[]>([]);
  const [pendingImagePreviews, setPendingImagePreviews] = useState<string[]>([]);

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
        imgs: normalizeImageRecords(item?.imgs),
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
      window.alert('Khong tai duoc danh sach du an');
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
      window.alert('Khong tai duoc danh sach style');
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
      window.alert('Khong tai duoc danh sach category');
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

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slugify: createSlug(value),
    }));
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

  const handleRemoveExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imgs: prev.imgs.filter((_, imageIdx) => imageIdx !== index),
    }));
  };

  const handleRemovePendingImage = (index: number) => {
    const previewUrl = pendingImagePreviews[index];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPendingImagePreviews((prev) => prev.filter((_, imageIdx) => imageIdx !== index));
    setPendingImageFiles((prev) => prev.filter((_, imageIdx) => imageIdx !== index));
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

    const images = normalizeImageRecords(data?.images);
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
        window.alert(data?.error || 'Khong the xoa du an');
        return;
      }

      await Promise.all([fetchProjects(), fetchStyles()]);
      window.alert('Da xoa du an');
    } catch {
      window.alert('Loi ket noi khi xoa du an');
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
        window.alert(data?.error || 'Khong the luu du an');
        return;
      }

      await Promise.all([fetchProjects(), fetchStyles(), fetchCategories()]);
      resetPendingImages();
      window.alert(editingProjectId ? 'Cap nhat du an thanh cong' : 'Tao du an thanh cong');
      closeModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Loi ket noi khi luu du an';
      setFormError(message);
      window.alert(message);
    } finally {
      setIsSavingProject(false);
      setIsUploadingImages(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <ProjectModal
        isOpen={isOpen}
        editingProjectId={editingProjectId}
        formError={formError}
        formData={formData}
        styles={styles}
        categories={categories}
        isLoadingStyles={isLoadingStyles}
        isLoadingCategories={isLoadingCategories}
        isUploadingImages={isUploadingImages}
        isSavingProject={isSavingProject}
        pendingImageFiles={pendingImageFiles}
        pendingImagePreviews={pendingImagePreviews}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onImagesUpload={handleImagesUpload}
        onFieldChange={handleChange}
        onNameChange={handleNameChange}
        onStyleToggle={handleStyleToggle}
        onCategoryToggle={handleCategoryToggle}
        onRemoveExistingImage={handleRemoveExistingImage}
        onRemovePendingImage={handleRemovePendingImage}
      />
    </div>
  );
}
