import type { NextPage } from "next";
import React, { useEffect } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { programTypes } from "../model/opportunity";
import { grey } from "@mui/material/colors";
import { loadIndicators, selectIndicators } from "../state/indicators";
import { useAppDispatch, useAppSelector } from "../state/dispatch";

const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});

interface IndicatorProps {
  title: string;
  value: number;
}

interface PercentageIndicatorProps extends IndicatorProps {
  segmentStops: number[];
  segmentColors: string[];
}

function PercentageIndicator({
  title,
  value,
  segmentStops,
  segmentColors,
}: PercentageIndicatorProps) {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item>
            <Box sx={{ height: "160px", width: "300px" }}>
              <ReactSpeedometer
                value={Math.round(value * 10) / 10}
                minValue={0}
                maxValue={100}
                segments={segmentStops.length - 1}
                customSegmentStops={segmentStops}
                segmentColors={segmentColors}
                currentValueText="${value}%"
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

interface NumberIndicatorProps extends IndicatorProps {
  prefix?: string;
  unit?: string;
  size: "big" | "medium";
}

function NumberIndicator({
  title,
  value,
  prefix,
  unit,
  size,
}: NumberIndicatorProps) {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                height: "160px",
                width: "300px",
                display: "flex",
                placeContent: "center center",
                flexDirection: "column",
              }}
            >
              <Typography variant={size === "big" ? "h1" : "h2"} align="center">
                {prefix} {value}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ opacity: unit ? 1 : 0 }}
              >
                {unit}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const Home: NextPage = () => {
  const indicators = useAppSelector(selectIndicators);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadIndicators());
  }, [dispatch]);
  return (
    <>
      {indicators.state === "success" && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{
            height: "inherit",
            paddingX: 30,
            bgcolor: grey[300],
            overflowY: "scroll",
          }}
        >
          <Grid
            item
            container
            direction="row"
            spacing={2}
            columns={4}
            justifyContent="center"
          >
            <Grid item>
              <PercentageIndicator
                value={indicators.value.firstMeetingConversion}
                title="Conversión: Contactado - Vinculado"
                segmentStops={[0, 25, 50, 75, 100]}
                segmentColors={["red", "yellow", "#99DD00", "#66CC00"]}
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.developmentConversion}
                title="Conversión: Primera Reunión - Desarrollo"
                segmentStops={[0, 35, 70, 100]}
                segmentColors={["red", "yellow", "#99DD00"]}
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.pocConversion}
                title="Conversión: Desarrollo - POC"
                segmentStops={[0, 40, 80, 100]}
                segmentColors={["red", "yellow", "#A3E000"]}
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.negotiationConversion}
                title="Aprobación de POC"
                segmentStops={[0, 40, 80, 100]}
                segmentColors={["red", "yellow", "#A3E000"]}
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.doneConversion}
                title="Negocios concretados"
                segmentStops={[0, 25, 50, 75, 100]}
                segmentColors={["#FF0000", "#FF5500", "#FFAA00", "#FFFF00"]}
              />
            </Grid>
            <Grid item>
              <NumberIndicator
                value={indicators.value.performanceSDR}
                title="Rendimiento SDR"
                unit="Leads / mes"
                size="big"
              />
            </Grid>
            {programTypes.map((pt, idx) => (
              <Grid item key={idx}>
                <NumberIndicator
                  value={indicators.value.productsSold[pt]}
                  title={`Cantidad de ${pt} vendidos`}
                  size="big"
                  unit="Unidades"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
