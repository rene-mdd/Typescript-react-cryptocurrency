import "../../styles/App.css";
import { DataGraph } from "../../components/chart";
import { Cryptocurrency } from "../../components/cryptocurrency";
import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";
//typescript interfaces / helpers
import { CryptoData, StateInfo, GraphData } from "../../helpers/typescripthelpers";

function Home(): JSX.Element {
  const [cryptoData, setCryptoData] = useState<CryptoData>({ hits: {}, open: false, errorMessage: "" });
  const [chartData, setChartData] = useState<GraphData>({});
  const [user, setUser] = useState<StateInfo>({ name: "", user: "" });
  const [list, setList] = useState<Array<string>>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setList([...list, user.name]);
    return axios.get(
      `https://api.coingecko.com/api/v3/coins/${user.name}`,
    );
  };

  const chartSubmit = () => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${user.name}/market_chart?vs_currency=usd&days=7`);
  };

  const fetchFunction = (e: React.FormEvent<HTMLButtonElement>) => {

    setLoader(true);

    const bothFetchData: [Promise<AxiosResponse>, Promise<AxiosResponse>] = [handleSubmit(e), chartSubmit()];
    Promise.all(bothFetchData)
      .then((response: Array<CryptoData & GraphData>) => {
        const handleSubmit: CryptoData = response[0];
        setCryptoData({ hits: handleSubmit, open: true, errorMessage: "" });
        const handleGraph: GraphData = response[1];
        setChartData(handleGraph);
        setLoader(false);
      }).catch(function (error) {
        setCryptoData({ hits: {}, open: false, errorMessage: "There was an error. Remember you must use the cryptocurrency oficial name Ex. bitcoin, ripple, litecoin..." });
        setLoader(false);
        console.log(error);
      });
  };

  const clearFunction = () => {
    setCryptoData({ hits: {}, open: false });
    setUser({ name: "" });
  };
  console.log(cryptoData);

  return (

    <div className="App">

      <div className="crypto-form">
        <div><h2>Search a cryptocurrency</h2></div>
        <form>
          <input type="text" value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })} />
          <button type="button" onClick={fetchFunction} disabled={loader}>Submit<span className={`${loader && "loading"}`}></span></button>
          <button type="button" onClick={clearFunction}>Clear</button>
        </form>
        <p className="negative">{cryptoData.errorMessage}</p>
      </div>

      <div className="history-class">
        <div><h2>Search history</h2></div>
        <ul>
          {list.map((name: string, index: number) => {
            return <li key={`${index}`}>{name}</li>;
          })}
        </ul>
      </div>

      <div className="crypto-info">
        {/* //Crypto currency data component */}
        {cryptoData.open ?
          <Cryptocurrency props={cryptoData.hits!} /> : null}
      </div>

      <div className="chart-class">
        {/* //Graph component */}
        {cryptoData.open ?
          <DataGraph props={chartData} /> : null}
      </div>

    </div>
  );
}

export default Home;
