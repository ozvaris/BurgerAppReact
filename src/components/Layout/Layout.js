import React from 'react'

import Aux from '../../hoc/Auxliary'
import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Bakdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;