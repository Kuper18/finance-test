import React from 'react';
import { Box, Grid } from '@mui/material';
import { News } from '../News/News';
import { TableTickers } from '../TableTickers/TableTickers';
import { TickerCheckBoxes } from '../TickerCheckBoxes/TickerCheckBoxes';

export const HomePage: React.FC = () => {
  return (
    <section>
      <h1 style={{ marginBottom: '20px' }} className="titile">
        Investing made easy
      </h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Grid>
              <TickerCheckBoxes />
              <TableTickers />
            </Grid>
          </Grid>
          <Grid item md={4} sm={8} xs={12}>
            <News />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};
