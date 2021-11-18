import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React from "react";
import EditIcon from "@mui/icons-material/Create";

interface InfoTableRow {
  title: string;
  content: string;
}

interface InfoTableProps {
  title: string;
  titleVariant: Variant;
  rows: InfoTableRow[];
  onEdit?: (() => void) | false;
}

export function InfoTable({
  title,
  titleVariant,
  rows,
  onEdit,
}: InfoTableProps) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant={titleVariant} gutterBottom>
            {title}
          </Typography>
        </Grid>
        {onEdit && (
          <Grid item>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <Divider />
      {rows.map((v, idx) => (
        <div key={idx}>
          <Typography variant="overline">{v.title}</Typography>
          <Typography variant="body1" gutterBottom>
            {v.content}
          </Typography>
          <Divider />
        </div>
      ))}
    </>
  );
}
