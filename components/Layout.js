import {Container, Row, Col} from '@nextui-org/react';

import NavBar from "./NavBar.js";
import React from "react";
import {styled} from "@nextui-org/react"

export const Box = styled("div", {
    boxSizing: "border-box",
});

export const Layout = ({children}) => (
    // <Container fluid display="flex">
    //     <NavBar />
    //   {children}
    // </Container>

    <div
        style={{width: '100%', height: '100%', position: 'relative'}}
    >
        <NavBar/>
        {children}
    </div>
);
