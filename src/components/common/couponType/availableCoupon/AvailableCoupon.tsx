import { Typography, Box } from "@mui/material";
import React from "react";
import arrowDown from "../../../../statics/svgs/arrowDown.svg";
import Sucess from "../../../../statics/svgs/Sucess.svg";
import "../couponType.scss"
import TextUtils from "../../../../core/utils/TextUtils";
interface IProps {
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    heading: string;
    discount: string;
    discountType: string;
    code: string;
    validity: string;
    minShoppingValue: string;
    maxAvalibleDiscount: string;
}

function AvailableCoupon(props: IProps) {
    return (
        <Box className="couponData">
            <Box className="couponTopBox">
                <Box className="couponHeader">
                    <img src={arrowDown} alt="arrow-down" onClick={() => props.setOpenDrawer(false)} />
                    <Typography className="coupponHeading">
                        {props.heading}
                    </Typography>
                </Box>
                <Box className="couponContent">
                    <Box className="borderLine" sx={{ border: "1px solid rgba(48, 48, 48, 0.15)" }} />
                    <Box className="couponContentRow">
                        <Typography variant="h2">Discount Value : </Typography>
                        {props.discountType?.toLowerCase() === "fixed" ?
                        <Typography>&#8377;{TextUtils.commaSepratedFormat(props.discount)}</Typography>:
                        <Typography>{TextUtils.commaSepratedFormat(props.discount)}%</Typography>
                        }                        
                    </Box>
                    <Box className="couponContentRow">
                        <Typography variant="h2">Validity : </Typography>
                        <Typography>{props.validity}</Typography>
                    </Box>
                    {props.minShoppingValue != null && <Box className="couponContentRow">
                        <Typography variant="h2">Min Shopping Value : <span>(To redeem the coupon*)</span></Typography>
                        <Typography>&#8377;{TextUtils.commaSepratedFormat(props.minShoppingValue)}</Typography>
                    </Box>}
                    {props.maxAvalibleDiscount != null &&
                        <Box className="couponContentRow">
                            <Typography variant="h2">Maximum Applicable Discount: </Typography>
                            <Typography>&#8377;{TextUtils.commaSepratedFormat(props.maxAvalibleDiscount)}</Typography>
                        </Box>}
                </Box>
            </Box>
            <Box className="couponFooter">
                <Typography> Show this code at the counter to apply offers & rewards </Typography>
                <Box className="couponCodeBox availableCoupon">
                    <img src={Sucess} alt="success" />
                    <Typography variant="h2">{props.code}</Typography>
                </Box>
            </Box>
        </Box>
    );
}
export default AvailableCoupon;
