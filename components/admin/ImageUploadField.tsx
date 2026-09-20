"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { resolveImageUrl } from "@/lib/uploads";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024;

export default function ImageUploadField({
  value,
  onChange,
  folder,
  label,
  required,
  disabled,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: "products" | "gallery" | "pages" | "misc";
  label: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, WEBP or GIF images are allowed.");
      setStatus("error");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File is too large (max 8MB).");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || "Upload failed.");
        setStatus("error");
        return;
      }
      onChange(json.url);
      setStatus("success");
    } catch {
      setError("Network error during upload.");
      setStatus("error");
    }
  }

  function handleRemove() {
    onChange("");
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {value && (
        <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
          <Image src={resolveImageUrl(value)} alt={label} fill className="object-cover" sizes="128px" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          disabled={disabled || status === "loading"}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
          >
            <X size={14} /> Remove
          </button>
        )}
      </div>

      {status === "loading" && (
        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <Loader2 size={14} className="animate-spin" /> Uploading...
        </span>
      )}
      {status === "success" && (
        <span className="inline-flex items-center gap-1 text-xs text-green-600">
          <CheckCircle2 size={14} /> Uploaded
        </span>
      )}
      {status === "error" && (
        <span className="inline-flex items-center gap-1 text-xs text-red-600">
          <AlertCircle size={14} /> {error}
        </span>
      )}
      {!value && (
        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
          <Upload size={12} /> JPEG, PNG, WEBP or GIF, max 8MB
        </span>
      )}
    </div>
  );
}
