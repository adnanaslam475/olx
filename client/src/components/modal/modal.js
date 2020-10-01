import React from 'react'
import Backdrop from '../backdrop/backdrop'
import classes from './modal.module.css'

export const modal = React.memo(props => {
    return (
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={[classes[props.modalType]].join(' ')} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}>
                <span onClick={props.modalClosed} className={classes.CrossBtn}>
                    {props.closeBtn}
                </span>
                <b>{props.para}</b>
                {props.children}
            </div>
        </div>
    );
})
export default modal