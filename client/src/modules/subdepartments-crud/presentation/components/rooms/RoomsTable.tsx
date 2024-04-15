import { DataItem, header } from '@/app/test/components/table/data';
import { FilterQueryParam } from '@/core/api';
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable';
import PopUp from '@/core/shared/components/PopUp';
import EmployeeInterface from '@/modules/employees/domain/interfaces/employee-interface';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import RoomsForm from './RoomsForm';

const dummyRooms = [
    {
        name: "غرفة 1 ",
        description: "تجربة تجربة تجربة",
    },
    {
        name: "غرفة 2 ",
        description: "تجربة ",
    },
]

interface dummyRooms {
    name: string;
    description: string;
}

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
        id: "description",
        label: "الــوصف",
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
    const [showDialog, setShawDialog] = useState("none");
    return (
        <>
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة غــرقة"
            >
                <RoomsForm edit propsIntialValues={{
                    name: "غرفة 2 ",
                    description: "تجربة ",
                }} />
            </PopUp>
            <CustomDataTable
                applyFilters={(filters: FilterQueryParam[]) => {
                    console.log(filters);
                }}
                data={dummyRooms.map(
                    (item: dummyRooms) => {
                        return {
                            name: item.name ?? "",
                            description: item.description ?? "",
                            update: (
                                <Button
                                    color="info"
                                    variant="outlined"

                                    onClick={() => {
                                        setShawDialog("block");
                                    }}
                                >
                                    تعديل بيانات
                                </Button>
                            ),
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