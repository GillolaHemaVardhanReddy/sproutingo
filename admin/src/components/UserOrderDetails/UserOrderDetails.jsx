import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserOrderDetails.css"
export const GetUserProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate to get the navigate function
    const [order, setOrder] = useState(null); // Initialize as null to check if data is loaded

    const getOrder = async () => {
        var finalurl = `/order/${id}`;
        var resp = await axios.get(finalurl);
        setOrder(resp.data.data);
    };

    useEffect(() => {
        getOrder();
    }, []);

    const handleExit = () => {
        navigate(-1); // Redirect the user to the previous page
    };

    if (!order) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <>
            <div className="userDetails">
                <div className="heading">User Details</div>
                <div className="userId">User Id : {order.userId._id}</div>
                <div className="userName">User Name : {order.userId.name}</div>
                <div className="userEmail">User Email : {order.userId.email}</div>
            </div>
            <div className="productDetails">
                <div className="heading">Products Details</div>
                {order.products.map((item, ind) => (
                    <div className="product" key={ind}>
                        <div className="productId">Product ID : {item.productId._id}</div>
                        <div className="productName">Product Name : {item.productId.name}</div>
                        <div className="quantity">Quantity : {item.quantity}</div>
                        <div className="price">Price : {item.price}</div>
                    </div>
                ))}
            </div>
            <button onClick={handleExit} className="exitButton">Exit</button>
        </>
    );
};
