import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CouponHistoryType } from "../../../core/models/CouponHistory";
import PointHistory from "../../../core/models/PointHistory";
import { PointHistoryList } from "../../../core/models/PointHistoryList";
import DateUtils from "../../../core/utils/DateUtils";
import PointService from "../../../services/PointService";
import BottomDrawer from "../../common/bottomDrawer/BottomDrawer";
import DataNotFound from "../../common/dataNotFound/DataNotFound";
import RowListing, {
  ListingVarient,
} from "../../common/listingUi/rowListing/RowListing";
import Loader from "../../common/loader/Loader";
import TextUtils from "../../../core/utils/TextUtils";
import SkeletonLoader from "../../common/skeletonLoader/SkeletonLoader";
import { ApiError } from "../../../core/webservice/ApiError";
import RewardsHistoryLoader from "../../common/skeletonLoader/RewardsHistoryLoader/RewardsHistoryLoader";

function PointList() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [data, setData] = useState<PointHistory[]>([]);
  const [selectedObj, setSelectedObj] = useState<PointHistory>();
  const [dataNotFoundFlag, setDataNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [flag, setFlag] = useState({
    hasMore: true,
  });

  useEffect(() => {
    setIsLoading(true)
    const pointHistoryListData = PointService.getPointHistory(pageCount);
    pointHistoryListData.then((resp: PointHistoryList) => {
      if (resp.pointHistoryList.length > 0) {
        setData(resp.pointHistoryList);
      } else {
        setDataNotFound(false);
      }
      setPageCount(pageCount + 1);
      setIsLoading(false)
    });
  }, []);

  const fetchMoreData = () => {
    setIsLoading(true)
    const historyListData = PointService.getPointHistory(pageCount);
    historyListData.then((resp: PointHistoryList) => {
      if (resp.pointHistoryList.length !== 0) {
        const newList = data.concat(resp.pointHistoryList);
        setData(newList);
        setPageCount(pageCount + 1);
        setIsLoading(false)
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
  function dateFormate(timeStamp: string): string {
    return DateUtils.displayDateWithTimeStamp(timeStamp);
  }
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
                margin: "29px 0",
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
                      validDate={obj.getValidTill()}
                      heading={obj.getHeading()}
                      storeName={obj.storeName}
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
            date={
              !TextUtils.isEmpty(selectedObj?.getExpiredOn())
                ? ""
                : dateFormate(selectedObj?.date)
            }
            expiresOn={selectedObj?.getExpiresOn()}
            expiredOn={selectedObj?.getExpiredOn()}
            redeemedOn={selectedObj?.getIssueDate()}
            reason={selectedObj?.reason}
            invoicenumber={
              selectedObj?.invoice_id === null ||
                selectedObj?.invoice_id === undefined
                ? ""
                : selectedObj?.invoice_id
            }
            billNo={
              selectedObj?.billAmount === null ||
                selectedObj?.billAmount === undefined
                ? ""
                : selectedObj?.billAmount
            }
            store={selectedObj?.storeName}
            validity={`${selectedObj?.getValidFrom()} - ${selectedObj?.getValidTill()}`}
            varient={CouponHistoryType?.POINTS}
          />
        </>
      ) : (
        <DataNotFound message="No coupon history available." boxHeight="60vh" />
      )}
    </>
  );
}
export default PointList;
