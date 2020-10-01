import * as React from 'react';
import classes from './textarea.module.css';

const textArea = React.memo(props => {
    return (
        <div className={classes.Main}>
            <label className={classes.Label}>{props.title}</label>
            <textarea
                className={classes.TextArea}
                name={props.name}
                rows={props.rows}
                cols={props.cols}
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
export default textArea