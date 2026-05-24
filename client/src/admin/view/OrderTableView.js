import { Avatar, AvatarGroup, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../state/admin/order/Action';

const OrderTableView = () => {
    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store)

    useEffect(() => {
        dispatch(getOrder())
    }, [])



    return (
        <div>
            <Card className='text-left' sx={{ backgroundColor: "#242B2E", color: "white" }}>
                <CardHeader title="Recent Orders" sx={{
                }} />
                <TableContainer component={Paper} sx={{
                    backgroundColor: "#242B2E"
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Image</TableCell>
                                <TableCell sx={{ color: "white" }}>Title</TableCell>
                                <TableCell sx={{ color: "white" }}>Id</TableCell>
                                <TableCell sx={{ color: "white" }}>Price</TableCell>
                                <TableCell sx={{ color: "white" }}>Status</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder?.orders?.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        <AvatarGroup max={3} sx={{ justifyContent: 'start' }}>
                                            {item?.orderItems?.map((orderItem) =>
                                                <Avatar src={orderItem?.product?.imageUrl} />
                                            )}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        {item?.orderItems?.map((orderItem) =>
                                            <p>
                                                {orderItem?.product?.title}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>{item.id}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{item.totalPrice}</TableCell>
                                    <TableCell >
                                        <span className={`text-white px-5 py-2 rounded
                                        ${item.orderStatus === 'CONFIRMED' ? "bg-[#369236]" :
                                                item.orderStatus === "SHIPPED" ? "bg-[#4141FF]" :
                                                    item.orderStatus === "PLACED" ? "bg-[#02B290]" :
                                                        item.orderStatus === "PENDING" ? "bg-[gray]" : "bg-[#025720]"}`}
                                        >
                                            {item.orderStatus}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </div>
    )
}

export default OrderTableView
