import React, { Component } from 'react'
import { connect } from 'react-redux';

import Aux from '../Auxliary/Auxliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToogleHandler = () => { 
        this.setState( (prevState) =>  {
            return { showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    drawerToogleClicked={this.sideDrawerToogleHandler} 
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} 
                    isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated  : state.auth.token != null

    }
}

const mapDispatchToProps = dispatch => {
    return {
       
        
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);