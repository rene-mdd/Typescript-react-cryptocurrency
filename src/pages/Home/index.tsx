import React, { useState } from 'react';
import { DataGraph } from '../../components/datagraph';
import { CryptoCurrency } from '../../components/cryptocurrency';
import axios, { AxiosResponse } from 'axios';
import FormContent from '../../components/formcontent';
//typescript interfaces / helpers
import { CryptoData, stateInfo, GraphData } from '../../typescriptHelper/typescripthelpers';
// Styles
import '../../styles/App.css';

function Home(): JSX.Element {
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    hits: {},
    open: false,
    errorMessage: '',
  });
  const [chartData, setChartData] = useState<GraphData>({});
  const [list, setList] = useState<Array<string>>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const cryptoValueObj = { name: '' };

  const inputDataFunc = (cryptoValue: stateInfo) => {
    Object.assign(cryptoValueObj, cryptoValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setList([...list, cryptoValueObj.name]);
    return axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoValueObj.name}`);
  };

  const chartSubmit = () => {
    return axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoValueObj.name}/market_chart?vs_currency=usd&days=7`,
    );
  };

  const fetchFunction = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoader(true);
    const bothFetchData: [Promise<AxiosResponse>, Promise<AxiosResponse>] = [
      handleSubmit(e),
      chartSubmit(),
    ];
    Promise.all(bothFetchData)
      .then((response: Array<CryptoData & GraphData>) => {
        const handleSubmit: CryptoData = response[0];
        setCryptoData({ hits: handleSubmit, open: true, errorMessage: '' });
        const handleGraph: GraphData = response[1];
        setChartData(handleGraph);
        setLoader(false);
      })
      .catch(function (error) {
        setCryptoData({
          hits: {},
          open: false,
          errorMessage:
            'There was an error. Maybe you did not use the cryptocurrency oficial name Ex. bitcoin, ripple, litecoin...',
        });
        setLoader(false);
        throw error;
      });
  };

  return (
    <div className="App">
      <div className="crypto-form">
        <div>
          <h2>Search a cryptocurrency</h2>
        </div>
        <form onSubmit={fetchFunction}>
          <FormContent passChildData={inputDataFunc} clearData={setCryptoData} loading={loader} />
        </form>
        <p className="negative">{cryptoData.errorMessage}</p>
      </div>

      <div className="history-class">
        <h2>Search history</h2>
        <ul>
          {list.map((name: string, index: number) => {
            return <li key={`${index}`}>{name}</li>;
          })}
        </ul>
      </div>

      <div className="crypto-info">
        {/* //Crypto currency data component */}
        {cryptoData.open ? <CryptoCurrency props={cryptoData.hits} /> : null}
      </div>

      <div className="chart-class">
        {/* //Graph component */}
        {cryptoData.open ? <DataGraph props={chartData} /> : null}
      </div>
    </div>
  );
}

export default Home;
