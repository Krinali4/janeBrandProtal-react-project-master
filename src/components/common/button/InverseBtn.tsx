import { Box, Button, CircularProgress } from "@mui/material";
export const InverseBtn = (props: any) => {
  return (
    <Box width={props.buttonWidth} justifyContent="center">
      <Button
        variant="contained"
        {...props}
        sx={{
          fontWeight: "600",
          fontSize: "18px",
          width: "100%",
          color: "#FFFFFF",
          background: "#2E7CF6",
          borderRadius: "5px",
          height: "56px",
          "&:hover": {
            backgroundColor: "#2E7CF6",
            color: "#fff",
          },
        }}
      >
        {!props?.loading &&
          <Box>{props?.label}</Box>
        }
        {props?.loading && (
          <>
            <Box>Please Wait</Box>
            <CircularProgress style={{ color: '#FFF', width: '30px', height: '30px', marginLeft: "10px" }} />
          </>
        )}
      </Button>
    </Box>
  );
};
