"use client";

import { useAppDispatch } from "@/core/state/store";
import { getSubDepartmentDetails , deleteSubDepartment , updateSubDepartment ,createSubDepartment ,getSubDepartmentsList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/sub-departments-thunks ";
import { Button } from "@mui/material";


const Test = () => {   
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>
      test SubDepartments apis
      </h3>
      <div>
      <Button onClick={async () => dispatch(
        createSubDepartment({
          name : 'SubDepartment 2 testtt',
          roomId : 11,
          specializationId : 4,
          departmentId : '46fcddaa-93f8-4ddc-b38e-f5854e62016e'
        })
      )}>Create SubDepartment</Button>
      
      <Button onClick={async () => dispatch(
        deleteSubDepartment('3')
      )}>Delete SubDepartment</Button>

      <Button onClick={async () => dispatch(
        updateSubDepartment({
          id : 2,
          name : 'SubDepartment 50 testtt',
          roomId : 11,
          specializationId : 4,
          departmentId : '46fcddaa-93f8-4ddc-b38e-f5854e62016e'
        })
      )}>Update SubDepartment</Button>

      <Button onClick={async () => dispatch(
        getSubDepartmentDetails('2')
      )}>Get SubDepartment By Id</Button>

      <Button onClick={async () => dispatch(
        getSubDepartmentsList()
      )}>Get All SubDepartments</Button>
      </div>
    </div>
  );
};

export default Test;
