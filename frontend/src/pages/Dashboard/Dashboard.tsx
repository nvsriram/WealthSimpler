const Dashboard = () => {
  return (
    <div className="container">
      <h1>WealthSimpler</h1>
      <h1>Organization Name</h1>
      <label className="balance-label">Current Balance:</label>
      <p className="balance">123456.00</p>
      <div className="button-container">
        <button className="button">Send</button>
        <button className="button">Receive</button>
      </div>
      <br />
      <label className="strategy-label">Automatic Strategy:</label>
      <br />
      <label className="strategy-label">Strategy Threshold:</label>
    </div>
  );
};

export default Dashboard;
