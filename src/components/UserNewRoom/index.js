import React from 'react';
import { DateRangePicker } from 'react-dates';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DropzoneComponent from 'react-dropzone-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import RoomFilters from '../RoomFilters';
import { ROOM_UPLOAD_IMAGE_URL } from '../../api/roomAPI';

import AddressAutocomplete from '../AddressAutocomplete';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './userNewRoom.css';

export default class UserNewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userCoords: {},
            startDate: null,
            endDate: null,
            roomAvailable: false,
            address: {
                address1: '',
                city: '',
                state: '',
                country: '',
                zip_code: '',
            },
            ddwRateTypeIsOpen: false,
            ddwRateTypeValue: '',
            description: null,
            tittle: null,
            petDescription: null,
            showError: false,
            location: '',
            price: 0,
            images: [],
        }

        this.handleAvailableRoom = this.handleAvailableRoom.bind(this);
        this.handleAddressSelect = this.handleAddressSelect.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);

        //Filters
        this.toggleRate = this.toggleRate.bind(this);
        this.handleRateType = this.handleRateType.bind(this);

        // Dropzone
        this.handleComplete = this.handleComplete.bind(this);

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.jpeg'],
            showFiletypeIcon: true,
            postUrl: ROOM_UPLOAD_IMAGE_URL,
        };

        this.djsConfig = {
            parallelUploads: 1,
            autoProcessQueue: true,
            maxFiles: 5,
            maxFilesize: 5,
        };

        this.eventHandlers = {
            complete: this.handleComplete,
        }
    }

    handleComplete(res) {
        if (res && res.xhr && res.xhr.response) {
            const xhrResponse = res.xhr.response;
            let parsedResponse;

            try {
                parsedResponse = JSON.parse(xhrResponse);

                if (parsedResponse.imageUrl) {
                    const images = this.state.images || [];

                    images.push(parsedResponse.imageUrl);

                    this.setState({
                        ...this.state,
                        images,
                    })
                }
            } catch (e) {

            }
        }
    }

    handleCreateRoom = data => {
        if (this.state.startDate !== null && this.state.endDate !== null && this.state.description !== ""
            && this.state.title !== "" && this.state.ddwRateTypeValue !== "") {
            console.log('entro')
            data["headline"] = this.state.tittle;
            data["description"] = this.state.description;
            data["calendar"] = {
                date_in: this.state.startDate,
                date_out: this.state.endDate
            };
            data["address"] = Object.assign({}, this.state.address || {});
            data["location"] = [this.state.location.latitude, this.state.location.longitude];
            data["rate"] = this.state.price;
            data["rate_type"] = this.state.ddwRateTypeValue;
            data["user_id"] = localStorage.getItem("UserId");

            switch (data["rate_type"]) {
                case 'Semanal':
                    data["rate_type"] = 'WEEKLY';
                    break;
                case 'Mensual':
                    data["rate_type"] = 'MONTHLY';
                    break;
                case 'Anual':
                    data["rate_type"] = 'YEARLY';
                    break;
                default:
                    data["rate_type"] = 'WEEKLY';
            }

            if (this.state.images) {
                data['images'] = this.state.images;
            }

            this.props.registerRoom(data);
        }
        else {
            this.setState({
                showError: true
            })
        }
    }


    handleAvailableRoom = checked => {
        this.setState({ roomAvailable: checked });
    }


    handleAddressSelect(address, location, addressData) {
        if (location && address) {
            let newAddress = {};

            if (addressData.street) {
                newAddress['address1'] = addressData.street;
            }

            if (addressData.country) {
                newAddress['country'] = addressData.country;
            }

            if (addressData.district) {
                newAddress['state'] = addressData.district;
            }

            if (addressData.city) {
                newAddress['city'] = addressData.city;
            } else {
                if (addressData.district) {
                    newAddress['city'] = addressData.district;
                }
            }

            if (addressData.postalCode) {
                newAddress['zip_code'] = addressData.postalCode;
            }

            this.setState({
                ...this.state,
                address: newAddress,
                location: location
            });
        }
    }

    toggleRate = () => {
        this.setState(
            prevState => ({
                ddwRateTypeIsOpen: !prevState.ddwRateTypeIsOpen,
            }));
    }

    handleRateType = e => {
        this.setState({
            ddwRateTypeValue: e.target.innerText,
            ddwRateTypeIsOpen: true,
        });
    }

    render() {
        let errorColor = {
            color: "red"
        }

        return (
            <Container>
                <div id="new-room-box">
                    <div className="row">
                        <h5 id="new-room-h5">Agregar habitación</h5>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="txt-room-tittle">Título <sup style={errorColor}>*</sup></label>
                                    <input type="text" className="form-control" id="txt-room-tittle" placeholder="Título" onChange={(val) => this.setState({ tittle: val.target.value })} required />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="txt-room-address">Dirección <sup style={errorColor}>*</sup></label>
                                    <div id="autocomplete-box">
                                        <FontAwesomeIcon
                                            id="icon-search"
                                            icon={faSearch}
                                            color="#663399"
                                            size="2x"
                                        />
                                        <AddressAutocomplete onAddressSelect={this.handleAddressSelect} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="txt-room-price">Costo mensual <sup style={errorColor}>*</sup></label>
                                    <div className="row">
                                        <Dropdown className="col-md-6 ddw-room-price" isOpen={this.state.ddwRateTypeIsOpen} toggle={this.toggleRate}>
                                            <DropdownToggle caret>
                                                {this.state.ddwRateTypeValue !== '' ? this.state.ddwRateTypeValue : 'Seleccionar'}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={this.handleRateType}>Semanal</DropdownItem>
                                                <DropdownItem onClick={this.handleRateType}>Mensual</DropdownItem>
                                                <DropdownItem onClick={this.handleRateType}>Anual</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <input type="number" className="form-control col-md-4" id="txt-room-price" placeholder="Costo" onChange={(val) => this.setState({ price: val.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="txt-room-date-range">Período <sup style={errorColor}>*</sup></label>
                                    <div>
                                        <DateRangePicker
                                            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                            endDatePlaceholderText="Fin"
                                            startDatePlaceholderText="Inicio"
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="txt-room-description">Descripción <sup style={errorColor}>*</sup></label>
                                    <textarea type="textbox" className="form-control" id="txt-room-description" onChange={(val) => this.setState({ description: val.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="txt-room-my-pets">Mis mascotas</label>
                                    <textarea type="textbox" className="form-control" id="txt-room-my-pets" onChange={(val) => this.setState({ petDescription: val.target.value })} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="from-group col-md-12">
                                    <label id="lbl-room-img">Imagenes</label>

                                    <div id="room-images-box">
                                        <DropzoneComponent
                                            config={this.componentConfig}
                                            eventHandlers={this.eventHandlers}
                                            djsConfig={this.djsConfig}
                                        >
                                            <div className="dz-preview dz-file-preview">
                                                <div className="dz-details">
                                                    <div className="dz-filename"><span data-dz-name="true"></span></div>
                                                    <img data-dz-thumbnail="true" alt='' />
                                                </div>

                                                <div className="dz-success-mark"><span>✔</span></div>
                                                <div className="dz-error-mark"><span>✘</span></div>
                                                <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
                                            </div>
                                            <div id="add-room-image" className="dz-message">Agregar</div>
                                        </DropzoneComponent>
                                    </div>
                                </div>
                            </div>
                            <div id="" className="row">
                                <div className="col-md-12">
                                    <RoomFilters createRoom={this.handleCreateRoom} isRoom={true}/>
                                </div>
                            </div>
                            {
                                this.state.showError &&
                                <div id="" className="row">
                                    <div className="col-md-12 text-center">
                                        <span style={{ color: "red" }}>Falta completar campos</span>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        )
    }
}
