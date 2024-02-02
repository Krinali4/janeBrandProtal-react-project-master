import { matchRoutes } from "react-router-dom"
export default class AppRoutes {
    
    public static readonly ROOT = "/";
    public static readonly LOGIN = "/login";
    public static readonly OTP = "/otp";
    public static readonly HOME = "/home";
    public static readonly PROFILE = "/profile";
    public static readonly PROFILEHISTORY = "/profile/history";
    public static readonly PROFILEEDIT = "/profile/edit";
    public static readonly PROFILEDETAILS = "/profile/details";
    public static readonly ERROR = "/error";

    private constructor() { }

    private static routes: any[] = [
        {path: AppRoutes.ROOT, strict: true, exact: true},
        {path: AppRoutes.LOGIN, strict: true, exact: true},
        {path: AppRoutes.OTP, strict: true, exact: true},
        {path: AppRoutes.HOME, strict: true, exact: true},
        {path: AppRoutes.PROFILE, strict: true, exact: true},
        {path: AppRoutes.PROFILEHISTORY, strict: true, exact: true},
        {path: AppRoutes.PROFILEEDIT, strict: true, exact: true},
        {path: AppRoutes.PROFILEDETAILS, strict: true, exact: true},
        {path: AppRoutes.ERROR, strict: true, exact: true},
      ]
    
      public static matchRoute(routes: any[], location: any) {
        const matchedRoutes = matchRoutes(routes, location.pathname)
        if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
          return false
        }
        return true
      }
    
      public static isRouteMatched(location: any) {
        let isRouteValid = this.matchRoute(AppRoutes.routes,location)
        return isRouteValid
      }
    
      public static matchedRoutes(pathname: any) {
        const matchedRoutesItems = matchRoutes(AppRoutes.routes, pathname)
        if (!Array.isArray(matchedRoutesItems) || matchedRoutesItems.length === 0) {
          return undefined
        }
        return matchedRoutesItems;
      }
}