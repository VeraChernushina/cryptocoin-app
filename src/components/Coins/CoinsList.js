import React from 'react';
import CoinItem from './CoinItem';
import './CoinList.css';

const CoinList = ({ coins }) => {
  return (
    <>
      <div className='coins-header'>
        <div className='header-row'>
          <div className='header-name'>Name</div>
          <div className='header-price'>Price</div>
          <div className='header-percent'>Price Change</div>
          <div className='header-volume'>Volume</div>
          <div className='header-marketcap'>Market Cap</div>
        </div>
      </div>
      <ul className='coin-list'>
        {coins.map((coin) => {
          return (
            <CoinItem
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </ul>
    </>
  );
};

export default CoinList;
