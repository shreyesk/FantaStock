import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import * as React from 'react';

export default function BasicSparkLineCustomization({data, hoverInfo}) {
  

  return (
    <Stack direction="column" sx={{ width: '100%' }}>
      <Stack direction="row">
        
      </Stack>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart
            data={data}
            height={100}
            showHighlight={hoverInfo}
            showTooltip={hoverInfo}
          />
        </Box>
      </Stack>
    </Stack>
  );
}