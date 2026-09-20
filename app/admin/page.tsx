import AdminShell from "@/components/admin/AdminShell";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import GalleryItem from "@/models/GalleryItem";
import Review from "@/models/Review";
import ContactMessage from "@/models/ContactMessage";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    await connectDB();
    const [services, gallery, reviews, newMessages, recentMessages] = await Promise.all([
      Service.countDocuments(),
      GalleryItem.countDocuments(),
      Review.countDocuments(),
      ContactMessage.countDocuments({ status: "new" }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    return { services, gallery, reviews, newMessages, recentMessages };
  } catch {
    return { services: 0, gallery: 0, reviews: 0, newMessages: 0, recentMessages: [] };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "Services", value: counts.services },
    { label: "Gallery Items", value: counts.gallery },
    { label: "Reviews", value: counts.reviews },
    { label: "New Messages", value: counts.newMessages },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold text-gray-800">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Recent Enquiries</h2>
        {counts.recentMessages.length === 0 ? (
          <p className="text-sm text-gray-500">No enquiries yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {counts.recentMessages.map((m) => (
              <li key={String(m._id)} className="text-sm text-gray-600 border-b border-gray-100 pb-2 last:border-0">
                <span className="font-medium text-gray-800">{m.name}</span> — {m.eventType} — {m.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
