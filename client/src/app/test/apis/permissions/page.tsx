"use client";

import { useAppDispatch } from "@/core/state/store";
import { createPermission , deletePermission , getPermissionDetails , getPermissionsList , updatePermission } from "@/modules/subdepartments-crud/presentation/controllers/thunks/permissions-thunks";
import { Button } from "@mui/material";


const Test = () => {   
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>
      test permissions apis
      </h3>
      <div>
      <Button onClick={async () => dispatch(
        createPermission({
          featureId : 4,
          subdepartmentId : 1,
          roleId : 1,
        })
      )}>Create permission</Button>
      
      <Button onClick={async () => dispatch(
        deletePermission('1')
      )}>Delete permission</Button>

      <Button onClick={async () => dispatch(
        updatePermission({
          id : 2,
          featureId : 1,
          subdepartmentId : 1,
          roleId : 1,
        })
      )}>Update permission</Button>

      <Button onClick={async () => dispatch(
        getPermissionDetails('2')
      )}>Get permission By Id</Button>

      <Button onClick={async () => dispatch(
        getPermissionsList()
      )}>Get All permissions</Button>
      </div>
    </div>
  );
};

export default Test;
