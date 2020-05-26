import React from 'react'

import Aux from '../../hoc/Auxliary'

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Bakdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;