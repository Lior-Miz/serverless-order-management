const EditOrderForm = ({ 
  editingOrder, 
  setEditingOrder, 
  handleUpdateOrder, 
  isUpdating 
}) => {
  if (!editingOrder) return null;

  return (
    <div className="card shadow-sm border-warning rounded-3 mb-4" style={{ backgroundColor: '#fffcf5', borderWidth: '2px' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0 fs-6">Edit Order: {editingOrder.order_id.substring(0,8)}...</h5>
          <button type="button" className="btn-close btn-sm" aria-label="Close" onClick={() => setEditingOrder(null)}></button>
        </div>
        <form onSubmit={handleUpdateOrder} className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label text-muted small fw-bold mb-1">Price ($)</label>
            <input 
              type="number" 
              step="0.01"
              className="form-control form-control-sm" 
              value={editingOrder.price}
              onChange={(e) => setEditingOrder({...editingOrder, price: e.target.value})}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small fw-bold mb-1">Description</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              value={editingOrder.description}
              onChange={(e) => setEditingOrder({...editingOrder, description: e.target.value})}
            />
          </div>
          <div className="col-md-3">
            <button 
              type="submit" 
              className="btn btn-sm w-100 btn-warning" 
              style={{ fontWeight: '600' }}
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderForm;