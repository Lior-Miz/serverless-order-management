const SubscriptionForm = ({ 
  email, 
  setEmail, 
  subAction, 
  setSubAction, 
  handleSubscription, 
  isSubmittingMail 
}) => {
  return (
    <div className="card shadow-sm border-0 rounded-3 mb-4" style={{ backgroundColor: '#eef2f6' }}>
      <div className="card-body p-4">
        <h5 className="card-title fw-bold mb-3 fs-6">Manage Email Notifications (SNS)</h5>
        <form onSubmit={handleSubscription} className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label text-muted small fw-bold mb-1">Email Address</label>
            <input 
              type="email" 
              className="form-control form-control-sm" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted small fw-bold mb-1">Action</label>
            <select 
              className="form-select form-select-sm" 
              value={subAction} 
              onChange={(e) => setSubAction(e.target.value)}
            >
              <option value="subscribe">Subscribe</option>
              <option value="unsubscribe">Unsubscribe</option>
            </select>
          </div>
          <div className="col-md-3">
            <button 
              type="submit" 
              className="btn btn-sm w-100" 
              style={{ backgroundColor: '#232F3E', color: 'white', fontWeight: '500' }}
              disabled={isSubmittingMail}
            >
              {isSubmittingMail ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;