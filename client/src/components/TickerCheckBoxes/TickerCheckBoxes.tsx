import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/tickers';

export const TickerCheckBoxes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tickersNames } = useAppSelector((state) => state.tickers);

  return (
    <FormGroup row data-testid="ticker-checkboxes">
      {tickersNames.map((name: string) => (
        <FormControlLabel
          key={name}
          control={<Checkbox defaultChecked />}
          label={name}
          onClick={() => {
            dispatch(actions.removeTickers(name));
          }}
        />
      ))}
    </FormGroup>
  );
};
