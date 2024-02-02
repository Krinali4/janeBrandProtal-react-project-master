import { Typography, Box } from "@mui/material";
import React from "react";
import TextUtils from "../../../../core/utils/TextUtils";
import arrowDown from "../../../../statics/svgs/arrowDown.svg";
import Redeem from "../../../../statics/svgs/Redeem.svg";
import "../couponType.scss";

interface IProps {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  date: string;
  expiresOn: string;
  expiredOn: string;
  reason: string;
  billNo: string | number;
  invoicenumber: string;
  store: string;
}
function RedeemedPoint(props: IProps) {
  return (
    <Box className="couponData">
      <Box className="couponTopBox">
        <Box className="couponHeader">
          <img src={arrowDown} alt="arrow-down" onClick={() => props.setOpenDrawer(false)} />
          <Typography className="coupponHeading">{props.heading}</Typography>
        </Box>
        <Box className="couponContent">
          <Box
            className="borderLine"
            sx={{ border: "1px solid rgba(48, 48, 48, 0.15)" }}
          />
          {props.date && (
            <Box className="couponContentRow">
              <Typography variant="h2">Date :</Typography>
              <Typography>{props.date} </Typography>
            </Box>
          )}
          {props.expiresOn && (
            <Box className="couponContentRow">
              <Typography variant="h2"> Expires On :</Typography>
              <Typography>{props?.expiresOn}</Typography>
            </Box>
          )}
          {props.expiredOn && (
            <Box className="couponContentRow">
              <Typography variant="h2"> Expired On :</Typography>
              <Typography>{props.expiredOn}</Typography>
            </Box>
          )}
          {props.reason && (
            <Box className="couponContentRow">
              <Typography variant="h2"> Reason :</Typography>
              <Typography>{props.reason}</Typography>
            </Box>
          )}
          {props.billNo!=0 && (
            <Box className="couponContentRow">
              <Typography variant="h2"> Bill Amount :</Typography>
              <Typography>&#8377;{TextUtils.commaSepratedFormat(props.billNo.toString())}</Typography>
            </Box>
          )}
          {props.invoicenumber && (
            <Box className="couponContentRow">
              <Typography variant="h2"> Invoice Number :</Typography>
              <Typography>{props.invoicenumber}</Typography>
            </Box>
          )}
          {props.store && (
            <Box className="couponContentRow">
              <Typography variant="h2"> Store :</Typography>
              <Typography>{props.store}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default RedeemedPoint;
