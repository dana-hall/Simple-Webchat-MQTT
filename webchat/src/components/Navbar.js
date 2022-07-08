import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import './Navbar.css'

const Navbar = (props) => {
    return (
        <div className="container">
            <div className="topnav">
                <p className="navTitle">Webchat</p>
                <ul className="right">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Navbar)