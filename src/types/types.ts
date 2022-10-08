/* eslint-disable no-unused-vars */

export interface Bill {
  id: string;
  value: string;
  wordHash: string;
  codeHash: string;
  isFunded: boolean;
  isRedeemed: boolean;
}

export enum BillStatus {
  Unfunded = "Unfunded",
  Funded = "Funded",
  Redeemed = "Redeemed",
}
