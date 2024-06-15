import axios from "axios"
import { useEffect, useState } from "react"
import { GetOrderDetails } from "../OrdersDetails/GetOrderDetails";
import "./../NotDeliveredOrdersDisplay/NotDeliveredOrdersDisplay.css"
import { GetHeading } from "../OrdersHead/GetHeading";
import { useParams } from "react-router-dom";



export const DeliveredOrdersByDate = (props) => {
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    const getOrders = async () => {
        var finalurl = `/order/all/delivered/`;
        if (!isNaN(new Date(id.replaceAll('-', '/')))) {
            finalurl = `/order/all/delivered/${id}`;
        }
        var resp = await axios.get(finalurl);
        setOrders(resp.data.data);
    }
    useEffect(() => {
        getOrders();
    }, [id]);

    return (
        <div className="block">
            <div className="section">
                <GetHeading />
                <GetOrderDetails orders={orders} />
            </div>
        </div>
    )

}