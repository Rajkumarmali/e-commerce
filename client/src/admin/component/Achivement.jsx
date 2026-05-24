import { Button, Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'


const TrigleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
})

const TropyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position: "absolute"
})

const Achivement = () => {
    return (
        <Card sx={{ position: "relative", backgroundColor: "#242B2E", color: "white" }}>
            <CardContent className='w-[400px] text-left'  >
                <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                    Shop with ecommerce
                </Typography>
                <Typography variant='h5' sx={{ my: 3.1 }}>
                    420.8k
                </Typography>
                <Button size='small' variant='contained'>View Sales</Button>
                <TrigleImg src=''></TrigleImg>
                <TropyImg src='https://img.magnific.com/free-vector/trophy_78370-345.jpg?semt=ais_hybrid&w=740&q=80' ></TropyImg>
            </CardContent>
        </Card>
    )
}

export default Achivement
