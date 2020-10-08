import React, {Component } from 'react';

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


class Auth extends Component {
    state = {
        controls:{
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
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) =>{

        //alert(event.target.value);
        //alert(this.checkValidity(event.target.value, this.state.controls[controlName].validation));
        
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            } 
        };
    
        // let formIsValid = true;
        // for(let inputIdentifier in updatedOrderForm){
        //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        // }
    
        this.setState({controls: updatedControls});
    
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render () {

        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let authRedirect = null;
        if(this.props.isAtuhenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
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
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );

    }

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

