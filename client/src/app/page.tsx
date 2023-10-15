"use client";

import TestPage from "@/core/shared/components/test";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ApiClient, Endpoints } from "@/core/api";
// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TestPage label="Hello, My Team" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Go to Dashboard
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          console.log("Test API Client");

          try {
            const getData = await ApiClient.get(Endpoints.staff.details, {
              pathVariables: { id: "e63855f2-26b9-485e-8f30-e918728b15ef0" },
            });
            console.log(getData);
            // Handle success and process the data
          } catch (error) {
            // Handle the error, e.g., display an error message or perform error-specific actions
            console.log(error);
          }
        }}
      >
        Test API Client
      </Button>
    </Box>
  );
}
