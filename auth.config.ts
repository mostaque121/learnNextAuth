import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [Google],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role || "user"; // Default role is "user"
      const { pathname } = nextUrl;

      // Restrict `/admin` to admin users only
      if (pathname.startsWith("/posts")) {
        if (!isLoggedIn) {
          return Response.redirect(new URL("/sign-in", nextUrl)); // Redirect unauthenticated users to login
        }
        if (userRole !== "admin") {
          return Response.redirect(new URL("/403", nextUrl)); // Redirect non-admins to a Forbidden page
        }
        return true; // Allow admins to access
      }

      // Prevent logged-in users from accessing authentication pages
      if (isLoggedIn && ["/login", "/signup"].includes(pathname)) {
        return Response.redirect(new URL("/", nextUrl)); // Redirect logged-in users away from auth pages
      }

      return true; // Allow access to all other pages
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
