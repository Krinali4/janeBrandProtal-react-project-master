import * as React from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Strings from "../../../core/utils/Strings";

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }: any) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#ffff",
    backgroundColor: selectedColor,
    fontFamily: 'League Spartan, sans-serif',
    fontWeight: "600",
  },
}));

export default function ToggleBtn(props: any) {
  const [alignment, setAlignment] = React.useState("Points");
  const handleAlignment = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
    props.getValue(newAlignment);
  };

  return (
    <Box width={props.ToggleBtnWidth} justifyContent="center">
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        sx={{
          border: "2px solid #2E7CF6",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        <ToggleButton
          value="Points"
          sx={{
            color: "#2E7CF6",
            width: "50%",
            fontWeight: "500",
            fontSize: "16px",
            textTransform:"capitalize",
            "&.Mui-selected, &.Mui-selected:hover": {
              color: "#ffff",
              fontSize: "16px",
              backgroundColor: "#2E7CF6",
              fontFamily: 'League Spartan, sans-serif',
              fontWeight: "500",
            },
          }}
        >
          {Strings.POINTS}
        </ToggleButton>
        <ToggleButton
          value="Coupons"
          sx={{
            color: "#2E7CF6",
            width: "50%",
            fontWeight: "500",
            fontSize: "16px",
            textTransform:"capitalize",
            "&.Mui-selected, &.Mui-selected:hover": {
              color: "#ffff",
              fontSize: "16px",
              backgroundColor: "#2E7CF6",
              fontFamily: 'League Spartan, sans-serif',
              fontWeight: "500",
              marginLeft: '0px',
            },
          }}
        >
          {Strings.COUPONS}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
