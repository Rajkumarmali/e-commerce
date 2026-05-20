import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/homePage/HomePage'
import Cart from '../customer/components/cart/Cart'
import Navigation from '../customer/components/navigation/Navigation'
import Footer from '../customer/components/footer/Footer'
import Product from '../customer/components/product/Product'
import ProductDetails from '../customer/components/productDetails/ProductDetails'
import CheckOut from '../customer/components/checkOut/CheckOut'
import Order from '../customer/components/order/Order'
import OrderDetails from '../customer/components/order/OrderDetails'

const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<HomePage />}></Route>
                <Route path='/register' element={<HomePage />}></Route>

                <Route path='/' element={<HomePage />}></Route>
                <Route path='/cart' element={< Cart />}></Route>
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />}></Route>
                <Route path='/product/:productId' element={<ProductDetails />}></Route>
                <Route path='/checkout' element={<CheckOut />}></Route>
                <Route path='/account/order' element={<Order />}></Route>
                <Route path='/account/order/:orderId' element={<OrderDetails />}></Route>
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRouters
