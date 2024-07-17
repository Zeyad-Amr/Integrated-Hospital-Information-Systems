import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Endpoints, FilterQuery } from "@/core/api";
import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import EventSource from "eventsource";
import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import { Button } from "@mui/material";
import { VisitStatus } from "@/modules/registration/domain/entities/visit-entity";
import { useRouter } from "next/navigation";
import { AuthState } from "@/modules/auth/presentation/controllers/types";
import { useAppSelector } from "@/core/state/store";

export const header: HeaderItem[] = [
  {
    filterKey: "id",
    id: "id",
    label: "رقم المريض",
    minWidth: 50,
    tableCellProps: { align: "center" },
  },
  {
    filterKey: "name",
    id: "name",
    label: "اسم المريض",
    minWidth: 100,
    tableCellProps: { align: "center" },
  },
  {
    filterKey: "mainComplaint",
    id: "mainComplaint",
    label: "الشكوى الرئيسية",
    minWidth: 50,
    tableCellProps: { align: "center" },
    showBorder: true,
  },
  {
    filterKey: "age",
    id: "age",
    label: "السن",
    minWidth: 100,
    tableCellProps: { align: "center", style: { direction: "ltr" } },
  },

  {
    filterKey: "open",
    id: "open",
    label: "",
    isComponent: true,
    minWidth: 100,
    tableCellProps: { align: "center" },
    sortable: false,
    filterable: false,
    searchable: false,
    onClick: () => {},
  },
];

const ViewVisits = () => {
  const router = useRouter();
  const authState: AuthState = useAppSelector((state: any) => state.auth);

  // useState

  const [streamedData, setStreamedData] = useState([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const eventSourceRef = useRef<any>(null);

  useEffect(() => {
    const token: string =
      SessionStorage.getDataByKey(SessionStorageKeys.token) ?? "";

    // Close the previous EventSource connection if it exists
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    let eventSource = new EventSource(
      Endpoints.base +
        Endpoints.visit.examinationVisitStreaming +
        "?filters=status:any:" +
        VisitStatus.TRANSFERED +
        "?subdepartmentId=" +
        authState.currentPermission.subDepartment.id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    eventSourceRef.current = eventSource;
    eventSource.onmessage = (ev) => {
      let data_json = JSON.parse(ev.data).items;
      setStreamedData(data_json);
    };
  }, []);

  const calcAge = (birthdate: string | number | Date) => {
    if (!birthdate) return "لا يوجد";
    birthdate = new Date(birthdate);
    const currentDate = new Date();
    const birthYear = birthdate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const age = currentYear - birthYear;

    // Check if the birthday hasn't occurred yet this year
    const birthMonth = birthdate.getMonth();
    const currentMonth = currentDate.getMonth();
    const birthDay = birthdate.getDate();
    const currentDay = currentDate.getDate();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      return age - 1; // Subtract 1 from age if birthday hasn't occurred yet this year
    } else {
      return age;
    }
  };

  //* data that in the state

  // Update tableData when streamedData changes
  useEffect(() => {
    let apiData: any[] = streamedData ?? [];
    let newTableData: any[] = [];
    apiData.forEach((item) => {
      // if (
      //   item?.transfers[item?.transfers.length - 1]?.toSubDepId !==
      //   authState.currentPermission.subDepartment.id
      // )
      newTableData.push({
        id: item?.code,
        mainComplaint: item?.mainComplaint ?? "",
        name: item?.patient?.person
          ? item.patient?.person?.firstName +
            " " +
            item.patient?.person?.secondName +
            " " +
            item.patient?.person?.thirdName +
            " " +
            item.patient?.person?.fourthName
          : "لا يوجد",
        date: item?.createdAt ? item.createdAt.split("T")[0] : undefined,
        time: new Date(item?.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        age: calcAge(item?.patient?.person?.birthDate),
        gender: item?.patient?.person?.gender?.value,
        open: (
          <Button
            color="info"
            variant="outlined"
            fullWidth
            onClick={() => {
              console.log(item);
              router.push("examination/visit/" + item?.code);
              // refPatientData.current = item ?? "";
              // console.log(refPatientData.current);
              // if (refPatientData.current) setShawDialog(true);
            }}
          >
            عرض التقرير
          </Button>
        ),
      });
    });

    setTableData(newTableData);
  }, [streamedData]);

  return (
    <Box
      sx={{
        pt: 3,
      }}
    >
      <CustomDataTable
        fetchData={(filters: FilterQuery[]) => {
          console.log(filters);
        }}
        totalItems={tableData.length}
        showPagination={false}
        showToolbar={false}
        data={tableData}
        headerItems={header}
        stickyHeader={true}
        boxShadow={5}
        rowProps={{ sx: { cursor: "pointer" } }}
        // onRowClick={(item) => {
        //   refPatientData.current = item;
        //   console.log(refPatientData.current);

        // }}
      />
    </Box>
  );
};

export default ViewVisits;
