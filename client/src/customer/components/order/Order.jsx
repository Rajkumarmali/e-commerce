import { Grid } from '@mui/material'
import React from 'react'
import OrderCard from './OrderCard'

const orderStatus = [
    { label: 'On The way', value: "on_the_way" },
    { label: 'Delivered', value: "delivered" },
    { label: 'Cancelled', value: "cancelled" },
    { label: 'Returned', value: "returned" }
]

const Order = () => {
    return (
        <div className='px-5 lg:px-20'>
            <Grid container spacing={3} sx={{ px: 5, mt: 2 }} >

                {/* Filter Sidebar */}
                <Grid item xs={12} md={3}>
                    <div className='shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className='font-bold text-lg'>Filters</h1>

                        <div className='space-y-4 mt-6'>
                            <h1 className='font-semibold'>ORDER STATUS</h1>

                            {orderStatus.map((option) => (
                                <div key={option.value} className='flex items-center'>
                                    <input
                                        id={option.value}
                                        value={option.value}
                                        type='checkbox'
                                        className='h-4 w-4 border-gray-300'
                                    />
                                    <label
                                        htmlFor={option.value}
                                        className='ml-3 text-sm text-gray-600'
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    <div className="space-y-4">
                        {[1, 1, 1, 1, 1, 1].map((item) => (
                            <OrderCard />
                        ))}
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default Order