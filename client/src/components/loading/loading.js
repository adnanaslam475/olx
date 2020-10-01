import React from 'react';
import classes from './loading.module.css';

const Loading = React.memo(props => {
    return (
        <div className={classes.Ring}>
            {props.show ? <>  <div />
                <div />
                <div />
                <div /></> : null}
        </div>
    )
})
export default Loading
