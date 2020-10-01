import * as React from 'react'
import classes from './button.module.css'
const button = React.memo(props => {
    // console.log(props.clicked)
    return (
        <button className={[classes[props.btnType]].join(' ')}
            type={props.type}
            disabled={props.disabled}
            onClick={props.clicked}>
            {props.name}
        </button>
    )
})
export default button