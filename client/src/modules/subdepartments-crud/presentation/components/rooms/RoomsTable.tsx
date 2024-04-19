import { FilterQueryParam } from '@/core/api';
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable';
import PopUp from '@/core/shared/components/PopUp';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RoomsForm from './RoomsForm';
import RoomInterface from '@/modules/subdepartments-crud/domain/interfaces/room-interface';
import { createRoom ,deleteRoom ,getRoomDetails ,getRoomList ,updateRoom } from "@/modules/subdepartments-crud/presentation/controllers/thunks/room-thunks";
import { useAppDispatch, useAppSelector } from '@/core/state/store';
import { RoomState } from '../../controllers/types';


const roomsTableHeader: HeaderItem[] = [
    {
        id: "name",
        label: "الأســـم",
        minWidth: 50,
        maxWidth: 50,
        tableCellProps: { align: "right" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "location",
        label: "الموقع",
        minWidth: 50,
        maxWidth: 50,
        tableCellProps: { align: "right" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "update",
        label: "تعديل",
        isComponent: true,
        minWidth: 100,
        tableCellProps: { align: "right" },
        sortable: false,
        filterable: false,
        searchable: false,
        onClick: () => { },
    },
]

const RoomsTable = () => {
    const dispatch = useAppDispatch();
    const [showDialog, setShawDialog] = useState("none");
    const [roomData, setRoomData] = useState<RoomInterface>();
    
    useEffect(() => {
        dispatch(getRoomList())
    }, [])

   const handleShowDialog = (showDialog : 'none' | 'display') => {
    setShawDialog(showDialog)
   }
    
    const roomState : RoomState = useAppSelector((state: any) => state.rooms);

    return (
        <>
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة غــرقة"
            >
                <RoomsForm edit setShawDialog={handleShowDialog} propsIntialValues={roomData} />
            </PopUp>
            <CustomDataTable
                applyFilters={(filters: FilterQueryParam[]) => {
                    console.log(filters);
                }}
                data={roomState?.roomList?.map(
                    (item: RoomInterface) => {
                        return {
                            name: item.name ?? "",
                            location: item.location ?? "",
                            update: (
                                <>
                                <Button
                                    color="info"
                                    variant="outlined"

                                    onClick={() => {
                                        setShawDialog("block");
                                        setRoomData({
                                            id : item.id,
                                            name : item.name,
                                            location : item.location,
                                        })
                                    }}
                                >
                                    تعديل بيانات
                                </Button>
                                <Button
                                color="info"
                                variant="outlined"

                                onClick={async () => {
                                    dispatch(deleteRoom(String(item.id)));
                                    dispatch(getRoomList())
                                }}
                            >
                                 حذف
                            </Button>
                            </>
                            ),
                            // delete: (
                            //     <Button
                            //         color="info"
                            //         variant="outlined"

                            //         onClick={async () => {
                            //             dispatch(deleteRoom(String(item.id)));
                            //         }}
                            //     >
                            //          حذف
                            //     </Button>
                            // ),
                        };
                    }
                )}
                width="100%"
                height="100%"
                boxShadow={10}
                sx={{ mb: 5 }}
                onRowClick={(item) => console.log(item)}
                headerItems={roomsTableHeader}
                stickyHeader={true} />
        </>
    )
}

export default RoomsTable