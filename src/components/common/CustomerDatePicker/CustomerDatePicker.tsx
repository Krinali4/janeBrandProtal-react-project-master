import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { useEffect, useState } from "react"

interface IBasicDatePickerProps {
  inputFormat: string
  readOnly?: boolean
  value: string
  disableFuture?: boolean
  onChange(newValue: string): void
}

export default function BasicDatePicker(props: IBasicDatePickerProps) {
  const [open, setOpen] = useState(false);
  // inputFormat: "DD/MM/YYYY"
  //sx={{ color: "#FFF", fontSize: "12px" }}
  //value={userData.field_date_of_birth === "" || userData.field_date_of_birth === "Invalid date" ? "" : userData.field_date_of_birth}
  // disableFuture
  // onChange={(newValue: any) => {
  //   setUserData({
  //     ...userData,
  //     field_date_of_birth: newValue
  //   })
  // }}
  const {
    inputFormat,
    readOnly = false,
    value,
    disableFuture = false,
    onChange,
  } = props

  useEffect(() => {
    // do not auto open picker after setting readOnly to false
    if (!readOnly) setOpen(false);
  }, [readOnly]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        inputFormat={inputFormat}
        disableFuture={disableFuture}
        value={value}
        readOnly={readOnly}
        open={readOnly ? false : open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderInput={(params) => (
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant="standard"
            {...params}
          />
        )}
        onChange={(newValue: any) => {
          onChange(newValue)
        }}
      />
    </LocalizationProvider>
  )
}
