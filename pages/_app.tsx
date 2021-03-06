import "../styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import Navbar from "../common/navbar";

import type { AppProps } from "next/app";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "../state/store";
import { useAppDispatch, useAppSelector } from "../state/dispatch";
import { closeSnackbar, selectSnackbar } from "../state/snackbar";
import { loadOpportunities, selectOpportunities } from "../state/opportunities";
import { PersistGate } from "redux-persist/integration/react";

function WrappedApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const { open, message, type } = useAppSelector(selectSnackbar);
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };
  const opportunities = useAppSelector(selectOpportunities);
  useEffect(() => {
    if (opportunities.state === "not-asked") {
      dispatch(loadOpportunities());
    }
  }, [dispatch, opportunities]);

  return (
    <>
      <div className="container">
        <Head>
          <title>/CRM/</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Navbar />
        </header>

        <main>
          <Box sx={{ height: "100%", width: "100%" }}>
            <Component {...pageProps} />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={type}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </Box>
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className="logo">
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
      <style jsx>{`
        header {
          flex: 0 0 auto;
          width: 100%;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        main {
          flex: 1;
          min-height: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          flex: 0 0 auto;
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }

        .logo {
          height: 1em;
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
}

function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <WrappedApp {...props} />
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
