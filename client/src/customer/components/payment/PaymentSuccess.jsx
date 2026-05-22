import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../state/order/Action';
import { updatePayment } from '../../../state/payment/Action';
import { Alert, AlertTitle, Grid } from '@mui/material';
import OrderTraker from '../order/OrderTraker';
import AddressCard from '../addressCard/AddressCard';


const PaymentSuccess = () => {

    const [paymentId, setPaymentId] = useState();
    const [referenceId, setReferenceId] = useState();
    const [paymentStatus, setPaymentStats] = useState();

    const { orderId } = useParams();

    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const address = order.order?.shippingAddress;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setPaymentId(urlParams.get("razorpay_payment_id"))
        setPaymentStats(urlParams.get("razorpay_payment_link_status"))
    }, [])

    useEffect(() => {
        const data = { orderId, paymentId }
        dispatch(getOrderById(orderId))
        dispatch(updatePayment(data))
    }, [orderId, paymentId])

    return (
        <div className='px-2 lg:px-36'>
            <div className='flex flex-col justify-center items-center'>
                <Alert
                    variant='filled'
                    severity='success'
                    sx={{ mb: 6, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Your Order Get Placed
                </Alert>
            </div>
            <OrderTraker activeStep={1}></OrderTraker>

            {
                order.order?.orderItems.map((item) =>
                    <Grid container className="py-2 w-full">
                        <Grid
                            container
                            item
                            xs={12}
                            className="shadow-xl rounded-md p-8 w-full"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                minHeight: "100px"
                            }}
                        >
                            <Grid item xs={6}>
                                <div className='flex items-center'>
                                    <img className='w-[5rem] h-[5rem] object-cover object-top' src={item.product?.imageUrl} alt='' />
                                    <div className='ml-5 space-y-2 text-left'>
                                        <p>{item?.product?.title}</p>
                                        <div className='opacity-50 text-xs font-semibold space-x-2'>
                                            <span >Color: {item?.product?.color}</span>
                                            <span>Size:{item?.product?.size}</span>
                                        </div>
                                        <p>Seller:{item.product?.brand}</p>
                                        <p>₹{item.product?.price}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item>
                                <AddressCard address={address} />
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }

        </div>
    )
}



export default PaymentSuccess
