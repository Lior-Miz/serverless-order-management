const OrdersTable = ({ 
  loading, 
  searchTerm, 
  setSearchTerm, 
  filteredOrders, 
  getStatusBadge, 
  setEditingOrder, 
  setShowForm, 
  setShowSubForm, 
  handleDelete 
}) => {
  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-header bg-white border-bottom py-3">
        <div className="input-group input-group-sm" style={{ maxWidth: '300px' }}>
          <span className="input-group-text bg-light border-end-0">🔍</span>
          <input 
            type="text" 
            className="form-control border-start-0 bg-light" 
            placeholder="Find orders by ID or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle" style={{ fontSize: '14px' }}>
            <thead className="table-light">
              <tr>
                <th className="py-3 px-4 text-muted fw-bold border-bottom-0">Order ID</th>
                <th className="py-3 px-4 text-muted fw-bold border-bottom-0">Status</th>
                <th className="py-3 px-4 text-muted fw-bold border-bottom-0">Date</th>
                <th className="py-3 px-4 text-muted fw-bold border-bottom-0">Description</th>
                <th className="py-3 px-4 text-muted fw-bold border-bottom-0">Total</th>
                <th className="py-3 px-4 text-muted fw-bold border-bottom-0 text-end">Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="placeholder-glow">
                    <td className="py-4 px-4"><span className="placeholder col-8 rounded"></span></td>
                    <td className="py-4 px-4"><span className="placeholder col-6 rounded"></span></td>
                    <td className="py-4 px-4"><span className="placeholder col-8 rounded"></span></td>
                    <td className="py-4 px-4"><span className="placeholder col-12 rounded"></span></td>
                    <td className="py-4 px-4"><span className="placeholder col-4 rounded"></span></td>
                    <td className="py-4 px-4 text-end"><span className="placeholder col-8 rounded"></span></td>
                  </tr>
                ))
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <h6 className="text-dark fw-bold">No orders found</h6>
                    <p className="text-muted small">Try adjusting your search criteria or create a new order.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.order_id} style={{ transition: 'all 0.2s ease' }}>
                    <td className="py-3 px-4">
                      <span style={{ color: '#0073bb', fontWeight: '500', userSelect: 'all' }}>
                        {order.order_id.substring(0, 13)}...
                      </span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(order.creation_date)}</td>
                    <td className="py-3 px-4 text-dark">{new Date(order.creation_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-3 px-4 text-secondary">{order.description || '-'}</td>
                    <td className="py-3 px-4 fw-bold text-dark">${order.price}</td>
                    <td className="py-3 px-4 text-end">
                      <button 
                        className="btn btn-sm btn-light border me-2 text-secondary" 
                        style={{ fontSize: '13px', fontWeight: '500' }}
                        onClick={() => { setEditingOrder(order); setShowForm(false); setShowSubForm(false); }}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-light border text-danger" 
                        style={{ fontSize: '13px', fontWeight: '500' }}
                        onClick={() => handleDelete(order.order_id, order.creation_date)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;