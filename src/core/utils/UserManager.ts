import Merchant, { IMerchant } from '../models/Merchant';
import User, { IUser } from '../models/User';
import SessionManager from './SessionManager';

export default class UserManager {

  public static shared(): UserManager {
    if (!UserManager.sUserManager) {
      UserManager.sUserManager = new UserManager();
    }
    return UserManager.sUserManager;
  }

  private static sUserManager: UserManager | null;

  private constructor() { }

  public init() {

  }

  // get user
  private mUser: User | undefined | null;
  public get user() {
    return this.mUser;
  }

  // set user
  public setUser(user: User | undefined) {
    this.mUser = user
  }

  // update user
  public updateUser(updatedUser: User) {
    this.setUser(updatedUser)
  }

  // reset wallet user
  public resetUser() {
    this.setUser(undefined)
  }

  // public doLogout() {
  //   this.resetUser()
  //   SessionManager.shared().clearSession()
  //   UserManager.sUserManager = undefined
  // }

  // get merchant
  private mMerchant: Merchant | undefined | null;

  public get merchant() {
    return this.mMerchant;
  }

  // set merchant
  public setMerchant(Merchant: Merchant | undefined) {
    this.mMerchant = Merchant
  }

  // update merchant
  public updateMerchant(updatedMerchant: Merchant) {
    this.setMerchant(updatedMerchant)
  }

  // reset wallet merchant
  public resetMerchant() {
    this.setMerchant(undefined)
  }
}
