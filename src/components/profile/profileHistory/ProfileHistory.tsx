import {
  NavigationProps,
  NavigationState,
} from "../../../navigation/Navigation.types";
import withRouter from "../../../withRouter";
import { Box } from "@mui/material";
import ToggleBtn from "../../common/button/ToggleBtn";
import Strings from "../../../core/utils/Strings";
import { useState } from "react";
import CouponList from "./CouponList";
import PointList from "./PointList";
interface IProps {
  router: NavigationProps;
  states: NavigationState;
}

function ProfileHistory(props: IProps) {
  const [toggleValue, setToggleValue] = useState("Points");

  return (
    <>
      <Box
        sx={{
          fontWeight: "600",
          fontSize: "18px",
          color: "#FFFFFF",
          textTransform: "capitalize",
          marginTop: "10px",
          width: "100%",
        }}
      >
        {Strings.REWARDSHISTORY}
      </Box>
      <Box sx={{ margin: "25px 0" }}>
        <ToggleBtn ToggleBtnWidth="100%" getValue={setToggleValue} />
      </Box>
      {toggleValue !== "Points" ?
        <CouponList /> :
        <PointList />
      }
    </>
  );
}
export default withRouter(ProfileHistory);
