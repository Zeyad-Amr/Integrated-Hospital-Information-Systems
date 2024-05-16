import React from "react";
import ReactDOM from "react-dom/client";
import { Box, CircularProgress } from "@mui/material";

class LoadingService {
  static activeLoaders = 0;
  static loadingElement: HTMLElement | null = null;

  static showLoading() {
    if (LoadingService.activeLoaders === 0) {
      LoadingService.loadingElement = document.createElement("div");
      document.body.appendChild(LoadingService.loadingElement);
      const root = ReactDOM.createRoot(LoadingService.loadingElement);
      root.render(
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      );
    }
    LoadingService.activeLoaders++;
  }

  static hideLoading() {
    LoadingService.activeLoaders--;
    if (LoadingService.activeLoaders === 0 && LoadingService.loadingElement) {
      const root = ReactDOM.createRoot(LoadingService.loadingElement);
      root.unmount();
      LoadingService.loadingElement.remove();
    }
  }
}

export default LoadingService;