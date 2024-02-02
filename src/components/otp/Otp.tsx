import "./Otp.scss"
import { Box, Button, Typography } from "@mui/material"
import OtpInput from "react-otp-input"
import { useState, useEffect } from "react"
import Strings from "../../core/utils/Strings"
import CircularProgress from "@mui/material/CircularProgress"
import AuthLayout from "../common/authLayout/AuthLayout"
import withRouter from "../../withRouter"
import {
  NavigationProps,
  NavigationState,
} from "../../navigation/Navigation.types"
import Navigation from "../../navigation/Navigation"
import UserManager from "../../core/utils/UserManager"
import { IOtpResponse } from "../../core/models/OtpResponse"
import VerificationService from "../../services/VerificationService"
import OtpResponse from "../../core/models/OtpResponse"
import { ApiError } from "../../core/webservice/ApiError"
import { showApiErrorMessage } from '../common/customeToast/MessageNotifier';
interface IProps {
  router: NavigationProps
  states: NavigationState
  onLoginSuccess(): void
}
const Otp = (props: IProps) => {
  const [otpResponse, setOtpResponse] = useState<IOtpResponse | undefined>(
    undefined
  )

  const [OTP, setOTP] = useState<string>("")
  const [wrongOtp, setWrongOtp] = useState<boolean>(false)
  const [resendOtp, setResendOtp] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const dataObj = props.router.location.state as IOtpResponse
    if (dataObj) {
      setOtpResponse(dataObj)
    } else {
      Navigation.toLogin(props.router)
    }
  }, [])

  useEffect(() => {
    if(otpResponse) {
      setTimeout(()=>{
        focusInput()
      },100)
    }
  }, [otpResponse])

  const focusInput = () => {
    const inputElements = document.getElementsByTagName("input")
    if(inputElements && inputElements.length > 0) {
      const inputElement = inputElements[0]
      if(inputElement) {
        inputElement.focus()
      }
    }
  }

  const ResendCodeBtn = (e: any): void => {
    setWrongOtp(false)
    setResendOtp(false)
    VerificationService.sendOtp(otpResponse.mobileNumber)
      .then((resendOtpResponse: OtpResponse) => {
        setResendOtp(true)
        setOtpResponse(resendOtpResponse.getOtpResponseObject())
        setOTP("")
      })
      .catch((apiError: ApiError) => {
        setResendOtp(false)
        console.log(apiError.message)
      })
  }

  const verifyOTP = (e: any): void => {
    setWrongOtp(false)
    setResendOtp(false)
    setLoading(true)
    VerificationService.verifyOtp(OTP, otpResponse, UserManager.shared().merchant.merchantId)
      .then((result: boolean) => {
        setLoading(false)
        setOTP("")
        props.onLoginSuccess()
      })
      .catch((apiError: ApiError) => {
        setLoading(false)
        if(apiError && apiError.errorCode === 601) {
          showApiErrorMessage(apiError)
          Navigation.back(props.router)
        } else {
          setWrongOtp(true)
          setResendOtp(false)
          focusInput()
        }
        console.log(apiError.message)
      })
  }

if(!otpResponse || !UserManager.shared().merchant) {
  return null
}

  const merchantDetails = UserManager.shared().merchant;

  return (
    <AuthLayout
      backbutton={true}
      logo={merchantDetails?.logo}
      headerTitle={Strings.OTP_TITLE}
      nine="+91 "
      mobLocation={otpResponse.mobileNumber}
      suheaderTitle={Strings.OTP_SUB_TITLE}
    >
      <Box className="wrap" maxWidth="xs">
        {/* <AppBar elevation={0} style={{backgroundColor:'#1C1C1C',color:'#000',position:'absolute', width:'25%', top:'0'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <NavLink to='/login'> <img src={back} width="24px" height="24px"/></NavLink>
            </Box>           
        </Toolbar>
      </Container>
    </AppBar>  
       */}
        <Box component="form" noValidate sx={{ marginTop: "41px" }}>
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginBottom: "22px"
               
            }}
            className="otp-in"
          >
            <OtpInput
              value={OTP}
              numInputs={4}
              onChange={(otp: any) => setOTP(otp)}
              inputStyle={{
                border: "0",
                // margin: wrongOtp ? "0" :  '0 24px 0 0',
                lineHeight: 2,
                backgroundColor: "transparent",
                borderBottom: wrongOtp ? "1px solid #ff0000" : "1px solid #fff",
                width: "100%",
                color: "#FFF",
                outline: "none",
                fontSize: 20,
              }}
              inputType="number"
              shouldAutoFocus={true}
              renderInput={(props: any) => (
                <input {...props} className={wrongOtp ? "otpbdr" : "otpcls"} />
              )}
            />

          </Box>

          <Box
            sx={{
              marginTop: 2.4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="errorMsg"
            style={{ position: "relative", margin: "0px 0px 0px" }}
          >
            {resendOtp && (
              <Typography
                sx={{
                  color: "#FFF",
                }}
              >
                {Strings.OTP_CODE_RESENT}
              </Typography>
            )}
            {wrongOtp && (
              <Typography
                sx={{
                  color: "red",
                }}
              >
                {Strings.OTP_INCORRECT_CODE}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              marginTop: "47px",
            }}
          >
            <Button
              className="wrap_Submit"
              onClick={verifyOTP}
              disabled={OTP.length !== 4}
              variant="contained"
              fullWidth
            >
              <Box sx={{ margin: "10px" }}>
                {loading && "Please Wait"}
                {!loading && Strings.OTP_NEXT_BUTTON_TITLE}
              </Box>
              {loading && (
                <CircularProgress
                  style={{ color: "#FFF", width: "20px", height: "20px" }}
                />
              )}
            </Button>
          </Box>

          <Box
            className="wrap_resend"
            sx={{
              marginTop: "31px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#FFF",
              cursor: "pointer",
            }}
          >
            <a onClick={ResendCodeBtn}>Resend Code</a>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default withRouter(Otp);
