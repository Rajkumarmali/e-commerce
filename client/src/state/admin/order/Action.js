import { api } from "../../../config/apiConfig"
import { CANCELED_ORDER_FAILER, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCCESS, CONFIRM_ORDER_FAILER, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, DELETE_ORDER_FAILER, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILER, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_FAILER, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SHIP_ORDER_FAILER, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

export const getOrder = () => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST })
    try {
        const { data } = await api.get(`/api/admin/order/`);
        dispatch({ type: GET_ORDER_SUCCESS, payload: data })
        console.log(data)
    } catch (err) {
        dispatch({ type: GET_ORDER_FAILER, payload: err.message })
    }
}

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRM_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/confirmed/${orderId}`);
        dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CONFIRM_ORDER_FAILER, payload: err.message })
    }
}

export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/ship/${orderId}`);
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data })
        console.log(data)
    } catch (err) {
        dispatch({ type: SHIP_ORDER_FAILER, payload: err.message })
    }
}

export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/deliver/${orderId}`);
        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELIVERED_ORDER_FAILER, payload: err.message })
    }
}
export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELED_ORDER_REQUEST })
    try {
        const { data } = await api.put(`/api/admin/order/cancel/${orderId}`);
        dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CANCELED_ORDER_FAILER, payload: err.message })
    }
}
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST })
    try {
        const { data } = await api.delete(`/api/admin/order/delete/${orderId}`);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId })
    } catch (err) {
        dispatch({ type: DELETE_ORDER_FAILER, payload: err.message })
    }
}