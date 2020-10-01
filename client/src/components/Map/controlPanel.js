import React, { Component } from 'react';
const defaultContainer = ({ children }) => <div className="control-panel">{children}</div>;

const eventNames = ['onDragEnd']

function round5(value) {
    return (Math.round(value * 1e5) / 1e5)
}
class ControlPanel extends Component {
    renderEvent = e => {
        const { events = {} } = this.props
        const lngLat = events[e]
        return (
            <div>
                <strong>{e}:</strong>{' '}
                {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
            </div>
        )
    }

    render() {
        const Container = this.props.containerComponent || defaultContainer;
        return (
            <Container>
                {eventNames.map(this.renderEvent)}
            </Container>
        );
    }
}
export default ControlPanel