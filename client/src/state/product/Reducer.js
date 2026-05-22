import { FIND_PRODUCT_BY_ID_FAILER, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILER, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType"

const initialState = {
    prodcuts: [],
    product: null,
    loading: false,
    error: null
}

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return {
                ...state, loading: true, error: null
            }

        case FIND_PRODUCTS_SUCCESS:
            return {
                ...state, loading: false, error: null, prodcuts: action.payload
            }

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state, loading: false, error: null, product: action.payload
            }

        case FIND_PRODUCTS_FAILER:
        case FIND_PRODUCT_BY_ID_FAILER:
            return {
                ...state, loading: false, error: action.payload
            }

        default:
            return state
    }
} 