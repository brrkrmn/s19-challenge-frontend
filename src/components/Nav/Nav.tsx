import { useAuthContext } from "@/context/AuthContext";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

const Nav = () => {
  const { user } = useAuthContext();

  return (
    <Navbar maxWidth="xl" isBordered={true}>
      <NavbarBrand>
        <div className="font-bold text-4xl text-center text-primary font-sans">
          Twitter
        </div>
      </NavbarBrand>
      {user && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}

export default Nav;