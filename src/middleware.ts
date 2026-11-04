import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, safeNextPath, verifySessionToken } from "@/lib/auth";

const PUBLIC_PATHS = new Set(["/login", "/api/login", "/api/logout"]);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith("/opengraph-image")) {
    if (pathname === "/login" && session) {
      const target = safeNextPath(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(target, request.url));
    }
    return NextResponse.next();
  }

  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const loginUrl = new URL("/login", request.url);
  const next = `${pathname}${search}`;
  if (next !== "/") loginUrl.searchParams.set("next", next);

  const response = NextResponse.redirect(loginUrl);
  response.headers.set("x-robots-tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|twitter-image|icon.svg|.*\\..*).*)",
  ],
};
