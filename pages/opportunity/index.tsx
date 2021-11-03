import type { NextPage } from "next";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import { OpportunityInfo, StepType } from "../../model/opportunity";
import { stepTypeToSpanish } from "../../spanish/opportunity";
import { grey } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../state/dispatch";
import {
  loadOpportunities,
  selectOpportunities,
} from "../../state/opportunities";
import { RemoteData } from "../../model/remote-data";
import { Identifiable } from "../../model/base";

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
}

const states: State[] = [
  {
    name: "Prospect",
    color: "hsla(160, 62%, 50%, 1)",
  },
  {
    name: "First meeting",
    color: "hsla(24, 69%, 50%, 1)",
  },
  {
    name: "Development",
    color: "hsla(59, 98%, 50%, 1)",
  },
  {
    name: "POC development",
    color: "hsla(183, 94%, 50%, 1)",
  },
  {
    name: "POC implementation",
    color: "hsla(287, 95%, 50%, 1)",
  },
  {
    name: "Negotiation",
    color: "hsla(359, 100%, 50%, 1)",
  },
];

const clients: Client[][] = [
  Array(5)
    .fill(0)
    .map(() => ({
      name: "whatever",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
    })),
  Array(1)
    .fill(0)
    .map(() => ({
      name: "whatever",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
    })),
  Array(4)
    .fill(0)
    .map(() => ({
      name: "whatever",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
    })),
  Array(2)
    .fill(0)
    .map(() => ({
      name: "whatever",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
    })),
  Array(3)
    .fill(0)
    .map(() => ({
      name: "whatever",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
    })),
  Array(3)
    .fill(0)
    .map(() => ({
      name: "whatever",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et blandit purus, non lacinia neque. Nullam quis aliquam lorem. Donec a volutpat risus, quis finibus tellus. Aenean id posuere turpis, eget iaculis est.",
    })),
];

interface SkeletonCardProps {
  color: string;
  animation?: "pulse" | "wave" | false;
}

function SkeletonCard({ color, animation }: SkeletonCardProps) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <Skeleton animation={animation} />
          </Typography>
          <Box sx={{ height: "3px", bgcolor: color, marginBottom: 2 }} />
          <Typography variant="body2">
            <Skeleton animation={animation} />
            <Skeleton animation={animation} />
            <Skeleton animation={animation} />
            <Skeleton animation={animation} />
            <Skeleton animation={animation} />
            <Skeleton animation={animation} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

interface OpportunityCardProps {
  onClick: () => void;
  color: string;
  client: Client;
}

function OpportunityCard({ client, color, onClick }: OpportunityCardProps) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {client.name}
          </Typography>
          <Box
            sx={{
              height: "3px",
              bgcolor: color,
              marginBottom: 2,
            }}
          />
          <Typography variant="body2">{client.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function renderOpportunities(
  stage: State,
  opportunities: RemoteData<string, (OpportunityInfo & Identifiable)[]>,
  onClick: (id: number) => void
) {
  if (opportunities.state === "loading") {
    return Array(5)
      .fill(0)
      .map((_, idx) => (
        <SkeletonCard key={idx} color={stage.color} animation="wave" />
      ));
  } else if (opportunities.state === "success") {
    return opportunities.value
      .filter((o) => o.step === stage.name)
      .map((o, idx) => (
        <OpportunityCard
          key={idx}
          onClick={() => onClick(o.id)}
          color={stage.color}
          client={{ name: o.name, description: o.notes }}
        />
      ));
  }
}

const Opportunities: NextPage<OpportunitiesProps> = () => {
  const opportunities = useAppSelector(selectOpportunities);
  const paddingX = 30;
  const router = useRouter();
  return (
    <>
      <Grid sx={{ height: "inherit" }} container direction="column">
        <Grid
          item
          paddingTop={2}
          paddingX={paddingX}
          sx={{ boxShadow: 3, zIndex: 2 }}
        >
          <Grid item>
            <Box sx={{ position: "relative" }}>
              <Typography variant="h4" align="center" gutterBottom>
                Oportunidades
              </Typography>
              <Button
                onClick={() => router.push("/opportunity/new")}
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
                <Typography align="center">
                  {stepTypeToSpanish(s.name)}
                </Typography>
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
              {renderOpportunities(s, opportunities, (id) => router.push(`opportunity/${id}`))?.map((elem, elIdx) => (
                <Grid item key={elIdx}>
                  {elem}
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
