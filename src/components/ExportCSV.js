import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';

import './ExportCSV.css';

const ExportCSV = (props) => {
  const headers = ['Txn Hash', 'Block', 'From', 'To', 'Value'];

  return (
    <div className='export-block'>
      {props.data.length === 0 ? (
        <Button className='csv-button' disabled>
          Export CSV
        </Button>
      ) : (
        <CSVLink
          data={props.data}
          headers={headers}
          filename='Transactions_Information.csv'
          className='csv-link'
        >
          <Button className='csv-button'>Export CSV</Button>
        </CSVLink>
      )}
    </div>
  );
};

export default ExportCSV;
