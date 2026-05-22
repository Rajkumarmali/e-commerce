import { api } from "../../config/apiConfig";
import { CREATE_ORDER_FAILER, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILER, GET_ORDER_BY_ID_REQUEST } from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST })
    try {
        console.log("reqData", reqData);
        const { data } = await api.post(`/api/order`, reqData.address)
        if (data.id) {
            reqData.navigate({ search: `step=3&order_id=${data.id}` });
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: CREATE_ORDER_FAILER, payload: err.message })
    }
}

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST })
    try {
        const { data } = await api.get(`/api/order/${orderId}`)
        dispatch({ type: GET_ORDER_BY_ID_REQUEST, payload: data })
        console.log("orderById", data);
    } catch (err) {
        dispatch({ type: GET_ORDER_BY_ID_FAILER, payload: err.message })
    }
}
