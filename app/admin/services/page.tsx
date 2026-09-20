"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Trash2, Plus, Pencil } from "lucide-react";

type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price?: number;
  duration?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

const EMPTY: Partial<ServiceItem> = {
  title: "",
  description: "",
  shortDescription: "",
  imageUrl: "",
  price: undefined,
  duration: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState<Partial<ServiceItem>>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/services");
    const json = await res.json();
    setItems(json.services || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/services/${editingId}` : "/api/services";
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
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    load();
  }

  function handleEdit(item: ServiceItem) {
    setForm(item);
    setEditingId(item._id);
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Services</h1>

      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 mb-8 grid md:grid-cols-2 gap-4">
        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Short description"
          value={form.shortDescription || ""}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm md:col-span-2"
          rows={3}
        />
        <input
          placeholder="Price (optional)"
          type="number"
          value={form.price ?? ""}
          onChange={(e) => setForm({ ...form, price: e.target.value ? Number(e.target.value) : undefined })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Duration (optional)"
          value={form.duration || ""}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="md:col-span-2">
          <ImageUploadField
            label="Image"
            folder="products"
            value={form.imageUrl || ""}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
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
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {editingId ? <Pencil size={14} /> : <Plus size={14} />}
            {editingId ? "Update Service" : "Add Service"}
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
                <p className="text-sm text-gray-500">{item.shortDescription}</p>
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
