import { Box, Container, Typography } from "@mui/material";
import "./AuthLayout.scss";
import back from "../../../statics/images/back.png";
import Navigation from "../../../navigation/Navigation";
import { NavigationProps, NavigationState } from "../../../navigation/Navigation.types";
import withRouter from "../../../withRouter";

interface Iprops {
  children: React.ReactNode,
  logo?: string,
  headerTitle?: string,
  backbutton?: boolean,
  nine?: string,
  mobLocation?: string | number,
  suheaderTitle: string,
  router?: NavigationProps;
  states?: NavigationState;
}


const AuthLayout = (props: Iprops) => {
  return (
    <Box sx={{ maxWidth: "428px", width: "100%", margin: "0 auto", padding: "0 22px" }}>

      <Box
        className="wrap"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", position: "relative",
        }}
      >
        {!(props.router.location.pathname == "/otp") &&
          <Box sx={{
            marginTop: "63px",
            display: "flex",
            flexDirection: "center",
            alignItems: "center",
          }}
          >
            {props.backbutton && <Box onClick={() => { Navigation.back(props.router) }}
              style={{ position: "absolute", left: "0", cursor: "pointer" }}>
              <img style={{}} src={back} width="24px" height="24px" />
            </Box>
            }
            {props?.logo &&

              <Box>
                <img className="rewaste-logo" src={props?.logo} />
              </Box>
            }
          </Box>}


        <Box
          sx={{
            marginTop: "82px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#FFF" }}
            className="wrap_Head_title"
            component="h1"
            variant="h5"
          >
            {/* {Strings.LOGIN_HEADER_TITLE} */}
            {props.headerTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            className="wrap_Sub_Head_title"
            sx={{ color: "#FFF", textAlign: "center", maxWidth: "300px", margin: "0 auto" }}
          >
            {props.suheaderTitle} <span> {props.nine} {props.mobLocation}</span>
          </Typography>
        </Box>
      </Box>
      <Box>
        {props.children}
      </Box>
    </Box>
  );
};

export default withRouter(AuthLayout);
