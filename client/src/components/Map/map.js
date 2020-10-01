import React, { PureComponent } from 'react';
import Pin from './Pin';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { generateLocation } from '../../actions/mapActions';
import { connect } from 'react-redux';
import Button from '../button/button'
const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
}
const access_token = 'pk.eyJ1IjoiYWRuYW5hc2xhbSIsImEiOiJja2JsNzZ0c2YxNTF2MnNteTN4amc1ZmE2In0.crBJBsWxfO06ED71wt-Yvw'
class Map extends PureComponent {
    state = {
        viewport: {
            latitude: 24.88,
            longitude: 65.2,
            zoom: 1,
            width: '58.6vw',
            height: '62vh'
        },
        marker: {
            latitude: 25.974101,
            longitude: 67.0653077
        },
        events: {}
    }
    componentDidMount() {
        window.addEventListener('resize', this._resize)
        this._resize()
    }

    generateLocation = () => {
        const mar = { ...this.state.marker }
        this.props.onGetLocation(mar.longitude, mar.latitude)
    }
    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport
            }
        })
    }

    _updateViewport = viewport => {
        this.setState({ viewport })
    }

    _onMarkerDragEnd = e => {
        this.setState({
            marker: {
                longitude: e.lngLat[0],
                latitude: e.lngLat[1]
            }
        })
    }

    render() {
        const { viewport, marker } = this.state
        return (
            <div>
                <MapGL
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onViewportChange={this._updateViewport}
                    mapboxApiAccessToken={access_token}>
                    <Marker
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        draggable
                        onDragEnd={this._onMarkerDragEnd}>
                        <Pin size={30} />
                    </Marker>
                    <div className='nav' style={navStyle}>
                        <NavigationControl onViewportChange={this._updateViewport} />
                    </div>
                </MapGL>
                <Button btnType='BtnPost' clicked={this.generateLocation} name='OK'></Button>
                <Button btnType='BtnCancel' clicked={this.props.modalClosed} name='cancel'></Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => {
    return {
        onGetLocation: (lat, long) => dispatch(generateLocation(lat, long))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)