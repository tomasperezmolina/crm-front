import type { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import { StepType } from "../../model/opportunity";
import { stepTypeToSpanish } from "../../spanish/opportunity";
import { grey } from "@mui/material/colors";

interface OpportunitiesProps {
  id?: string;
}

interface Client {
  name: string;
  description: string;
}

interface State {
  name: StepType;
  color: string;
  clients: Client[];
}

const states: State[] = [
  {
    name: "Prospect",
    color: 'hsla(160, 62%, 50%, 1)',
    clients: Array(5)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: 'First meeting',
    color: 'hsla(24, 69%, 50%, 1)',
    clients: Array(1)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: 'Development',
    color: 'hsla(59, 98%, 50%, 1)',
    clients: Array(4)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: 'POC development',
    color: 'hsla(183, 94%, 50%, 1)',
    clients: Array(2)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: 'POC implementation',
    color: 'hsla(287, 95%, 50%, 1)',
    clients: Array(3)
      .fill(0)
      .map(() => ({
        name: "whatever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
      })),
  },
  {
    name: 'Negotiation',
    color: 'hsla(359, 100%, 50%, 1)',
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
  const paddingX = 30;
  const router = useRouter();
  return (
    <>
      <Grid sx={{ height: "inherit" }} container direction="column">
        <Grid item paddingTop={2} paddingX={paddingX} sx={{ boxShadow: 3, zIndex: 2 }}>
          <Grid item>
            <Box sx={{ position: "relative" }}>
              <Typography variant="h4" align="center" gutterBottom>
                Oportunidades
              </Typography>
              <Button
                onClick={() => router.push('/opportunity/new')}
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
            {states.map((s, idx, array) => (
              <Grid xs={2} key={idx} item sx={{ position: "relative" }}>
                <Typography align="center">{stepTypeToSpanish(s.name)}</Typography>
                {idx !== array.length - 1 && (
                  <ArrowForwardIosIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: -16,
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          bgcolor={grey[200]}
          item
          container
          sx={{ overflowY: "scroll" }}
          flex={1}
          paddingX={paddingX - 1}
          direction="row"
          columnSpacing={2}
          paddingY={2}
        >
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
                    <CardActionArea onClick={() => router.push(`opportunity/${cIdx}`)}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>{c.name}</Typography>
                        <Box sx={{height: '3px', bgcolor: s.color, marginBottom: 2}}/>
                        <Typography variant="body2">{c.description}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Opportunities;
