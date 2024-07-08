import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { path } from "../variables";
import { OrderProp, config } from "../types/types";
import commaNumber from "comma-number";
import CountUp from "react-countup";
import Navbar from "../Navbar/Navbar";

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<OrderProp[]>();
  const totalEarnings = orders?.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  useEffect(() => {
    async function getOrders() {
      const res = await axios.get(`${path}/order/`, config);
      if (res.data) {
        setOrders(res.data.filter((val: OrderProp) => val.paid));
      }
    }
    getOrders();
  }, []);
  useEffect(() => {
    async function getOrders() {
      const idFreq: string[] = [];
      orders?.map((val) =>
        val.products.map((prod) => idFreq.push(prod.product))
      );
    }
    getOrders();
  }, []);

  return (
    <div>
      <div className="w-full">
        <div className="visible md:hidden">
          <Navbar />
        </div>
        <div className="flex ">
          <Sidebar />
          <div className="w-full p-3 overflow-y-auto h-[100vh]">
            <h1>Dashboard</h1>
            <div className="font-semibold text-xl text-green-600">
              Total Earnings:{" "}
              <span>
                <CountUp
                  start={0}
                  end={totalEarnings!}
                  duration={2}
                  prefix=" ₹ "
                />
              </span>
            </div>
            <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row w-full items-center">
              <div className="md:w-1/2 bg-gray-100 p-2 flex flex-col items-center justify-center">
                <div className=" font-semibold text-xl text-center">Orders</div>
                <table className="basic w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-xs sm:text-sm md:text-base">
                        OrderId
                      </th>
                      <th className="p-2 text-left text-xs sm:text-sm md:text-base">
                        Products
                      </th>
                      <th className="p-2 text-left text-xs sm:text-sm md:text-base">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.slice(0, 4).map((order) => (
                      <tr key={order._id} className="border-b">
                        <td className="p-2 text-xs sm:text-sm md:text-base">
                          {order._id.slice(0, 5)}...
                        </td>
                        <td className="p-2 text-xs sm:text-sm md:text-base">
                          {order?.products.map((p) => (
                            <div key={p._id}>
                              {p.product.slice(0, 10)}...: {p.quantity}
                            </div>
                          ))}
                        </td>
                        <td className="p-2 text-xs sm:text-sm md:text-base">
                          {commaNumber(order.totalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
