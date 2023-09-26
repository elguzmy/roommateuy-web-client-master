import React from 'react';
import RoomSearchContainer from '../../containers/RoomSearchContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import Filters from '../../utils/filterBox';
import AddressAutocomplete from '../AddressAutocomplete';
import { SyncLoader } from "react-spinners";
import InfiniteScroll from 'react-infinite-scroller';

import '../UserNewRoom/userNewRoom.css'
import './searchFilter.css';

export default class SearchFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ageRange: {
                min: 0,
                max: 99
            },
            response: null,
            responseAddress: '',
            startDate: null,
            endDate: null,
            isLoading: true,
            isFacetedSearch: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleAvailableRoom = this.handleAvailableRoom.bind(this);
        this.handleAddressSelect = this.handleAddressSelect.bind(this);
        this.applySearchFilters = this.applySearchFilters.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room && !this.props.room.pending && this.state.isLoading) {
            this.setState({
                isLoading: false,
            })
        }
    }

    componentDidMount() {
        if (this.props.filters && Object.keys(this.props.filters).length) {
            this.setState({
                isFacetedSearch: true,
            })
        }
    }

    handleAvailableRoom = checked => {
        this.setState({ roomAvailable: checked });
    }

    handleSearch = e => {
        this.getAddress(this.txtAddress.value)
    }

    handleClickSearch = e => {
        if (this.state.response) {
            let location = this.state.response;

            if (location) {
                let parseLocation = {};

                parseLocation["lat"] = location.latitude;
                parseLocation["lng"] = location.longitude;

                this.props.setSearchAddress(parseLocation)
            }
        }
    }

    handleAddressSelect(address, location) {
        if (location) {
            this.setState({
                response: location
            })
        }

        this.handleClickSearch()
    }

    applySearchFilters(filters) {
        this.props.handleFacetedSearch(filters);
    }

    render() {
        let rooms = this.props.rooms;

        return (
            <div id="search-filter-room-box">
                {this.state.isFacetedSearch &&
                    <div className="remove-filters-btn-wrapper">
                        <button onClick={this.props.removeFilters}>Quitar Filtros</button>
                    </div>
                }
                <div className="row">
                    <div className="col-md-12">
                        <FontAwesomeIcon
                            className="icon-location-search"
                            icon={faLocationArrow}
                            color="#663399"
                            size="1x"
                        /><h5 style={{display: "inline-block"}}>Buscar habitación</h5>
                        <form>
                            <div id="autocomplete-box">
                                <FontAwesomeIcon
                                    id="icon-search"
                                    icon={faSearch}
                                    color="#663399"
                                    size="2x"
                                />
                                <AddressAutocomplete onAddressSelect={this.handleAddressSelect} />
                            </div>

                        </form>
                    </div>

                    <Filters filters={this.props.filters} applySearchFilters={this.applySearchFilters} />

                    <div id="room-results">
                        <InfiniteScroll
                            useWindow={true}
                            loadMore={this.props.loadMore}
                            hasMore={this.props.hasMore}
                            pageStart={1}
                            loader={!this.props.isFirstLoad &&
                                <div className="room-results-loader-wrapper" key={0}>
                                    <SyncLoader color={'#663399'} />
                                </div>
                            }
                        >
                            <div className="container">
                                {
                                    rooms && rooms.map((room, i) => (
                                        <div key={i} className="col-xs-12">
                                            <RoomSearchContainer profile={this.props.profile} room={room} />
                                        </div>
                                    ))
                                }
                            </div>
                        </InfiniteScroll>
                        {this.props.isPending && this.props.isFirstLoad &&
                            <div className="room-results-loader-wrapper" key={0}>
                                <SyncLoader color={'#663399'} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

