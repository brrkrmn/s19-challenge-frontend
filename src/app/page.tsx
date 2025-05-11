"use client";

import Nav from "@/components/Nav/Nav";
import { Button, Card, CardBody, Input, Link, Tab, Tabs } from "@heroui/react";
import { useState } from "react";

const Home = () => {
  const [selected, setSelected] = useState<React.Key>("login");

  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start gap-20 min-w-xs px-4 py-4">
      <Nav />
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
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login" className="h-full">
                <form className="flex flex-col gap-4 h-full justify-between">
                  <Input
                    isRequired
                    label="Username"
                    placeholder="Enter your username"
                    type="text"
                  />
                  <Input
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
                    <Button fullWidth color="primary">
                      Login
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <form className="flex flex-col gap-4 h-[300px]">
                  <Input
                    isRequired
                    label="Username"
                    placeholder="Enter your username"
                    type="text"
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
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
                    <Button fullWidth color="primary">
                      Sign up
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Home;
