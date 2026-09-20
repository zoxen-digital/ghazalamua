"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Trash2, Plus, Pencil } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/lib/constants";

type GalleryFormItem = {
  _id: string;
  title: string;
  type: "image" | "video";
  category: string;
  imageUrl: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

const EMPTY: Partial<GalleryFormItem> = {
  title: "",
  type: "image",
  category: "Bridal",
  imageUrl: "",
  videoUrl: "",
  thumbnailUrl: "",
  description: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryFormItem[]>([]);
  const [form, setForm] = useState<Partial<GalleryFormItem>>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/gallery");
    const json = await res.json();
    setItems(json.items || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/gallery/${editingId}` : "/api/gallery";
    const method = editingId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(EMPTY);
    setEditingId(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    load();
  }

  function handleEdit(item: GalleryFormItem) {
    setForm(item);
    setEditingId(item._id);
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h1>

      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 mb-8 grid md:grid-cols-2 gap-4">
        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={form.type || "image"}
          onChange={(e) => setForm({ ...form, type: e.target.value as "image" | "video" })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <select
          value={form.category || "Bridal"}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm md:col-span-2"
        >
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {form.type === "video" ? (
          <input
            placeholder="Video URL"
            value={form.videoUrl || ""}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm md:col-span-2"
          />
        ) : null}

        <div className="md:col-span-2">
          <ImageUploadField
            label={form.type === "video" ? "Thumbnail" : "Image"}
            folder="gallery"
            value={(form.type === "video" ? form.thumbnailUrl : form.imageUrl) || ""}
            onChange={(url) =>
              setForm(
                form.type === "video"
                  ? { ...form, thumbnailUrl: url }
                  : { ...form, imageUrl: url, thumbnailUrl: url }
              )
            }
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={form.active !== false} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <input
          placeholder="Sort order"
          type="number"
          value={form.sortOrder ?? 0}
          onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {editingId ? <Pencil size={14} /> : <Plus size={14} />}
            {editingId ? "Update Item" : "Add Item"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setForm(EMPTY); setEditingId(null); }} className="rounded-md border border-gray-300 px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="rounded-xl border border-gray-200 bg-white p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.category} · {item.type}</p>
                <p className="text-xs text-gray-400 mt-1">{item.active ? "Active" : "Inactive"} {item.featured && "· Featured"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-gray-500 hover:text-gray-800"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
