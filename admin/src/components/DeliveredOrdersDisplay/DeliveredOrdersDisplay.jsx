import axios from "axios"
import { useEffect, useState } from "react"
import "./../NotDeliveredOrdersDisplay/NotDeliveredOrdersDisplay.css"

import { GetHeading } from "../OrdersHead/GetHeading";
import { GetOrderDetails } from "../OrdersDetails/GetOrderDetails";

export const DeliveredOrdersDisplay = (props) => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    var finalurl = "/order/all/delivered";
    var resp = await axios.get(finalurl);
    setOrders(resp.data.data);
  }
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="block">
      <div className="section">
        <GetHeading />
        <GetOrderDetails orders={orders} />
      </div>
    </div>
  )

}