import * as React from 'react'
import classes from './image.module.css'
const image = React.memo(props => {
    return (
        <img
            src={props.src}
            alt={props.alt}
            onChange={props.changed}
            className={classes.Img}
        />
    );
})
export default image