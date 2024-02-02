import { Box } from "@mui/material";
import {
  NavigationProps,
  NavigationState,
} from "../../navigation/Navigation.types";
import withRouter from "../../withRouter";
import RowListing, {
  ListingVarient,
} from "../common/listingUi/rowListing/RowListing";
import ProgressBarStructure from "./progressBarStructure/ProgressBarStructure";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageHeading from "../common/pageHeading/PageHeading";
import BottomDrawer from "../common/bottomDrawer/BottomDrawer";
import ProfileDetails from "../profile/profileDetails/ProfileDetails";
import UserManager from "../../core/utils/UserManager";
import RewardService from "../../services/RewardService";
import { RewardList } from "../../core/models/RewardList";
import Reward, { rewardType } from "../../core/models/Reward";
import { CouponHistoryType } from "../../core/models/CouponHistory";
import { ApiError } from "../../core/webservice/ApiError";
import UserService from "../../services/UserService";
import Loader from "../common/loader/Loader";
import DataNotFound from "../common/dataNotFound/DataNotFound";
import TextUtils from "../../core/utils/TextUtils";
import { showApiErrorMessage } from "../common/customeToast/MessageNotifier";
import SkeletonLoader from "../common/skeletonLoader/SkeletonLoader";
interface IProps {
  router: NavigationProps;
  states: NavigationState;
}

function Home(props: IProps) {
  const [pageLoader, setPageLoader] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedObj, setSelectedObj] = useState<Reward>();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [flag, setFlag] = useState({
    hasMore: true,
    availableData: false,
    higherData: false,
  });
  const [pageCount, setPageCount] = useState(1);
  const userDetails = UserManager.shared().user;
  const [dataNotFoundFlag, setDataNotFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const apiHandler = () => {
      Promise.all([
        RewardService.getRewardList(pageCount),
        UserService.getUserProfile(),
      ])
        .then((_results) => {
          if (_results[0].rewardList.length > 0) {
            setRewards(_results[0].rewardList);
          } else {
            setDataNotFound(false);
          }
          setFlag({
            ...flag,
            availableData: _results[0].rewardList.some(
              (data) => data.reward_type == rewardType.AVAILABLE_REWARD
            ),
            higherData: _results[0].rewardList.some(
              (data) => data.reward_type == rewardType.HIGHER_REWARD
            ),
          });
          setPageCount(pageCount + 1);
          setIsLoading(false);
          if ("userId" in _results[1]) {
            UserManager.shared().setUser(_results[1]);
            setPageLoader(true);
          }
        })
        .catch((apiError: ApiError) => {
          setPageLoader(true);
          setIsLoading(false);
          console.log(apiError.message);
        });
    };
    apiHandler();
  }, []);

  const fetchMoreData = () => {
    setIsLoading(true)
    const rewardData = RewardService.getRewardList(pageCount);
    rewardData.then((resp: RewardList) => {
      if (resp.rewardList.length !== 0) {
        setFlag({
          ...flag,
          availableData: resp.rewardList.some(
            (data) => data.reward_type == rewardType.AVAILABLE_REWARD
          ),
          higherData: resp.rewardList.some(
            (data) => data.reward_type == rewardType.HIGHER_REWARD
          ),
        });
        const newList = rewards.concat(resp.rewardList);
        setRewards(newList);
        setPageCount(pageCount + 1);
        setIsLoading(false);
      } else {
        setFlag({
          ...flag,
          hasMore: false,
        });
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      {!pageLoader ? (
        <SkeletonLoader
          boxCount={10}
          height={100}
        />
      ) : (
        <>
          <ProfileDetails
            redeemablePointsName="Redeemable Points"
            redeemablePointsCount={TextUtils.commaSepratedFormat(
              userDetails?.loyalty?.current_points.toString()
            )}
            profileName={userDetails?.name}
            phone={userDetails?.phone}
            profieImg={userDetails?.imgUrl}
            clickBtnFunctionality={true}
          />
          {userDetails.loyalty.current_points <
            userDetails.loyalty.requiredPoints &&
            userDetails.loyalty.tierName != null && <ProgressBarStructure />}
          {dataNotFoundFlag ? (
            <>
              {flag.availableData ? (
                <Box margin={"29px 0"}>
                  <PageHeading heading="Available Rewards" />

                  <InfiniteScroll
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                    dataLength={rewards.length}
                    next={fetchMoreData}
                    hasMore={flag.hasMore}
                    loader={
                      !flag.higherData && (
                        <SkeletonLoader
                          boxCount={10}
                          height={100}
                        />
                      )
                    }
                  >
                    {rewards.map((resp: Reward, index: number) => {
                      return (
                        <>
                          <RowListing
                            key={index}
                            varient={ListingVarient.REWARDS}
                            imgSrc={resp?.image}
                            validDate={resp?.getValidTill()}
                            heading={resp?.promo_title}
                            pointReq={resp?.point_required}
                            linkTitle="Tap to know more"
                            setOpenDrawer={setOpenDrawer}
                            objSelectedValue={resp}
                            setSelectedObj={setSelectedObj}
                          />
                        </>
                      );
                    })}
                  </InfiniteScroll>
                </Box>
              ) : (
                <SkeletonLoader
                  boxCount={10}
                  height={100}
                />
              )}

              {flag.higherData && (
                <Box margin={"29px 0"}>
                  <PageHeading heading="Higher Rewards" />
                  <InfiniteScroll
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                    dataLength={rewards.length}
                    next={fetchMoreData}
                    hasMore={flag.hasMore}
                    loader={
                      <SkeletonLoader
                        boxCount={10}
                        height={100}
                      />
                    }
                  >
                    {rewards.map((resp: Reward, index: number) => {
                      return (
                        <RowListing
                          key={index}
                          varient={ListingVarient.REWARDS}
                          imgSrc={resp?.image}
                          validDate={resp?.getValidTill()}
                          heading={resp?.promo_title}
                          pointReq={resp?.point_required}
                          linkTitle="Tap to know more"
                          setOpenDrawer={setOpenDrawer}
                          objSelectedValue={resp}
                          setSelectedObj={setSelectedObj}
                        />
                      );
                    })}
                  </InfiniteScroll>
                </Box>
              )}

              <BottomDrawer
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                heading={selectedObj?.promo_title}
                validity={`${selectedObj?.getValidFrom()} - ${selectedObj?.getValidTill()}`}
                discount={selectedObj?.discount_value}
                code={selectedObj?.coupon_code}
                minShoppingValue={selectedObj?.min_shopping_value}
                maxAvalibleDiscount={selectedObj?.max_discount_value}
                varient={CouponHistoryType.AVAILABLE}
                discountType={selectedObj?.discount_type}
              />
            </>
          ) : (
            <DataNotFound message="No Reward Available." boxHeight="60vh" />
          )}
        </>
      )}
    </>
  );
}
export default withRouter(Home);
