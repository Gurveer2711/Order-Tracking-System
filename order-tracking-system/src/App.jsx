import { useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [orderDetails, setOrderDetails] = useState("");

  const addOrder = (e) => {
    e.preventDefault();
    if (!customerName || !orderDetails) return;

    const newOrder = {
      id: Date.now(),
      customerName,
      orderDetails,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setOrders([...orders, newOrder]);
    setCustomerName("");
    setOrderDetails("");
  };

  // const updateStatus = (id, newStatus) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.id === id ? { ...order, status: newStatus } : order
  //     )
  //   );
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Order Tracking System
          </h1>
          <p className="text-gray-600">Manage customer orders efficiently</p>
        </header>

        {/* Order Form */}
        <form
          onSubmit={addOrder}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-700">New Order</h2>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Order Details"
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Order
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default App;
