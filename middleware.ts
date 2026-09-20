import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const AUTH_SECRET = process.env.AUTH_SECRET || "dev-insecure-secret-change-me";

function getSecretKey() {
  return new TextEncoder().encode(AUTH_SECRET);
}

async function hasValidSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}

const PROTECTED_API_PREFIXES = [
  "/api/upload",
  "/api/gallery",
  "/api/services",
  "/api/reviews",
  "/api/settings",
  "/api/homepage-content",
  "/api/messages",
];

const PROTECTED_API_METHODS = ["POST", "PUT", "DELETE", "PATCH"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin pages (except login) require a session, redirect to login otherwise.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const valid = await hasValidSession(req);
    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Admin API routes always require a session.
  if (pathname.startsWith("/api/admin/") && !pathname.startsWith("/api/admin/login") && !pathname.startsWith("/api/admin/seed")) {
    const valid = await hasValidSession(req);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Public review submission endpoint is intentionally open (with its own honeypot check).
  if (pathname.startsWith("/api/reviews/submit")) {
    return NextResponse.next();
  }

  // Mutating requests to content API routes and uploads require a session.
  // GET requests to these routes remain public (used by public-facing pages).
  if (
    PROTECTED_API_METHODS.includes(req.method) &&
    PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    const valid = await hasValidSession(req);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/upload") && req.method === "POST") {
    const valid = await hasValidSession(req);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/upload/:path*", "/api/gallery/:path*", "/api/services/:path*", "/api/reviews/:path*", "/api/settings/:path*", "/api/homepage-content/:path*", "/api/messages/:path*"],
};
