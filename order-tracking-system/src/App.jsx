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

  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

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
        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl font-semibold p-6 border-b">Orders List</h2>
          <div className="p-4 md:p-6">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No orders found. Start by adding a new order.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {order.customerName}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {order.orderDetails}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="text-gray-500">{order.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value)
                          }
                          className={`px-4 py-2 rounded-full text-sm font-medium
                            ${
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : ""
                            }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        {order.status === "Cancelled" && (
                          <span className="text-xs text-red-600 ml-2 animate-pulse">
                            Removing...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
