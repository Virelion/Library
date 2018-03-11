// src/components/About/index.js
import React from 'react';
import {NavLink} from 'react-router-dom';

import './style.css';

const CustomNavLink = ({component: Component, ...rest}) => (
            <NavLink {...rest} activeClassName='active' exact />
        );

export default CustomNavLink;