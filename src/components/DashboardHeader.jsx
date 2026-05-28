const DashboardHeader = ({ 
  showSubForm, 
  setShowSubForm, 
  showForm, 
  setShowForm, 
  setEditingOrder, 
  handleGeneratePDF 
}) => {
  return (
    <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
      <div>
        <h2 className="fs-4 fw-bold text-dark mb-1">Orders Management</h2>
        <p className="text-muted mb-0 fs-6">Manage and track your serverless API orders</p>
      </div>
      
      <div className="d-flex gap-2">
        <button 
          className="btn btn-sm shadow-sm" 
          style={{ backgroundColor: '#ffffff', border: '1px solid #d5dbdb', color: '#16191f', fontWeight: '600' }}
          onClick={() => { setShowSubForm(!showSubForm); setShowForm(false); setEditingOrder(null); }}
        >
          <i className="bi bi-bell"></i> Manage Alerts
        </button>
        <button 
          className="btn btn-sm shadow-sm" 
          style={{ backgroundColor: '#ffffff', border: '1px solid #d5dbdb', color: '#16191f', fontWeight: '600' }}
          onClick={handleGeneratePDF}
        >
          Generate PDF Report
        </button>
        <button 
          className="btn btn-sm shadow-sm" 
          style={{ backgroundColor: '#ff9900', color: '#111111', border: '1px solid #cc7a00', fontWeight: '600' }}
          onClick={() => { setShowForm(!showForm); setShowSubForm(false); setEditingOrder(null); }}
        >
          {showForm ? 'Cancel' : 'Create new order'}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;