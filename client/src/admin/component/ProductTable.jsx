import { Avatar, Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../state/product/Action';

const ProductTable = () => {

    const dispatch = useDispatch();
    const { product } = useSelector(store => store)

    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId))
    }

    useEffect(() => {
        const data = {
            pageNumber: 0,
            pageSize: 100,
        }
        dispatch(findProducts(data));
    }, [])

    return (
        <div className='p-5'>
            <Card className='mt-2 text-left'>
                <CardHeader title="All products" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell >Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell >Quantity</TableCell>
                                <TableCell >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product?.products?.content?.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Avatar src={item.imageUrl} />
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell >{item.category?.name}</TableCell>
                                    <TableCell >{item.price}</TableCell>
                                    <TableCell >{item.quantity}</TableCell>
                                    <TableCell >
                                        <Button variant='outlined' onClick={() => handleProductDelete(item.id)}>Delete</Button>
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

export default ProductTable
