import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// ייבוא של כל הקומפוננטות שלנו
import Navbar from './components/Navbar';
import DashboardHeader from './components/DashboardHeader';
import SubscriptionForm from './components/SubscriptionForm';
import CreateOrderForm from './components/CreateOrderForm';
import EditOrderForm from './components/EditOrderForm';
import OrdersTable from './components/OrderTable';

const API_BASE_URL = "https://r8ly3glq0g.execute-api.us-east-1.amazonaws.com/dev";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({ price: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingOrder, setEditingOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [showSubForm, setShowSubForm] = useState(false);
  const [email, setEmail] = useState('');
  const [subAction, setSubAction] = useState('subscribe');
  const [isSubmittingMail, setIsSubmittingMail] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      const sortedData = (response.data.orders || []).sort(
        (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
      );
      setOrders(sortedData);
    } catch (error) {
      console.error(error);
      alert("Error fetching data from AWS");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!newOrder.price) return alert("Please enter a price.");
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/orders`, {
        price: parseFloat(newOrder.price),
        description: newOrder.description || "-"
      });
      setNewOrder({ price: '', description: '' });
      setShowForm(false);
      await fetchOrders();
    } catch (error) {
      console.error("Create Error:", error);
      alert("Failed to create order. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(`${API_BASE_URL}/orders/${editingOrder.order_id}`, {
        creation_date: editingOrder.creation_date,
        price: parseFloat(editingOrder.price),
        description: editingOrder.description
      });
      setEditingOrder(null);
      await fetchOrders();
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update order. Check console.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (orderId, creationDate) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
    try {
      await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
        data: { order_id: orderId, creation_date: creationDate }
      });
      setOrders(orders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete order. Please check console for details.");
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/report`);
      const url = response.data.download_url || response.data.url || response.data.body?.download_url;
      if (url) {
        window.open(url, '_blank');
      } else {
        alert("Report generated! Check your AWS S3 bucket.");
      }
    } catch (error) {
      console.error(error);
      alert("Error generating PDF report. Make sure CORS is enabled for GET on /report");
    }
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter an email address.");
    setIsSubmittingMail(true);
    try {
      const endpoint = subAction === 'subscribe' ? '/subscribe' : '/unsubscribe';
      await axios.post(`${API_BASE_URL}${endpoint}`, { email });
      alert(`Successfully ${subAction}d! Please check your email to confirm if subscribing.`);
      setShowSubForm(false);
      setEmail('');
    } catch (error) {
      console.error("Subscription Error:", error);
      alert(`Failed to ${subAction}.`);
    } finally {
      setIsSubmittingMail(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.description && order.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, searchTerm]);

  const getStatusBadge = (dateString) => {
    const orderDate = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now - orderDate) / 36e5;
    if (diffHours < 24) {
      return <span className="badge rounded-pill bg-success" style={{ fontWeight: '500' }}>New</span>;
    }
    return <span className="badge rounded-pill bg-secondary" style={{ fontWeight: '500' }}>Processed</span>;
  };

  return (
    <div style={{ backgroundColor: '#f2f3f3', minHeight: '100vh', fontFamily: '"Amazon Ember", Helvetica, Arial, sans-serif' }}>
      
      <Navbar />

      <div className="container-fluid px-4 mt-4">
        
        <DashboardHeader 
          showSubForm={showSubForm}
          setShowSubForm={setShowSubForm}
          showForm={showForm}
          setShowForm={setShowForm}
          setEditingOrder={setEditingOrder}
          handleGeneratePDF={handleGeneratePDF}
        />

        {showSubForm && (
          <SubscriptionForm 
            email={email}
            setEmail={setEmail}
            subAction={subAction}
            setSubAction={setSubAction}
            handleSubscription={handleSubscription}
            isSubmittingMail={isSubmittingMail}
          />
        )}

        {showForm && (
          <CreateOrderForm 
            newOrder={newOrder}
            setNewOrder={setNewOrder}
            handleCreateOrder={handleCreateOrder}
            isSubmitting={isSubmitting}
          />
        )}

        {editingOrder && (
          <EditOrderForm 
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            handleUpdateOrder={handleUpdateOrder}
            isUpdating={isUpdating}
          />
        )}

        <OrdersTable 
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredOrders={filteredOrders}
          getStatusBadge={getStatusBadge}
          setEditingOrder={setEditingOrder}
          setShowForm={setShowForm}
          setShowSubForm={setShowSubForm}
          handleDelete={handleDelete}
        />

      </div>
    </div>
  );
}

export default App;