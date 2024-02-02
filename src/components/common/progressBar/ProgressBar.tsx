import { Typography, Box } from "@mui/material";
import TextUtils from "../../../core/utils/TextUtils";
import "./ProgressBar.scss";

interface IProps {
    value: number,
    currentPoints?: number,
}

function ProgressBar(props: IProps) {
    return (
        <Box className="progressBar">
            <Box className="progressBarLine" width={`${props.value}%`}>
            </Box>
            <Typography className="progressValue" width={props.value >= 80 ? "50px" : `${100 - props.value}%`}>
                {props?.currentPoints ?
                    <>{TextUtils.commaSepratedFormat(props?.currentPoints.toString())} Points</> :
                    <>{props.value}%</>
                }
            </Typography>
        </Box>
    )
}
export default ProgressBar;