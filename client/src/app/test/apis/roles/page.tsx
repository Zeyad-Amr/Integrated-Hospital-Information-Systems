"use client";

import { useAppDispatch } from "@/core/state/store";
import { createRole , deleteRole , getRoleDetails , getRolesList , updateRole } from "@/modules/subdepartments-crud/presentation/controllers/thunks/roles-thunks";
import { Button } from "@mui/material";


const Test = () => {   
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>
      test roles apis
      </h3>
      <div>
      <Button onClick={async () => dispatch(
        createRole({
          value : 'تيست وظيفه جديده',
        })
      )}>Create role</Button>
      
      <Button onClick={async () => dispatch(
        deleteRole('181')
      )}>Delete role</Button>

      <Button onClick={async () => dispatch(
        updateRole({
          id : 181,
          value : 'نائب',
        })
      )}>Update role</Button>

      <Button onClick={async () => dispatch(
        getRoleDetails('181')
      )}>Get role By Id</Button>

      <Button onClick={async () => dispatch(
        getRolesList()
      )}>Get All roles</Button>
      </div>
    </div>
  );
};

export default Test;
