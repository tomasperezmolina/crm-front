import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { persistor } from "../state/store";

export default function Navbar() {
  const { data: session } = useSession({required: false});
  useEffect(() => {
    console.log(session);
  }, [session]);
  const router = useRouter();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchor);
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handleLoginClick = () => {
    signIn();
  };
  const handleLogoutClick = () => {
    signOut({callbackUrl: '/'});
    router.push("/login");
  };
  const handleOpportunityClick = () => {
    handleClose();
    router.push("/opportunity");
  };
  const handleArchiveClick = () => {
    handleClose();
    router.push('/opportunity/archive');
  };
  const handleReset = () => {
    persistor.purge();
    window.location.reload();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {session && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleOpportunityClick}>Oportunidades</MenuItem>
            <MenuItem onClick={handleArchiveClick}>Archivadas</MenuItem>
            <MenuItem onClick={handleReset}>Borrar datos (DEBUG)</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Cerrar sesión</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            /CRM/
          </Typography>
          {(!session && router.pathname !== '/login') && (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
