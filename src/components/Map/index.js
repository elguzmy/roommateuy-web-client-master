import React from 'react';
import _ from 'lodash';
import { createMap, moveMap } from '../../lib/map';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.platform = null;

        this.state = {
            app_id: "MGijOt7oNiJZq31NoeUK",
            app_code: "ycALKmkToEU12lnYgy7xXQ",
            center: {
                lat: -34.9001151,
                lng: -56.1608933
            }, // Montevideo
            useHTTPS: true, // cambiar a true en production
            zoom: 15,
            searchInput: ''
        };

        this.setCoords = this.setCoords.bind(this)
    }

    componentDidMount() {
        this.setCoords();

        const mapEvents = {
            dragend: this.props.onMapDragend,
        };

        _.defer(() => {
            createMap({ state: this.state, mapEvents });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.searchLocation) {
            if (prevProps.searchLocation.lat !== this.props.searchLocation.lat ||
                prevProps.searchLocation.lng !== this.props.searchLocation.lng
            ) {
                this.setCoords();
            }
        }
    }

    setCoords = () => {
        const { lat, lng } = this.props.searchLocation;

        if (lat && lng) {
            this.setState({
                center: {
                    lat,
                    lng,
                }
            })
        }
    }

    goToLocation = ({ lat, lng }) => {
        moveMap(lat, lng, this.state.zoom);
    }

    render() {
        const { lat, lng } = this.props.searchLocation;

        if (lat && lng) {
            this.goToLocation({ lat, lng });
        }

        return (
            <div id="here-map" style={{ width: '100%', height: '91.5vh', background: 'gray' }} />
        );
    }
}
