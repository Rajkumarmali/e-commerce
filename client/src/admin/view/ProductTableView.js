import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../state/product/Action';
import { Avatar, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ProductTableView = () => {
    const dispatch = useDispatch();
    const { product } = useSelector(store => store)



    useEffect(() => {
        const data = {
            pageNumber: 0,
            pageSize: 100,
        }
        dispatch(findProducts(data));
    }, [])

    return (
        <div >
            <Card className='text-left' sx={{ backgroundColor: "#242B2E", color: "white" }}>
                <CardHeader title="Recent Products" />
                <TableContainer component={Paper} sx={{
                    backgroundColor: "#242B2E"
                }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Image</TableCell>
                                <TableCell sx={{ color: "white" }}>Title</TableCell>
                                <TableCell sx={{ color: "white" }}>Category</TableCell>
                                <TableCell sx={{ color: "white" }}>Price</TableCell>
                                <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product?.products?.content?.slice(0, 10).map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Avatar src={item.imageUrl} />
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>{item.title}</TableCell>
                                    <TableCell sx={{ color: "white" }} >{item.category?.name}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{item.price}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{item.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </div>
    )
}

export default ProductTableView
