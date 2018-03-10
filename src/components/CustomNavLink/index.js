// src/components/About/index.js
import React, { Component } from 'react';
import Helper from './../../Helper';
import { NavLink} from 'react-router-dom';

import './style.css';

const CustomNavLink = ({component: Component, ...rest}) => (
            <NavLink {...rest} activeClassName='active' exact />
        );

export default CustomNavLink;