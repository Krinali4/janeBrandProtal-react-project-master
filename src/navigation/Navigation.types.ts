import { Location, NavigateFunction, Params } from "react-router-dom";

export type NavigationProps = {
    location: Location
    navigate: NavigateFunction
    params: Readonly<Params<string>>
}

export type NavigationState = {
    scrollToTop?: boolean
    username?:string
    password?:string
}