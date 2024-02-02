import { Box } from "@mui/material";
import {
  NavigationProps,
  NavigationState,
} from "../../navigation/Navigation.types";
import withRouter from "../../withRouter";
import { CommonBtn } from "../common/button/CommonBtn";
import ProgressBar from "../common/progressBar/ProgressBar";
import SquareBoxListing from "../common/listingUi/squareBoxListing/SquareBoxListing";
import ProfileDetails from "./profileDetails/ProfileDetails";
import Navigation from "../../navigation/Navigation";
import UserManager from "../../core/utils/UserManager";
import DateUtils from "../../core/utils/DateUtils";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import User from "../../core/models/User";
import Loader from "../common/loader/Loader";
import TextUtils from "../../core/utils/TextUtils";
import ProfileSkeletonLoader from "../common/skeletonLoader/ProfileSkeletonloader/ProfileSkeletonloader";
import { ApiError } from "../../core/webservice/ApiError";
interface IProps {
  router: NavigationProps;
  states: NavigationState;
}
function Profile(props: IProps) {
  const [userDetails, setUserDetails] = useState<User>();
  const [loader, setLoader] = useState(false);
  const CurrencyRupee = "₹";
  const [profileCompletePercentage, setProfileCompletePercentage] = useState(0);
  function dateFormate(timeStamp: string): string {
    return DateUtils.displayDateWithTimeStamp(timeStamp);
  }
  useEffect(() => {
    const userData = UserService.getUserProfile();
    userData.then((resp) => {
      setProfileCompletePercentage(resp.loyalty.profile_completion_percentage)
      UserManager.shared().setUser(resp);
      setUserDetails(resp);
      setLoader(true);
    })
    .catch((apiError: ApiError) => {
      setLoader(false);
    });
  }, []);
  

  return (
    <>
      {!loader ? 
      // <Loader pShow={true} />
      <ProfileSkeletonLoader/>
       :
        <Box>
          <ProfileDetails
            redeemablePointsName="Redeemable Points"
            redeemablePointsCount={TextUtils.commaSepratedFormat(userDetails?.loyalty?.current_points.toString())}
            profileName={userDetails?.name}
            phone={userDetails?.phone}
            profieImg={userDetails?.imgUrl}
            clickBtnFunctionality={false}
          />
          {profileCompletePercentage < 100 && <ProgressBar value={profileCompletePercentage} />}
          <Box
            display="flex"
            justifyContent="space-between"
            gap="44px"
            margin="38px 0 27px"
          >
            <CommonBtn
              CommonBtn="Reward History"
              buttonWidth="50%"
              onClick={() => {
                Navigation.toProfileHistory(props.router);
              }}
            />
            <CommonBtn
              CommonBtn="Edit Profile"
              onClick={() => {
                Navigation.toProfileEdit(props.router);
              }}
              buttonWidth="50%"
            />
          </Box>
          <Box
            sx={{
              border: "1px solid rgba(48, 48, 48, 0.15)",
              margin: "25px 0",
            }}
          />
          {loader ? (
            <>
              <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                <SquareBoxListing
                  heading="Member Since"
                  subHeading={dateFormate(userDetails?.loyalty?.member_since)}
                />
                <SquareBoxListing
                  heading="Member Type"
                  subHeading={userDetails?.loyalty?.customer_tier}
                />
                <SquareBoxListing
                  heading="Lifetime Points"
                  subHeading={TextUtils.commaSepratedFormat(userDetails?.loyalty?.lifetime_points.toString())}
                />
                <SquareBoxListing
                  heading="Points Redeemed"
                  subHeading={TextUtils.commaSepratedFormat(userDetails?.loyalty?.points_redeemed)}
                />
                <SquareBoxListing
                  heading="Money Saved"
                  subHeading={`${CurrencyRupee}${TextUtils.commaSepratedFormat(userDetails?.loyalty?.money_saved.toString())}`}
                />
                <SquareBoxListing
                  heading="Points Expired"
                  subHeading={TextUtils.commaSepratedFormat(userDetails?.loyalty?.points_expired.toString())}
                />
              </Box>
              {/* <Box
                sx={{ marginTop: "47px" }}
              >
                <Button
                  className="wrap_Submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#2E7CF6",
                    "&:hover": {
                      backgroundColor: "#2E7CF6",
                      color: "#fff",
                    },
                  }}
                >
                  <Box sx={{ margin: '10px' }}>
                    Want to Earn More Points?
                  </Box>
                </Button>
              </Box> */}
            </>
          ) : (
            // <Loader pShow={true} />
             <ProfileSkeletonLoader/>
          )}
        </Box>}
    </>
  );
}
export default withRouter(Profile);
