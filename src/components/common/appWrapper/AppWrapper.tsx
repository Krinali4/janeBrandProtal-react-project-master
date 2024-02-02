import { Box } from "@mui/material";

function AppWrapper(props: any) {
    return (
        <Box sx={{
            maxWidth: "480px",
            width: "100%",
            padding: "29px 22px 0",
            background: "#1C1C1C",
            minHeight: "calc(100vh - 70px)",
            margin:"0 auto"
        }}>
            {props.children}
        </Box>
    )
}
export default AppWrapper;