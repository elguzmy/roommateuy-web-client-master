import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { DateRangePicker } from 'react-dates';
import { Button } from 'reactstrap';
import 'react-rangeslider/lib/index.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import PropTypes from 'prop-types';

const roomTypeMap = {
    'Doble': 'DOUBLE',
    'Compartida': 'SHARED',
    'Simple': 'SINGLE',
    'DOUBLE': 'Doble',
    'SHARED': 'Compartida',
    'SINGLE': 'Simple',
};

export default class FilterBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ageRange: {
                min: 18,
                max: 99
            },
            response: null,
            responseAddress: '',
            startDate: null,
            endDate: null,
            filters: {
                price_min: '',
                price_max: '',
                date_in: null,
                date_out: null,
                room_type: '',
                details_bathroom_type: '',
                specs_furnished: false,
                specs_wifi: false,
                details_smoking_preferences: false,
                specs_balcony: false,
                specs_air: false,
            }
        };

        this.openSideNavFilters = this.openSideNavFilters.bind(this);
        this.closeSideNavFilters = this.closeSideNavFilters.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
    }

    componentWillMount() {
        const currentFilters = this.props.filters;
        const stateFilters = {};

        if (currentFilters && Object.keys(currentFilters).length) {
            for (let filter in currentFilters) {
                if (currentFilters.hasOwnProperty(filter)) {
                    if (~['specs_air', 'specs_balcony', 'details_smoking_preferences',
                        'specs_wifi', 'specs_furnished'].indexOf(filter)) {

                        stateFilters[filter] = currentFilters[filter] === 'true';
                    } else if (filter === 'date_in' || filter === 'date_out') {
                        stateFilters[filter] = moment(new Date(decodeURIComponent(currentFilters[filter])));
                    } else {
                        stateFilters[filter] = decodeURIComponent(currentFilters[filter]);
                    }
                }
            }
        }

        this.setState({
            filters: {
                ...this.state.filters,
                ...stateFilters,
            }
        })
    }

    //Open & Close nav filter
    openSideNavFilters = () => {
        let navFilter = document.getElementById("sidenav-filter");
        if (navFilter.style.left === "" || navFilter.style.left === "-650px") {
            navFilter.style.left = "0px";
            document.getElementById('container-outside-filter').classList.add('open-filter');
            document.getElementById('sidenav-filter').style.overflowY = "scroll";
        }
        else navFilter.style.left = "0";
    }

    closeSideNavFilters = () => {
        document.getElementById("sidenav-filter").style.left = "-650px";
        document.getElementById("sidenav-filter").style.border = "0";
        document.getElementById('container-outside-filter').classList.remove('open-filter');
        document.getElementById('sidenav-filter').style.overflowY = "visible";
    }

    setFilterValue(filters, values) {
        const newFilters = {
            ...this.state.filters,
        };

        if (!Array.isArray(filters)) {
            filters = [filters];
            values = [values]
        }

        filters.forEach((f, i) => newFilters[f] = values[i]);

        this.setState({
            filters: {
                ...newFilters,
            }
        });
    }

    applyFilters(e) {
        e.preventDefault();

        const filters = {};

        Object.keys(this.state.filters).forEach((prop) => {
            if (this.state.filters[prop]) {
                filters[prop] = this.state.filters[prop];
            }
        });

        this.props.applySearchFilters(filters);
        this.closeSideNavFilters();
    }

    render() {
        return (
            <div id="section-filter">
                <div id="sidenav-filter" className="sidenav">
                    <div id="container-outside-filter">
                        <span id="span-sidenav-filters" title="Filtros" onClick={this.openSideNavFilters}>
                            <FontAwesomeIcon
                                id="icon-filter"
                                icon={faFilter}
                                color="#663399"
                                size="2x"
                            />
                            <span id="outside-filter-span">Filtros</span>
                        </span>
                    </div>

                    <div id="container-filter">
                        <i className="Iconfilter bgsvg"></i>
                        <h2 className="h2">FILTROS</h2>
                        <span className="closebtn" onClick={this.closeSideNavFilters}>&times;</span>
                    </div>
                    <div id="filter-content">
                        <div className="form-row">
                            <div id="filter-price-range-box" className="form-group col-md-12">
                                <label id="lbl-search-filter">Precio</label>
                                <div className="form-group">
                                    <input id="price-range-min" type="text" className="form-control col-md-3" placeholder="min"
                                           onChange={(e) => this.setFilterValue('price_min', e.target.value)} defaultValue={this.state.filters.price_min} />
                                    <input id="price-range-max" type="text" className="form-control col-md-3" placeholder="max"
                                           onChange={(e) => this.setFilterValue('price_max', e.target.value)} defaultValue={this.state.filters.price_max} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div id="filter-date-range-box" className="form-group col-md-12">
                                <label id="lbl-date-filter">Fecha</label>
                                <div>
                                    <DateRangePicker
                                        startDate={this.state.filters.date_in} // momentPropTypes.momentObj or null,
                                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                        endDate={this.state.filters.date_out} // momentPropTypes.momentObj or null,
                                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                        onDatesChange={({ startDate, endDate }) => { this.setFilterValue(['date_in', 'date_out'], [startDate, endDate]); }} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                        endDatePlaceholderText="Salida"
                                        startDatePlaceholderText="Entrada"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label id="lbl-search-room-type" htmlFor="slc-room-type">Habitación</label>
                                <select id="slc-search-room-type" className="form-control" onChange={(e) => this.setFilterValue('room_type', roomTypeMap[e.target.value])} defaultValue={roomTypeMap[this.state.filters.room_type]} >
                                    <option>--Seleccionar--</option>
                                    <option>Simple</option>
                                    <option>Doble</option>
                                    <option>Compartida</option>
                                </select>
                            </div>
                        </div>
                        {/*<div className='slider-horizontal'>*/}
                        {/*    <div className="form-row">*/}
                        {/*        <div className="form-group col-md-12">*/}
                        {/*            <label id="lbl-room-age">Edad</label>*/}
                        {/*            <AgeRange*/}
                        {/*                maxValue={99}*/}
                        {/*                minValue={18}*/}
                        {/*                value={this.state.ageRange}*/}
                        {/*                onChange={ageRange => this.setState({ ageRange })}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="form-row room-specification">
                            <div className="form-group col-md-4">
                                <div className="pretty p-switch p-slim">
                                    <input ref="slimBathsuite" type="checkbox" className="checkbox-slim"
                                           onChange={(e) => {
                                               this.setFilterValue('details_bathroom_type', e.target.checked ? 'SUITE' : '')
                                           }}
                                           defaultChecked={this.state.filters.details_bathroom_type === 'SUITE'}
                                    />
                                    <div className="state">
                                        <label>Baño en suite</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="pretty p-switch p-slim">
                                    <input ref="slimFurnished" type="checkbox"
                                           onChange={(e) => {
                                               this.setFilterValue('specs_furnished', e.target.checked)
                                           }}
                                           defaultChecked={this.state.filters.specs_furnished}
                                    />
                                    <div className="state">
                                        <label>Amueblado</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="pretty p-switch p-slim">
                                    <input ref="slimWifi" type="checkbox"
                                           onChange={(e) => {
                                               this.setFilterValue('specs_wifi', e.target.checked)
                                           }}
                                           defaultChecked={this.state.filters.specs_wifi}
                                    />
                                    <div className="state">
                                        <label>Wifi</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="pretty p-switch p-slim">
                                    <input ref="slimSmoke" type="checkbox"
                                           onChange={(e) => {
                                               this.setFilterValue('details_smoking_preferences', e.target.checked)
                                           }}
                                           defaultChecked={this.state.filters.details_smoking_preferences}
                                    />
                                    <div className="state">
                                        <label>Apto fumadores</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="pretty p-switch p-slim">
                                    <input ref="slimBalcony" type="checkbox"
                                           onChange={(e) => {
                                               this.setFilterValue('specs_balcony', e.target.checked)
                                           }}
                                           defaultChecked={this.state.filters.specs_balcony}
                                    />
                                    <div className="state">
                                        <label>Balcon</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div className="pretty p-switch p-slim">
                                    <input ref="slimAir" type="checkbox"
                                           onChange={(e) => {
                                               this.setFilterValue('specs_air', e.target.checked)
                                           }}
                                           defaultChecked={this.state.filters.specs_air}
                                    />
                                    <div className="state">
                                        <label>Aire</label>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <Button className="btn btn-primary btn-save" onClick={this.applyFilters} >Aplicar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FilterBox.propTypes = {
    applySearchFilters: PropTypes.func.isRequired,
};