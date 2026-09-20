"use client";

import { useState, type FormEvent } from "react";

const EVENT_TYPES = ["Bridal", "Party", "Event", "Photoshoot", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[color:var(--color-border)] bg-white p-8 text-center">
        <h3 className="font-serif-display text-2xl mb-2 text-[color:var(--color-text)]">Thank you!</h3>
        <p className="text-[color:var(--color-muted)]">
          Your message has been received. I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-[color:var(--color-border)] bg-white p-6 md:p-8">
      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Phone" name="phone" type="tel" required />
        <div className="flex flex-col gap-1">
          <label htmlFor="eventType" className="text-sm font-medium text-[color:var(--color-text-2)]">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm focus:border-[color:var(--color-rose)] outline-none"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Preferred Date" name="preferredDate" type="date" />
        <Field label="Location" name="location" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-[color:var(--color-text-2)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm focus:border-[color:var(--color-rose)] outline-none"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--color-blush)] px-6 py-3 text-sm font-semibold text-white hover:bg-[color:var(--color-rose)] transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-[color:var(--color-text-2)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm focus:border-[color:var(--color-rose)] outline-none"
      />
    </div>
  );
}
