import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/core/redux/store";
import { AuthState } from "../controllers/types";
import { login, getMe } from "../controllers/thunks/auth-thunks";
import AuthDataEntity from "../../domain/entities/auth-data-entity";
import { useEffect } from "react";
const Test = () => {
  const dispatch = useAppDispatch();
  const authState: AuthState = useAppSelector((state: any) => state.auth);

  // one time after first render call dispatch
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          console.log("Login");
          dispatch(
            login(
              new AuthDataEntity({
                username: "Admin123",
                password: "Admin1234",
              })
            )
          );
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          dispatch(getMe());
        }}
      >
        Get Me
      </Button>

      <Typography
        sx={{
          margin: "10px",
          width: "80vw",
          textAlign: "end",
        }}
      >
        {authState.loading
          ? "Loading..."
          : authState.error.length > 0
          ? authState.error
          : authState.me.id}
      </Typography>
    </Box>
  );
};

export default Test;
