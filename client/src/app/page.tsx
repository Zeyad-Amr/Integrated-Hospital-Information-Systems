"use client";

import TestPage from "@/core/shared/components/test";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
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
    </Box>
  );
}
