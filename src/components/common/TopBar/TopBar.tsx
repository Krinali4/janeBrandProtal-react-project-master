import "./TopBar.scss"
import Navigation from "../../../navigation/Navigation"
import withRouter from "../../../withRouter"
import {
  NavigationProps,
  NavigationState,
} from "../../../navigation/Navigation.types"
import UserManager from "../../../core/utils/UserManager"
import { useEffect, useState } from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from "@mui/icons-material/Logout"
import { AppBar, IconButton, Toolbar } from "@mui/material"
import AppRoutes from "../../../routes"
import SessionManager from "../../../core/utils/SessionManager"
import AccountService from "../../../services/AccountService"
import { ApiError } from '../../../core/webservice/ApiError';
interface IProps {
  router: NavigationProps
  states: NavigationState
  path: string
}
const TopBar = (props: IProps) => {
  const { path } = props
  const sShowExit =
    path === AppRoutes.ROOT ||
    path === AppRoutes.LOGIN ||
    path === AppRoutes.OTP ||
    path === AppRoutes.ERROR
      ? false
      : true

  const sShowBack =
    path === AppRoutes.ROOT ||
    path === AppRoutes.LOGIN ||
    path === AppRoutes.ERROR ||
    path === AppRoutes.HOME
      ? false
      : true

  const [logo, setLogo] = useState(UserManager.shared()?.merchant?.logo)

  useEffect(() => {
    if (UserManager.shared()?.merchant?.logo != null) {
      setLogo(UserManager.shared().merchant.logo)
    }
  }, [UserManager.shared()?.merchant?.logo])

  const LogoutUser = async () => {
    let result = true
    if (
      SessionManager.shared().isTokenAvailable()
    ) {
      result = await AccountService.logOutUser()
    }
    return result
  }

  const handleOnBackTapped = () => {
    Navigation.back(props.router)
  }

  const handleOnLogoutTapped = () => {
    LogoutUser()
    .then((result) => {
      SessionManager.shared().clearUserSessionData()
      Navigation.toLogin(props.router)
    })
    .catch((apiError: ApiError) => {
      SessionManager.shared().clearUserSessionData()
      Navigation.toLogin(props.router)
    })
  }

  return (
    <AppBar className="headerBlock" position="sticky" sx={{ bgcolor: "#303030", height: "64px", maxWidth:"480px", margin:"0 auto" }}>
      <Toolbar className="appToolBar">
        <IconButton
          className="appBarMenuIcon"
          sx={{ visibility: sShowBack ? "visible" : "hidden" }}
          color="inherit"
          aria-label="back navigation"
          component="label"
          onClick={(e) => {
            handleOnBackTapped()
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <img className="appBarMerchantLogo" src={logo} />
        <IconButton
          color="inherit"
          sx={{ visibility: sShowExit ? "visible" : "hidden" }}
          aria-label="Exit"
          onClick={(e) => {
            handleOnLogoutTapped()
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )

}

export default withRouter(TopBar)
