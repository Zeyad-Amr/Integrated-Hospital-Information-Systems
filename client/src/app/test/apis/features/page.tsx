"use client";

import { useAppDispatch } from "@/core/state/store";
import { createFeature , deleteFeature , getFeatureDetails ,getFeaturesList , updateFeature } from "@/modules/subdepartments-crud/presentation/controllers/thunks/features-thunks";
import { Button } from "@mui/material";


const Test = () => {   
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>
      test features apis
      </h3>
      <div>
      <Button onClick={async () => dispatch(
        createFeature({
          name : 'features post 2 testtt',
          subDepartmentId : 1,
        })
      )}>Create feature</Button>
      
      <Button onClick={async () => dispatch(
        deleteFeature('1')
      )}>Delete feature</Button>

      <Button onClick={async () => dispatch(
        updateFeature({
          id : 2,
          name : 'feature update testtt',
          subDepartmentId : 1,
        })
      )}>Update feature</Button>

      <Button onClick={async () => dispatch(
        getFeatureDetails('2')
      )}>Get feature By Id</Button>

      <Button onClick={async () => dispatch(
        getFeaturesList()
      )}>Get All features</Button>
      </div>
    </div>
  );
};

export default Test;
