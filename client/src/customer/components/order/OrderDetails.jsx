import React, { useState } from 'react'
import AddressCard from '../addressCard/AddressCard'
import OrderTraker from './OrderTraker'
import { Box, Grid, Button, TextField, Typography, Avatar } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitReview = () => {
        console.log('Review submitted:', { rating, review });
        setReview('');
        setRating(0);
        setShowReviewForm(false);
    };

    return (
        <div className='px-5 lg:px-20 py-8 text-left'>
            <div className='mb-8' >
                <h1 className='font-bold text-2xl mb-4'>Delivery Address</h1>
                <AddressCard />
            </div>
            <div className='mb-12'>
                <OrderTraker activeStep={3} />
            </div>


            <Grid className='space-y-2'>
                <h1 className='font-bold text-2xl mb-6 '>Order Items</h1>
                {[1, 1, 1, 1, 1].map((item, index) => (
                    <Grid container justifyContent={'space-between'} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <Grid item xs={12} md={8}>
                            <div className='flex text-left items-start space-x-6'>
                                <img
                                    className='w-[120px] h-[120px] object-cover rounded-lg'
                                    src='https://m.media-amazon.com/images/I/61u5oAftaeL._SY879_.jpg'
                                    alt='Product'
                                />
                                <div className='flex-1 space-y-3'>
                                    <h3 className='font-semibold text-lg text-gray-900'>Lymio Cargo for Men</h3>
                                    <div className='flex items-center space-x-4 text-sm text-gray-600'>
                                        <span className='font-medium'>Color: Pink</span>
                                        <span className='font-medium'>Size: M</span>
                                    </div>
                                    <p className='text-sm text-gray-600'>Seller: Lymio Fashion</p>
                                    <p className='text-xl font-bold text-gray-900'>₹799</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ color: deepPurple[500] }}>
                                <StarBorderIcon sx={{ fontSize: "2rem" }} className='text-5xl' />
                                <span>Rate & Review Product</span>
                            </Box>
                        </Grid>
                    </Grid>
                ))}

            </Grid>
        </div>
    )
}

export default OrderDetails
