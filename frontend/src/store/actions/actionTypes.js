import { createActions, handleActions } from 'redux-actions'

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const STORE_AUTHENTICATION = 'STORE_AUTHENTICATION';

export const {
    authStart,
    authSuccess,
    authFailure,
    authLogout,
    storeAuthentication
} = createActions(
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    STORE_AUTHENTICATION
)
const initialState = {
    isLoading: false,
    error: null,
    isAuthenticated:false,
};


export default handleActions(
    {
        AUTH_START: (state, payload) => (
            {
              ...state,
              loading: true,
              data: payload
            }
          ),
          AUTH_SUCCESS: (state, { payload }) => (
            {
              ...state,
              loading: false,
              isAuthenticated: payload
            }
          ),
          AUTH_FAIL: (state, { payload }) => (
            {
              ...state,
              loading: false,
              data: null
            }
          ),
          AUTH_LOGOUT: (state, { payload }) => (
            {
              ...state,
              loading:false,
              isAuthenticated:payload
            }
          ),
        STORE_AUTHENTICATION: (state, { payload }) => (
            {
                ...state,
                loading:false,
                isAuthenticated:payload
            }
        )
    }, initialState
)