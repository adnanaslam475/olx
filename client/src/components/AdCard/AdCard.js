import * as React from 'react'
import classes from './AdCard.module.css'

const AdCard = React.memo(props => {
    const cardStyle = {
        backgroundColor: 'rgb(247, 246, 244)',
        maxWidth: '300px',
        height: '250px',
        border: '1px solid'
    }
    const listStyle = {
        backgroundColor: 'rgb(247, 246, 244)',
        maxWidth: '300px',
        height: '250px',
        border: '1px solid'
    }
    const bigStyle = {
        backgroundColor: 'rgb(247, 246, 244)',
        maxWidth: '700px',
        height: '500px',
        border: '1px solid'
    }
    const image = {
        maxWidth: '600px',
        height: '100px',
        float: 'center'
    }
    let url = []
    for (let key in props.urls) {
        url = props.urls[key]
        console.log(url)
    }
    return (
        <div style={cardStyle}
            type={props.type}
            onClick={props.clicked}>
            <img style={image} src={url} alt={props.alt} /><br />
            <b>Rs{' '}{props.price}</b>
            <p>{props.title}</p>
            <p>{props.postedAt}</p>
            <p>{props.location}</p>
        </div>
    )
})
export default AdCard