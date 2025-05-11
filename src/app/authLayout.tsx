"use client"

import Nav from "@/components/Nav/Nav";
import { useAuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && pathname === "/") {
      router.push("/dashboard");
    } else if (!user && pathname === "/dashboard") {
      router.push("/");
    }

    setIsLoading(false);
  }, [user, pathname, router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start gap-20 min-w-xs px-4 py-4">
      <Nav />
      {children}
    </div>
  );
};

export default AuthLayout;