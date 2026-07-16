
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
const path = request.nextUrl.pathname
  console.log("Proxy is running:", request.nextUrl.pathname);
const isPublic = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/forgotpassword" ||
  path === "/resetpassword";
const token = request.cookies.get("token")?.value || ""
if (isPublic && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
}
if (!isPublic && !token ) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
}
}

export const config = {
  matcher: [
    "/login",
  "/signup",
   "/verifyemail",
   "/forgotpassword",
   "/resetpassword",
   "/profile",
   "/"
]
};
