import { useEffect, useState } from "react";
import "./Dashboard.css";
import { ethers } from "ethers";
import {
  SMART_ACCOUNT_ADDRESS,
  SMART_ACCOUNT_ABI,
} from "../../contracts/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmailKeys } from "../../middleware/store";
import { init, useQuery } from "@airstack/airstack-react";
import * as d3 from "d3";
import { useRef } from "react";

init("f0d8871cca3c4712977094057e3b1909");

const DataTable = () => {
  const query = `query GetAllPolygonTokenTransfersToday {
    polygonTransfers: TokenTransfers(
      input: {
        filter: {
          blockTimestamp: {
            _gte: "2023-06-24T00:00:00.000Z",
            _lt: "2023-06-25T00:00:00.000Z"
          }
        },
        blockchain: polygon,
        limit: 10
      }
    ) {
      TokenTransfer {
        amount
        blockNumber
        blockTimestamp
        from {
          addresses
        }
        to {
          addresses
        }
        tokenAddress
        transactionHash
        tokenId
        tokenType
        blockchain
      }
    }
  }`;
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const transfers = data?.polygonTransfers?.TokenTransfer || [];

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transfers.map((transfer: any, index: any) => (
          <tr key={index}>
            <td>{transfer.from.addresses[0] as string}</td>
            <td>{transfer.to.addresses[0]}</td>
            <td>{transfer.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TraderTable = () => {
  const query = `query {
    MarketplaceStats(input: {
      order: [{lastTransactionBlockTimestamp: DESC}]
      filter: {
        dappName: {_eq: opensea}
        lastTransactionBlockTimestamp: {
          _gte: "2023-06-18T00:00:00.000Z",
          _lte: "2023-06-25T00:00:00.000Z"
        }
      }
      blockchain: ethereum
      timeFrame: DAILY
      limit: 15
    }) {
      MarketplaceStat {
        lastTransactionBlockTimestamp
        totalSaleVolumeInUSDC
      }
    }
  }`;
  const { data, loading, error } = useQuery(query);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const marketplaceStats = data.MarketplaceStats.MarketplaceStat;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(
        marketplaceStats.map(
          (d: { lastTransactionBlockTimestamp: any }) =>
            d.lastTransactionBlockTimestamp
        )
      );

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(marketplaceStats, (d) => d.totalSaleVolumeInUSDC)]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .remove(); // Remove x-axis labels

    g.append("g")
      .attr("class", "axis axis-y")
      .call(d3.axisLeft(y).ticks(5))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Total Sale Volume (USDC)");

    g.selectAll(".bar")
      .data(marketplaceStats)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.lastTransactionBlockTimestamp))
      .attr("y", (d) => y(d.totalSaleVolumeInUSDC))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.totalSaleVolumeInUSDC))
      .style("fill", "rgba(0, 119, 190, 0.8)"); // Set the bars color to a sea blue with transparency
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h3>OpenSea Daily Sales Volume in Past Week</h3>
      <svg ref={svgRef} className="bar-graph" width={500} height={500} />
    </>
  );
};

const Dashboard = ({ org }: { org: string }) => {
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(BigInt(123456.0 * 10e15));
  const [strategy, setStrategy] = useState("");
  const [threshold, setThreshold] = useState(0);
  const { user } = useAuth0();

  useEffect(() => {
    // fetch data regarding balance, strategy, and threshold
    const getBalance = async () => {
      const provider = new ethers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/04tse8PDxpdM3_iZOSA-YH-WMuljjoGe"
      );
      const value = await provider.getBalance(SMART_ACCOUNT_ADDRESS);
      setBalance(value);
      setThreshold(10);
      setStrategy("Invest Excess USDC in Compound");

      if (!user || !user.email) {
        return;
      }
      const { privateKey } = await getEmailKeys(user.email);
      if (!privateKey) {
        return;
      }

      const signer = new ethers.Wallet(privateKey, provider);
      const contract = new ethers.Contract(
        SMART_ACCOUNT_ADDRESS,
        SMART_ACCOUNT_ABI,
        signer
      );
      const tx = await contract.investExcessUSD();
      console.log(tx);
    };
    getBalance();
  }, [user]);

  return (
    <>
      <h1 className="org-title">{org}</h1>
      <hr />
      <div className="org-data">
        <section>
          <div className="balance">
            <label>Current Balance:</label>
            <p>{(Number(balance) / 1e18).toFixed(2)} MATIC</p>
          </div>
          <div className="button-container">
            <button className="send-button">Send</button>
            <button className="invest-button">Invest</button>
          </div>
          <div className="strategy">
            <label>Automatic Strategy:</label>
            <p>{strategy}</p>
          </div>
          <div className="strategy">
            <label>Excess Amount Threshold:</label>
            <p>{threshold.toFixed(2)} USDC</p>
          </div>
        </section>
        <section>
          <h2>Trader Insights:</h2>
          <TraderTable />
        </section>
      </div>
      <h2 onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>{`${
        show ? "Hide" : "View"
      } Latest Polygon Activity`}</h2>
      {show && <DataTable />}
    </>
  );
};

export default Dashboard;
