import React, { Component } from 'react';
import classes from './post.module.css'
import Input from '../../components/Input/input';
import Button from '../../components/button/button'
import Loading from '../../components/loading/loading'
import Modal from '../../components/modal/modal';
import Select from '../../components/select/select'
import axios from 'axios'
import TextArea from '../../components/textarea/textarea'
import Map from '../../components/Map/map';
import { connect } from 'react-redux';
import { adSubmit } from '../../actions/adsActions'
const access_token = 'pk.eyJ1IjoiYWRuYW5hc2xhbSIsImEiOiJja2JsNzZ0c2YxNTF2MnNteTN4amc1ZmE2In0.crBJBsWxfO06ED71wt-Yvw'
class Post extends Component {
    state = {
        newAd: {
            title: '',
            description: '',
            price: '',
            category: '',
            categoryOptions: ['Mobile', 'Vehicles', 'Jobs', 'Animals', 'fashion & beauty',
                'Electronics', 'Property for sale'],
        },
        location: {
            city: '',
            state: '',
            neighbourhood: ''
        },
        marker: {
            longitude: '',
            latitude: ''
        },
        msg: '',
        urls: [],
        images: [],
        show: false,
        showmodal: false,
        imagesPreviewUrls: []
    }

    inputChangeHandler = e => {
        let value = e.target.value;
        let name = e.target.name
        this.setState(prevState => ({
            newAd:
            {
                ...prevState.newAd, [name]: value
            }
        }))
    }

    imageHandler = e => {
        e.preventDefault()
        let files = Array.from(e.target.files)
        if (files.length > 4) {
            this.setState({ msg: 'Only 3 images can be uploaded at a time' })
            e.target.files = null
            return false
        }
        else {
            files.forEach(file => {
                let reader = new FileReader()
                reader.onloadend = () => {
                    this.setState(prevState => ({
                        images: [...prevState.images, file],
                        imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result],
                        msg: null
                    }))
                }
                reader.readAsDataURL(file)
            })
        }
    }

    imageCutHandler = index => {
        this.setState(prevState => ({
            imagesPreviewUrls: [...prevState.imagesPreviewUrls.slice(0, index)
                , ...prevState.imagesPreviewUrls.slice(index + 1)],
            images: [...prevState.images.slice(0, index)
                , ...prevState.images.slice(index + 1)]
        }))
    }

    maxLengthCheck = e => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
        return true
    }
    onSubmit = e => {
        e.preventDefault()
        const data = new FormData()
        this.state.images.forEach(file => {
            data.append('images', file)
        })
        axios.post('/ads/images', data).then(res => {
            let arr = []
            for (let key in res.data.data) {
                var item = res.data.data[key]
                arr.push(item.url)
                this.setState({ urls: arr })
            }
            const newPost = {
                ...this.state.newAd,
                ...this.state.marker,
                ...this.state.location,
                urls: this.state.urls
            }
            if (res.data) {
                this.props.onsubmit(newPost)
            }
        })
            .catch(() => {
                console.log('error to submit image')
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location !== prevProps.location) {
            const fullLocation = { ...this.state.location }
            const mar = { ...this.state.marker }
            this.setState(fullLocation.neighbourhood = null, fullLocation.city = null)
            this.props.location.find(product => product.place_type.some(item => {
                if (item === 'poi') {
                    fullLocation.neighbourhood = product.text
                }
                if (item === 'region') {
                    fullLocation.state = product.text
                }
                if (item === 'place') {
                    fullLocation.city = product.text
                }
                return null
            }))
            mar.longitude = this.props.long
            mar.latitude = this.props.lat
            this.setState({
                location: fullLocation,
                marker: mar
            })

        }
    }

    generateLocation = () => {
        const fullLocation = { ...this.state.location }
        this.setState(fullLocation.neighbourhood = null, fullLocation.city = null, fullLocation.state = null)
        const mar = { ...this.state.marker }
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${mar.longitude}%2C%20${mar.latitude}.json?access_token=${access_token}`)
            .then(res => {
                res.data.features.find(product => product.place_type.some(item => {
                    if (item === 'poi') {
                        fullLocation.neighbourhood = product.text
                    }
                    if (item === 'region') {
                        fullLocation.state = product.text
                    }
                    if (item === 'place') {
                        fullLocation.city = product.text
                    }
                    return null
                })
                )
                this.setState({ location: fullLocation, msg: '' })
            })
            .catch(err => { this.setState({ msg: 'cannot get location', show: false }) })
    }

    confirmLocationHandler = e => {
        this.setState({ show: true })
        e.preventDefault()
        const loc = { ...this.state.marker }
        navigator.geolocation.getCurrentPosition(position => {
            loc.longitude = position.coords.longitude
            loc.latitude = position.coords.latitude
            this.setState({ marker: loc })
            this.generateLocation()
        })
    }

    modalHandler = () => {
        this.setState({
            showmodal: !this.state.showmodal
        })
    }
    // disabledPost = () => {

    // }
    render() {
        return (
            <div>

                <h1 style={{ textAlign: 'Center' }}>Post your Ad</h1>
                <div className={classes.Post}>
                    <Modal para='drag marker to set your locatin'
                        show={this.state.showmodal}
                        modalType='locModal'
                        closeBtn='&times;'
                        modalClosed={this.modalHandler}>
                        <Map modalClosed={this.modalHandler} />
                    </Modal>
                    <form onSubmit={this.onSubmit}>
                        <Select title='Category'
                            name='category'
                            options={this.state.newAd.categoryOptions}
                            value={this.state.newAd.category}
                            placeholder='choose a category'
                            changed={this.inputChangeHandler} />
                        <Input type='text'
                            name='title'
                            max='10'
                            title='Ad title'
                            value={this.state.newAd.title}
                            placeholder='Enter your title'
                            changed={this.inputChangeHandler}
                        />
                        <TextArea type='text'
                            title='description'
                            name='description'
                            rows='1'
                            columns='1'
                            max='1000'
                            value={this.state.newAd.description}
                            changed={this.inputChangeHandler}
                            placeholder='Enter your Ad details here...'
                        />
                        <Input
                            type='number'
                            name='price'
                            title='price'
                            max='10'
                            value={this.state.newAd.price}
                            placeholder='Enter your price'
                            changed={this.inputChangeHandler}
                        />
                        <input type='file' multiple
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={this.imageHandler} /><br />
                        <p>{this.state.msg}</p>
                        {this.state.imagesPreviewUrls.map((imagePreviewUrl, index) => {
                            return <div className={classes.Imgdiv}
                                key={imagePreviewUrl} >
                                <svg onClick={() => this.imageCutHandler(index)}
                                    className={classes.ImageCut} viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd">
                                    <path d="M452.267 512l-243.2-238.933 4.267-64h59.733l204.8
                                     204.8 34.133 38.4 238.933-238.933 64-4.267-4.267 64-238.933 
                                     238.933 243.2 243.2v59.733h-59.733l-243.2-243.2-243.2 243.2h-59.733v-59.733l243.2-243.2z">
                                    </path>
                                </svg>
                                <img className={classes.Img} alt='i' src={imagePreviewUrl} />
                            </div>
                        })}<br /><br /><br />
                        <Button btnType='BtnPost' clicked={this.confirmLocationHandler} name='current location' /><br />
                        <div style={{ margin: '0' }}><br /> {this.state.location ?
                            <div className={classes.Location}><br />
                                {this.state.location.state ? <b>State: {this.state.location.state}</b> : <p></p>}<br />
                                {this.state.location.city ? <b>City: {this.state.location.city}</b> : <p></p>}<br />
                                {this.state.location.neighbourhood ? <b>Neighbourhood: {this.state.location.neighbourhood}</b> : <p></p>}
                            </div> : <Loading show={this.state.show} />}
                        </div><br />
                        <Button btnType='Btn' name='Post' type='submit' />
                    </form>
                    <Button btnType='BtnAnotherLocation' clicked={this.modalHandler} name='choose another location' /><br />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    location: state.map.location,
    long: state.map.longitude,
    lat: state.map.latitude
})
const mapDispatchToprops = dispatch => {
    return {
        onsubmit: data => dispatch(adSubmit(data))
    }
}
export default connect(mapStateToProps, mapDispatchToprops)(Post)