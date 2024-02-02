import { Typography } from "@mui/material";

interface IProps {
    heading: string,
}

function PageHeading(props: IProps) {
    return (
        <Typography
            sx={{
                margin: "0 0 17px 0",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#FFFFFF"
            }}
        >
            {props.heading}
        </Typography>
    )
}
export default PageHeading;