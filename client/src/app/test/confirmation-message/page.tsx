"use client";

import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import LoadingService from "@/core/shared/utils/loading-service";
import { Button } from "@mui/material";
import { useState } from "react";


const Test = () => {   
  const [open, setOpen] = useState(false)
  return (
    <div>
      confirmation message
     <ConfirmationDialog  contentMessage="هل انت متأكد من حذف هذا العنصر؟" open={open} setOpen={setOpen} title="حذف العنصر"  />
     <Button onClick={() => setOpen(true)}>
    فتح رساله التاكيد
     </Button>
    </div>
  );
};

export default Test;
