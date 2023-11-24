import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/core/redux/store";
import { AuthState } from "../controllers/types";
import { login, getMe } from "../controllers/thunks/auth-thunks";
import LoginUserEntity from "../../domain/entities/login-user-entity";
const Test = () => {
  const dispatch = useAppDispatch();
  const authState: AuthState = useAppSelector((state: any) => state.auth);

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
              new LoginUserEntity({
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

      <Typography>
        {authState.loading ? (
          <div>Loading...</div>
        ) : (
          <div
            style={{
              margin: "10px",
              width: "80vw",
              textAlign: "end",
            }}
          >
            {JSON.stringify(authState.me)}
          </div>
        )}
      </Typography>
    </Box>
  );
};

export default Test;
