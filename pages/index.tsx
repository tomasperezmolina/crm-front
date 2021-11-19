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

function PercentageIndicator({ title, value }: IndicatorProps) {
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
                value={value}
                minValue={0}
                maxValue={100}
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
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.developmentConversion}
                title="Conversión: Primera Reunión - Desarrollo"
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.pocConversion}
                title="Conversión: Desarrollo - POC"
              />
            </Grid>
            {/* <Grid item>
              <PercentageIndicator
                value={indicators.value.clientConversion}
                title="Contactos exitosos"
              />
            </Grid> */}
            <Grid item>
              <PercentageIndicator
                value={indicators.value.negotiationConversion}
                title="Aprobación de POC"
              />
            </Grid>
            <Grid item>
              <PercentageIndicator
                value={indicators.value.doneConversion}
                title="Negocios concretados"
              />
            </Grid>
            {/* <Grid item>
              <NumberIndicator
                value={Math.round(Math.random() * 100000 * 10) / 10}
                title="Costo de adquisición"
                prefix="$"
                unit="Clientes / mes"
                size="medium"
              />
            </Grid> */}
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
                <PercentageIndicator
                  value={indicators.value.productsSold[pt]}
                  title={`Cantidad de ${pt} vendidos`}
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
