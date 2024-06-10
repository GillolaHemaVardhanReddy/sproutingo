import React from 'react'
import order_menu_logo from '../../Assets/order_menu_logo.png';
import './OrderMenu.css'
import OrderMenuButton from '../OrderMenuButton/OrderMenuButton';

const OrderMenu = () => {
    return (
        <div className='whole-menu'>
            <div className='order-menu'>
                <div className="order-menu-top">
                    <img src={order_menu_logo} alt="" />
                </div>
                <div className="order-menu-bottom">
                    <p className='order-menu-heading'>Menu</p>
                    <OrderMenuButton />
                </div>
            </div>
            <div className='vertical-line'></div>
        </div>
    )
}
export default OrderMenu