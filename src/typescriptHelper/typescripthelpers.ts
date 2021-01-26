/* eslint-disable camelcase */
export interface CryptoData extends FetchedCryptoObject {
  hits?: {
    data?: {
      market_data: {
        price_change_percentage_24h: number;
        current_price: { usd: number };
        market_cap_rank: number;
      };
      image: {
        large: string;
      };
      symbol: string;
      name: string;
      market_cap_rank: number;
    };
  };
  open?: boolean;
  errorMessage?: string;
}

export interface InputProps extends CryptoData {
  loading: boolean;
  passChildData: (cryptoValue: StateInfo) => void;
  clearData: (arg: CryptoData) => void;
}

export interface FetchedCryptoObject {
  data?: {
    market_data: {
      price_change_percentage_24h: number;
      current_price: { usd: number };
      market_cap_rank: number;
    };
    image: {
      large: string;
    };
    symbol: string;
    name: string;
    market_cap_rank: number;
  };
}

export interface FetchData {
  props?: {
    data?: {
      market_data: {
        price_change_percentage_24h: number;
        current_price: { usd: number };
        market_cap_rank: number;
      };
      image: {
        large: string;
      };
      symbol: string;
      name: string;
      market_cap_rank: number;
    };
  };
}

export interface StateInfo {
  name?: string;
}

export interface GraphData {
  data?: {
    prices: Array<Array<number>>;
  };
}

export interface ChartProps extends GraphData {
  props: {
    data?: {
      prices: Array<Array<number>>;
    };
  };
}
