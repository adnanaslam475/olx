import * as React from 'react'
import classes from './backdrop.module.css'
 const backdrop = props => {
    return (
        <div>
            {props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null}
        </div>
    );
}
export default backdrop