'use client';

import { FormEvent, useEffect, useState } from 'react';

type StyleItem = {
  _id: string;
  name: string;
  id_projects_list?: string[];
};

export default function AdminStylesPage() {
  const [styles, setStyles] = useState<StyleItem[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchStyles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/styles');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to fetch styles');
      }
      const items = Array.isArray(data?.items) ? data.items : [];
      setStyles(items);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Khong tai duoc style';
      setMessage(text);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setMessage('Vui long nhap ten style');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/styles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Khong the tao style');
      }
      setNewName('');
      setMessage('Da tao style moi');
      await fetchStyles();
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Khong the tao style';
      setMessage(text);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) {
      setMessage('Vui long nhap ten style');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/styles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Khong the cap nhat style');
      }

      setEditingId(null);
      setEditingName('');
      setMessage('Da cap nhat style');
      await fetchStyles();
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Khong the cap nhat style';
      setMessage(text);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = window.confirm(`Xoa style \"${name}\"?`);
    if (!ok) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/styles/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Khong the xoa style');
      }
      setMessage('Da xoa style');
      await fetchStyles();
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Khong the xoa style';
      setMessage(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#153631]/10 bg-[linear-gradient(120deg,#173f3a_0%,#27554e_100%)] p-6 text-white shadow-[0_18px_40px_rgba(14,35,31,0.2)] sm:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[#e8d0b2]">Metadata management</p>
        <h2 className="mt-3 text-2xl font-semibold">CRUD Style</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#d9e6df]">Tao, sua, xoa style va dong bo du lieu lien quan du an.</p>
      </section>

      <section className="rounded-3xl border border-[#153631]/10 bg-white p-5 shadow-[0_12px_32px_rgba(12,35,30,0.08)] sm:p-6">
        <form onSubmit={handleCreate} className="mb-4 flex flex-wrap gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nhap ten style moi"
            className="min-w-65 flex-1 rounded-xl border border-[#153631]/20 px-3 py-2 text-sm outline-none focus:border-[#173531]"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#173531] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2926] disabled:opacity-60"
          >
            Them style
          </button>
        </form>

        {message && <p className="mb-3 text-sm text-[#36544d]">{message}</p>}

        <div className="overflow-x-auto rounded-2xl border border-[#153631]/10">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="bg-[#f1f6f3] text-left text-[#36544d]">
                <th className="px-4 py-3 font-semibold">Ten style</th>
                <th className="px-4 py-3 font-semibold">So du an</th>
                <th className="px-4 py-3 font-semibold">Hanh dong</th>
              </tr>
            </thead>
            <tbody>
              {styles.map((style) => (
                <tr key={style._id} className="border-t border-[#153631]/10 odd:bg-white even:bg-[#fbfdfc]">
                  <td className="px-4 py-3 text-[#0f2a27]">
                    {editingId === style._id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="w-full rounded-lg border border-[#153631]/20 px-2 py-1 text-sm outline-none"
                      />
                    ) : (
                      style.name
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#4f665d]">{style.id_projects_list?.length || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {editingId === style._id ? (
                        <>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleUpdate(style._id)}
                            className="rounded-lg border border-[#153631]/20 px-3 py-1.5 text-xs font-medium text-[#173531] hover:bg-[#eff6f2]"
                          >
                            Luu
                          </button>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => {
                              setEditingId(null);
                              setEditingName('');
                            }}
                            className="rounded-lg border border-[#153631]/20 px-3 py-1.5 text-xs font-medium text-[#173531] hover:bg-[#eff6f2]"
                          >
                            Huy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => {
                              setEditingId(style._id);
                              setEditingName(style.name);
                            }}
                            className="rounded-lg border border-[#153631]/20 px-3 py-1.5 text-xs font-medium text-[#173531] hover:bg-[#eff6f2]"
                          >
                            Sua
                          </button>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleDelete(style._id, style.name)}
                            className="rounded-lg border border-[#9a433d]/30 px-3 py-1.5 text-xs font-medium text-[#9a433d] hover:bg-[#fff1f0]"
                          >
                            Xoa
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
