import { DataItem, header } from "./data";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import ErAreaForm from "../er-area-form/ErAreaForm";
import { Endpoints, FilterQuery } from "@/core/api";
import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import EventSource from "eventsource";
import { CustomDataTable } from "@/core/shared/components/CustomDataTable";
import { Button } from "@mui/material";

const ERVisitsTable = () => {
  // useRef
  const refPatientData = useRef("");

  // useState
  const [showDialog, setShawDialog] = useState(false);
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
        Endpoints.erArea.streaming +
        "?filters=status:like:BOOKED",
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
    let apiData: any[] = streamedData ?? [];
    let newTableData: DataItem[] = [];
    apiData.forEach((item) => {
      newTableData.push({
        id: item?.code,
        sequenceNumber: item?.sequenceNumber,
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
        assessment: (
          <Button
            color="info"
            variant="outlined"
            fullWidth
            onClick={() => {
              console.log(item);
              // refPatientData.current = item ?? "";
              // console.log(refPatientData.current);
              // if (refPatientData.current) setShawDialog(true);
            }}
          >
            التقييم
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
        onRowClick={(item) => {
          refPatientData.current = item;
          console.log(refPatientData.current);
          if (refPatientData.current) setShawDialog(true);
        }}
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
