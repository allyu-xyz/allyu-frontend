/* eslint-disable no-unused-vars */

export enum BillStatus {
  Unfunded = 'Unfunded',
  Funded = 'Funded',
  Redeemed = 'Redeemed'
}

export enum EventType {
  Request = 'Request',
  Issue = 'Issue',
  Fund = 'Fund',
  Redeem = 'Redeem'
}

export interface Bill {
  id: string
  value: string
  wordHash: string
  codeHash: string
  isFunded: boolean
  isRedeemed: boolean
}
export interface Event {
  billId: string
  type: EventType
}
