import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Slider from 'infinite-react-carousel';

import { settings, CardDiv, CardSection } from './Settings';
import { getStrainsDataFromActions } from '../../store/actions/index';

// Top Strains that connects to HomePage.js
const TopStrains = (props) => {
    useEffect(() => {
        props.getStrainsDataFromActions();
    }, []);

    console.log('TopStrains props', props);

    return (
        <CardSection>
            <h2>Top Strains</h2>
            {/* Component from infinite-react-carousel */}
            <Slider {...settings}>
                <CardDiv>
                    <h3>StrainName</h3>
                    <p>StrainRace</p>
                    <p>
                        StrainText, description.StrainText, description.
                        StrainText, description. StrainText, description.
                        StrainText, description. StrainText, description.
                        StrainText, description.
                    </p>
                    <h5>Effects</h5>
                    <h6>Medical:</h6>
                    <ul>
                        <li>Effect1</li>
                        <li>Effect2</li>
                        <li>Effect3</li>
                    </ul>
                    <ul>Positive:</ul>
                    <ul>Negative:</ul>
                    <button>Add to Favorites</button>
                </CardDiv>
            </Slider>
        </CardSection>
    );
};
const mapStateToProps = (state) => {
    console.log(
        'mapStateToProps state: ',
        state.FetchingStrainsReducer.strains
    );
    return { info: state.FetchingStrainsReducer.strains };
};
export default connect(mapStateToProps, { getStrainsDataFromActions })(
    TopStrains
);
