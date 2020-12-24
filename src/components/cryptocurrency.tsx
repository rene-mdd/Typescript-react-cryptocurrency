import * as React from 'react';
import { FetchData } from '../typescriptHelper/typescripthelpers';

export const CryptoCurrency: React.FunctionComponent<FetchData> = ({ props }: FetchData) => {
  if (props?.data) {
    const coinGrow = String(props.data.market_data.price_change_percentage_24h);
    return (
      <>
        <div>
          <h2>{props.data.name}</h2>
        </div>
        <img alt="Cryptocurrency-logo" src={`${props.data.image.large}`} />
        <ul>
          <li>Market cap rank {props.data.market_cap_rank}</li>
          <li>Price in $US {props.data.market_data.current_price.usd}</li>
          <li>Symbol: {props.data.symbol}</li>
          <li>
            Last 24h price change %
            <span className={`${coinGrow.includes('-') ? 'negative' : 'positive'}`}>
              {coinGrow}
            </span>
          </li>
        </ul>
      </>
    );
  }
  return null;
};
