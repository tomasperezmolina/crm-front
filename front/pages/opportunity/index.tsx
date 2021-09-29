import type { NextPage } from "next";
import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

interface OpportunitiesProps {
  id?: string;
}
const Opportunities: NextPage<OpportunitiesProps> = () => {
  return (
    <>
      <Box sx={{position: 'relative'}}>
        <Typography variant="h4" align="center">
          Oportunidades
        </Typography>
        <Button sx={{position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)'}} color="primary" variant="contained" type="submit">
          Nuevo prospecto
        </Button>
      </Box>
    </>
  );
};

export default Opportunities;
