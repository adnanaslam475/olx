import * as React from 'react'
import classes from './select.module.css'

const select = ({ name, changed, title, value, options, placeholder }) => {
    console.log('name ' + name, 'placeolder ' + placeholder, changed, value)
    return (
        <div>
            <label className={classes.Label} htmlFor={name}> {title} </label>
            <select
                className={classes.Select}
                name={name}
                value={value}
                onChange={changed}>
                <option value='' disabled>{placeholder}</option>
                {options.map(option => {
                    return (
                        <option
                            key={option}
                            value={option}
                            label={option}>
                            {option}
                        </option>
                    )
                })}
            </select>
        </div>)
}
export default select