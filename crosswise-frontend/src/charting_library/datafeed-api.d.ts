/* eslint-disable */
// Generated by dts-bundle-generator v5.3.0

export declare type DomeCallback = (data: DOMData) => void
export declare type ErrorCallback = (reason: string) => void
export declare type GetMarksCallback<T> = (marks: T[]) => void
export declare type HistoryCallback = (bars: Bar[], meta?: HistoryMetadata) => void
export declare type MarkConstColors = 'red' | 'green' | 'blue' | 'yellow'
/**
 * This is the generic type useful for declaring a nominal type,
 * which does not structurally matches with the base type and
 * the other types declared over the same base type
 *
 * Usage:
 * @example
 * type Index = Nominal<number, 'Index'>;
 * // let i: Index = 42; // this fails to compile
 * let i: Index = 42 as Index; // OK
 * @example
 * type TagName = Nominal<string, 'TagName'>;
 */
export declare type Nominal<T, Name extends string> = T & {
  [Symbol.species]: Name
}
export declare type OnReadyCallback = (configuration: DatafeedConfiguration) => void
export declare type QuoteData = QuoteOkData | QuoteErrorData
export declare type QuotesCallback = (data: QuoteData[]) => void
export declare type ResolutionString = Nominal<string, 'ResolutionString'>
export declare type ResolveCallback = (symbolInfo: LibrarySymbolInfo) => void
export declare type SearchSymbolsCallback = (items: SearchSymbolResultItem[]) => void
export declare type SeriesFormat = 'price' | 'volume'
export declare type ServerTimeCallback = (serverTime: number) => void
export declare type SubscribeBarsCallback = (bar: Bar) => void
export declare type Timezone = 'Etc/UTC' | CustomTimezones
export interface Bar {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}
export interface DOMData {
  snapshot: boolean
  asks: DOMLevel[]
  bids: DOMLevel[]
}
export interface DOMLevel {
  price: number
  volume: number
}
export interface DatafeedConfiguration {
  exchanges?: Exchange[]
  supported_resolutions?: ResolutionString[]
  currency_codes?: string[]
  supports_marks?: boolean
  supports_time?: boolean
  supports_timescale_marks?: boolean
  symbols_types?: DatafeedSymbolType[]
}
export interface DatafeedQuoteValues {
  ch?: number
  chp?: number
  short_name?: string
  exchange?: string
  description?: string
  lp?: number
  ask?: number
  bid?: number
  spread?: number
  open_price?: number
  high_price?: number
  low_price?: number
  prev_close_price?: number
  volume?: number
  original_name?: string
  [valueName: string]: string | number | undefined
}
export interface DatafeedSymbolType {
  name: string
  value: string
}
export interface Exchange {
  value: string
  name: string
  desc: string
}
export interface HistoryMetadata {
  noData?: boolean
  nextTime?: number | null
}
export interface IDatafeedChartApi {
  getMarks?(
    symbolInfo: LibrarySymbolInfo,
    from: number,
    to: number,
    onDataCallback: GetMarksCallback<Mark>,
    resolution: ResolutionString,
  ): void
  getTimescaleMarks?(
    symbolInfo: LibrarySymbolInfo,
    from: number,
    to: number,
    onDataCallback: GetMarksCallback<TimescaleMark>,
    resolution: ResolutionString,
  ): void
  /**
   * This function is called if configuration flag supports_time is set to true when chart needs to know the server time.
   * The charting library expects callback to be called once.
   * The time is provided without milliseconds. Example: 1445324591. It is used to display Countdown on the price scale.
   */
  getServerTime?(callback: ServerTimeCallback): void
  searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void
  resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback,
    extension?: SymbolResolveExtension,
  ): void
  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: ErrorCallback,
  ): void
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void,
  ): void
  unsubscribeBars(listenerGuid: string): void
  subscribeDepth?(symbol: string, callback: DomeCallback): string
  unsubscribeDepth?(subscriberUID: string): void
  getVolumeProfileResolutionForPeriod?(
    currentResolution: ResolutionString,
    from: number,
    to: number,
    symbolInfo: LibrarySymbolInfo,
  ): ResolutionString
}
export interface IDatafeedQuotesApi {
  getQuotes(symbols: string[], onDataCallback: QuotesCallback, onErrorCallback: (msg: string) => void): void
  subscribeQuotes(
    symbols: string[],
    fastSymbols: string[],
    onRealtimeCallback: QuotesCallback,
    listenerGUID: string,
  ): void
  unsubscribeQuotes(listenerGUID: string): void
}
export interface IExternalDatafeed {
  onReady(callback: OnReadyCallback): void
}
export interface LibrarySymbolInfo {
  /**
   * Symbol Name
   */
  name: string
  full_name: string
  base_name?: [string]
  /**
   * Unique symbol id
   */
  ticker?: string
  description: string
  type: string
  /**
   * @example "1700-0200"
   */
  session: string
  session_display?: string
  /**
   * @example "20181105,20181107,20181112"
   */
  holidays?: string
  /**
   * @example "1900F4-2350F4,1000-1845:20181113;1000-1400:20181114"
   */
  corrections?: string
  /**
   * Traded exchange
   * @example "NYSE"
   */
  exchange: string
  listed_exchange: string
  timezone: Timezone
  /**
   * Prices format: "price" or "volume"
   */
  format: SeriesFormat
  /**
   * Code (Tick)
   * @example 8/16/.../256 (1/8/100 1/16/100 ... 1/256/100) or 1/10/.../10000000 (1 0.1 ... 0.0000001)
   */
  pricescale: number
  /**
   * The number of units that make up one tick.
   * @example For example, U.S. equities are quotes in decimals, and tick in decimals, and can go up +/- .01. So the tick increment is 1. But the e-mini S&P futures contract, though quoted in decimals, goes up in .25 increments, so the tick increment is 25. (see also Tick Size)
   */
  minmov: number
  fractional?: boolean
  /**
   * @example Quarters of 1/32: pricescale=128, minmovement=1, minmovement2=4
   */
  minmove2?: number
  /**
   * false if DWM only
   */
  has_intraday?: boolean
  /**
   * An array of resolutions which should be enabled in resolutions picker for this symbol.
   */
  supported_resolutions: ResolutionString[]
  /**
   * @example (for ex.: "1,5,60") - only these resolutions will be requested, all others will be built using them if possible
   */
  intraday_multipliers?: string[]
  has_seconds?: boolean
  has_ticks?: boolean
  /**
   * It is an array containing seconds resolutions (in seconds without a postfix) the datafeed builds by itself.
   */
  seconds_multipliers?: string[]
  has_daily?: boolean
  has_weekly_and_monthly?: boolean
  has_empty_bars?: boolean
  has_no_volume?: boolean
  /**
   * Integer showing typical volume value decimal places for this symbol
   */
  volume_precision?: number
  data_status?: 'streaming' | 'endofday' | 'pulsed' | 'delayed_streaming'
  /**
   * Boolean showing whether this symbol is expired futures contract or not.
   */
  expired?: boolean
  /**
   * Unix timestamp of expiration date.
   */
  expiration_date?: number
  sector?: string
  industry?: string
  currency_code?: string
  original_currency_code?: string
}
export interface Mark {
  id: string | number
  time: number
  color: MarkConstColors | MarkCustomColor
  text: string
  label: string
  labelFontColor: string
  minSize: number
}
export interface MarkCustomColor {
  color: string
  background: string
}
export interface PeriodParams {
  from: number
  to: number
  countBack: number
  firstDataRequest: boolean
}
export interface QuoteErrorData {
  s: 'error'
  n: string
  v: object
}
export interface QuoteOkData {
  s: 'ok'
  n: string
  v: DatafeedQuoteValues
}
export interface SearchSymbolResultItem {
  symbol: string
  full_name: string
  description: string
  exchange: string
  ticker: string
  type: string
}
export interface SymbolResolveExtension {
  currencyCode?: string
}
export interface TimescaleMark {
  id: string | number
  time: number
  color: MarkConstColors | string
  label: string
  tooltip: string[]
}
export type CustomTimezones =
  | 'Africa/Cairo'
  | 'Africa/Johannesburg'
  | 'Africa/Lagos'
  | 'America/Argentina/Buenos_Aires'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Chicago'
  | 'America/El_Salvador'
  | 'America/Juneau'
  | 'America/Lima'
  | 'America/Los_Angeles'
  | 'America/Mexico_City'
  | 'America/New_York'
  | 'America/Phoenix'
  | 'America/Santiago'
  | 'America/Sao_Paulo'
  | 'America/Toronto'
  | 'America/Vancouver'
  | 'Asia/Almaty'
  | 'Asia/Ashkhabad'
  | 'Asia/Bahrain'
  | 'Asia/Bangkok'
  | 'Asia/Chongqing'
  | 'Asia/Dubai'
  | 'Asia/Ho_Chi_Minh'
  | 'Asia/Hong_Kong'
  | 'Asia/Jakarta'
  | 'Asia/Jerusalem'
  | 'Asia/Kathmandu'
  | 'Asia/Kolkata'
  | 'Asia/Kuwait'
  | 'Asia/Muscat'
  | 'Asia/Qatar'
  | 'Asia/Riyadh'
  | 'Asia/Seoul'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Taipei'
  | 'Asia/Tehran'
  | 'Asia/Tokyo'
  | 'Atlantic/Reykjavik'
  | 'Australia/ACT'
  | 'Australia/Adelaide'
  | 'Australia/Brisbane'
  | 'Australia/Perth'
  | 'Australia/Sydney'
  | 'Europe/Amsterdam'
  | 'Europe/Athens'
  | 'Europe/Belgrade'
  | 'Europe/Berlin'
  | 'Europe/Brussels'
  | 'Europe/Copenhagen'
  | 'Europe/Dublin'
  | 'Europe/Helsinki'
  | 'Europe/Istanbul'
  | 'Europe/Lisbon'
  | 'Europe/London'
  | 'Europe/Luxembourg'
  | 'Europe/Madrid'
  | 'Europe/Malta'
  | 'Europe/Moscow'
  | 'Europe/Oslo'
  | 'Europe/Paris'
  | 'Europe/Riga'
  | 'Europe/Rome'
  | 'Europe/Stockholm'
  | 'Europe/Tallinn'
  | 'Europe/Vilnius'
  | 'Europe/Warsaw'
  | 'Europe/Zurich'
  | 'Pacific/Auckland'
  | 'Pacific/Chatham'
  | 'Pacific/Fakaofo'
  | 'Pacific/Honolulu'
  | 'Pacific/Norfolk'
  | 'US/Mountain'

export as namespace TradingView

export {}
