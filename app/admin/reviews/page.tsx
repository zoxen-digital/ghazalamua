"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Trash2, Plus, Pencil } from "lucide-react";

type ReviewItem = {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  avatarUrl?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

const EMPTY: Partial<ReviewItem> = {
  customerName: "",
  review: "",
  rating: 5,
  avatarUrl: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function AdminReviewsPage() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [form, setForm] = useState<Partial<ReviewItem>>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const json = await res.json();
    setItems(json.reviews || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/reviews/${editingId}` : "/api/reviews";
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
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    load();
  }

  function handleEdit(item: ReviewItem) {
    setForm(item);
    setEditingId(item._id);
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h1>

      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 mb-8 grid md:grid-cols-2 gap-4">
        <input
          placeholder="Customer name"
          value={form.customerName || ""}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={form.rating ?? 5}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Stars</option>
          ))}
        </select>
        <textarea
          placeholder="Review text"
          value={form.review || ""}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm md:col-span-2"
          rows={3}
        />
        <div className="md:col-span-2">
          <ImageUploadField
            label="Avatar (optional)"
            folder="misc"
            value={form.avatarUrl || ""}
            onChange={(url) => setForm({ ...form, avatarUrl: url })}
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
            {editingId ? "Update Review" : "Add Review"}
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
                <p className="font-semibold text-gray-800">{item.customerName} ({item.rating}★)</p>
                <p className="text-sm text-gray-500 line-clamp-2">{item.review}</p>
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
