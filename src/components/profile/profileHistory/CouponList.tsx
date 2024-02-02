import { Box } from "@mui/material";
import RowListing, {
  ListingVarient,
} from "../../common/listingUi/rowListing/RowListing";
import BottomDrawer from "../../common/bottomDrawer/BottomDrawer";
import { useEffect, useState } from "react";
import RewardService from "../../../services/RewardService";
import CouponHistory, {
  CouponHistoryType,
} from "../../../core/models/CouponHistory";
import { CouponHistoryList } from "../../../core/models/CouponHistoryList";
import InfiniteScroll from "react-infinite-scroll-component";
import DataNotFound from "../../common/dataNotFound/DataNotFound";
import Loader from "../../common/loader/Loader";
import SkeletonLoader from "../../common/skeletonLoader/SkeletonLoader";
import { ApiError } from "../../../core/webservice/ApiError";
import RewardsHistoryLoader from "../../common/skeletonLoader/RewardsHistoryLoader/RewardsHistoryLoader";
function CouponList() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [data, setData] = useState<CouponHistory[]>([]);
  const [selectedObj, setSelectedObj] = useState<CouponHistory>();
  const [pageCountForHistoryList, setPageCountForHistoryList] = useState(1);
  const [dataNotFoundFlag, setDataNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState({
    hasMore: true,
  });

  useEffect(() => {
    setIsLoading(true)
    const couponHistoryListData = RewardService.getCouponHistoryList(
      pageCountForHistoryList
    );
    couponHistoryListData.then((resp: CouponHistoryList) => {
      if (resp.couponHistoryList.length > 0) {
        setData(resp.couponHistoryList);
      } else {
        setDataNotFound(false);
      }
      setPageCountForHistoryList(pageCountForHistoryList + 1);
      setIsLoading(false)
    });
  }, []);

  const fetchMoreData = () => {
    setIsLoading(true)
    const historyListData = RewardService.getCouponHistoryList(
      pageCountForHistoryList
    );
    historyListData.then((resp: CouponHistoryList) => {
      if (resp.couponHistoryList.length !== 0) {
        const newList = data.concat(resp.couponHistoryList);
        setData(newList);
        setPageCountForHistoryList(pageCountForHistoryList + 1);
        setIsLoading(false);
      } else {
        setFlag({
          ...flag,
          hasMore: false,
        });
        setIsLoading(false)
      }
    })
      .catch((apiError: ApiError) => {
        setIsLoading(false);
        console.log(apiError.message);
      });
  };
  return (
    <>
      {dataNotFoundFlag ? (
        <>
          <Box>
            <InfiniteScroll
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={flag.hasMore}
              loader={
                <RewardsHistoryLoader />
              }
            >
              {data.map((obj, index) => {
                return (
                  <Box>
                    <RowListing
                      key={index}
                      varient={ListingVarient.COUPONS}
                      validDate={
                        obj.type == CouponHistoryType.REDEEM
                          ? obj.getRedemptionDate()
                          : obj.getExpiredDate()
                      }
                      heading={obj.getHeading()}
                      setOpenDrawer={setOpenDrawer}
                      objSelectedValue={obj}
                      setSelectedObj={setSelectedObj}
                    />
                  </Box>
                );
              })}

            </InfiniteScroll>

          </Box>

          <BottomDrawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            heading={selectedObj?.getHeading()}
            discount={selectedObj?.discountValue}
            code={selectedObj?.couponCode}
            minShoppingValue={selectedObj?.minShoppingValue}
            expiredOn={selectedObj?.getExpiredDate()}
            redeemedOn={selectedObj?.getRedemptionDate()}
            billNo={selectedObj?.redeemedBillNo}
            validity={`${selectedObj?.getValidFrom()} - ${selectedObj?.getValidTill()}`}
            maxAvalibleDiscount={selectedObj?.maxDiscountValue}
            varient={selectedObj?.type}
            discountType={selectedObj?.discountType}
          />
        </>
      ) : (
        <DataNotFound message="No coupon history available." boxHeight="60vh" />
      )}
    </>
  );
}
export default CouponList;
