import './CoinItem.css';

const CoinItem = ({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) => {
  return (
    <>
      <div className='coin-container'>
        <div className='coin-row'>
          <div className='coin'>
            <img src={image} alt='crypto' />
            <div>
              <h1>{name}</h1>
              <p className='coin-symbol'>{symbol}</p>
            </div>
          </div>
          <div className='coin-data'>
            <div className='coin-price'>${price}</div>
            {priceChange < 0 ? (
              <div className='coin-percent red'>{priceChange.toFixed(2)}%</div>
            ) : (
              <div className='coin-percent green'>
                {priceChange.toFixed(2)}%
              </div>
            )}
            <div className='coin-volume'>${volume.toLocaleString()}</div>
            <div className='coin-marketcap'>${marketcap.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinItem;
