import { GET_USER_FAILER, GET_USER_REQUEST, GET_USER_SUCCESS, LOG_OUT, LOGIN_FAILER, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILER, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,

};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state, isLoading: true, error: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state, isLoading: false, error: null, jwt: action.payload
            }
        case GET_USER_SUCCESS:
            return {
                ...state, isLoading: false, error: null, user: action.payload
            }
        case REGISTER_FAILER:
        case LOGIN_FAILER:
        case GET_USER_FAILER:
            return {
                ...state, isLoading: false, error: action.payload
            }
        case LOG_OUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}