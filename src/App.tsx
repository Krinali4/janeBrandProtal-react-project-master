import React, { Suspense, lazy, useEffect, useState } from "react"
import "./App.scss"
import { ThemeProvider } from "@mui/material/styles"
import SessionManager from './core/utils/SessionManager';
import { Route, Routes } from "react-router-dom"
import AppRoutes from "./routes"
import Login from "./components/login/Login"
import Otp from "./components/otp/Otp"
import theme from "./theme"
import Error from "./components/error/Error"
import LandingScreen from "./components/landingScreen/LandingScreen"
import AppWrapper from "./components/common/appWrapper/AppWrapper"
import { NavigationProps, NavigationState } from "./navigation/Navigation.types"
import withRouter from "./withRouter"
import TopBar from "./components/common/TopBar/TopBar"
import MessageNotifier from "./components/common/customeToast/MessageNotifier"
import Protected from "./Protected"
import PageNotFound from "./components/notfound/PageNotFound"
import Navigation from "./navigation/Navigation"
import MainSkeletonLoader from "./components/common/skeletonLoader/MainSkeletonLoader";

const Home = lazy(() => import("./components/home/Home"));
const Profile = lazy(() => import("./components/profile/Profile"));
const ProfileEdit = lazy(() => import("./components/profile/profileEdit/ProfileEdit"));
const ProfileHistory = lazy(() => import("./components/profile/profileHistory/ProfileHistory"));
const ProfileDetails = lazy(() => import("./components/profile/profileDetails/ProfileDetails"));

interface IProps {
  router: NavigationProps
  states: NavigationState
}

function App(props: IProps) {
  const path = props.router.location.pathname
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(
    SessionManager.shared().isTokenAvailable()
  )

  useEffect(() => {
    if (isInitialDataLoaded) {

    }
  }, [isInitialDataLoaded])

  const checkUserToken = () => {
    setIsLoggedIn(SessionManager.shared().isTokenAvailable())
  }

  useEffect((): void => {
    setIsLoggedIn(SessionManager.shared().isTokenAvailable())
  }, [])

  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])

  const handleInitialDataLoadSuccess = () => {
    setIsLoggedIn(SessionManager.shared().isTokenAvailable() ? true : false)
    setIsInitialDataLoaded(true)
  }

  const handleInitialDataLoadFailure = () => { }

  const handleOnLoginSuccess = () => {
    setIsLoggedIn(SessionManager.shared().isTokenAvailable())
    Navigation.toHome(props.router)
  }

  const renderTopHeader = () => {
    if (path === AppRoutes.ROOT ||
      path === AppRoutes.LOGIN ||
      path === AppRoutes.ERROR) {
      return null
    }
    return (
      <TopBar path={path} router={props.router} />
    )
  }

  const RenderElement = (props: any) => {
    return (
      <Suspense fallback={<>Loading....</>}>
        <Protected isLoggedIn={isLoggedIn}>
          {props.children}
        </Protected>
      </Suspense>
    )
  }

  const protectedRoutes = () => {
    return (
      <>
        {renderTopHeader()}
        <AppWrapper>
          <Routes>
            <Route path={AppRoutes.ROOT} element={<LandingScreen
              isDataLoaded={isInitialDataLoaded}
              currentPath={path} />} />
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route path={AppRoutes.OTP} element={<Otp onLoginSuccess={handleOnLoginSuccess} />} />
            <Route path={AppRoutes.ERROR} element={<Error />} />
            <Route
              path={AppRoutes.HOME}
              element={
                <RenderElement>
                  <Home />
                </RenderElement>
              }
            />
            <Route
              path={AppRoutes.PROFILE}
              element={
                <RenderElement>
                  <Profile />
                </RenderElement>
              }
            />
            <Route
              path={AppRoutes.PROFILEEDIT}
              element={
                <RenderElement>
                  <ProfileEdit />
                </RenderElement>
              }
            />
            <Route
              path={AppRoutes.PROFILEDETAILS}
              element={
                <RenderElement>
                  <ProfileDetails />
                </RenderElement>
              }
            />
            <Route
              path={AppRoutes.PROFILEHISTORY}
              element={
                <RenderElement>
                  <ProfileHistory />
                </RenderElement>
              }
            />
          </Routes>
        </AppWrapper>
      </>
    )
  }

  const unknownRoute = () => {
    return (
      <Routes>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  }

  const renderRoutes = () => {
    const isRouteValid = AppRoutes.isRouteMatched(props.router.location)
    if (!isRouteValid) {
      return unknownRoute()
    }
    return protectedRoutes()
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {!isInitialDataLoaded ? (
          <LandingScreen
            currentPath={path}
            isDataLoaded={isInitialDataLoaded}
            router={props.router}
            onInitialDataLoadSuccess={handleInitialDataLoadSuccess}
            onInitialDataLoadFailed={handleInitialDataLoadFailure}
          />
        ) : (
          renderRoutes()
        )}
        <MessageNotifier />
      </ThemeProvider>
    </div>
  )
}

export default withRouter(App)
