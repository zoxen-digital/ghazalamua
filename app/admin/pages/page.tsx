"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { HomepageContentDTO } from "@/types";

const EMPTY: HomepageContentDTO = {
  heroEyebrow: "",
  heroTitle: "",
  heroDescription: "",
  heroImage: "",
  heroPrimaryButtonText: "",
  heroSecondaryButtonText: "",
  aboutTitle: "",
  aboutSubtitle: "",
  aboutDescription: "",
  aboutImage: "",
  servicesHeading: "",
  galleryHeading: "",
  reviewsHeading: "",
  ctaHeading: "",
  ctaDescription: "",
  ctaImage: "",
};

export default function AdminPagesPage() {
  const [form, setForm] = useState<HomepageContentDTO>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/homepage-content")
      .then((r) => r.json())
      .then((json) => {
        if (json.content) setForm({ ...EMPTY, ...json.content });
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/homepage-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
  }

  function field(key: keyof HomepageContentDTO, label: string, multiline = false) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {multiline ? (
          <textarea
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            rows={3}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        ) : (
          <input
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        )}
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Homepage Content</h1>
      <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 grid md:grid-cols-2 gap-4">
        <h2 className="md:col-span-2 font-bold text-gray-800">Hero</h2>
        {field("heroEyebrow", "Eyebrow")}
        {field("heroTitle", "Title")}
        {field("heroDescription", "Description", true)}
        {field("heroPrimaryButtonText", "Primary Button Text")}
        {field("heroSecondaryButtonText", "Secondary Button Text")}
        <div className="md:col-span-2">
          <ImageUploadField label="Hero Image" folder="pages" value={form.heroImage} onChange={(url) => setForm({ ...form, heroImage: url })} />
        </div>

        <h2 className="md:col-span-2 font-bold text-gray-800 mt-4">About</h2>
        {field("aboutTitle", "Title")}
        {field("aboutSubtitle", "Subtitle")}
        {field("aboutDescription", "Description", true)}
        <div className="md:col-span-2">
          <ImageUploadField label="About Image" folder="pages" value={form.aboutImage} onChange={(url) => setForm({ ...form, aboutImage: url })} />
        </div>

        <h2 className="md:col-span-2 font-bold text-gray-800 mt-4">Section Headings</h2>
        {field("servicesHeading", "Services Heading")}
        {field("galleryHeading", "Gallery Heading")}
        {field("reviewsHeading", "Reviews Heading")}

        <h2 className="md:col-span-2 font-bold text-gray-800 mt-4">Booking CTA</h2>
        {field("ctaHeading", "Heading")}
        {field("ctaDescription", "Description", true)}
        <div className="md:col-span-2">
          <ImageUploadField label="CTA Image" folder="pages" value={form.ctaImage} onChange={(url) => setForm({ ...form, ctaImage: url })} />
        </div>

        <div className="md:col-span-2 flex items-center gap-4 mt-4">
          <button type="submit" disabled={saving} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </form>
    </AdminShell>
  );
}
