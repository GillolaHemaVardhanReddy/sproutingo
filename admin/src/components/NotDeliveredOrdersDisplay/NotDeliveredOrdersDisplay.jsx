import axios from "axios"
import { useEffect, useState } from "react"
import { CheckIcon } from "./CheckIcon";
import { NotCheckIcon } from "./NotCheckIcon";
import {Link} from "react-router-dom"
import "./NotDeliveredOrdersDisplay.css"




export const NotDeliveredOrdersDisplay =  (props)=>{
  const [orders,setOrders] = useState([]);
  const [index,setIndex] = useState(-1);
  const getOrders = async()=>{
    var finalurl = "/order/all/notdelivered";
    var resp = await axios.get(finalurl);
    setOrders(resp.data);
  }
  useEffect(()=>{
    getOrders();
  },[]);
  //handlers
  const handleClick = (evt)=>{
    evt.preventDefault();
    setIndex(evt.target.value)
  }

  
  const GetHeading = ()=>{
    return (
     <div className="orders outer">
     <div >S.NO</div> 
     <div >Order ID</div>
     <div >User ID</div>
     <div >Status</div>
     <div >Message</div>
     <div>Payment</div>
     <div >Ordered Date</div>
     <div >Delivery Date</div>
     <div>Edit</div>
     <div>Action</div>
     </div>
    )
  }

  const GetOrderDetails = ()=>{
   
    return (
      <>
      {orders.map((item,ind)=>{
        return <div className="orders" key={ind}>
                 <div >{ind+1} </div> 
                 <div >{item._id} </div>
                 <div >{item.userId._id} </div>
                 <div >{item.isDelivered===true?"Delivered":"Not Delivered"}</div>
                 <div >{item.msg} </div>
                 {item.ispaid ? <div className="check"><CheckIcon/> </div>:<div className="uncheck"><NotCheckIcon/></div> }
                 <div > {item.orderedDate} </div>
                 <div > {item.deliveredDate} </div>
                 <div><Link  to={`/admin/manage/orders/update/${item._id}`}>Edit</Link></div>
                 <div><button  key={ind} value={ind} onClick={(e)=>handleClick(e)}>Details</button></div>
               </div>
      })}
      </>
    )
  }

  const GetUserProductDetails = ()=>{
    <>
      <div className="userDetails">
           <div className="heading">User Details</div>
           <div>User Id : {orders[index].userId._id}</div>
           <div>User Name : {orders[index].userId.name}</div>
           <div>User Email : {orders[index].userId.email}</div>
      </div>
      <div className="productDetails">
          <div className="heading">Products Details</div>
            {orders[index].products.map((item,ind)=>{
              return <div className="product" key={ind}>
                    <div>Product ID : {item.productId._id}</div>
                    <div>Product Name : {item.productId.name}</div>
                    <div>Quantity : {item.quantity}</div>
                    <div>Price : {item.price}</div>
                    </div>
               })}
      </div>
    </>
  }


  return (
     <div className="block">
     {index===-1 ? 
      <div className="section">
         <GetHeading/>
         <GetOrderDetails/>
      </div>
      :<div className="details">
        <GetUserProductDetails/>
         <button className="details-btn" onClick={handleClick} value={-1}>Exit</button>
      </div>
     }
     </div>
  )
  
}