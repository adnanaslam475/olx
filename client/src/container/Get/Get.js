import React from 'react'
import { getAds } from '../../actions/adsActions'
import { connect } from 'react-redux';
import AdCard from '../../components/AdCard/AdCard';

const Get = React.memo(props => {
    let allAds = []
    for (let key in props.ads) {
        var item = props.ads[key]
        allAds.push(item)
    }
    // console.log(allAds)
    return (
        <div>
            <button onClick={props.ongetAds}>adget</button>
            {allAds.map(key => (
                <AdCard key={key._id}
                    urls={key.urls}
                    title={key.title}
                    description={key.description}
                    price={key.price}
                    postedAt={key.postedAt}
                    state={key.state}
                    city={key.city}
                />
            ))}
        </div>
    );
})

const mapStateToProps = state => ({
    ads: state.ads.ads
})
const mapDispatchToProps = dispatch => {
    return {
        ongetAds: () => dispatch(getAds())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Get)