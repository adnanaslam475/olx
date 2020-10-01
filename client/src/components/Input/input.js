import * as React from 'react';
import classes from "./input.module.css"

const Input = React.memo(props => {
    return (
        <div className={classes.Main}>
            <label className={classes.Label}>{props.title}</label>
            <input
                className={classes.Input}
                id={props.name}
                name={props.name}
                type={props.type}
                maxLength={props.max}
                value={props.value}
                onChange={props.changed}
                placeholder={props.placeholder}
            />
                <span className={classes.Count}>
                    {props.value.length}/{props.max}
                </span>
        </div>
    )
})
export default Input