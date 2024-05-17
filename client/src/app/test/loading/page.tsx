"use client";

import LoadingService from "@/core/shared/utils/loading-service";
import { Button } from "@mui/material";


const Test = () => {   
  return (
    <div>
      Loading test
     <Button onClick={() => LoadingService.showLoading() }>
      show
     </Button>
     <Button onClick={() => LoadingService.hideLoading() }>
      hide
     </Button>
    </div>
  );
};

export default Test;
