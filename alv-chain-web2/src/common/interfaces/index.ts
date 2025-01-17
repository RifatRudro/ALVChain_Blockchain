export type IOrderTxDetails = {
  txHash: string;
  chainId: number;
  userAddress?: string;
  stockAddress?: string;
  currencyAddress?: string;
  currencyAmount?: number;
  currencySymbol?: string;
  currencyAmountRaw?: string;
  stockAmountRaw?: string;
};
