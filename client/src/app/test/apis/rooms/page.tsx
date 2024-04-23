"use client";

import { useAppDispatch } from "@/core/state/store";
import { createRoom ,deleteRoom ,getRoomDetails ,getRoomList ,updateRoom } from "@/modules/subdepartments-crud/presentation/controllers/thunks/room-thunks";
import { Button } from "@mui/material";


const Test = () => {   
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3>
      test room apis
      </h3>
      <div>
      <Button onClick={async () => dispatch(
        createRoom({
          name : 'Room 1 testtt',
          location : 'End of corridor'
        })
      )}>Create Room</Button>
      
      <Button onClick={async () => dispatch(
        deleteRoom('3')
      )}>Delete Room</Button>

      <Button onClick={async () => dispatch(
        updateRoom({
          id : '2',
          name : 'test updated',
          location : 'End of corridor'
        })
      )}>Update Room</Button>

      <Button onClick={async () => dispatch(
        getRoomDetails('4')
      )}>Get Room By Id</Button>

      <Button onClick={async () => dispatch(
        getRoomList()
      )}>Get All Rooms</Button>
      </div>
    </div>
  );
};

export default Test;
