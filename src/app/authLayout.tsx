"use client"

import Nav from "@/components/Nav/Nav";
import { useAuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, initialized } = useAuthContext();

  useEffect(() => {
    if (!initialized) return;

    if (user && pathname === "/") {
      router.replace("/dashboard");
    } else if (
      !user &&
      (pathname === "/dashboard" ||
        pathname === "/profile" ||
        pathname.split("/")[1] === "user" ||
        pathname.split("/")[1] === "tweet")
    ) {
      router.replace("/");
    }
  }, [user, pathname, router, initialized]);

  if (!initialized) return null;

  if ((pathname === "/" && user) || (pathname === "/dashboard" && !user))
    return null;

  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start gap-10 min-w-xs px-4 py-4">
      <Nav />
      {children}
    </div>
  );
};

export default AuthLayout;