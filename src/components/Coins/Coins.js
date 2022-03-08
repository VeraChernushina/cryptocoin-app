import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import CoinList from './CoinsList';

const URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

function Coins() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setIsLoading(true);
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const changeHandler = (searchValue) => {
    setSearch(searchValue);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Search onSearchFilter={changeHandler} />
      <div>
        {isLoading ? (
          <p>Please wait. Data is Loading...</p>
        ) : (
          <div>
            <CoinList coins={filteredCoins} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Coins;
