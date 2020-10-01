import React from 'react'
import classes from './navbar.module.css'
import img from './220px-OLX_New_Logo.webp'

export const navbar = props => {
    return (
        <nav className={classes.Navbar}>
            <img style={{ 'width': '90px' }} src={img} alt='olx logo' />
            {props.isAuthenticated ? <button onClick={props.modalshow} className={classes.sellBtn}>SELL</button> :
                <button className={classes.sellBtn}>SELL</button>}
            {props.isAuthenticated ? <img className={classes.Img} onClick={props.dropdown} src={props.pic} alt='olx logo' /> :
                <button onClick={props.modalshow} className={classes.loginBtn} >LOGIN</button>}
        </nav>
    )
}
export default navbar