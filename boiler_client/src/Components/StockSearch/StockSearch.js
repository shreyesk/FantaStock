import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function StockSearch(props) {
  const tickerSymbols = props.tickerSymbols;
  const options = tickerSymbols;

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort()}
      renderInput={(params) => <TextField {...params} label="With categories" />}
    />
  );
}