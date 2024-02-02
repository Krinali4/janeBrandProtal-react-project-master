import { Typography, Box } from "@mui/material"
interface Iprops {
    message: string,
    boxHeight: string
}
const DataNotFound = (props: Iprops) => {
    return (
        <Box className="dataNotFound" height={props.boxHeight} display="flex" alignItems="center"
            justifyContent="center">
            <Typography sx={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>
                {props.message}
            </Typography>
        </Box>
    )
}
export default DataNotFound