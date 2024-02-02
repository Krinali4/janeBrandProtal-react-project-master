import { Box } from "@mui/material";
import { CouponHistoryType } from "../../../core/models/CouponHistory";
import { discountType } from "../../../core/models/Reward";
import AvailableCoupon from "./availableCoupon/AvailableCoupon";
import ExpiredCoupon from "./expiredCoupon/ExpiredCoupon";
import RedeemedCoupon from "./redeemedCoupon/RedeemedCoupon";
import RedeemedPoint from "./redeemedPoint/RedeemedPoint";

interface IProps {
    varient: CouponHistoryType,
    heading?: string,
    discount?: string,
    reason?:string,
    date?:string,
    store?:string,
    expiresOn?: string,
    expiredOn?: string,
    code?: string,
    invoicenumber?:string,
    validity?: string,
    redeemedOn?: string,
    billNo?: string | number,
    minShoppingValue?: string,
    maxAvalibleDiscount?: string,
    setOpenDrawer?:React.Dispatch<React.SetStateAction<boolean>>,
    discountType?:discountType
}

function Root(props: IProps) {

    return (
        <Box sx={{maxWidth:"428px", margin:"0 auto", width:"100%"}}>
            {props.varient == CouponHistoryType.AVAILABLE && <AvailableCoupon 
              heading={props.heading}
              code={props.code}
              validity={props.validity}
              discount={props.discount}
              discountType={props.discountType}
              minShoppingValue={props.minShoppingValue}
              maxAvalibleDiscount={props.maxAvalibleDiscount}
              setOpenDrawer={props.setOpenDrawer}
            />}

            {props.varient == CouponHistoryType.EXPIRED && <ExpiredCoupon
                heading={props.heading}
                code={props.code}
                expiredOn={props.expiredOn}
                discount={props.discount}
                discountType={props.discountType}
                reason={props.reason}
                setOpenDrawer={props.setOpenDrawer}
            />}

            {props.varient == CouponHistoryType.REDEEM && <RedeemedCoupon
                heading={props.heading}
                code={props.code}
                validity={props.validity}
                billNo={props.billNo}
                redeemedOn={props.redeemedOn}
                discount={props.discount}
                // reason={props.reason}
                discountType={props.discountType}
                setOpenDrawer={props.setOpenDrawer}
            />}

           {props.varient == CouponHistoryType.POINTS  && <RedeemedPoint
                heading={props.heading}
                date={props.date}
                expiresOn={props.expiresOn}
                expiredOn={props.expiredOn}
                reason={props.reason}
                billNo={props.billNo}
                invoicenumber={props.invoicenumber}
                store={props.store}
                setOpenDrawer={props.setOpenDrawer}
            />} 
        </Box>
    )

}
export default Root;