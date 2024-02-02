import { NavigationProps, NavigationState } from "./Navigation.types";
import AppRoutes from '../routes';
import { IOtpResponse } from "../core/models/OtpResponse";

export default class Navigation {

  /* navigate to home page */
  public static toHome(router: NavigationProps) {
    const { navigate } = router;
    navigate(AppRoutes.HOME,{ replace: true });
  }

  public static logOut(router: NavigationProps) {
    const { navigate } = router;
    navigate(AppRoutes.ROOT, { replace: true });
  }

  /* navigate back to page */
  public static back(router: NavigationProps) {
    const { navigate } = router;
    navigate(-1);
  }

  public static refreshPage(router: NavigationProps) {
    const { navigate } = router;
    navigate(0);
  }

  /* navigate to otp page */
  public static toOtp(router: NavigationProps,params:IOtpResponse) {
    console.log(params)
    const { navigate } = router;
    navigate({
      pathname: AppRoutes.OTP,
    },
    {state: params}
    );
  }

  /* navigate to login page */
  public static toLogin(router: NavigationProps) {
    const { navigate } = router;
    navigate(AppRoutes.LOGIN, { replace: true });
  }

   /* navigate to LandingPage page */
   public static toLandingPage(router: NavigationProps) {
    const { navigate } = router;
    navigate({
      pathname: AppRoutes.ROOT,
    });
  }
   /* navigate to error page */
   public static toError(router: NavigationProps) {
    const { navigate } = router;
    navigate(AppRoutes.ERROR, { replace: true });
  }
   /* navigate to Profile page */
   public static toProfile(router: NavigationProps) {
    const { navigate } = router;
    navigate({
      pathname: AppRoutes.PROFILE,
    });
  }
   /* navigate to ProfileEdit page */
   public static toProfileEdit(router: NavigationProps) {
    const { navigate } = router;
    navigate({
      pathname: AppRoutes.PROFILEEDIT,
    });
  }
   /* navigate to ProfileHistory page */
   public static toProfileHistory(router: NavigationProps) {
    const { navigate } = router;
    navigate({
      pathname: AppRoutes.PROFILEHISTORY,
    });
  }
}
