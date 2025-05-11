import { useAuthContext } from "@/context/AuthContext";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

const Nav = () => {
  const { user, logout } = useAuthContext();

  return (
    <Navbar maxWidth="xl" isBordered={true}>
      <NavbarBrand>
        <div className="font-bold text-4xl text-center text-primary font-sans">
          Twitter
        </div>
      </NavbarBrand>
      {user && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button onPress={logout} color="primary" href="#" variant="flat">
              Log out
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default Nav;