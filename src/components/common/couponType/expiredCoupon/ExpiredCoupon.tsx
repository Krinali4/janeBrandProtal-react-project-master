import { Typography, Box } from "@mui/material";
import React from "react";
import { discountType } from "../../../../core/models/Reward";
import TextUtils from "../../../../core/utils/TextUtils";
import arrowDown from "../../../../statics/svgs/arrowDown.svg";
import Expired from "../../../../statics/svgs/Expired.svg";
import "../couponType.scss";
interface IProps {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  discount: string;
  expiredOn: string;
  code: string;
  reason:string;
  discountType:discountType

}
function ExpiredCoupon(props: IProps) {
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
          <Box className="couponContentRow">
            <Typography variant="h2"> Discount Value </Typography>
            {props.discountType?.toLowerCase() === "fixed" ?
              <Typography>&#8377;{TextUtils.commaSepratedFormat(props.discount)}</Typography> :
              <Typography>{TextUtils.commaSepratedFormat(props.discount)}%</Typography>
            }
          </Box>
          <Box className="couponContentRow">
            <Typography variant="h2"> Expired On : </Typography>
            <Typography>{props.expiredOn}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="couponFooter">
        <Typography variant="h3">Reward Expired</Typography>
        <Box className="couponCodeBox expiredCoupon">
          <img src={Expired} alt="expired" />
          <Typography variant="h2">{props.code}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default ExpiredCoupon;
