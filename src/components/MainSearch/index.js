import React from 'react';
import history from '../../utils/history';
import sessionHelper from '../../lib/httpClient/sessionHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import AddressAutocomplete from '../AddressAutocomplete';

import './mainSearch.css';
import 'react-input-range/lib/css/index.css';

export default class MainSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {
                min: 0,
                max: 10
            },
            response: null,
            responseAddress: '',
        };

        this.handleClickSearch = this.handleClickSearch.bind(this)
        this.handleSearchRoomButtom = this.handleSearchRoomButtom.bind(this)
        this.handleAddRoomButtom = this.handleAddRoomButtom.bind(this)
    }

    handleClickSearch = (address, location) => {
        let position = location;

        if (position) {
            history.push({
                pathname: '/search',
                search: `?lat=${position.latitude}&lng=${position.longitude}`,
            });
        } else {
            history.push('/search');
        }
    }

    handleSearchRoomButtom = e => {
        e.preventDefault()

        history.push("/search")
    }

    handleAddRoomButtom = e => {
        e.preventDefault()

        sessionHelper.isAuthenticated() ? history.push("/listings/room") : history.push("/register");
    }

    render() {
        return (
            <div id="main-search-room-box" className="form-group">
                <div className="form-group has-search col-md-12">
                    <FontAwesomeIcon
                        id="icon-search"
                        icon={faSearch}
                        color="#663399"
                        size="2x"
                    />
                    <button id="btn-main-search-room" onClick={this.handleSearchRoomButtom}>Buscar habitación</button>
                    <button id="btn-main-add-room" onClick={this.handleAddRoomButtom}>Publicar habitación</button>
                    
                    <AddressAutocomplete onAddressSelect={this.handleClickSearch}/>
                </div>
            </div>
        )
    }
}

