import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Map from '../Map';
import MapRoomInfoBubble from '../../components/MapRoomInfoBubble';
import geolocation from '../../utils/geoLocation';
import SearchFilter from '../SearchFilter';
import QueryString from 'query-string';
import history from '../../utils/history';
import { addToMarkersGroup } from '../../lib/map';

import './search.css';

const houseSVGIcon = '<svg height="35px" viewBox="-61 0 443 443.288" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="m96.144531 136v88h32v-56c0-4.417969 3.582031-8 8-8h48c4.417969 0 8 3.582031 8 8v56h32v-88c0-4.417969 3.582031-8 8-8h8.480469l-80.480469-61.902344-80.480469 61.902344h8.480469c4.417969 0 8 3.582031 8 8zm0 0"/><path d="m144.144531 176h32v48h-32zm0 0"/><path d="m160.144531 443.289062c30.101563-37.585937 160-204.328124 160-283.289062 0-88.367188-71.636719-160-160-160-88.367187 0-160 71.632812-160 160 0 78.976562 129.894531 245.710938 160 283.289062zm-108.878906-313.601562 104-80c2.875-2.214844 6.882813-2.214844 9.757813 0l104 80c2.691406 2.097656 3.757812 5.667969 2.65625 8.894531-1.097657 3.226563-4.125 5.402344-7.535157 5.417969h-24v88c0 4.417969-3.582031 8-8 8h-144c-4.417969 0-8-3.582031-8-8v-88h-24c-3.421875 0-6.464843-2.179688-7.570312-5.421875-1.101563-3.242187-.019531-6.824219 2.691406-8.914063zm0 0"/></svg>';
const houseMarkerIcon = new window.H.map.Icon(houseSVGIcon);

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchLocation: {
                lat: null,
                lng: null,
            },
            search_filters: {}
        };

        this.setSearchAddress = this.setSearchAddress.bind(this);
        this.handleMapDragend = this.handleMapDragend.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.handleFacetedSearch = this.handleFacetedSearch.bind(this);
        this.parseFilters = this.parseFilters.bind(this);
        this.removeFilters = this.removeFilters.bind(this);
    }

    async componentDidMount() {
        let location;

        if (this.props.location && this.props.location.search) {
            const { lat, lng } = new QueryString.parse(this.props.location.search);

            if (lat && lng) {
                location = [parseFloat(lat), parseFloat(lng)];
            }
        }

        if (!location) {
            location = await geolocation.getPreciseLocation();
        }

        const filters = this.parseFilters();

        this.setState({
            searchLocation: {
                lat: location[0],
                lng: location[1],
            }
        });

        this.props.searchRoomsByLocation({ isNewSearch: true }, location[0], location[1], 1, filters);
        this.props.getProfile();
    }

    setSearchAddress(location) {
        history.push(`/search?lat=${location.lat}&lng=${location.lng}`);

        this.addMapMarkers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.addMapMarkers();
        this.parseFilters();
    }

    parseFilters() {
        const filters = {};

        if (this.props.location && this.props.location.search) {
            const qs = QueryString.parse(this.props.location.search);
            const validFilters = ['price_min', 'price_max', 'date_in', 'date_out' ,'room_type' ,'details_bathroom_type'
                    , 'specs_furnished' ,'specs_wifi', 'details_smoking_preferences' ,'specs_balcony',
                    'specs_air'];

            validFilters.forEach(validFilter => {
                if (qs[validFilter]) {
                    filters[validFilter] = qs[validFilter];
                }
            });
        }

        return filters;
    }

    removeFilters() {
        if (this.props.location && this.props.location.search) {
            const validFilters = ['price_min', 'price_max', 'date_in', 'date_out', 'room_type', 'details_bathroom_type'
                , 'specs_furnished', 'specs_wifi', 'details_smoking_preferences', 'specs_balcony',
                'specs_air'];
            const qsParams = QueryString.parse(this.props.location.search);
            const search = _.omit(qsParams, validFilters);

            history.push(`/search?${QueryString.stringify(search)}`);
        }
    }

    handleFacetedSearch(filters) {
        const { lat, lng } = this.state.searchLocation;

        if (lat && lng) {
            this.setState({
                search_filters: filters
            });

            history.push(`/search?lat=${lat}&lng=${lng}&${QueryString.stringify(filters)}`);
        }
    }

    addMapMarkers() {
        const rooms = this.props.room && this.props.room.rooms_search_result && this.props.room.rooms_search_result.rooms_list;
        let markers = [];

        if (!rooms || !rooms.length) {
            return;
        }

        rooms.forEach(room => {
            if (room.location && room.location.length > 1) {
                let html = document.createElement('div');

                ReactDOM.render(<MapRoomInfoBubble room={room} />, html);

                markers.push({
                    html,
                    room,
                });
            }
        });

        markers = markers.map(m =>
            ({
                markerObject: new window.H.map.Marker({ lat: m.room.location[0], lng: m.room.location[1] }, { icon: houseMarkerIcon }),
                html: m.html,
            })
        );

        try {
            addToMarkersGroup(markers);
        } catch (e) {
            console.log('Cannot add markers', e);
        }
    }

    handleMapDragend(e, map) {
        if (map) {
            const { lat, lng } = map.getCenter();
            const filters = this.parseFilters();

            this.props.searchRoomsByLocation({ isNewSearch: true }, lat, lng, 1, filters);

            this.setState({
                searchLocation: {
                    lat,
                    lng,
                }
            })
        }
    }

    loadMore(page) {
        const { lat, lng } = this.state.searchLocation;
        const filters = this.parseFilters();

        if (this.props.room.pending || this.props.room.rooms_search_result.page >= this.props.room.rooms_search_result.totalPages) {
            return;
        }

        this.props.searchRoomsByLocation({ isNewSearch: false }, lat, lng, page, filters);
    }

    render() {
        const location = this.state.searchLocation;
        const rooms = this.props.room.rooms_search_result && this.props.room.rooms_search_result.rooms_list;
        const hasMore = this.props.room.rooms_search_result &&
            this.props.room.rooms_search_result.page < this.props.room.rooms_search_result.totalPages;
        const isFirstLoad = this.props.room.rooms_search_result &&
            this.props.room.rooms_search_result.page === 1;

        const filters = this.parseFilters();

        return (
            <div id="search-room-box">
                <div className="row">
                    <div className="col-lg-6 col-md-6 search-filter-box">
                        <SearchFilter profile={this.props.profile} removeFilters={this.removeFilters} filters={filters} handleFacetedSearch={this.handleFacetedSearch} setSearchAddress={this.setSearchAddress} isFirstLoad={isFirstLoad} hasMore={hasMore} loadMore={this.loadMore} rooms={rooms} isPending={this.props.room.pending} />
                    </div>
                    <div className="col-lg-6 col-md-6 row-no-padding fixed-map">
                        <Map markersGroup={this.state && this.state.markersGroup} onMapDragend={this.handleMapDragend} searchLocation={location} rooms={rooms}/>
                    </div>
                </div>
            </div>
        )
    }
}

