import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface IProps {
    heading: string,
    subHeading: string|number
}

export default function SquareBoxListing(props: IProps) {
    return (
        <Box
            sx={{
                Maxwidth: 'calc(50% - 44px)', 
                flex: "0 0 calc(50% - 22px)",
                background: '#1E1E1E',
                border: '1px solid #303030',
                borderRadius: '5px',
                textAlign: "center",
                cursor: "pointer",
                marginBottom:"15px",
                padding:"20px 2px",
            }}
        >
            <Typography sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#FFFFFF", 
            }}>{props.heading}</Typography>

            <Typography sx={{
               fontWeight: 400,
                fontSize: "12px",
                lineHeight: "22px",
                color: "#FFFFFF"
            }}>{props.subHeading}</Typography>
        </Box>
    );
}
