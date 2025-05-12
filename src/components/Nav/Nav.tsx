import { useAuthContext } from "@/context/AuthContext";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { user, logout } = useAuthContext();
  const pathname = usePathname();

  return (
    <Navbar maxWidth="xl" isBordered={true}>
      <NavbarBrand>
        <Link
          href={`${user ? "/dashboard" : "/"}`}
          className="font-bold text-4xl text-center text-primary font-sans"
        >
          Twitter
        </Link>
      </NavbarBrand>
      {user && (
        <>
          <NavbarContent className="hidden sm:flex gap-10" justify="center">
            <NavbarItem isActive={pathname === "/dashboard"}>
              <Link
                color={pathname === "/dashboard" ? "primary" : "foreground"}
                aria-current="page"
                href="/"
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem isActive={pathname === "/profile"}>
              <Link
                color={pathname === "/profile" ? "primary" : "foreground"}
                href={`/profile`}
              >
                Profile
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button onPress={logout} color="primary" href="#" variant="flat">
                Log out
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}
    </Navbar>
  );
};

export default Nav;