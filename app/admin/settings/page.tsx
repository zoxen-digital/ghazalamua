"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { SiteSettingsDTO } from "@/types";

const EMPTY: SiteSettingsDTO = {
  businessName: "Ghazala Qureshi",
  subtitle: "Professional Makeup Artist",
  email: "",
  phone: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  tiktok: "",
  addressText: "",
  serviceArea: "",
  logoUrl: "",
  faviconUrl: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettingsDTO>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((json) => {
        if (json.settings) setForm({ ...EMPTY, ...json.settings });
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
  }

  function field(key: keyof SiteSettingsDTO, label: string) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <AdminShell>
        <p className="text-sm text-gray-500">Loading...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 grid md:grid-cols-2 gap-4">
        {field("businessName", "Business Name")}
        {field("subtitle", "Subtitle")}
        {field("email", "Email")}
        {field("phone", "Phone")}
        {field("whatsapp", "WhatsApp Number")}
        {field("instagram", "Instagram URL")}
        {field("facebook", "Facebook URL")}
        {field("tiktok", "TikTok URL")}
        {field("addressText", "Address Text")}
        {field("serviceArea", "Service Area")}
        <div className="md:col-span-2">
          <ImageUploadField label="Logo" folder="misc" value={form.logoUrl} onChange={(url) => setForm({ ...form, logoUrl: url })} />
        </div>
        <div className="md:col-span-2">
          <ImageUploadField label="Favicon" folder="misc" value={form.faviconUrl} onChange={(url) => setForm({ ...form, faviconUrl: url })} />
        </div>
        <div className="md:col-span-2 flex items-center gap-4 mt-2">
          <button type="submit" disabled={saving} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </form>
    </AdminShell>
  );
}
