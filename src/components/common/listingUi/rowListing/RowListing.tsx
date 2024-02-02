import { Link, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import CouponHistory from "../../../../core/models/CouponHistory";
import PointHistory from "../../../../core/models/PointHistory";
import Reward from "../../../../core/models/Reward";
import "../ListingUi.scss";

export enum ListingVarient {
    REWARDS = "rewards",
    COUPONS = "coupons",
}

interface IProps {
    imgSrc?: any,
    validDate?: string,
    heading?: string,
    pointReq?: string,
    linkTitle?: string,
    varient: string,
    setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedObj?: React.Dispatch<React.SetStateAction<any>>,
    objSelectedValue?: Reward | CouponHistory | PointHistory,
    storeName?: string
}

function RowListing(props: IProps) {

    const [date, setDate] = useState({
        day: null,
        month: null,
        year: null,
        monthName: null
    });

    useEffect(() => {
        const dateSplit = props.validDate.split("/");
        let month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        setDate({
            year: dateSplit[2],
            month: dateSplit[1],
            day: dateSplit[0],
            monthName: month_names_short[parseInt(dateSplit[1]) - 1]
        })
    }, [])
    return (
        <Box>
            {props?.varient === ListingVarient.REWARDS &&
                <Box className="rowListing" onClick={() => {
                    props.setSelectedObj(props.objSelectedValue)
                    props.setOpenDrawer(true)
                }}>
                    <Box className="borderBox">
                        <Box className="rowListingLeft">
                            <Box>
                                <img src={props.imgSrc} height="66px" width="66px" />
                            </Box>
                        </Box>
                        <Box className="rowListingRight">
                            <Typography variant="h2">{props.heading}</Typography>
                            <Box display="flex">
                                <Box display="flex">
                                    <Typography variant="h4">Valid Upto: {`${props.validDate}`}
                                        {props.pointReq &&
                                            <><span>|</span> Points Required: {props.pointReq}</>}
                                    </Typography>
                                </Box>
                            </Box>
                            <Link color={"inherit"}>{props.linkTitle}</Link>
                        </Box>
                    </Box>
                </Box>
            }

            {props?.varient === ListingVarient.COUPONS &&
                <Box className="rowListing" onClick={() => {
                    props.setSelectedObj(props.objSelectedValue)
                    props.setOpenDrawer(true)
                }}>
                    <Box className="borderBox">
                        <Box className="rowListingLeft">
                            <Box>
                                <Typography variant="h1">{date.day}</Typography>
                                <Typography >{date.monthName} , {date.year}</Typography>

                            </Box>
                        </Box>
                        <Box className="rowListingRight">
                            <Typography variant="h2"
                            >{props.heading}</Typography>
                            {props.storeName && <Typography variant="h4">Store: {`${props.storeName}`}</Typography>}
                            <Link color={"inherit"} >{props.linkTitle}</Link>
                        </Box>
                    </Box>
                </Box>
            }


        </Box>
    )
}

export default RowListing;