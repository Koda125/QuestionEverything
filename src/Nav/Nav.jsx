import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


function Nav() {

    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to='/GameTime'>Time to play!</NavLink>
                </li>
            </ul>
        </nav>
    
    )
}

export default Nav;