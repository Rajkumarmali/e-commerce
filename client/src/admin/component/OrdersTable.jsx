import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrder, deleteOrder, deliveredOrder, getOrder, shipOrder } from '../../state/admin/order/Action';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const OrdersTable = () => {

    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store)

    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selectedId, setSelectedId] = useState();

    const handleClick = (event, orderId) => {
        setSelectedId(orderId)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShipOrder = (orderId) => {
        dispatch(shipOrder(orderId))
        handleClose();
    }
    const handleConfirmOrder = (orderId) => {
        dispatch(confirmOrder(orderId))
        handleClose();
    }
    const handelDeliverOrder = (orderId) => {
        dispatch(deliveredOrder(orderId))
        handleClose();
    }
    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId))
    }

    useEffect(() => {
        dispatch(getOrder())
    }, [adminOrder.confirmed, adminOrder.shiped, adminOrder.delivered])



    return (
        <div className='p-10'>
            <Card className='mt-2 text-left'>
                <CardHeader title="All Orders" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell >Id</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >Update</TableCell>
                                <TableCell >Delete</TableCell>
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
                                    <TableCell>
                                        {item?.orderItems?.map((orderItem) =>
                                            <p>
                                                {orderItem?.product?.title}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell >{item.id}</TableCell>
                                    <TableCell >{item.totalPrice}</TableCell>
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
                                    <TableCell >
                                        <Button
                                            id={buttonId}
                                            aria-controls={open ? menuId : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open}
                                            onClick={(e) => handleClick(e, item.id)}
                                        >
                                            {item.orderStatus}
                                        </Button>
                                        <Menu
                                            id={menuId}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            slotProps={{
                                                list: {
                                                    'aria-labelledby': buttonId,
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={() => handleConfirmOrder(selectedId)}>Confirm Order</MenuItem>
                                            <MenuItem onClick={() => handleShipOrder(selectedId)}>Ship Order</MenuItem>
                                            <MenuItem onClick={() => handelDeliverOrder(selectedId)}>Deliver Order</MenuItem>
                                        </Menu>
                                    </TableCell>
                                    <TableCell >
                                        <Button variant='outlined' onClick={() => handleDeleteOrder(item.id)}>Delete</Button>
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

export default OrdersTable
