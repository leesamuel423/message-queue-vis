import './Dashboard.css';

const Dashboard = ({ stats }) => {
  return (
    <div className="stats-dashboard">
      <h2>Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Total Messages</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Successfully Processed</div>
          <div className="stat-value">{stats.success}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Failed/Retried</div>
          <div className="stat-value">{stats.failed}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">ACK Sent</div>
          <div className="stat-value">{stats.ack}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">NACK Sent</div>
          <div className="stat-value">{stats.nack}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
