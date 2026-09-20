/**
 * One-time maintenance: replaces auto-generated filename titles (e.g. "WhatsApp Image ...")
 * with clean generic titles, and randomizes sortOrder so items don't display in upload sequence.
 *
 * Usage:
 *   set -a && source .env && set +a && npx tsx scripts/rename-and-shuffle-gallery.ts
 */
import mongoose from "mongoose";
import GalleryItem from "../models/GalleryItem";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const items = await GalleryItem.find().sort({ createdAt: 1 });
  console.log(`Found ${items.length} gallery item(s).`);

  let imageCount = 0;
  let videoCount = 0;

  for (const item of items) {
    if (/whatsapp/i.test(item.title)) {
      if (item.type === "video") {
        videoCount += 1;
        item.title = `Makeup Video ${videoCount}`;
      } else {
        imageCount += 1;
        item.title = `Makeup Look ${imageCount}`;
      }
    }
  }

  const shuffled = shuffle(items);
  shuffled.forEach((item, i) => {
    item.sortOrder = i;
  });

  await Promise.all(shuffled.map((item) => item.save()));

  console.log("Titles cleaned up and display order shuffled.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
