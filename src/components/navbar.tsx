import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../thunks/userThunk";
import { RootState, AppDispatch } from "../store";
import { BiSolidLogInCircle } from "react-icons/bi";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { TiThMenu } from "react-icons/ti";

import { TiUserAdd } from "react-icons/ti";
import { endGame } from "../thunks/gameThunk";

const settings = ["Game", "Scoreboard", "Account", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const gameId: any = useSelector(
    (state: RootState) => state.gameReducer.gameId
  );

  const userToken: any = useSelector(
    (state: RootState) => state.loginReducer.token
  );
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state: RootState) => state.loginReducer.isLoggedIn
  );

  const dispatch: AppDispatch = useDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleMenuClick(setting: string): void {
    if (setting === "Account") {
      handleCloseUserMenu();
      navigate("/profile/edit");
    }
    if (setting === "Scoreboard") {
      handleCloseUserMenu();
      navigate("/scoreboard");
    }
    if (setting === "Game") {
      handleCloseUserMenu();
      navigate("/");
    }
    if (setting === "Logout") {
      handleCloseUserMenu();
      dispatch(endGame(gameId, userToken))
        .then(() => {
          // Dispatch logout only if endGame was successful
          dispatch(logout());
        })
        .catch((error) => {
          console.error("Failed to end GAME:", error); // better to display msg to user in UI, not in console.
        });
    }
  }

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(45deg, #0f0f0f, #323232, #0d7377, #14ffec)",
        marginBottom: "3rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <VideogameAssetIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MATCH3
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <VideogameAssetIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MATCH SAGA
          </Typography>

          <Box
            sx={{ flexGrow: 2.5, display: { xs: "none", md: "flex" } }}
          ></Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {isLoggedIn && <TiThMenu />}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <IconButton onClick={() => navigate("/login")}>
                <BiSolidLogInCircle
                  style={{
                    color: "white",
                    backgroundColor: "#0d7377",
                    borderRadius: "50%",
                    padding: "0.3rem",
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </IconButton>

              <Box
                sx={{ flexGrow: 0.1, display: { xs: "none", md: "flex" } }}
              ></Box>

              <IconButton onClick={() => navigate("/signup")}>
                <TiUserAdd
                  style={{
                    color: "white",
                    backgroundColor: "#0d7377",
                    borderRadius: "50%",
                    padding: "0.3rem",
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
