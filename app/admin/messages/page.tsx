"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Trash2 } from "lucide-react";

type MessageItem = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate?: string;
  location?: string;
  message: string;
  status: "new" | "contacted" | "completed" | "archived";
  createdAt: string;
};

const STATUSES = ["new", "contacted", "completed", "archived"] as const;

export default function AdminMessagesPage() {
  const [items, setItems] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/messages");
    const json = await res.json();
    setItems(json.messages || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((m) => (
            <div key={m._id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{m.name} — {m.eventType}</p>
                  <p className="text-sm text-gray-500">{m.email} · {m.phone}</p>
                  {m.location && <p className="text-sm text-gray-500">Location: {m.location}</p>}
                  {m.preferredDate && <p className="text-sm text-gray-500">Preferred date: {m.preferredDate}</p>}
                  <p className="text-sm text-gray-700 mt-2">{m.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <select
                    value={m.status}
                    onChange={(e) => updateStatus(m._id, e.target.value)}
                    className="rounded-md border border-gray-300 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(m._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
