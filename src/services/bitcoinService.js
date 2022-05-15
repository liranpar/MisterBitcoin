import { storageService } from "./storageService.js";
import axios from "axios";

export const bitcoinService = {
  getBitcionRate,
  getMarketPrice,
  getTransactions,
};

async function getBitcionRate() {
  const res = await axios.get(
    "https://blockchain.info/tobtc?currency=USD&value=1"
  );
  return res.data;
}

async function getMarketPrice() {
  const data = storageService.load("market_price");
  if (!!data) {
    return data;
  }

  const res = await axios.get(
    "https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true"
  );
  storageService.store("market_price", res.data);
  return res.data;
}

async function getTransactions() {
  const data = storageService.load("transactions");
  if (!!data) {
    return data;
  }

  const res = await axios.get(
    "https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true"
  );
  storageService.store("transactions", res.data);
  return res.data;
}
