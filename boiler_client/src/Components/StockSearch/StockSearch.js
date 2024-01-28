import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Graph from '../../Components/Graph/Graph';

export default function StockSearch(props) {
  const tickerSymbols = props.tickerSymbols;
  const getStock = props.getStock
  const options = tickerSymbols;

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort()}
      renderInput={(params) => <TextField {...params} label="Ticker Symbols" />}
      onChange={(event, value) => {if(value != null) {getStock(value)}}}
    />
  );
}