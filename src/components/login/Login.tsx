import "./login.scss";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Strings from "../../core/utils/Strings";
import CircularProgress from '@mui/material/CircularProgress';
import AuthLayout from "../common/authLayout/AuthLayout";
import Navigation from "../../navigation/Navigation";
import withRouter from "../../withRouter";
import { NavigationProps, NavigationState } from "../../navigation/Navigation.types";
import UserManager from "../../core/utils/UserManager";
import VerificationService from "../../services/VerificationService";
import OtpResponse from '../../core/models/OtpResponse';
import { ApiError } from "../../core/webservice/ApiError";
interface IProps {
  router: NavigationProps;
  states: NavigationState;
}
const Login = (props: IProps) => {

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [mobileNo, setMobileNo] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  function validateForm() {
    return mobileNo.length > 9 && mobileNo.length < 11;
  }
  const handleMobileNo = (e: any) => {
    if (e.target.value.length <= 10) {
      setMobileNo(e.target.value);
    }
  }

  const isLoginFormValidated = () => {
    setErrorMsg(undefined)
    if (mobileNo && (mobileNo.length > 10 || mobileNo.length < 5)) {
      setErrorMsg('Mobile number should be 10 digits only.')
      return false
    }
    return true
  }

  const loginSubmit = (e: any): void => {
    if (!isLoginFormValidated()) return
    setLoading(true)
    setErrorMsg(undefined)
    VerificationService.sendOtp(mobileNo)
      .then((otpResponse: OtpResponse) => {
        setLoading(false);
        Navigation.toOtp(props.router, otpResponse.getOtpResponseObject());
      })
      .catch((apiError: ApiError) => {
        setLoading(false);
        console.log(apiError.message)
        setErrorMsg(apiError.message)
      })
  };
  const merchantDetails = UserManager.shared()?.merchant;
  return (

    <AuthLayout logo={merchantDetails?.logo} headerTitle={Strings.LOGIN_HEADER_TITLE} suheaderTitle={Strings.LOGIN_SUB_HEADER_TITLE}>

      <Box component="form" className="wrap" noValidate sx={{ mt: "76px" }}>
        <Box className="textBrand txtIdent"
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <TextField
            variant="standard"
            sx={{
              ':before': { borderBottomColor: 'white' },
              ':after': { borderBottomColor: 'white' },
            }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={mobileNo}
            onChange={handleMobileNo}
            placeholder={Strings.LOGIN_MOBILE_PLACEHOLDER}
            autoFocus
            onKeyPress={(ev: any) => {
              if (ev.key === "Enter") {
                ev.preventDefault()
                loginSubmit(ev);
              }
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="errorMsg"
        >
          {errorMsg && (
            <Typography
              sx={{
                color: "red",
                marginTop: "16px"
              }}
            >
              {errorMsg}
            </Typography>
          )}
        </Box>
        <Box
          sx={{ marginTop: "47px" }}
        >
          <Button
            className="wrap_Submit"
            onClick={loginSubmit}
            disabled={!validateForm()}
            variant="contained"
            fullWidth
          >
            <Box sx={{ margin: '10px' }}>
              {loading && "Please Wait"}
              {!loading && Strings.LOGIN_NEXT_BUTTON_TITLE}
            </Box>
            {loading && (
              <CircularProgress style={{ color: '#FFF', width: '20px', height: '20px' }} />
            )}
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default withRouter(Login);
