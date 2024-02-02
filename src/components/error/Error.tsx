import { Box, Link, Typography, } from "@mui/material";
import { NavigationProps, NavigationState } from "../../navigation/Navigation.types";
import withRouter from "../../withRouter";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
interface IProps {
    router: NavigationProps;
    states: NavigationState;
}

function Error(props: IProps) {
    return (
        <Box className="errorBlock" sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box textAlign={"center"}>
                <ErrorOutlineIcon color="error" sx={{
                    height: "100px",
                    width: "200px"
                }} />
                <Typography sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#fff",
                    textAlign: "center"
                }}>
                    Oops! Something went wrong. Please try again later.
                </Typography>

            </Box>
        </Box>
    )
}
export default withRouter(Error);