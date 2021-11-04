import type { NextPage } from "next";
import React from "react";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <>
      <Typography>Content!</Typography>
    </>
  );
};

//@ts-ignore
Home.public = true;
export default Home;
