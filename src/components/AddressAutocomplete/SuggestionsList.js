import React from 'react';
import PropTypes from "prop-types";

export default class SuggestionsList extends React.Component {
    constructor(props) {
        super(props);

        this.getSuggestionItem = this.getSuggestionItem.bind(this);
        this.handleClickSuggestion = this.handleClickSuggestion.bind(this);
    }

    handleClickSuggestion(e, suggestionStr, locationId, addressData) {
        e.preventDefault();

        this.props.onAddressSelectWrapper({ suggestionStr, locationId, addressData });
    }

    getSuggestionItem(suggestion) {
        const type = suggestion.matchLevel;
        let {
            street,
            houseNumber,
            district,
            city,
            country } = suggestion.address;

        if (district === city) {
            city = null;
        }

        let suggestionStr = '';

        if (type === 'country') {
            return null;
        } else if (type === 'street' || type === 'houseNumber') {
            suggestionStr += `${street || ''}${houseNumber ? (' ' + houseNumber) : ''}, ${district ? (district + ', ') : ''}${city ? (city + ', ' ) : ''}${country || ''}`;
        } else if (type === 'district') {
            suggestionStr += `${district ? (district + ', ') : ''}${city ? (city + ', ') : ''}${country || ''}`;
        } else if (type === 'city') {
            suggestionStr += `${city ? (city + ', ') : ''}${country || ''}`;
        }

        const { locationId, address } = suggestion;

        return (
            <li className="suggestions-list-item" key={suggestion.locationId} onClick={(e) => {this.handleClickSuggestion(e, suggestionStr, locationId, address);}}>
                <div className="suggestions-list-item-address">{suggestionStr}</div>
            </li>
        )
    }

    render() {
        const suggestions = this.props.suggestions;

        return (
            <div className="suggestions-list-container">
                {suggestions && suggestions.length &&
                    <div className="suggestions-list-wrapper">
                        <ul className="suggestions-list">
                            {
                                suggestions.map(s => this.getSuggestionItem(s))
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}

SuggestionsList.propTypes = {
    onAddressSelectWrapper: PropTypes.func.isRequired,
};