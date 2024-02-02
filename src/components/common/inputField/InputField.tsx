import { TextField } from "@mui/material";
import "./inputField.scss";
function InputField(props: any) {
  return (
    <TextField
      variant="standard"
      className="inputField"
      {...props}
      hiddenLabel
      sx={{
        width: "100%",
      }}
    />

  );
}

export default InputField;
