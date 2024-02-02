import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Root from "../couponType/root";
import { Global } from "@emotion/react";
import { CouponHistoryType } from "../../../core/models/CouponHistory";
import { discountType } from "../../../core/models/Reward";
interface Props {
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    openDrawer: boolean;
    varient: CouponHistoryType,
    heading?: string,
    date?:string,
    discount?: string,
    expiresOn?: string,
    expiredOn?: string,
    invoicenumber?:string,
    store?:string,
    reason?:string,
    code?: string
    validity?: string,
    redeemedOn?: string,
    billNo?: string | number,
    minShoppingValue?: string,
    maxAvalibleDiscount?: string,
    discountType?:discountType
}
export default function BottomDrawer(props: Props): JSX.Element {
    
    const couponRecords = () => (
        <Root
            varient={props.varient}
            heading={props.heading}
            code={props.code}
            date={props.date}
            validity={props.validity}
            store={props.store}
            reason={props.reason}
            discount={props.discount}
            invoicenumber={props.invoicenumber}
            minShoppingValue={props.minShoppingValue}
            maxAvalibleDiscount={props.maxAvalibleDiscount}
            expiresOn={props.expiresOn}
            expiredOn={props.expiredOn}
            billNo={props.billNo}
            redeemedOn={props.redeemedOn}
            setOpenDrawer={props.setOpenDrawer}
            discountType={props.discountType}
        />
    );
    const closeEvent = () => {
        props.setOpenDrawer(false);
    };

    const openEvent = () => {
        props.setOpenDrawer(true);
    };
    return (
        <div>
            <React.Fragment>
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                            borderRadius: "10px 10px 0px 0px",
                            backgroundColor: "#EBEBEB",
                            maxWidth: "428px",
                            width: "100%",
                            margin: "0 auto",
                        },
                    }}
                />
                <SwipeableDrawer
                    anchor={"bottom"}
                    open={props.openDrawer}
                    onClose={closeEvent}
                    onOpen={openEvent}
                >
                    {couponRecords()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
