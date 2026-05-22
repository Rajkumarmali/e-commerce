import { api } from "../../config/apiConfig"
import { CREATE_ORDER_FAILER } from "../order/ActionType"
import { CREATE_PAYMENT_REQUEST, UPDATE_PAYMENT_FAILER, UPDATE_PAYMENT_REQUEST } from "./ActionType"

export const createPayment = (orderId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST })
    try {
        const { data } = await api.post(`/api/payment/${orderId}`)
        if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
        }
    } catch (err) {
        dispatch({ type: CREATE_ORDER_FAILER, payload: err.message })
    }
}

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST })
    try {
        const { data } = await api.get(`/api/payment?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`)
        console.log("updatePaymentData", data)
    } catch (err) {
        dispatch({ type: UPDATE_PAYMENT_FAILER, payload: err.message })
    }
}