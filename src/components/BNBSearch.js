import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './InfoBar.css';
import './Table.css';
import ExportCSV from './ExportCSV';

const BNBSearch = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isData, setData] = useState(false);
  const [balance, setBalance] = useState('');
  const [csvData, setCsvData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const urlBalance = `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=Z454KT7Y3U7FM8Z44KSNJVPC3CPBTCYAG1`;
    fetch(urlBalance)
      .then((res) => res.json())
      .then((res) => {
        setBalance(res.result);
      });

    const urlTransactions = `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=25&sort=asc&apikey=Z454KT7Y3U7FM8Z44KSNJVPC3CPBTCYAG1`;
    axios
      .get(urlTransactions)
      .then((res) => {
        setIsLoading(true);
        setTransactions(res.data.result);
        let exportData = [];
        for (const key in res.data.result) {
          exportData.push([
            res.data.result[key].hash,
            res.data.result[key].blockNumber,
            res.data.result[key].from,
            res.data.result[key].to,
            res.data.result[key].value / 1000000000000000000,
          ]);
        }
        setCsvData(exportData);
        setData(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  return (
    <div id='main'>
      <div className='infobar'>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter BNB Address'
            name='bnbAddress'
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit}>Search</Button>
        </form>
        <div className='info'>
          <h4>Your Address: {address}</h4>
          <h4>Your Balance: {balance / 1000000000000000000} BNB</h4>
        </div>
      </div>

      <ExportCSV data={csvData} />

      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <table className='table'>
          {isData && (
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th>Block</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
              </tr>
            </thead>
          )}
          <tbody>
            {transactions.map((txn) => {
              return (
                <tr key={txn.hash}>
                  <td>{txn.hash}</td>
                  <td>{txn.blockNumber}</td>
                  <td>{txn.from}</td>
                  <td className='to'>{txn.to}</td>
                  <td>{txn.value / 1000000000000000000} BNB</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BNBSearch;
