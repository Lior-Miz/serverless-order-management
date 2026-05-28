const CreateOrderForm = ({ 
  newOrder, 
  setNewOrder, 
  handleCreateOrder, 
  isSubmitting 
}) => {
  return (
    <div className="card shadow-sm border-0 rounded-3 mb-4" style={{ backgroundColor: '#fafafa' }}>
      <div className="card-body p-4">
        <h5 className="card-title fw-bold mb-3 fs-6">Create New Order</h5>
        <form onSubmit={handleCreateOrder} className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label text-muted small fw-bold mb-1">Price ($)</label>
            <input 
              type="number" 
              step="0.01"
              className="form-control form-control-sm" 
              placeholder="e.g. 150.00"
              value={newOrder.price}
              onChange={(e) => setNewOrder({...newOrder, price: e.target.value})}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small fw-bold mb-1">Description</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Order details..."
              value={newOrder.description}
              onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
            />
          </div>
          <div className="col-md-3">
            <button 
              type="submit" 
              className="btn btn-sm w-100" 
              style={{ backgroundColor: '#232F3E', color: 'white', fontWeight: '500' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderForm;