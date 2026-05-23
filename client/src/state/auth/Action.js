import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig";
import { GET_USER_FAILER, GET_USER_REQUEST, GET_USER_SUCCESS, LOG_OUT, LOGIN_FAILER, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILER, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const token = localStorage.getItem("jwt");

const registerRequest = () => ({ type: REGISTER_REQUEST })
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user })
const registerFailer = (error) => ({ type: REGISTER_FAILER, payload: error })

const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user })
const loginFailer = (error) => ({ type: LOGIN_FAILER, payload: error })

const getUserRequest = () => ({ type: GET_USER_REQUEST })
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user })
const getUserFailer = (error) => ({ type: GET_USER_FAILER, payload: error })


export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        console.log("register", user)
        dispatch(registerSuccess(user.jwt))
    } catch (err) {
        dispatch(registerFailer(err.message))
    }
}

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        console.log("login user", user)
        dispatch(loginSuccess(user.jwt))
    } catch (err) {
        dispatch(loginFailer(err.message))
    }
}

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest())

    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/userProfile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        const user = response.data;
        console.log("get user", user)
        dispatch(getUserSuccess(user))

    } catch (err) {
        dispatch(getUserFailer(err.message))
    }
}

export const logOut = () => (dispatch) => {
    dispatch({ type: LOG_OUT, payload: null })
    localStorage.clear()
}