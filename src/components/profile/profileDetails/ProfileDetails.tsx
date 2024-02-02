import { Box, Typography } from "@mui/material";
import Navigation from "../../../navigation/Navigation";
import {
  NavigationProps,
  NavigationState,
} from "../../../navigation/Navigation.types";
import withRouter from "../../../withRouter";
import "./profileDetails.scss";

interface IProps {
  router: NavigationProps;
  states: NavigationState;
  src?: string;
  profieImg: string;
  profileName: string;
  phone: number | string;
  redeemablePointsName: string;
  redeemablePointsCount: number | string;
  clickBtnFunctionality: boolean;
}

function ProfileDetails(props: IProps) {
  return (
    <>
        <Box
          className="rewaste-profileImg"
          onClick={() => {
            props.clickBtnFunctionality && Navigation.toProfile(props.router);
          }}
        >
          {props.profieImg != null ? (
            <Box>
              <img
                style={{ width: "66px", height: "66px", borderRadius: "50px" }}
                src={props.profieImg}
                alt="user-profile-pic"
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "66px",
                height: "66px",
                borderRadius: "50px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "28px", color: "#2E7CF6", fontWeight: "700" }}
              >
                {props.profileName?.charAt(0)}
              </Typography>
            </Box>
          )}

          <Box className="profileGrid">
            <Typography>Hello, {props.profileName}</Typography>

            <Typography className="mob">{props.phone}</Typography>
          </Box>

          <Box className="redeemablePoints" style={{ maxWidth: "77px" }}>
            <Typography
              sx={{
                fontStyle: "normal",
                color: "#000",
                fontWeight: "400",
                fontSize: "9.5px",
                lineHeight: "13px",
                marginBottom: "3px",
              }}
            >
              {props.redeemablePointsName}
            </Typography>
            <Typography
              sx={{
                fontStyle: "normal",
                color: "#000",
                fontWeight: "600",
                fontSize: "12px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {props.redeemablePointsCount}
            </Typography>
          </Box>
        </Box>
    </>
  );
}
export default withRouter(ProfileDetails);
