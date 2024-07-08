import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { path } from "../variables";
import { OrderProp, config } from "../types/types";
import commaNumber from "comma-number";
import Navbar from "../Navbar/Navbar";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderProp[]>();
  useEffect(() => {
    async function getOrders() {
      const res = await axios.get(`${path}/order/`, config);
      if (res.data) {
        setOrders(res.data);
      }
    }
    getOrders();
  }, []);
  return (
    <div>
      <div className="w-full">
        <div className="visible md:hidden">
          <Navbar />
        </div>
        <div className="flex">
          <Sidebar />
          <div className="w-full p-3 overflow-y-auto h-[100vh] text-[10px] md:text-[14px] lg:text-[1rem]">
            <h1 className="">Orders</h1>
            {/* <table className="basic">
              <thead>
                <tr>
                  <td>Order ID</td>
                  <td className="hidden md:visible">Products and Quantities</td>
                  <td>Customer</td>
                  <td>Address</td>
                  <td>Amount</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td className="hidden md:visible">{order._id}</td>
                    <td className="md:hidden">{order._id.slice(0, 10)}...</td>
                    <td className="hidden md:visible" >
                      {order.products.map((p) => (
                        <div key={p._id}>
                          {p.product}: {p.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="hidden md:visible">{order.customer}</td>
                    <td className="md:hidden">
                      {order.customer.slice(0, 10)}...
                    </td>
                    <td className="hidden md:visible">
                      {order.streetAddress}, {order.city}, {order.country},{" "}
                      {order.postalcode}
                    </td>
                    <td className="md:hidden">
                      {order.country}, {order.postalcode}
                    </td>
                    <td>{commaNumber(order.totalAmount)}</td>
                    <td
                      className={`py-2 px-4  ${
                        order.paid ? "bg-green-200" : "bg-red-200"
                      }`}
                    >
                      {order.paid ? "Paid" : "Failed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <table className="basic w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th className="hidden md:table-cell">
                    Products and Quantities
                  </th>
                  <th>Customer</th>
                  <th className="hidden md:table-cell">Address</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td className="hidden md:table-cell">{order._id.slice(0, 15 )}...</td>
                    <td className="md:hidden">{order._id.slice(0, 10)}...</td>
                    <td className="hidden md:table-cell">
                      {order.products.map((p) => (
                        <div key={p._id}>
                          {p.product.slice(0, 15)}...: {p.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="hidden md:table-cell">{order.customer.slice(0,15)}...</td>
                    <td className="md:hidden">
                      {order.customer.slice(0, 10)}...
                    </td>
                    <td className="hidden md:table-cell">
                      {order.streetAddress}, {order.city}, {order.country},{" "}
                      {order.postalcode}
                    </td>
                    <td>{commaNumber(order.totalAmount)}</td>
                    <td
                      className={`py-2 px-4 ${
                        order.paid ? "bg-green-200" : "bg-red-200"
                      }`}
                    >
                      {order.paid ? "Paid" : "Failed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
