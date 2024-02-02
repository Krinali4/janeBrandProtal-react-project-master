import { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  NavigationProps,
  NavigationState,
} from "../../../navigation/Navigation.types";
import withRouter from "../../../withRouter";
import { UploadLogo } from "./UploadLogo";
import "./ProfileEdit.scss";
import UserManager from "../../../core/utils/UserManager";
import InputField from "../../common/inputField/InputField";
import BasicDatePicker from "../../common/CustomerDatePicker/CustomerDatePicker";
import { InverseBtn } from "../../common/button/InverseBtn";
import CountryService from "../../../services/CountryService";
import Country from "../../../core/models/Country";
import UserService from "../../../services/UserService";
import { IUserUpdate } from "../../../core/models/User";
import { showErrorMessage } from "../../common/customeToast/MessageNotifier";
import Navigation from "../../../navigation/Navigation";
import Strings from "../../../core/utils/Strings";
import Datepng from "../../../statics/images/date.png";
import Loader from "../../common/loader/Loader";
import GeneralUtils from "../../../core/utils/GeneralUtils";
import { hideMessage } from "../../common/customeToast/MessageNotifier";
import TextUtils from "../../../core/utils/TextUtils";
import dayjs from "dayjs";
import { ApiError } from "../../../core/webservice/ApiError";
import { ICountry } from "../../../core/models/Country";
import SkeletonLoader from "../../common/skeletonLoader/SkeletonLoader";
import ProfileEditSkeletonLoader from "../../common/skeletonLoader/profileEditLoader/ProfileEditSkeletonLoader";
interface IProps {
  router: NavigationProps;
  states: NavigationState;
}
function ProfileEdit(props: IProps) {
  const [loader, setLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [imgObj, setImgObj] = useState(null);
  const [newImgObj, setNewImgObj] = useState(null);

  // const siteUrl = process.env.REACT_APP_API_SITE_URL

  let countryJSONStr =
    '{"country":"India","country_code":"IN","code":"91","flag_icon":"https://www.zvaro.com/sites/all/modules/custom/custom_global/icon/IN.png","regex":"^(((0|((\\\\+)?91(\\\\-)?))|((\\\\((\\\\+)?91\\\\)(\\\\-)?)))?[7-9]\\\\d{9})?$","phone_min_length":10,"phone_max_length":10,"distance_unit":"km","currency_code":"INR","currency_symbol":"₹"}';
  if (process.env.REACT_APP_COUNTRY === "US") {
    countryJSONStr =
      '{"country":"United States","country_code":"US","code":"1","flag_icon":"https://www.zvaro.com/sites/all/modules/custom/custom_global/icon/US.png","regex":"^\\\\(?([0-9]{3})\\\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$","phone_min_length":10,"phone_max_length":10,"distance_unit":"mi","currency_code":"USD","currency_symbol":"$"}';
  }
  const countryObj = new Country(JSON.parse(countryJSONStr));
  const [country, setCountry] = useState<ICountry>(countryObj.getCountry());

  const [userData, setUserData] = useState<IUserUpdate>({
    uid: "",
    field_your_name: "",
    field_kiosk_consumer_email: "",
    field_kiosk_consumer_phone: "",
    field_gender: "",
    field_date_of_birth: "",
    field_date_of_anniversary: "",
  });

  const [initialNameFlag, setInitialNameFlag] = useState(
    userData.field_your_name?.length > 0 ? true : false
  );
  const [initialGenderFlag, setInitialGenderFlag] = useState(
    userData.field_gender?.length > 0 ? true : false
  );
  const [initialEmailFlag, setInitialEmailFlag] = useState(
    userData.field_kiosk_consumer_email?.length > 0 ? true : false
  );
  const [initialPhoneFlag, setInitialPhoneFlag] = useState(
    userData.field_kiosk_consumer_phone?.length > 0 ? true : false
  );
  const [initialDobFlag, setInitialDobFlag] = useState(
    userData.field_date_of_birth?.length > 0 ? true : false
  );
  const [initialDoaFlag, setInitialDoaFlag] = useState(
    userData.field_date_of_anniversary?.length > 0 ? true : false
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoader(true);
    Promise.all([
      UserService.getUserProfile(),
      CountryService.getCountryDetails(),
    ])
      .then((_results: any[]) => {
        setLoader(false);
        if (_results[0]) {
          const resp = _results[0];
          UserManager.shared().setUser(resp);
          setUserData({
            uid: resp.userId,
            field_your_name: resp.name,
            field_kiosk_consumer_email: resp.email,
            field_kiosk_consumer_phone: resp.phone,
            field_gender: resp.gender,
            field_date_of_birth: resp.displayDOB(),
            field_date_of_anniversary: resp.displayDOA(),
          });
          setInitialNameFlag(resp.name?.length > 0 ? true : false);
          setInitialGenderFlag(resp.gender?.length > 0 ? true : false);
          setInitialEmailFlag(resp.email?.length > 0 ? true : false);
          setInitialPhoneFlag(resp.phone?.length > 0 ? true : false);
          setInitialDobFlag(resp.displayDOB()?.length > 0 ? true : false);
          setInitialDoaFlag(resp.displayDOA()?.length > 0 ? true : false);
          setImgObj(resp.imgUrl);
        }
        if (_results[1]) {
          const userCountry = UserManager.shared().user
            ? UserManager.shared().user.country
            : process.env.REACT_APP_COUNTRY;
          const resp = _results[1] as Country[];
          const data: Country = resp.find(
            (obj) => obj.country_code === userCountry
          );
          if (data) {
            setCountry(data.getCountry());
          }
        }
      })
      .catch((apiError: ApiError) => {
        setLoader(false);
        console.log(apiError.message);
      });
  };

  const isFormValidated = () => {
    if (
      !userData.field_your_name ||
      TextUtils.isEmpty(userData.field_your_name)
    ) {
      showErrorMessage("Your name is empty.");
      return false;
    }

    if (
      !userData.field_kiosk_consumer_phone ||
      TextUtils.isEmpty(userData.field_kiosk_consumer_phone)
    ) {
      showErrorMessage("Phone no. is empty.");
      return false;
    }

    const regex = /^[0-9\b]+$/;
    if (
      userData.field_kiosk_consumer_phone &&
      userData.field_kiosk_consumer_phone.length > 0 &&
      (!regex.test(userData.field_kiosk_consumer_phone) ||
        userData.field_kiosk_consumer_phone.length !== country.phone_max_length)
    ) {
      showErrorMessage("Phone no. is invalid.");
      return false;
    }

    if (
      !userData.field_kiosk_consumer_email ||
      TextUtils.isEmpty(userData.field_kiosk_consumer_email)
    ) {
      showErrorMessage("Email is empty.");
      return false;
    }

    if (
      userData.field_kiosk_consumer_email &&
      userData.field_kiosk_consumer_email.length > 0 &&
      !GeneralUtils.isValidEmailId(userData.field_kiosk_consumer_email)
    ) {
      showErrorMessage("Email is invalid.");
      return false;
    }

    if (!userData.field_gender || TextUtils.isEmpty(userData.field_gender)) {
      showErrorMessage("Gender is empty.");
      return false;
    }

    // if(!userData.field_date_of_birth || TextUtils.isEmpty(userData.field_date_of_birth)) {
    //   showErrorMessage('Date of Birth is empty.')
    //   return false
    // }

    if (
      userData.field_date_of_birth &&
      !TextUtils.isEmpty(userData.field_date_of_birth) &&
      (!dayjs(userData.field_date_of_birth).isValid() ||
        dayjs(userData.field_date_of_birth).isAfter(dayjs()))
    ) {
      showErrorMessage("Date of Birth is invalid.");
      return false;
    }

    // if(!userData.field_date_of_anniversary || TextUtils.isEmpty(userData.field_date_of_birth)) {
    //   showErrorMessage('Date of Anniversary is empty.')
    //   return false
    // }

    if (
      userData.field_date_of_anniversary &&
      !TextUtils.isEmpty(userData.field_date_of_anniversary) &&
      (!dayjs(userData.field_date_of_anniversary).isValid() ||
        dayjs(userData.field_date_of_anniversary).isAfter(dayjs()))
    ) {
      showErrorMessage("Date of Anniversary is invalid.");
      return false;
    }

    hideMessage();
    return true;
  };
  const uploadImage = () => {
    if (newImgObj) {
      setIsLoading(true);
      UserService.uploadImage(newImgObj)
        .then((resp) => {
          if (resp) {
            handleSubmit(resp);
          }
        })
        .catch((apiError: ApiError) => {
          setIsLoading(false);
          showErrorMessage("Something went wrong. Please try again.");
        });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = (fid?: string) => {
    if (!isFormValidated()) {
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    UserService.updateUserProfile(userData, fid && fid)
      .then((resp) => {
        setIsLoading(false);
        if (resp) {
          Navigation.back(props.router);
        } else {
          setIsLoading(false);
          showErrorMessage("Something went wrong. Please try again.");
        }
      })
      .catch((apiError: ApiError) => {
        setIsLoading(false);
        showErrorMessage("Something went wrong. Please try again.");
      });
  };

  if (loader) {
    return <ProfileEditSkeletonLoader />;
  }

  if (userData && !userData.uid) {
    return null;
  }

  return (
    <>
      <Box className="container">
        {isLoading ? (
          <ProfileEditSkeletonLoader />
        ) : (
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
              {Strings.EDITPROFILE}
            </Box>
            <UploadLogo
              imgObj={imgObj}
              setImgObj={setImgObj}
              setNewImgObj={setNewImgObj}
            />
            <Box>
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "600",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Name
              </Typography>
              <InputField
                placeholder="Name *"
                value={userData.field_your_name}
                required={true}
                onChange={(e: any) => {
                  setUserData({
                    ...userData,
                    field_your_name: e.target.value,
                  });
                }}
                inputProps={{ readOnly: initialNameFlag }}
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "600",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Phone
              </Typography>
              <Box
                sx={{
                  color: "#FFF",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "15%", borderBottom: "1px solid #FFF" }}>
                  <Box
                    sx={{
                      color: "#FFF",
                      display: "flex",
                      justifyContent: "space-between",
                      position: "relative",
                      top: "6px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <img
                        style={{ height: "14px" }}
                        src={country.flag_icon}
                        alt="country-icon"
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          top: "3px",
                          padding: "0px 11px",
                        }}
                      >
                        +{country.code}
                      </span>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ width: "80%" }}>
                  <InputField
                    value={userData.field_kiosk_consumer_phone}
                    onChange={(e: any) => {
                      setUserData({
                        ...userData,
                        field_kiosk_consumer_phone: e.target.value,
                      });
                    }}
                    inputProps={{ readOnly: initialPhoneFlag }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "600",
                  mb: 1,
                  fontSize: "16px",
                }}
              >
                Email
              </Typography>
              <InputField
                placeholder="Email Address *"
                value={userData.field_kiosk_consumer_email}
                onChange={(e: any) => {
                  setUserData({
                    ...userData,
                    field_kiosk_consumer_email: e.target.value,
                  });
                }}
                inputProps={{ readOnly: initialEmailFlag }}
              />
            </Box>

            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography sx={{ color: "#FFF", fontSize: "12px", mb: 2 }}>
                <Typography
                  sx={{ color: "#FFF", fontWeight: "600", fontSize: "16px" }}
                >
                  Gender<sup>*</sup>
                </Typography>
              </Typography>
              <RadioGroup
                className="genderGroup"
                // aria-readonly={userData.field_gender}
                onClick={(e: any) => {
                  if (!initialGenderFlag) {
                    setUserData({
                      ...userData,
                      field_gender: e.target.value,
                    });
                  }
                }}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                  className={
                    userData?.field_gender === "Male" ? "malebg" : "male"
                  }
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                  className={
                    userData?.field_gender === "Female" ? "femalebg" : "female"
                  }
                />
              </RadioGroup>
            </Box>
            <Box className="datePicker">
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "600",
                  fontSize: "16px",
                  mb: 1,
                }}
              >
                Date of Birth
              </Typography>
              <BasicDatePicker
                inputFormat={"DD/MM/YYYY"}
                readOnly={initialDobFlag}
                value={
                  userData.field_date_of_birth === "" ||
                  userData.field_date_of_birth === "Invalid date"
                    ? ""
                    : userData.field_date_of_birth
                }
                disableFuture
                onChange={(newValue: any) => {
                  setUserData({
                    ...userData,
                    field_date_of_birth: newValue,
                  });
                }}
              />
              <img
                style={{ position: "absolute", right: "0", zIndex: "-1" }}
                src={Datepng}
                width="15px"
                height="17px"
                alt="calender-icon"
              />
            </Box>
            <Box sx={{ mt: 4 }} className="datePicker">
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "600",
                  mb: 1,
                  fontSize: "16px",
                }}
              >
                Date of Anniversary
              </Typography>
              <BasicDatePicker
                inputFormat={"DD/MM/YYYY"}
                readOnly={initialDoaFlag}
                value={userData.field_date_of_anniversary}
                disableFuture
                onChange={(newValue: any) => {
                  setUserData({
                    ...userData,
                    field_date_of_anniversary: newValue,
                  });
                }}
              />
              <img
                style={{ position: "absolute", right: "0", zIndex: "-1" }}
                src={Datepng}
                width="15px"
                height="17px"
                alt="calender-icon"
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ marginBottom: "10px", marginTop: "10px" }}>
                <InverseBtn
                  label="Update"
                  onClick={uploadImage}
                  loading={isLoading}
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
export default withRouter(ProfileEdit);
