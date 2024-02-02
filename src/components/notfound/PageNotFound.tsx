import { Box, Typography } from "@mui/material"
import { NavigationProps, NavigationState } from "../../navigation/Navigation.types"
import withRouter from "../../withRouter"

interface IProps {
    router: NavigationProps
    states: NavigationState
}

function PageNotFound(props: IProps) {
    return(
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
            <Typography variant="h6" sx={{color:"white"}}>404 | Page not found</Typography> 
        </Box>
    )
}
export default withRouter(PageNotFound);