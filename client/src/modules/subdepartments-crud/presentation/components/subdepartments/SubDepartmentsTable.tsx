import { DataItem, header } from '@/app/test/components/table/data';
import { FilterQueryParam } from '@/core/api';
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable';
import PopUp from '@/core/shared/components/PopUp';
import EmployeeInterface from '@/modules/employees/domain/interfaces/employee-interface';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react'
import SubDepartmentsForm from './SubDepartmentsForm';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const dummySubDepartments = [
    {
        name: 'بولي تروما',
        department: 'طوارئ',
        room: '2',
        specialization: 'تشخيص',
        features: '000'
    },
    {
        name: 'Triage A',
        department: 'طوارئ',
        room: '3',
        specialization: 'باطنة',
        features: '000'
    },
]
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
interface dummySubDepartments {
    name: string;
    department: string;
    room: string;
    specialization: string;
    features: string;
}

const SubDepartmentsTableHeader: HeaderItem[] = [
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
        id: "department",
        label: "القســـم",
        minWidth: 50,
        maxWidth: 50,
        tableCellProps: { align: "right" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "room",
        label: "الغـــرفة",
        minWidth: 50,
        maxWidth: 50,
        tableCellProps: { align: "right" },
        sortable: true,
        filterable: true,
        searchable: true,
        onClick: () => { },
    },
    {
        id: "specialization",
        label: "التخصص",
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
        label: "",
        isComponent: true,
        minWidth: 100,
        tableCellProps: { align: "right" },
        sortable: false,
        filterable: false,
        searchable: false,
        onClick: () => { },
    },
]

const SubDepartmentsTable = () => {
    const [showDialog, setShawDialog] = useState("none");
    return (
        <>
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة قســم فــرعي"
            >
                <SubDepartmentsForm edit propsIntialValues={{
                    name: 'Triage A',
                    department: 'طوارئ',
                    room: '3',
                    specialization: 'باطنة',
                    features: '000'
                }} />
            </PopUp>
            <CustomDataTable
                applyFilters={(filters: FilterQueryParam[]) => {
                    console.log(filters);
                }}
                data={dummySubDepartments.map(
                    (item: dummySubDepartments) => {
                        return {
                            name: item.name ?? "",
                            department: item.department ?? "",
                            room: item.room ?? "",
                            specialization: item.specialization ?? "",
                            update: (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, color: "primary.dark" }}>
                                    <PersonRoundedIcon sx={{ cursor: 'pointer' }} />
                                    <EditRoundedIcon sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setShawDialog("block");
                                        }}
                                    />
                                    <DeleteRoundedIcon sx={{ cursor: 'pointer', color: 'red' }} />
                                </Box>
                            ),
                        };
                    }
                )}
                width="100%"
                height="100%"
                boxShadow={10}
                sx={{ mb: 5 }}
                onRowClick={(item) => console.log(item)}
                headerItems={SubDepartmentsTableHeader}
                stickyHeader={true} />
        </>
    )
}

export default SubDepartmentsTable