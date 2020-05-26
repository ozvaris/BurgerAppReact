import React, {Component } from 'react';

import Aux from '../../hoc/Auxliary'
import Burger from '../../components/Burger/Burger'
import { render } from '@testing-library/react'

class BurgerBuilder extends Component {
    render(){
        return (
            <Aux>
                <Burger />
                <div>Burger Controls...</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;