import { Component } from "react";
import { bitcoinService } from "../services/bitcoinService";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";

export default class StatisticPage extends Component {
  state = {
    marketPrice: null,
    transactions: null,
  };

  componentDidMount() {
    this.loadMarketPrice();
    this.loadTransactions();
  }

  async loadMarketPrice() {
    const marketPrice = await bitcoinService.getMarketPrice();
    this.setState({ marketPrice });
  }

  async loadTransactions() {
    const transactions = await bitcoinService.getTransactions();
    this.setState({ transactions });
  }

  render() {
    const { marketPrice, transactions } = this.state;
    const mapY = (data) => data.values.map((val) => val.y);

    if (!marketPrice || !transactions) return <div>Loading...</div>;

    return (
      <section className="main-layout statistic-page">
        <Link className="link" to="/">
          Home page
        </Link>
        <div className="stat-container">
          <h1>Market Price (USD)</h1>
          <Sparklines data={mapY(marketPrice)} height={102}>
            <SparklinesLine color="#136e11" />
          </Sparklines>
          <h3>Average USD market price across major Bitcoin exchanges.</h3>
        </div>
        <div className="stat-container">
          <h1>Confirmed transactions per day</h1>
          <Sparklines data={mapY(transactions)} height={102}>
            <SparklinesLine color="#186a66" />
          </Sparklines>
          <h3>The number of daily confirmed Bitcion transactions.</h3>
        </div>
      </section>
    );
  }
}
