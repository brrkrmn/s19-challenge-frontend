"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Button, Card, CardBody, Input, Link, Tab, Tabs } from "@heroui/react";
import { useState } from "react";

const Home = () => {
  const [selected, setSelected] = useState<React.Key>("login");
  const { login, signup } = useAuthContext();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    login({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    signup({
      username: formData.get("username") as string,
      name: formData.get("username") as string,
      email: formData.get("email") as string,
      about: "",
      password: formData.get("password") as string,
    });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Card
        className={`max-w-full w-[340px] ${
          selected === "login" ? "h-fit" : "h-[400px]"
        }`}
      >
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            size="md"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login" className="h-full">
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 h-full justify-between"
              >
                <Input
                  name="username"
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                />
                <Input
                  name="password"
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected("sign-up")}
                  >
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                onSubmit={handleSignup}
                className="flex flex-col gap-4 h-[300px]"
              >
                <Input
                  name="username"
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                />
                <Input
                  name="email"
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  name="password"
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected("login")}
                  >
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
