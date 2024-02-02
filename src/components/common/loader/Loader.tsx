import { CircularProgress, Box } from "@mui/material";
interface IProps {
    pShow: boolean
}
function Loader(props: IProps) {
    return (
        <>
            {props.pShow &&
                <Box className="circleLoader" sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress sx={{ color: "#fff" }} />
                </Box>
            }
        </>
    )
}
export default Loader;