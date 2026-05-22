import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../state/cart/Action'

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cart } = useSelector(store => store)

    const handleCheckOut = () => {
        navigate('/checkout?step=2')
    }

    useEffect(() => {
        dispatch(getCart());
    }, [cart.updateCartItem, cart.deleteCartItem])

    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {cart.cartItems?.map((item) => <CartItem cartItem={item} />)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border text-left'>
                        <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                        <hr />
                        <div className='space-y-3 font-semibold mb-10'>
                            <div className='flex justify-between pt-3'>
                                <span>Price</span>
                                <span>₹{cart.cart?.totalPrice} </span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Discount</span>
                                <span className='text-green-600'>-₹{cart.cart?.totalPrice - cart.cart?.totalDiscountPrice} </span>
                            </div>
                            <div className='flex justify-between '>
                                <span>Delivery charge</span>
                                <span className='text-green-600'>Free </span>
                            </div>
                            <div className='flex justify-between font-bold'>
                                <span>Total Amount</span>
                                <span className='text-green-600'> ₹{cart.cart?.totalDiscountPrice} </span>
                            </div>
                        </div>
                        <Button onClick={handleCheckOut} variant='contained' className='w-full mt-5' sx={{ px: "2.5rem", py: '.7rem', bgcolor: '#9155fd' }}>
                            CheckOut
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
