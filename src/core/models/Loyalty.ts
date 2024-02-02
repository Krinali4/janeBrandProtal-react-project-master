export type INextTierInfo = {
  tier_id?: string,
  tier_name?: string,
  points?: string,
  requiredPoints?: number
}

export type IUserLoyalty = {
  customer_tier: string;
  current_points: number;
  member_since: string;
  points_redeemed: string;
  points_expired: number;
  profile_completion_rule_exist: boolean;
  profile_completion_percentage: number;
  profile_completion_points: string;
  next_tier_info?: INextTierInfo;
  lifetime_points: number;
  money_saved: number;
  points_expiring_soon: number;
};

export default class Loyalty {

  private mCustomer_tier: string;
  public get customer_tier() {
    return this.mCustomer_tier;
  }
  private mCurrent_points: number;
  public get current_points() {
    return this.mCurrent_points;
  }

  private mMember_since: string;
  public get member_since() {
    return this.mMember_since;
  }

  private mPoints_redeemed: string;
  public get points_redeemed() {
    return this.mPoints_redeemed;
  }

  private mPoints_expired: number;
  public get points_expired() {
    return this.mPoints_expired;
  }

  private mProfile_completion_rule_exist: boolean;
  public get profile_completion_rule_exist() {
    return this.mProfile_completion_rule_exist;
  }

  private mProfile_completion_percentage: number;
  public get profile_completion_percentage() {
    return this.mProfile_completion_percentage;
  }

  private mProfile_completion_points: string;
  public get profile_completion_points() {
    return this.mProfile_completion_points;
  }
  // private mNext_tier_info: INextTierInfo;
  // public get next_tier_info() {
  //   return this.mNext_tier_info;
  // }

  private mLifetime_points: number;
  public get lifetime_points() {
    return this.mLifetime_points;
  }
  private mMoney_saved: number;
  public get money_saved() {
    return this.mMoney_saved;
  }
  private mPoints_expiring_soon: number;
  public get points_expiring_soon() {
    return this.mPoints_expiring_soon;
  }

  private mRequiredPoints: number;
  public get requiredPoints() {
    return this.mRequiredPoints;
  }
  private mPoints: string;
  public get points() {
    return this.mPoints;
  }
  private mTierName: string;
  public get tierName() {
    return this.mTierName;
  }

  constructor(res: IUserLoyalty) {
    this.mCustomer_tier = res.customer_tier
    this.mCurrent_points = res.current_points
    this.mMember_since = res.member_since
    this.mPoints_redeemed = res.points_redeemed
    this.mPoints_expired = res.points_expired
    this.mProfile_completion_rule_exist = res.profile_completion_rule_exist
    this.mProfile_completion_percentage = res.profile_completion_percentage
    this.mProfile_completion_points = res.profile_completion_points
    this.mLifetime_points = res.lifetime_points
    this.mMoney_saved = res.money_saved
    this.mPoints_expiring_soon = res.points_expiring_soon
    if ("requiredPoints" in res.next_tier_info) {
      this.mRequiredPoints = res.next_tier_info.requiredPoints;
    } else {
      this.mRequiredPoints = null;
    }
    if ("points" in res.next_tier_info) {
      this.mPoints = res.next_tier_info.points;
    } else {
      this.mPoints = null;
    }
    if ("tier_name" in res.next_tier_info) {
      this.mTierName = res.next_tier_info.tier_name;
    } else {
      this.mTierName = null;
    }
  }

}