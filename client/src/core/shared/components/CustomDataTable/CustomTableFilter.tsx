import React, { useEffect, useRef } from "react";
import { Checkbox, FormControlLabel, Box, Button, Grid } from "@mui/material";
import Popper from "@mui/material/Popper";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

interface CustomTableFilterProps {}

const CustomTableFilter = ({}: CustomTableFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [checked, setChecked] = React.useState([true, false, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1], checked[2]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked, checked[2]]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], event.target.checked]);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <FilterListRoundedIcon id="filter-icon" />
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 1000 }}
      >
        <Box
          ref={popperRef}
          sx={{
            boxShadow: "0 0 6px #00000025",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "0 2rem",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: "0.5rem 0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  label="الوظيفــة"
                  value="الوظيفــة"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1] && checked[1]}
                      indeterminate={
                        checked[0] !== checked[1] ||
                        checked[0] !== checked[2] ||
                        checked[1] !== checked[2]
                      }
                      onChange={handleChange1}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Child 1"
                    value="Child 1"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Child 2"
                    value="Child 2"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Child 3"
                    value="Child 3"
                    control={
                      <Checkbox checked={checked[2]} onChange={handleChange4} />
                    }
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: "0.5rem 0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  label="الوظيفــة"
                  value="الوظيفــة"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1] && checked[1]}
                      indeterminate={
                        checked[0] !== checked[1] ||
                        checked[0] !== checked[2] ||
                        checked[1] !== checked[2]
                      }
                      onChange={handleChange1}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Child 1"
                    value="Child 1"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Child 2"
                    value="Child 2"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Child 3"
                    value="Child 3"
                    control={
                      <Checkbox checked={checked[2]} onChange={handleChange4} />
                    }
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: "0.5rem 0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  label="الوظيفــة"
                  value="الوظيفــة"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1] && checked[1]}
                      indeterminate={
                        checked[0] !== checked[1] ||
                        checked[0] !== checked[2] ||
                        checked[1] !== checked[2]
                      }
                      onChange={handleChange1}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Child 1"
                    value="Child 1"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Child 2"
                    value="Child 2"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Child 3"
                    value="Child 3"
                    control={
                      <Checkbox checked={checked[2]} onChange={handleChange4} />
                    }
                  />
                </Box>
              </Box>
            </Grid>{" "}
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: "0.5rem 0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  label="الوظيفــة"
                  value="الوظيفــة"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1] && checked[1]}
                      indeterminate={
                        checked[0] !== checked[1] ||
                        checked[0] !== checked[2] ||
                        checked[1] !== checked[2]
                      }
                      onChange={handleChange1}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Child 1"
                    value="Child 1"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Child 2"
                    value="Child 2"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Child 3"
                    value="Child 3"
                    control={
                      <Checkbox checked={checked[2]} onChange={handleChange4} />
                    }
                  />
                </Box>
              </Box>
            </Grid>{" "}
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: "0.5rem 0.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  label="الوظيفــة"
                  value="الوظيفــة"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1] && checked[1]}
                      indeterminate={
                        checked[0] !== checked[1] ||
                        checked[0] !== checked[2] ||
                        checked[1] !== checked[2]
                      }
                      onChange={handleChange1}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <FormControlLabel
                    label="Child 1"
                    value="Child 1"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Child 2"
                    value="Child 2"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                  <FormControlLabel
                    label="Child 3"
                    value="Child 3"
                    control={
                      <Checkbox checked={checked[2]} onChange={handleChange4} />
                    }
                  />
                </Box>
              </Box>
            </Grid>{" "}
          </Grid>
        </Box>
      </Popper>
    </>
  );
};

export default CustomTableFilter;
