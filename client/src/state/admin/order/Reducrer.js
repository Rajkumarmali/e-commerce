import { GET_ORDER_BY_ID_REQUEST } from "../../order/ActionType"
import { CANCELED_ORDER_FAILER, CANCELED_ORDER_REQUEST, CONFIRM_ORDER_FAILER, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, DELETE_ORDER_FAILER, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILER, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_FAILER, GET_ORDER_SUCCESS, PLACED_ORDER_FAILER, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILER, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    loading: false,
    orders: [],
    error: null
}


export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state, loading: true, error: null
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload
            }
        case GET_ORDER_FAILER:
            return {
                ...state, loading: false, error: action.payload
            }
        case CONFIRM_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
            return {
                ...state, loading: true
            }
        case CONFIRM_ORDER_SUCCESS:
            return {
                ...state, loading: false, confirmed: action.payload
            }
        case PLACED_ORDER_SUCCESS:
            return {
                ...state, loading: false, placed: action.payload
            }
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state, loading: false, delivered: action.payload
            }
        case CONFIRM_ORDER_FAILER:
        case PLACED_ORDER_FAILER:
        case CANCELED_ORDER_FAILER:
        case DELIVERED_ORDER_FAILER:
            return {
                ...state, error: action.payload, loading: false
            }
        case DELETE_ORDER_REQUEST:
            return {
                ...state, error: null, loading: true
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state, error: false, loading: false, orders: state.orders.filter((item) => item.id !== action.payload)
            }
        case DELETE_ORDER_FAILER:
            return {
                ...state, error: action.payload, loading: false
            }
        case SHIP_ORDER_REQUEST:
            return {
                ...state, error: null, loading: true
            }
        case SHIP_ORDER_SUCCESS:
            return {
                ...state, error: null, loading: true, shiped: action.payload
            }
        case SHIP_ORDER_FAILER:
            return {
                ...state, error: action.payload, loading: false
            }
        default:
            return state

    }
}