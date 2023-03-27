import React from "react";
import { Navbar, Button, Link, Text} from "@nextui-org/react";
import {useRouter} from "next/router";

export default function NavBar() {
  const [variant, setVariant] = React.useState("sticky");
    const navLinks = [
  { name: "JSON可视化",
   path: "/"
  },
  {
    name: "随机字符串",
    path: "/randomString",
  },
  {
    name: "正则表达式",
    path: "/re",
  }
];
    const { asPath } = useRouter();
  return (
      <Navbar isBordered variant={variant}>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Tool Box
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
            {navLinks.map((item, index) => (
                <Navbar.Link
                    isActive={asPath === item.path}
                    key={index}
                    href={item.path}
                >
                    {item.name}
                </Navbar.Link>)
              )}
        </Navbar.Content>
        <Navbar.Content>

        </Navbar.Content>
      </Navbar>
  )
}
