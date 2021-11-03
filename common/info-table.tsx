import { Divider, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React from "react";
import {
  companyTypeToSpanish,
  industryToSpanish,
  regionToSpanish,
} from "../spanish/company";

interface InfoTableRow {
  title: string;
  content: string;
}

interface InfoTableProps {
  title: string;
  titleVariant: Variant;
  rows: InfoTableRow[];
}

export function InfoTable({ title, titleVariant, rows }: InfoTableProps) {
  return (
    <>
      <Typography variant={titleVariant} gutterBottom>
        {title}
      </Typography>
      <Divider />
      {rows.map((v, idx) => (
        <div key={idx}>
          <Typography variant="overline">
            {v.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {v.content}
          </Typography>
          <Divider />
        </div>
      ))}
    </>
  );
}
