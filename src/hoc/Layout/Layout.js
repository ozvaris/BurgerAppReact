import React, { useState } from 'react'
import { connect } from 'react-redux';

import Aux from '../Auxliary/Auxliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToogleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }


    return (
        <Aux>
            <Toolbar
                drawerToogleClicked={sideDrawerToogleHandler}
                isAuth={props.isAuthenticated} />
            <SideDrawer
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null

    }
}

const mapDispatchToProps = dispatch => {
    return {


    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);