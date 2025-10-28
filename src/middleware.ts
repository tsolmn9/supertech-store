import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const path = new URL(req.url).pathname;
  const role = (session.sessionClaims?.metadata as { role?: string })?.role;

  console.log("Session claims:", session.sessionClaims);
  console.log("Role:", role, "Path:", path);

  // if (path.startsWith("/admin") && role !== "admin") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  console.log(role);

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
