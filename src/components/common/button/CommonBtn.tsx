import { Box, Button, Typography } from "@mui/material";

interface IProps {
  CommonBtn: string,
  buttonWidth:string,
  onClick?:()=>void

}
export const CommonBtn = (props: IProps) => {
  return (
    <Box width={props.buttonWidth} justifyContent="center">
      <Button
        variant="contained"
        onClick={props.onClick}
        sx={{
          fontWeight: "600",
          fontSize: "16px",
          width: "100%",
          color: " #FFFFFF;",
          background: "#1E1E1E",
          borderRadius: "5px",
          textTransform:"capitalize",
          height: "56px",
          border: "1px solid #2E7CF6",
          // "&:hover": {
          //   backgroundColor: "#2E7CF6",
          //   color: "#fff",
          // },
        }}
      >
      
        <Box>{props?.CommonBtn}</Box>
      </Button>
    </Box>
  );
};
