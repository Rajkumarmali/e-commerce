import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../state/product/Action'
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
    Box
} from '@mui/material'

const initialSizes = [
    { name: 'S', quantity: 0 },
    { name: 'M', quantity: 0 },
    { name: 'L', quantity: 0 }
]

const CreateProductForm = () => {

    const [productData, setProductData] = useState({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        discountedPrice: "",
        price: "",
        discountPresent: "",
        sizes: initialSizes,
        quantity: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: ""
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target

        setProductData((preState) => ({
            ...preState,
            [name]: value
        }))
    }

    const handleChangeSize = (e, index) => {
        let { name, value } = e.target

        name === 'size_quantity'
            ? name = "quantity"
            : name = e.target.name

        const sizes = [...productData.sizes]

        sizes[index][name] = value

        setProductData((preState) => ({
            ...preState,
            sizes: sizes
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const finalData = {
            ...productData,
            discountedPrice:
                productData.price * (100 - productData.discountPresent) / 100
        }

        dispatch(createProduct(finalData))
    }

    return (
        <Box
            sx={{
                backgroundColor: "#f4f6f8",
                minHeight: "100vh",
                p: 4
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: "1200px",
                    margin: "auto",
                    p: 4,
                    borderRadius: "16px"
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 4,
                        color: "#1976d2"
                    }}
                >
                    Add New Product
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        {/* Image URL */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Image URL"
                                name="imageUrl"
                                value={productData.imageUrl}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Brand */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Brand"
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Title */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={productData.title}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Color */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Color"
                                name="color"
                                value={productData.color}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Quantity */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Quantity"
                                name="quantity"
                                value={productData.quantity}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Price */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                            />
                        </Grid>



                        {/* Discount Percentage */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Discount Percentage"
                                name="discountPresent"
                                value={productData.discountPresent}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Discounted Price */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Discounted Price"
                                name="discountedPrice"
                                value={
                                    productData.price ?
                                        productData.price *
                                        (100 - productData.discountPresent) / 100
                                        : ""
                                }
                                InputProps={{
                                    readOnly: true
                                }}
                            />
                        </Grid>
                        {/* Top Category */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ minWidth: 400 }}>
                                <InputLabel>Top Level Category</InputLabel>

                                <Select
                                    name='topLevelCategory'
                                    value={productData.topLevelCategory}
                                    onChange={handleChange}
                                    label="Top Level Category"
                                >
                                    <MenuItem value="men">Men</MenuItem>
                                    <MenuItem value="women">Women</MenuItem>
                                    <MenuItem value="kids">Kids</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Second Category */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ minWidth: 400 }}>
                                <InputLabel>Second Level Category</InputLabel>

                                <Select
                                    name='secondLevelCategory'
                                    value={productData.secondLevelCategory}
                                    onChange={handleChange}
                                    label="Second Level Category"
                                >
                                    <MenuItem value="clothing">Clothing</MenuItem>
                                    <MenuItem value="accessories">Accessories</MenuItem>
                                    <MenuItem value="brands">Brands</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Third Category */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ minWidth: 400 }}>
                                <InputLabel>Third Level Category</InputLabel>

                                <Select
                                    name='thirdLevelCategory'
                                    value={productData.thirdLevelCategory}
                                    onChange={handleChange}
                                    label="Third Level Category"
                                >
                                    <MenuItem value="top">Top</MenuItem>
                                    <MenuItem value="women_dress">Women Dress</MenuItem>
                                    <MenuItem value="t-shirt">T-Shirt</MenuItem>
                                    <MenuItem value="lenght_choli">Lengtha Choli</MenuItem>
                                    <MenuItem value="saree">Saree</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                label="Description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Sizes */}
                        {productData.sizes.map((size, index) => (
                            <Grid
                                container
                                item
                                spacing={2}
                                key={index}
                            >
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Size Name"
                                        name="name"
                                        value={size.name}
                                        onChange={(e) =>
                                            handleChangeSize(e, index)
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        label="Quantity"
                                        name="size_quantity"
                                        // value={size.quantity}
                                        onChange={(e) =>
                                            handleChangeSize(e, index)
                                        }
                                    />
                                </Grid>
                            </Grid>
                        ))}

                        {/* Button */}
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='contained'
                                size='large'
                                type='submit'
                                sx={{
                                    py: 1.8,
                                    borderRadius: "10px",
                                }}
                            >
                                ADD NEW PRODUCT
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Box>
    )
}

export default CreateProductForm