import React, { useEffect } from 'react'
import AddressCard from '../addressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../state/order/Action'
import { useLocation, useParams } from 'react-router-dom'

const OrderSummary = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id")

    const { order } = useSelector(store => store)


    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [])

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border text-left'>
                <AddressCard address={order.order?.shippingAddress} />
            </div>
            <div>
                <div className='lg:grid grid-cols-3 relative'>
                    <div className='col-span-2'>
                        {order.order?.orderItems.map((item) => <CartItem cartItem={item} />)}
                    </div>
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border text-left'>
                            <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3'>
                                    <span>Price</span>
                                    <span>₹{order.order?.totalPrice} </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>-₹{order.order?.totalPrice - order.order?.totalDiscountedPrice} </span>
                                </div>
                                <div className='flex justify-between '>
                                    <span>Delivery charge</span>
                                    <span className='text-green-600'>Free </span>
                                </div>
                                <div className='flex justify-between font-bold'>
                                    <span>Total Amount</span>
                                    <span className='text-green-600'> ₹{order.order?.totalDiscountedPrice} </span>
                                </div>
                            </div>
                            <Button variant='contained' className='w-full mt-5' sx={{ px: "2.5rem", py: '.7rem', bgcolor: '#9155fd' }}>
                                CheckOut
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
