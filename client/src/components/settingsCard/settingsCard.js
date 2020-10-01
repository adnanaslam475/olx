import * as React from 'react'
import classes from './settingsCard.module.css'
import { Link } from 'react-router-dom'
export const settingsCard = props => {
    return (
        <pre>
        <div className={classes.Main}>
            <div className={classes.ItemOne}>
                <img className={classes.Img} src={props.pic} alt='pri pic' />
                <h6>{props.username}</h6>
                <Link to='/editProfile'> view and edit profile</Link>
            </div>
            <div className={classes.Item} >My ads</div>
            <div className={classes.Item}>settings</div>
            <div className={classes.Item} onClick={props.logout}>log out</div>
        </div></pre>
    );
}
export default settingsCard