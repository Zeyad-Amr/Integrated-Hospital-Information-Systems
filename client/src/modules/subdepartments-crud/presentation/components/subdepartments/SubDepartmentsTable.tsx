import { FilterQueryParam } from '@/core/api';
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable';
import PopUp from '@/core/shared/components/PopUp';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SubDepartmentsForm from './SubDepartmentsForm';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getSubDepartmentsList , deleteSubDepartment } from "@/modules/subdepartments-crud/presentation/controllers/thunks/sub-departments-thunks ";
import { getRoomList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/room-thunks";
import { getSpecializationList } from "@/modules/subdepartments-crud/presentation/controllers/thunks/specialization-thunks";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useAppDispatch, useAppSelector } from '@/core/state/store';
import { SubDepartmentsState } from '../../controllers/types';
import SubDepartmentsInterface from '@/modules/subdepartments-crud/domain/interfaces/sub-departments-interface';

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
    const [subDepartmentData, setSubDepartmentData] = useState<SubDepartmentsInterface>();
    const subDepartmentsState : SubDepartmentsState = useAppSelector((state: any) => state.subDepartments);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getSubDepartmentsList())
      dispatch(getRoomList())
      dispatch(getSpecializationList())
    }, [])
    
    return (
        <>
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة قســم فــرعي"
            >
                <SubDepartmentsForm edit propsIntialValues={subDepartmentData} />
            </PopUp>
            <CustomDataTable
                applyFilters={(filters: FilterQueryParam[]) => {
                    console.log(filters);
                }}
                data={subDepartmentsState?.subDepartmentsList?.map(
                    (item: SubDepartmentsInterface) => {
                        return {
                            name: item.name ?? "",
                            department: item.departmentId ?? "",
                            room: item.roomId ?? "",
                            specialization: item.specializationId ?? "",
                            update: (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, color: "primary.dark" }}>
                                    <PersonRoundedIcon sx={{ cursor: 'pointer' }} />
                                    <EditRoundedIcon sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setShawDialog("block");
                                            setSubDepartmentData(item)
                                        }}
                                    />
                                    <DeleteRoundedIcon click={async () => {dispatch(deleteSubDepartment(String(item.id)))}} sx={{ cursor: 'pointer', color: 'red' }} />
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