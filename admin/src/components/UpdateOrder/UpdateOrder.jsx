import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import './UpdateOrder.css'

export const UpdateOrder = ()=>{
    const [orders,setOrders] = useState({_id:"",userId:{_id:""},isDelivered:"",msg:"",ispaid:"",orderedDate:"",deliveredDate:"",});
    const {id} = useParams();
    const getOrders = async()=>{
        var resp = await axios.get("/order/"+id);
        setOrders(resp.data.data);
        console.log(orders)
    }
    useEffect(()=>{
        getOrders();
    },[]);

    const handleInputs=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setOrders({...orders,[name]:value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const res = await axios.put("/order/"+id,orders);
        console.log(res);
    }
    return (
        <form onSubmit={handleSubmit} className="update-order-container">
            <div>
            <label className="text">Order ID</label>{orders._id}
            </div>
            <div>
            <label className="text">User ID</label>{orders.userId._id}
            </div>
            <div>
            <label className="text">Ordered Date</label>{orders.orderedDate.split("T")[0]}
            </div>
            <div>
            <label htmlFor="isDelivered" className="text">Delivery Status</label>
            <label><input type="radio" name="isDelivered" value="1" onClick={handleInputs} checked={orders.isDelivered=="1"}></input>Delivered</label>
           <label><input type="radio" name="isDelivered" value="0" onClick={handleInputs} checked={orders.isDelivered=="0"}></input>Not Delivered</label>
            </div>
            <label htmlFor="msg" className="text">Message</label>
            <input type="text" name="msg" value={orders.msg} onChange={handleInputs}></input>
            <div>
            <label htmlFor="ispaid" className="text">Payment Status</label>
            <label><input type="radio" id="paid" name="ispaid" value="1"  onClick={handleInputs} checked={orders.ispaid=="1"}></input>Paid</label>
            <label><input type="radio"id="Notpaid"  name="ispaid" value="0"  onClick={handleInputs} checked={orders.ispaid=="0"}></input>Not Paid</label>
            </div>
            <label htmlFor="deliveredDate" className="text">Delivered Date</label>
            <input type="text" name="deliveredDate" value={orders.deliveredDate.split("T")[0]} onChange={handleInputs}></input>
            <button >Submit</button>
        </form>
    )
}