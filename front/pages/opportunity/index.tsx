import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

interface OpportunitiesProps {
  id?: string;
}

interface Client {
  name: string;
  description: string;
}

interface State {
  name: string;
  clients: Client[];
}

const states: State[] = [
  {
    name: "Prospecto",
    clients: Array(5)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: "Primera reunión",
    clients: Array(1)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: "Desarrollo",
    clients: Array(4)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: "Desarrollo de POC",
    clients: Array(2)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: "Implementación de POC",
    clients: Array(3)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: "Negociación",
    clients: Array(3)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
];

const Opportunities: NextPage<OpportunitiesProps> = () => {
  return (
    <>
      <Grid sx={{height: 'inherit'}} container direction="column">
        <Grid item>
          <Box sx={{ position: "relative" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Oportunidades
            </Typography>
            <Button
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Nuevo prospecto
            </Button>
          </Box>
        </Grid>
        <Grid item container direction="row" columnSpacing={2}>
          {states.map((s, idx) => (
            <Grid
              container
              item
              direction="column"
              key={idx}
              xs={2}
              rowSpacing={2}
            >
              <Grid item>
                <Typography align="center">{s.name}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item sx={{ overflowY: "scroll" }} flex={1}>
          <Grid container direction="row" columnSpacing={2} paddingY={2}>
            {states.map((s, idx) => (
              <Grid
                container
                item
                direction="column"
                key={idx}
                xs={2}
                rowSpacing={2}
              >
                {s.clients.map((c, cIdx) => (
                  <Grid item key={cIdx}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5">{c.name}</Typography>
                        <Typography variant="body2">{c.description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Opportunities;
