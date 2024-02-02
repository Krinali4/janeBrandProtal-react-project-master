import { Typography, Box } from "@mui/material";
import TextUtils from "../../../core/utils/TextUtils";
import UserManager from "../../../core/utils/UserManager";
import ProgressBar from "../../common/progressBar/ProgressBar";

const ProgressBarStructure = () => {
  const userDetails = UserManager.shared().user;
  const loyalty = userDetails.loyalty;
  const displayPercentage = () => {
    return (loyalty.current_points / loyalty.requiredPoints) * 100;
  };
  const displayDifference = (): string => {
    const diffrence = loyalty.requiredPoints - loyalty.current_points;
    return TextUtils.commaSepratedFormat(diffrence.toString());
  };
  return (
    <>
      <Box textAlign={"center"}>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "18px",
            color: "#FFFFFF",
          }}
        >
          Reward Progress
        </Typography>
          <>
            <Box sx={{ margin: "18px 0 16px 0" }}>
              <ProgressBar
                value={displayPercentage()}
                currentPoints={loyalty?.current_points}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "10px",
                lineHeight: "11px",
                color: "#FFFFFF",
              }}
            >
              Earn {displayDifference()} more points to attain{" "}
              {loyalty.tierName} Level
            </Typography>
          </>
      </Box>
    </>
  );
};
export default ProgressBarStructure;
