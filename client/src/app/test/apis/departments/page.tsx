"use client";

import { useAppDispatch } from "@/core/state/store";
import { getDepartmentsList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/departments-thunks";
import { Button } from "@mui/material";


const Test = () => {   
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>
      test departments apis
      </h3>
      <div>
      <Button onClick={async () => dispatch(
        getDepartmentsList()
      )}>Get All Departments</Button>
      </div>
    </div>
  );
};

export default Test;
