import { ChangeEvent, FormEvent } from 'react';

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

type ProjectModalProps = {
  isOpen: boolean;
  editingProjectId: string | null;
  formError: string;
  formData: ProjectFormData;
  styles: StyleOption[];
  categories: CategoryOption[];
  isLoadingStyles: boolean;
  isLoadingCategories: boolean;
  isUploadingImages: boolean;
  isSavingProject: boolean;
  pendingImageFiles: File[];
  pendingImagePreviews: string[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onImagesUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: (field: keyof ProjectFormData, value: string) => void;
  onNameChange: (value: string) => void;
  onStyleToggle: (styleName: string) => void;
  onCategoryToggle: (categoryName: string) => void;
  onRemoveExistingImage: (index: number) => void;
  onRemovePendingImage: (index: number) => void;
};

export default function ProjectModal({
  isOpen,
  editingProjectId,
  formError,
  formData,
  styles,
  categories,
  isLoadingStyles,
  isLoadingCategories,
  isUploadingImages,
  isSavingProject,
  pendingImageFiles,
  pendingImagePreviews,
  onClose,
  onSubmit,
  onImagesUpload,
  onFieldChange,
  onNameChange,
  onStyleToggle,
  onCategoryToggle,
  onRemoveExistingImage,
  onRemovePendingImage,
}: ProjectModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-[#13322f]">
            {editingProjectId ? 'Chinh sua du an' : 'Them du an moi'}
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
            <label className="text-sm font-medium text-[#1a3834]">imgs</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImagesUpload}
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
                  <div
                    key={`${img.id || img.link}-${idx}`}
                    className="group relative overflow-hidden rounded-lg border border-[#153631]/20"
                  >
                    <img src={img.link} alt={`project-${idx}`} className="h-20 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => onRemoveExistingImage(idx)}
                      className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
                {pendingImagePreviews.map((img, idx) => (
                  <div
                    key={`${img}-${idx}`}
                    className="group relative overflow-hidden rounded-lg border border-[#153631]/20"
                  >
                    <img src={img} alt={`new-project-${idx}`} className="h-20 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => onRemovePendingImage(idx)}
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
              onChange={(event) => onNameChange(event.target.value)}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#1a3834]">investor</label>
            <input
              value={formData.investor}
              onChange={(event) => onFieldChange('investor', event.target.value)}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#1a3834]">totalCost</label>
            <input
              value={formData.totalCost}
              onChange={(event) => onFieldChange('totalCost', event.target.value)}
              placeholder="120 ty VND"
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#1a3834]">location</label>
            <input
              value={formData.location}
              onChange={(event) => onFieldChange('location', event.target.value)}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#1a3834]">date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(event) => onFieldChange('date', event.target.value)}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#1a3834]">nFloors</label>
            <input
              value={formData.nFloors}
              onChange={(event) => onFieldChange('nFloors', event.target.value)}
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
              {!isLoadingStyles &&
                styles.map((styleOption) => (
                  <label key={styleOption._id} className="flex items-center gap-2 text-sm text-[#1a3834]">
                    <input
                      type="checkbox"
                      checked={formData.style.includes(styleOption.name)}
                      onChange={() => onStyleToggle(styleOption.name)}
                      className="h-4 w-4 rounded border-[#153631]/30"
                    />
                    <span>{styleOption.name}</span>
                  </label>
                ))}
            </div>
            {formData.style.length > 0 && (
              <div className="space-y-1 text-xs text-[#667d73]">
                {formData.style.map((styleName) => {
                  const selected = styles.find((style) => style.name === styleName);
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
              {!isLoadingCategories &&
                categories.map((categoryOption) => (
                  <label key={categoryOption._id} className="flex items-center gap-2 text-sm text-[#1a3834]">
                    <input
                      type="checkbox"
                      checked={formData.category.includes(categoryOption.name)}
                      onChange={() => onCategoryToggle(categoryOption.name)}
                      className="h-4 w-4 rounded border-[#153631]/30"
                    />
                    <span>{categoryOption.name}</span>
                  </label>
                ))}
            </div>
            {formData.category.length > 0 && (
              <div className="space-y-1 text-xs text-[#667d73]">
                {formData.category.map((categoryName) => {
                  const selected = categories.find((category) => category.name === categoryName);
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
              onChange={(event) => onFieldChange('area', event.target.value)}
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
              onChange={(event) => onFieldChange('decs', event.target.value)}
              className="w-full rounded-lg border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
            />
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
              disabled={isSavingProject || isUploadingImages}
              className="rounded-xl bg-[#173531] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2926]"
            >
              {isSavingProject ? 'Dang luu...' : editingProjectId ? 'Cap nhat du an' : 'Luu du an'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
