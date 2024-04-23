import { FilterQueryParam } from '@/core/api';
import { CustomDataTable, HeaderItem } from '@/core/shared/components/CustomDataTable';
import PopUp from '@/core/shared/components/PopUp';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SpecializationsForm from './SpecializationsForm';
import SpecializationInterface from '@/modules/subdepartments-crud/domain/interfaces/specialization -interface';
import { useAppDispatch, useAppSelector } from '@/core/state/store';
import { getSpecializationList , deleteSpecialization } from "@/modules/subdepartments-crud/presentation/controllers/thunks/specialization-thunks";
import { SpecializationState } from '../../controllers/types';


const SpecializationsTableHeader: HeaderItem[] = [
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
    {
        id: "delete",
        label: "حذف",
        isComponent: true,
        minWidth: 100,
        tableCellProps: { align: "right" },
        sortable: false,
        filterable: false,
        searchable: false,
        onClick: () => { },
    },
]

const SpecializationsTable = () => {
    const dispatch = useAppDispatch();
    const [showDialog, setShawDialog] = useState("none");
    const [specializationData, setSpecializationData] = useState<SpecializationInterface>();
    const specializationState : SpecializationState = useAppSelector((state: any) => state.specializations);

    useEffect(() => {
        dispatch(getSpecializationList())
    }, [])

    return (
        <>
            <PopUp DialogStateController={setShawDialog} display={showDialog} title="اضــافة تخصص"
            >
                <SpecializationsForm edit propsIntialValues={specializationData}/>
            </PopUp>

            <CustomDataTable
                applyFilters={(filters: FilterQueryParam[]) => {
                    console.log(filters);
                }}
                data={specializationState?.specializationList?.map(
                    (item: SpecializationInterface) => {
                        return {
                            name: item.name ?? "",
                            description: item.description ?? "",
                            update: (
                                <Button
                                    color="info"
                                    variant="outlined"

                                    onClick={() => {
                                        setShawDialog("block");
                                        setSpecializationData({
                                            id : item.id,
                                            name : item.name,
                                            description : item.description
                                        })
                                    }}
                                >
                                    تعديل بيانات
                                </Button>
                            ),
                            delete: (
                                <Button
                                    color="info"
                                    variant="outlined"

                                    onClick={async () => {
                                        dispatch(deleteSpecialization(String(item.id)))
                                    }}
                                >
                                 حذف
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
                headerItems={SpecializationsTableHeader}
                stickyHeader={true} />
        </>
    )
}

export default SpecializationsTable