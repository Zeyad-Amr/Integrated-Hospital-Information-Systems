"use client";

import { useAppDispatch } from "@/core/state/store";
import {
  createSpecialization,
  deleteSpecialization,
  getSpecializationDetails,
  getSpecializationList,
  updateSpecializations,
} from "@/modules/subdepartments-crud/presentation/controllers/thunks/specialization-thunks";
import { Button } from "@mui/material";

const Test = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>test specializations apis</h3>
      <div>
        <Button
          onClick={async () =>
            dispatch(
              createSpecialization({
                name: "specializations 1 testtt",
                description: "End of corridor",
              })
            )
          }
        >
          Create specialization
        </Button>

        <Button onClick={async () => dispatch(deleteSpecialization("3"))}>
          Delete specialization
        </Button>

        <Button
          onClick={async () =>
            dispatch(
              updateSpecializations({
                id: "2",
                name: "test updated",
                description: "End of corridor",
              })
            )
          }
        >
          Update Room
        </Button>

        <Button onClick={async () => dispatch(getSpecializationDetails("4"))}>
          Get specialization By Id
        </Button>

        <Button onClick={async () => dispatch(getSpecializationList())}>
          Get All specializations
        </Button>
      </div>
    </div>
  );
};

export default Test;
