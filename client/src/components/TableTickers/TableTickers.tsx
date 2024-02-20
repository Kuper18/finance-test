import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Tickers } from '../../types/tickers';
import * as tickersActions from '../../features/tickers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const TableTickers = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tickersActions.init());
  }, [dispatch]);

  const { tickers, previousTickers, tickersToRemove } = useAppSelector(
    (state) => state.tickers,
  );
  const filteredTickers = tickers.filter((ticker) => {
    return !tickersToRemove.includes(ticker.ticker);
  });

  const setColorStyle = (i: number, key: keyof Tickers) => {
    if (!previousTickers[i]) {
      return '#198754';
    }

    if (previousTickers[i][key] < tickers[i][key]) {
      return '#198754';
    }

    return '#dc3545';
  };

  return (
    <TableContainer
      className="table"
      component={Paper}
      data-testid="table-tickers"
    >
      <Table sx={{ minWidth: 450 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticker</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Change</StyledTableCell>
            <StyledTableCell>Dividend</StyledTableCell>
            <StyledTableCell>Yield</StyledTableCell>
            <StyledTableCell>Percent</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredTickers.map((tickerItem, index) => {
            const {
              price,
              ticker,
              dividend,
              change,
              yield: profit,
              change_percent: changePercent,
            } = tickerItem;

            return (
              <StyledTableRow key={ticker}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ color: '#1976d2' }}
                >
                  {ticker}
                </StyledTableCell>
                <StyledTableCell>{`$${price}`}</StyledTableCell>
                <StyledTableCell
                  style={{
                    color: setColorStyle(index, 'change'),
                  }}
                >
                  {
                    setColorStyle(index, 'change') === '#198754'
                      ? `+$${change}`
                      : `-$${change}`
                  }
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    color: setColorStyle(index, 'dividend'),
                  }}
                >
                  {
                    setColorStyle(index, 'dividend') === '#198754'
                      ? `+$${dividend}`
                      : `-$${dividend}`
                  }
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    color: setColorStyle(index, 'yield'),
                  }}
                >
                  {
                    setColorStyle(index, 'yield') === '#198754'
                      ? `+$${profit}`
                      : `-$${profit}`
                  }
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    color: setColorStyle(index, 'change_percent'),
                  }}
                >
                  {
                    setColorStyle(index, 'change_percent') === '#198754'
                      ? `+$${changePercent}`
                      : `-$${changePercent}`
                  }
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
