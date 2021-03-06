import { WalletAddressCategory, WalletBalance, WalletTransaction } from 'electra-js'
import { GetTransactions } from '../transactions/types'

export interface StateProps {
  overview: OverviewState
  transactions: {
    transactions: WalletTransaction[]
  }
}

export interface Dispatchers {
  getCurrentPriceInBTC(): GetCurrentPriceBTC
  getCurrentPriceInUSD(): GetCurrentPriceUSD
  getBalance(category?: WalletAddressCategory): GetGlobalBalance
}
export interface DispatchProps extends Dispatchers {
  getTransactions(category?: WalletAddressCategory): GetTransactions
}

export interface OverviewState {
  currentPriceBTC: number
  currentPriceUSD: number
  confirmedBalance: number
  isLoading: boolean
  unconfirmedBalance: number
}

/**
 * Properties
 */
export interface OwnProps {
  category?: WalletAddressCategory
}

/**
 * action types
 */
export type GET_GLOBAL_BALANCE = 'GET_GLOBAL_BALANCE'
export type GET_GLOBAL_BALANCE_SUCCESS = 'GET_GLOBAL_BALANCE_SUCCESS'
export type GET_GLOBAL_BALANCE_FAIL = 'GET_GLOBAL_BALANCE_FAIL'

export type GET_CURRENT_PRICE_USD = 'GET_CURRENT_PRICE_USD'
export type GET_CURRENT_PRICE_USD_SUCCESS = 'GET_CURRENT_PRICE_USD_SUCCESS'
export type GET_CURRENT_PRICE_USD_FAIL = 'GET_CURRENT_PRICE_USD_FAIL'

export type GET_CURRENT_PRICE_BTC = 'GET_CURRENT_PRICE_BTC'
export type GET_CURRENT_PRICE_BTC_SUCCESS = 'GET_CURRENT_PRICE_BTC_SUCCESS'
export type GET_CURRENT_PRICE_BTC_FAIL = 'GET_CURRENT_PRICE_BTC_FAIL'

/**
 * action interfaces
 */
export interface GetGlobalBalance {
  type: GET_GLOBAL_BALANCE
  payload: WalletAddressCategory | undefined
}

export interface GetGlobalBalanceSuccess {
  type: GET_GLOBAL_BALANCE_SUCCESS
  payload: WalletBalance
}

export interface GetGlobalBalanceFail {
  type: GET_GLOBAL_BALANCE_FAIL
}

export interface GetCurrentPriceUSD {
  type: GET_CURRENT_PRICE_USD
}

export interface GetCurrentPriceUSDSuccess {
  type: GET_CURRENT_PRICE_USD_SUCCESS
  payload: number
}

export interface GetCurrentPriceUSDFail {
  type: GET_CURRENT_PRICE_USD_FAIL
}

export interface GetCurrentPriceBTC {
  type: GET_CURRENT_PRICE_BTC
}

export interface GetCurrentPriceBTCSuccess {
  type: GET_CURRENT_PRICE_BTC_SUCCESS
  payload: number
}

export interface GetCurrentPriceBTCFail {
  type: GET_CURRENT_PRICE_BTC_FAIL
}

export type GlobalBalanceActions =  GetGlobalBalance |
                                    GetGlobalBalanceSuccess |
                                    GetGlobalBalanceFail

export type CurrentPriceActions =   GetCurrentPriceUSD |
                                    GetCurrentPriceUSDSuccess |
                                    GetCurrentPriceUSDFail |
                                    GetCurrentPriceBTC |
                                    GetCurrentPriceBTCSuccess |
                                    GetCurrentPriceBTCFail

export type BalanceTypes = GET_GLOBAL_BALANCE | GET_GLOBAL_BALANCE_FAIL | GET_GLOBAL_BALANCE_SUCCESS
export type OtherBalanceTypes = GET_CURRENT_PRICE_BTC | GET_CURRENT_PRICE_BTC_FAIL | GET_CURRENT_PRICE_BTC_SUCCESS |
                                GET_CURRENT_PRICE_USD | GET_CURRENT_PRICE_USD_FAIL | GET_CURRENT_PRICE_USD_SUCCESS

export interface GlobalBalanceObservable {
  payload?: WalletBalance
  type: BalanceTypes
}
export interface GlobalBalanceOtherObservable {
  payload?: number
  type: OtherBalanceTypes
}

export type OverviewActions =   GlobalBalanceActions |
                                CurrentPriceActions
