import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverView from './MonthlyOverView'
import ProductTable from './ProductTable'
import OrderTableView from '../view/OrderTableView'
import ProductTableView from '../view/ProductTableView'

const Dashboard = () => {
    return (
        <div className='p-10 h-[100%]' >
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                    <Achivement />
                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverView />
                </Grid>
                <Grid className='shadow-lg shadow-gray-600' item xs={12} md={8} sx={{
                    maxWidth: 650,
                    maxHeight: 550,
                    overflowY: "auto"
                }}>
                    <OrderTableView />
                </Grid>
                <Grid className='shadow-lg shadow-gray-600' item xs={12} md={8} sx={{
                    maxWidth: 460,
                    maxHeight: 550,
                    overflowY: "auto"
                }}>
                    <ProductTableView />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
