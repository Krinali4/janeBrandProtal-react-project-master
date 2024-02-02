import { useEffect } from "react"
import SessionManager from '../../core/utils/SessionManager';
import { ApiError } from "../../core/webservice/ApiError"
import Navigation from "../../navigation/Navigation"
import {
  NavigationProps,
} from "../../navigation/Navigation.types"
import AccountService from "../../services/AccountService"
import AuthService from "../../services/AuthService"
import MerchantService from "../../services/MerchantService"
import withRouter from "../../withRouter"
import Loader from "../common/loader/Loader"
import UserService from "../../services/UserService"
import TextUtils from "../../core/utils/TextUtils"
import AppRoutes from "../../routes"
import { showApiErrorMessage } from '../common/customeToast/MessageNotifier';
import MainSkeletonLoader from "../common/skeletonLoader/MainSkeletonLoader";
interface ILandingScreenProps {
  router: NavigationProps
  isDataLoaded: boolean
  currentPath: string
  onInitialDataLoadSuccess(): void
  onInitialDataLoadFailed(): void
}

function LandingScreen(props: ILandingScreenProps) {
  const checkAndLogoutUser = async (mid: string | undefined | null) => {
    let result = true
    if (
      SessionManager.shared().isTokenAvailable() &&
      mid != SessionManager.shared().getMerchentID()
    ) {
      result = await AccountService.logOutUser()
    }
    return result
  }

  const handleNavigation = () => {
    if (TextUtils.isEmpty(SessionManager.shared().getMerchentID())) {
      SessionManager.shared().clearUserSessionData()
      Navigation.toError(props.router)
      return
    }

    // Handle navigation
    if (
      props.currentPath === AppRoutes.ROOT ||
      props.currentPath === AppRoutes.OTP ||
      props.currentPath === AppRoutes.ERROR
    ) {
      if (SessionManager.shared().isTokenAvailable()) {
        Navigation.toHome(props.router)
      } else if (!TextUtils.isEmpty(SessionManager.shared().getMerchentID())) {
        Navigation.toLogin(props.router)
      } else {
        SessionManager.shared().clearUserSessionData()
        Navigation.toError(props.router)
      }
    }
  }

  const initialFetchOnLaunch = async () => {

    const search = props.router.location.search
    const mid = new URLSearchParams(search)?.get("mid")
    const cid = new URLSearchParams(search).get("cid")

    if (mid || cid) {
      // received query params
      await checkAndLogoutUser(mid)
      SessionManager.shared().setMerchentID(mid)
      SessionManager.shared().setCustomerId(cid)
    }

    const savedMerchantID = SessionManager.shared().getMerchentID()
    const savedMobileNumber = SessionManager.shared().getCustomerID()
    const isMidEmpty = TextUtils.isEmpty(savedMerchantID)
    const isCidEmpty = TextUtils.isEmpty(savedMobileNumber)
    const isAuthTokenAvailable = SessionManager.shared().isTokenAvailable()
    const isAutoLogin =
      !isMidEmpty && !isCidEmpty && !isAuthTokenAvailable ? true : false
    const isGetUserProfile =
      !isCidEmpty && isAuthTokenAvailable ? true : false

    return new Promise((resolve) => {
      try {
        
        if (isMidEmpty) {
          resolve(false)
          return
        }

        Promise.all([
          !isMidEmpty
            ? MerchantService.getMechantDetails(savedMerchantID)
            : Promise.resolve(),
          isAutoLogin
            ? AuthService.login(savedMobileNumber, savedMerchantID)
            : Promise.resolve(),
          isGetUserProfile ? UserService.getUserProfile() : Promise.resolve(),
        ])
          .then((_results: any[]) => {
            resolve(true)
          })
          .catch((apiError: ApiError) => {
            showApiErrorMessage(apiError)
            resolve(false)
          })
      } catch (error: any) {
        resolve(false)
      }
    })
  }

  useEffect(() => {
    if (!props.isDataLoaded) {
      initialFetchOnLaunch()
        .then((result) => {
          props.onInitialDataLoadSuccess()
          setTimeout(() => {
            handleNavigation()
          },100)
        })
        .catch((e: any) => {
          props.onInitialDataLoadSuccess()
          setTimeout(() => {
            handleNavigation()
          },100)
        })
    } else {
        setTimeout(() => {
            handleNavigation()
        },100)
    }
  }, [])

  return <MainSkeletonLoader />
}
export default withRouter(LandingScreen)
