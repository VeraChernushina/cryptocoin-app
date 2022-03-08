import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '@mui/material';
import './Table.css';
import ExportCSV from './ExportCSV';

const EthSearch = () => {
  const [ethAddress, setEthAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isData, setData] = useState(false);
  const [ethBalance, setEthBalance] = useState('');
  const [csvData, setCsvData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const urlBalance = `https://api.etherscan.io/api?module=account&action=balance&address=${ethAddress}&tag=latest&apikey=MDPMZ76S2YN12CSQDN7H8J4E15JRJQVTFE`;
    fetch(urlBalance)
      .then((res) => res.json())
      .then((res) => {
        setEthBalance(res.result);
      });

    const urlTransactions = `https://api.etherscan.io/api?module=account&action=txlist&address=${ethAddress}&startblock=0&endblock=99999999&page=1&offset=25&sort=asc&apikey=MDPMZ76S2YN12CSQDN7H8J4E15JRJQVTFE`;
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
    setEthAddress(event.target.value);
  };

  return (
    <div id='main'>
      <div className='infobar'>
        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter ETH Address'
            name='ethAddress'
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit}>Search</Button>
        </form>
        <div className='info'>
          <h4>Your Address: {ethAddress}</h4>
          <h4>Your Balance: {ethBalance / 1000000000000000000} Ether</h4>
        </div>
      </div>
      <ExportCSV data={csvData} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
                  <td>{txn.value / 1000000000000000000} ETH</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EthSearch;
