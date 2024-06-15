import { CheckIcon } from "./CheckIcon";
import { NotCheckIcon } from "./NotCheckIcon";
import { Link } from "react-router-dom";

export const GetOrderDetails = ({orders}) => {

    return (
      <>
        {orders.map((item, ind) => {
          return <div className="orders" key={ind}>
            <div >{ind + 1} </div>
            <div >{item._id} </div>
            <div >{item.userId._id} </div>
            <div >{item.isDelivered === true ? "Delivered" : "Not Delivered"}</div>
            <div >{item.msg} </div>
            {item.ispaid ? <div className="check"><CheckIcon /> </div> : <div className="uncheck"><NotCheckIcon /></div>}
            <div > {item.orderedDate} </div>
            <div > {item.deliveredDate} </div>
            <div className="edit">
              <Link className="edit-button" to={`/admin/manage/orders/update/${item._id}`}>Edit</Link>
            </div>
            <Link className="edit-button" to={`/admin/manage/orders/details/${item._id}`}>Details</Link>
          </div>
        })}
      </>
    )
  }