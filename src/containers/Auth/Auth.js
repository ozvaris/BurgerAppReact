import React, {useState, useEffect } from 'react';

import classes from "./Auth.module.css";
import Input from '../../components/UI/Input/Input';
import Button from "../../components/UI/Button/Button";
import Aux from '../../hoc/Auxliary/Auxliary'
import Spinner from "../../components/UI/Spinner/Spinner";
import axios  from "../../axios-orders";
import * as actions from '../../store/actions/index';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';

import { Redirect } from "react-router-dom";
import { checkValidity} from '../../shared/utility'


const  Auth = props => {
    const [controls, setControls] = 
        useState({
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
        });
        const [isSignup, setIsSignup] = useState(true);

        //isSignup: true
    

    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath();
        }
    }, []);

    const inputChangedHandler = (event, controlName) =>{

        
        const updatedControls = {
            ...controls,
            [controlName] : {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            } 
        };
    
        // let formIsValid = true;
        // for(let inputIdentifier in updatedOrderForm){
        //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        // }
    
        setControls(updatedControls);
    
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }
    const switchAuthModeHandler = (event) => {
        event.preventDefault();
        setIsSignup(!isSignup);
    }

    const formElementsArray = [];
        for(let key in controls){
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let authRedirect = null;
        if(props.isAtuhenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

        if (props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (props.error) {
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isLogin: state.auth.isLogin,
        error: state.auth.error,
        isAtuhenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath

    }
}

const mapDispatchToProps = dispatch => {
    return {
       
        onAuth: (email, password, isSignup) => dispatch( actions.auth(email, password, isSignup) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));

