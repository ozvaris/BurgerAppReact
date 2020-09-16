import * as actionTypes from './actionTypes';
import axios from 'axios';



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        
    };
};

export const logout = (expritionTime) => {
    return {
        type: actionTypes.AUTH_LOGOUT

    }
}

export const checkAuthTimeout = (expritionTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expritionTime * 1000);

    }
}

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        isLogin: true

    };
};

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};



export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUu7XlpQUFKsWPu-j6nZ3Ky9SrRDivWJY";
        if(!isSignup)
        {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUu7XlpQUFKsWPu-j6nZ3Ky9SrRDivWJY";
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout( response.data.expiresIn));

        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    };
};