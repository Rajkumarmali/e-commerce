import React from 'react'
import AddressCard from '../addressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../cart/CartItem'

const OrderSummary = () => {
    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border text-left'>
                <AddressCard />
            </div>
            <div>
                <div className='lg:grid grid-cols-3 relative'>
                    <div className='col-span-2'>
                        {[1, 2, 3].map((item) => <CartItem />)}
                    </div>
                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border text-left'>
                            <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3'>
                                    <span>Price</span>
                                    <span>₹799 </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>-₹799 </span>
                                </div>
                                <div className='flex justify-between '>
                                    <span>Delivery charge</span>
                                    <span className='text-green-600'>Free </span>
                                </div>
                                <div className='flex justify-between font-bold'>
                                    <span>Total Amount</span>
                                    <span className='text-green-600'> ₹799 </span>
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
