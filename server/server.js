'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

const getAllQuotes = getQuotes();

function getQuotes() {
  let shownTickers = [];

  return (socket, excludeTicker) => {
    if (excludeTicker) {

      shownTickers = shownTickers.includes(excludeTicker)
      ? shownTickers.filter(ticker => ticker !== excludeTicker)
      : [...shownTickers, excludeTicker];
    }

    const quotes = tickers
      .filter(ticker => !shownTickers.includes(ticker))
      .map(ticker => {
        const obj = {
          ticker,
          exchange: 'NASDAQ',
          price: randomValue(100, 300, 2),
          change: randomValue(0, 200, 2),
          change_percent: randomValue(0, 1, 2),
          dividend: randomValue(0, 1, 2),
          yield: randomValue(0, 2, 2),
          last_trade_time: utcDate(),
        };
  
        return obj;
      });

    socket.emit('ticker', quotes);
  }
}

function trackTickers(socket) {
  getAllQuotes(socket);
  socket.emit('tickersName', tickers);

  const timer = setInterval(function() {
    getAllQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
  socket.on('tickerClicked', (clickedTicker) => {
    getAllQuotes(socket, clickedTicker);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
