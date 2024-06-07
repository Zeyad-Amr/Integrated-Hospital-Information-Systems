import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ComponentType, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomizedDialog from "./CustomizeDialog";
import { CustomDataTable, HeaderItem } from "./CustomDataTable";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { FilterQuery } from "@/core/api";
import { useAppDispatch } from "@/core/state/store";
import { Box } from "@mui/system";
import ConfirmationDialog from "./ConfirmationDialog";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", transform: "rotate(180deg)" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface AccordionComponentProps {
  title: string;
  FormComponent: ComponentType<any>;
  tableHeader: HeaderItem[];
  tableList: any;
  getListThunk: (filters: FilterQuery[]) => any;
  deleteThunk: (id: string) => any;
}

export default function CustomizedExaminationAccordion({
  title,
  FormComponent,
  tableList,
  tableHeader,
  getListThunk,
  deleteThunk,
}: AccordionComponentProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [tableItemData, setTableItemData] = useState<any>();
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const updatedTableHeader: HeaderItem[] = [
    ...tableHeader,
    {
      id: "update",
      key: "update",
      label: "",
      isComponent: true,
      minWidth: 100,
      tableCellProps: { align: "right" },
      sortable: false,
      filterable: false,
      searchable: false,
      onClick: () => {},
    },
  ];

  return (
    <>
      <Accordion
        expanded={expandedAccordion}
        onChange={() => setExpandedAccordion(!expandedAccordion)}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{title}</Typography>
          <AddCircleOutlineIcon
            sx={{
              position: "absolute",
              zIndex: 999,
              right: "0.7rem !important",
            }}
            onClick={(event) => {
              event.stopPropagation();
              setIsDialogOpen(true);
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <CustomDataTable
            fetchData={(filters: FilterQuery[]) => {
              dispatch(getListThunk(filters));
            }}
            resetControls={tableList?.isInitial}
            totalItems={tableList?.total}
            data={tableList?.items?.map((item: any) => {
              return {
                ...item,
                update: (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      color: "primary.dark",
                    }}
                  >
                    <EditRoundedIcon
                      sx={{ cursor: "pointer" }}
                      // onClick={() => {
                      //   setshowRoomForm(true);
                      //   setIsEditRoomForm(true);
                      //   setRoomData({
                      //     id: item.id,
                      //     name: item.name,
                      //     location: item.location,
                      //   });
                      // }}
                    />
                    <DeleteRoundedIcon
                      sx={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        setTableItemData(item);
                        setShowConfirmationDialog(true);
                      }}
                    />
                  </Box>
                ),
              };
            })}
            headerItems={updatedTableHeader}
            height="75vh"
          />
        </AccordionDetails>
      </Accordion>
      <ConfirmationDialog
        confirmFunction={async () =>
          dispatch(deleteThunk(String(tableItemData?.id))).then(() => {
            setShowConfirmationDialog(false);
          })
        }
        contentMessage="في حالة حذف العنصر لن تستطيع العود اليه مجددا, هل انت متأكد من حذف هذا العنصر "
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="حذف عنصر"
      />
      <CustomizedDialog
        title="اضافة عنصر"
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        maxWidth={"md"}
      >
        <FormComponent setshowRoomForm={setIsDialogOpen} />
      </CustomizedDialog>
    </>
  );
}
