import React from "react";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";

const AmbCarNum = () => {
  const handleFormSchema = Yup.object({
    numOfPatients: Yup.number().required("يجب إدخال عدد المرضى"),
    comeFromNum: Yup.number().required("يجب إدخال جهة القدوم"),
    comeFromString: Yup.string().required("يجب إدخال جهة القدوم"),
  });

  const handleKeyDown = (id: string, key: number, value: any) => {
    let x: number = parseInt(id);
    if (parseInt(id) < 5) {
      switch (key) {
        case 13: // Enter
          x = parseInt(id) + 1;
          break;
        case 8: // Backspace
          value.length === 0 ? (x = parseInt(id) - 1) : (x = parseInt(id));
          break;
        default:
          break;
      }
    }
    document.getElementById(`${x}`)?.focus();
  };

  return (
    <Box sx={{ width: "25rem", userSelect: "none" }}>
      <Grid container spacing={2} columns={6}>
        <Grid item lg={1} xs={1}>
          <TextField
            id="1"
            inputProps={{ maxLength: 1 }}
            sx={{ textAlign: "center" }}
            required
            onChange={(e) =>
              handleChange(e.target.id, e.keyCode, e.target.value)
            }
            onKeyDown={(e) =>
              handleKeyDown(e.target.id, e.keyCode, e.target.value)
            }
          ></TextField>
        </Grid>
        <Grid item lg={1} xs={1}>
          <TextField
            id="2"
            inputProps={{ maxLength: 1 }}
            sx={{ textAlign: "center" }}
            required
            onChange={(e) =>
              handleChange(e.target.id, e.keyCode, e.target.value)
            }
            onKeyDown={(e) =>
              handleKeyDown(e.target.id, e.keyCode, e.target.value)
            }
          ></TextField>
        </Grid>
        <Grid item lg={1} xs={1}>
          <TextField
            id="3"
            inputProps={{ maxLength: 1 }}
            sx={{ textAlign: "center" }}
            onChange={(e) =>
              handleChange(e.target.id, e.keyCode, e.target.value)
            }
            onKeyDown={(e) =>
              handleKeyDown(e.target.id, e.keyCode, e.target.value)
            }
          ></TextField>
        </Grid>
        <Grid item lg={3} xs={3}>
          <TextField
            id="4"
            inputProps={{ maxLength: 4 }}
            sx={{ textAlign: "center" }}
            required
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            onKeyDown={(e) =>
              handleKeyDown(e.target.id, e.keyCode, e.target.value)
            }
          ></TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AmbCarNum;
