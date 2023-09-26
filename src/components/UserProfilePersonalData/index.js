import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, FormGroup, Label, Input, FormFeedback, Row, Col, Button, Alert
} from 'reactstrap';
import RoomFilters from '../RoomFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHiking, faInfo } from '@fortawesome/free-solid-svg-icons'
import './userProfilePersonalData.css';

export default class UserProfilePersonalData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
        };

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.phoneInput = React.createRef();
        this.address1Input = React.createRef();
        this.countryInput = React.createRef();
        this.cityInput = React.createRef();
        this.stateInput = React.createRef();
        this.zipcodeInput = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);
        this.handleFilters = this.handleFilters.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    handleFilters = filters => {
        let profileSpecifications = {};

        profileSpecifications["my_cleanliness"] = filters.details_cleanliness;
        profileSpecifications["my_food_preferences"] = filters.details_food_preferences;
        profileSpecifications["my_pets"] = '';
        profileSpecifications["my_get_up_time"] = filters.details_get_up_time;
        profileSpecifications["my_go_to_bed_time"] = filters.details_go_to_bed_time;
        profileSpecifications["my_smoking_habits"] = filters.details_smoking_preferences;
        profileSpecifications["my_occupation"] = filters.details_occupation;
        profileSpecifications["my_overnight_guests"] = filters.details_overnight_guests;
        profileSpecifications["my_party_habits"] = filters.details_party_habits;

        this.props.updateUserProfile(profileSpecifications);

        this.setState({
            showSaveFiltersConfirmation: true
        })

        setTimeout(() => {
            this.setState({
                ...this.state,
                showSaveFiltersConfirmation: false
            });
        }, 2000);
    }

    handleUpdateData = e => {
        e.preventDefault();

        if (!this.isValid()) {
            return false;
        }

        this.setState({
            ...this.state,
            showSaveConfirmation: true
        });

        this.props.updateUserProfile(this.state.profile);

        setTimeout(() => {
            this.setState({
                ...this.state,
                showSaveConfirmation: false
            });
        }, 2000);
    };

    componentDidUpdate(e) {
        const { profile } = this.props;

        if (profile && !profile.pending && !this.state.profile) {
            this.setState({ profile, errors: {} });
        }
    }

    isValid() {
        let isValid = true;

        const errors = this.state.errors;

        if (!this.firstNameInput.current.value) {
            errors.firstName = 'Campo Requerido';
            isValid = false;
        } else {
            errors.firstName = undefined;
        }

        if (!this.lastNameInput.current.value) {
            errors.lastName = 'Campo Requerido';
            isValid = false;
        } else {
            errors.lastName = undefined;
        }

        if (!this.phoneInput.current.value) {
            errors.phone = 'Campo Requerido';
            isValid = false;
        } else {
            errors.phone = undefined;
        }

        if (!this.address1Input.current.value) {
            errors.address1 = 'Campo Requerido';
            isValid = false;
        } else {
            errors.address1 = undefined;
        }

        if (!this.countryInput.current.value) {
            errors.country = 'Campo Requerido';
            isValid = false;
        } else {
            errors.country = undefined;
        }

        if (!this.cityInput.current.value) {
            errors.city = 'Campo Requerido';
            isValid = false;
        } else {
            errors.city = undefined;
        }

        if (!this.stateInput.current.value) {
            errors.state = 'Campo Requerido';
            isValid = false;
        } else {
            errors.state = undefined;
        }

        if (!this.zipcodeInput.current.value) {
            errors.zipCode = 'Campo Requerido';
            isValid = false;
        } else {
            errors.zipCode = undefined;
        }

        this.setState({
            ...this.state,
            errors,
        });

        return isValid;
    }

    handleInputChange(e) {
        e.preventDefault();

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const isAddressField = name.split('.').length > 1;

        const state = {
            ...this.state
        };

        if (isAddressField) {
            if (!state.profile.address) {
                state.profile.address = {};
            }

            state.profile['address'][name.replace('address.', '')] = value;
        } else {
            state.profile[name] = value;
        }

        this.setState(state);
    }

    render() {
        let first_name;
        let last_name;
        let phone;
        let address1;
        let country;
        let city;
        let zipCode;
        let state;

        if (this.props && this.props.profile) {
            first_name = this.props.profile.first_name;
            last_name = this.props.profile.last_name;
            phone = this.props.profile.phone;
            address1 = (this.props.profile.address && this.props.profile.address.address1) || '';
            country = (this.props.profile.address && this.props.profile.address.country) || '';
            city = (this.props.profile.address && this.props.profile.address.city) || '';
            zipCode = (this.props.profile.address && this.props.profile.address.zip_code) || '';
            state = (this.props.profile.address && this.props.profile.address.state) || '';
        }

        let firstNameErrors = this.state.errors.firstName || false;
        let lastNameErrors = this.state.errors.lastName || false;
        let phoneErrors = this.state.errors.phone || false;
        let address1Errors = this.state.errors.address1 || false;
        let countryErrors = this.state.errors.country || false;
        let cityErrors = this.state.errors.city || false;
        let stateErrors = this.state.errors.state || false;
        let zipCodeErrors = this.state.errors.zipCode || false;

        return (
            <div id="user-personal-data-box" className="container">
                <div className="user-profile-form-wrapper">
                    <Form>
                        <Row>
                            <Col md={12}>
                                <div style={{ marginBottom: "20px" }}>
                                    <FontAwesomeIcon
                                        icon={faInfo}
                                        color="#778899"
                                        size="2x"
                                    /><h5 style={{ display: "inline-block", marginLeft: "10px" }}>Mis datos</h5>
                                </div>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="txt-user-firstname-pd">Nombre</Label>
                                    <Input type="text" id="txt-user-firstname-pd" innerRef={this.firstNameInput} placeholder="Nombre" name="first_name" defaultValue={first_name} {...{ invalid: firstNameErrors ? true : undefined }} onChange={this.handleInputChange} />
                                    {firstNameErrors &&
                                        <FormFeedback>{firstNameErrors}</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="txt-user-lastname-pd">Apellido</Label>
                                    <Input type="text" id="txt-user-lastname-pd" innerRef={this.lastNameInput} placeholder="Apellido" name="last_name" defaultValue={last_name} {...{ invalid: lastNameErrors ? true : undefined }} onChange={this.handleInputChange} />
                                    {lastNameErrors &&
                                        <FormFeedback>{lastNameErrors}</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label htmlFor="txt-user-tel-pd">Teléfono</Label>
                            <Input type="text" className="form-control" id="txt-user-tel-pd" innerRef={this.phoneInput} placeholder="Teléfono" name="phone" defaultValue={phone} {...{ invalid: phoneErrors ? true : undefined }} onChange={this.handleInputChange} />
                            {phoneErrors &&
                                <FormFeedback>{phoneErrors}</FormFeedback>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="txt-user-address-pd">Dirección</Label>
                            <Input type="text" className="form-control" id="txt-user-address-pd" innerRef={this.address1Input} placeholder="Dirección" name="address.address1" value={address1} {...{ invalid: address1Errors ? true : undefined }} onChange={this.handleInputChange} />
                            {address1Errors &&
                                <FormFeedback>{address1Errors}</FormFeedback>
                            }
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="txt-user-country-pd">País</Label>
                                    <Input type="text" className="form-control" id="txt-user-country-pd" innerRef={this.countryInput} placeholder="País" name="address.country" value={country} {...{ invalid: countryErrors ? true : undefined }} onChange={this.handleInputChange} />
                                    {countryErrors &&
                                        <FormFeedback>{countryErrors}</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="txt-user-city-pd">Ciudad</Label>
                                    <Input type="text" className="form-control" id="txt-user-city-pd" innerRef={this.cityInput} placeholder="Ciudad" name="address.city" value={city} {...{ invalid: cityErrors ? true : undefined }} onChange={this.handleInputChange} />
                                    {cityErrors &&
                                        <FormFeedback>{cityErrors}</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={9}>
                                <FormGroup>
                                    <label htmlFor="txt-user-country-location-pd">Localidad</label>
                                    <Input type="text" className="form-control" id="txt-user-country-location-pd" innerRef={this.stateInput} placeholder="Localidad" name="address.state" value={state} {...{ invalid: stateErrors ? true : undefined }} onChange={this.handleInputChange} />
                                    {stateErrors &&
                                        <FormFeedback>{stateErrors}</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="txt-user-zip-pd">Zip</Label>
                                    <Input type="text" className="form-control" id="txt-user-zip-pd" innerRef={this.zipcodeInput} placeholder=" Código Postal" name="address.zip_code" value={zipCode} {...{ invalid: zipCodeErrors ? true : undefined }} onChange={this.handleInputChange} />
                                    {zipCodeErrors &&
                                        <FormFeedback>{zipCodeErrors}</FormFeedback>
                                    }
                                </FormGroup>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Button className="btn btn-primary btn-save" onClick={this.handleUpdateData}>Guardar</Button>
                        </div>

                        {!!this.state.showSaveConfirmation &&
                            <Alert color="success" style={{ zIndex: 999 }}>
                                <p>Datos actualizados correctamente!</p>
                            </Alert>
                        }


                    </Form>
                    <div className="text-center profile-filters-box" style={{ paddingTop: "40px" }}>
                        <Row>
                            <Col md={12}>
                                <div className="icon-about-me-box">
                                    <FontAwesomeIcon
                                        id="icon-about-me"
                                        icon={faHiking}
                                        color="#778899"
                                        size="2x"
                                    /><h5 style={{display: "inline-block", marginLeft: "10px"}}>Acerca de mi</h5>
                                </div>
                            </Col>
                            <Col md={12}>
                                <RoomFilters createRoom={this.handleFilters} />
                            </Col>
                        </Row>

                        {!!this.state.showSaveFiltersConfirmation &&
                            <Alert color="success" style={{ zIndex: 999 }}>
                                <p>Datos actualizados correctamente!</p>
                            </Alert>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

UserProfilePersonalData.propTypes = {
    updateUserProfile: PropTypes.func.isRequired,
};