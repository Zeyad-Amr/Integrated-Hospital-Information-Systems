"use client";

import ConfirmationDialog from "@/core/shared/components/ConfirmationDialog";
import { Button } from "@mui/material";
import { useState } from "react";

const Test = () => {
  const [open, setOpen] = useState(false);
  const testFunction = () => {
    console.log("testttt");
  };
  return (
    <div>
      confirmation message
      <ConfirmationDialog
        confirmFunction={testFunction}
        contentMessage="هل انت متأكد من حذف هذا العنصر؟"
        open={open}
        setOpen={setOpen}
        title="حذف العنصر"
      />
      <Button onClick={() => setOpen(true)}>فتح رساله التاكيد</Button>
    </div>
  );
};

export default Test;
