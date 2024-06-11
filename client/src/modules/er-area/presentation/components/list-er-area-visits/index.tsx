import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import ErAreaForm from "../er-area-form/ErAreaForm";
import { Endpoints } from "@/core/api";
import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import EventSource from "eventsource";
import { CustomDataTable } from "@/core/shared/components/CustomDataTable";

const ERVisitsTable = () => {
  // useRef
  const refPatientData = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState(false);
  const [streamedData, setStreamedData] = useState<any>();
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
      Endpoints.devBase + Endpoints.erArea.streaming,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    eventSourceRef.current = eventSource;
    eventSource.onmessage = (ev) => {
      let data_json = JSON.parse(ev.data);
      setStreamedData(data_json);
    };
  }, []);

  const timePassed = (startDate: string | number | Date) => {
    startDate = new Date(startDate);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - startDate.getTime();

    // Convert milliseconds to minutes
    const minutesPassed = Math.floor(timeDifference / (1000 * 60));

    // Calculate hours and remaining minutes
    const hours = Math.floor(minutesPassed / 60);
    const remainingMinutes = minutesPassed % 60;

    // Format the result as "hours:minutes"
    const formattedResult = `${hours < 10 ? "0" : ""}${hours}:${
      remainingMinutes < 10 ? "0" : ""
    }${remainingMinutes}`;

    return formattedResult;
  };
  const getColorBasedOnTime = (startDate: string | number | Date) => {
    startDate = new Date(startDate);
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - startDate.getTime();

    // Convert milliseconds to minutes
    const minutesPassed = Math.floor(timeDifference / (1000 * 60));
    if (minutesPassed < 30) {
      return "green";
    } else if (minutesPassed >= 30 && minutesPassed < 120) {
      return "#FFA700";
    } else {
      return "red";
    }
  };
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
    let apiData: any[] = streamedData?.items ?? [];
    let newTableData: DataItem[] = [];
    apiData.forEach((item) => {
      newTableData.push({
        id: item?.code,
        sequenceNumber: (
          <Box sx={{
            borderLeft:`0.25rem solid ${
              item?.patient?.person?.gender?.value == "ذكر" ? "aqua" : "pink"
                          }  !important`
          }} fontWeight={600}>
            {item?.sequenceNumber}
          </Box>
        ),
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
        watingTime: (
          <Box color={getColorBasedOnTime(item?.createdAt)} fontWeight={600}>
            {timePassed(item?.createdAt)}
          </Box>
        ),
      });
    });

    setTableData(newTableData);
  }, [streamedData]);

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <CustomDataTable
        data={tableData}
        headerItems={header}
        stickyHeader={true}
        boxShadow={5}
         fetchData={()=>{}}
         totalItems={streamedData?.total ?? 0}  
               // rowProps={{
        //   onDoubleClick: (event) => {
        //     refPatientData.current =
        //       event.currentTarget.getAttribute("data-row") &&
        //       JSON.parse(
        //         event.currentTarget.getAttribute("data-row") as string
        //       );
        //     setShawDialog(true);
        //   },
        // }}
      />
      <ErAreaForm
        openDialog={showDialog}
        setOpenDialog={setShawDialog}
        patientData={refPatientData.current}
      />
    </Box>
  );
};

export default ERVisitsTable;
