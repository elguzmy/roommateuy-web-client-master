import React from 'react';
import request from 'request';
import PropTypes from 'prop-types';
import SuggestionsList from './SuggestionsList';
import './addressAutocomplete.css';
import { Input } from "reactstrap";

const AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json';
const GEOLOCATION_URL = 'https://geocoder.api.here.com/6.2/geocode.json';

export default class AddressAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.addressInput = React.createRef();

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this._getAddressSuggestion = this._getAddressSuggestion.bind(this);
        this._getGeolocationFromLocationId = this._getGeolocationFromLocationId.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onAddressSelectWrapper = this.onAddressSelectWrapper.bind(this);

        this.state = {
            suggestions: [],
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            if (this.state.suggestions.length) {
                this.setState({
                    suggestions: [],
                });
            }
        }
    }

    _getAddressSuggestion = address => {
        return new Promise((resolve, reject) => {
            const params = '?' +
                'query=' +  encodeURIComponent(address) +
                '&maxresults=5' +
                '&country=URY' +
                '&language=es' +
                '&app_id=MGijOt7oNiJZq31NoeUK' +
                '&app_code=ycALKmkToEU12lnYgy7xXQ';

            request({
                uri: AUTOCOMPLETION_URL + params,
                json: true,
            }, (error, res, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    };

    _getGeolocationFromLocationId = locationId => {
        return new Promise((resolve, reject) => {
            const params = '?' +
                'locationid=' +  encodeURIComponent(locationId) +
                '&jsonattributes=1' +
                '&gen=9' +
                '&app_id=MGijOt7oNiJZq31NoeUK' +
                '&app_code=ycALKmkToEU12lnYgy7xXQ';

            request({
                uri: GEOLOCATION_URL + params,
                json: true,
            }, (error, res, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    };

    async handleOnChange(e) {
        e.preventDefault();

        const userInput = e.currentTarget.value;

        if (!userInput) {
            this.setState({
                suggestions: []
            })
        }

        const suggestionsResult = await this._getAddressSuggestion(userInput);

        if (suggestionsResult && suggestionsResult.suggestions && suggestionsResult.suggestions.length > 0) {
            this.setState({
                suggestions: suggestionsResult.suggestions,
            })
        } else {
            this.setState({
                suggestions: [],
            })
        }
    }

    onAddressSelectWrapper({ suggestionStr, locationId, addressData }) {
        this.setState({
            suggestions: [],
        });

        this._getGeolocationFromLocationId(locationId)
            .then(data => {
                if (data && data.response.view && data.response.view.length) {
                    const view = data.response.view[0];

                    if (view.result && view.result.length) {
                        const result = view.result[0];

                        if (result.location && result.location.displayPosition) {
                            this.props.onAddressSelect(suggestionStr, result.location.displayPosition, addressData);

                            this.addressInput.current.value = suggestionStr;
                        }
                    }
                }
            })
            .catch(err => this.props.onAddressSelect(err));
    }

    render() {
        return (
            <div className="address-autocomplete-container" ref={this.setWrapperRef}>
                <div className="address-autocomplete">
                    <div className="address-autocomplete-input-wrapper">
                        <Input type="text" innerRef={this.addressInput} className="address-autocomplete-input" placeholder="Buscar dirección..." onChange={this.handleOnChange} required/>
                    </div>
                    <div className="address-autocomplete-suggestions-wrapper">
                        <div className="address-autocomplete-suggestions">
                            {this.state.suggestions.length > 0 &&
                                <SuggestionsList onAddressSelectWrapper={this.onAddressSelectWrapper} suggestions={this.state.suggestions} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddressAutocomplete.propTypes = {
    onAddressSelect: PropTypes.func.isRequired,
};