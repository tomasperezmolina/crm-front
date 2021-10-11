import type { NextPage } from "next";
import React from "react";
import { Typography } from "@mui/material";

interface OpportunityProps {
  id?: string,
}

const Opportunity: NextPage<OpportunityProps> = ({id}) => {
  return <Typography>Opportunity {id}</Typography>;
};

Opportunity.getInitialProps = async (ctx): Promise<OpportunityProps> => {
  return {id: ctx.query.id as string};
};

export default Opportunity;
