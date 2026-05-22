import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../state/cart/Action';


const CartItem = ({ cartItem }) => {

    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const data = { cartItemId: cartItem.id, data: { quantity: cartItem?.quantity + num } }
        dispatch(updateCartItem(data))
    }

    const handleRemoveItem = () => {
        dispatch(removeCartItem(cartItem.id));
    }

    return (
        <div className='p-5 shadow-lg border rounded-md'>
            <div className='flex items-center '>
                <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className='w-full h-full object-cover object-top ' src={cartItem?.product?.imageUrl} alt='' />
                </div>
                <div className='ml-5 space-y-1 text-left'>
                    <p className='font-semibold'>{cartItem?.product?.title}</p>
                    <p className='opacity-70'> Size: {cartItem?.size},{cartItem?.product?.color}</p>
                    <p className='opacity-70 mt-2'> Seller: {cartItem?.product.brand} </p>
                    <div className='flex space-x-5 items-center text-gray-900 pt-6 '>
                        <p className="font-semibold">₹{cartItem?.product?.discountedPrice}</p>
                        <p className="font-semibold opacity-50 line-through"> ₹ {cartItem?.product?.price}</p>
                        <p className="text-green-600 font-semibold">{cartItem?.product?.discountPresent}% off </p>
                    </div>
                </div>
            </div>
            <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={cartItem?.quantity <= 1}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'>{cartItem?.quantity}</span>
                    <IconButton sx={{ color: "RGB(145 85 253)" }} onClick={() => handleUpdateCartItem(1)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <div>
                    <Button sx={{ color: "RGB(145 85 253)" }} onClick={handleRemoveItem}>remove</Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
