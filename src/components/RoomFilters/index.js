import React from 'react';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from 'reactstrap';
import AgeRange from 'react-input-range';

export default class RoomFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ddwRoomTypeIsOpen: false,
            ddwRoomTypeValue: '',
            ddwCleanlinessIsOpen: false,
            ddwCleanlinessValue: '',
            ddwFoodPreferenceIsOpen: false,
            ddwFoodPreferenceValue: '',
            ddwBathTypeIsOpen: false,
            ddwBathTypeValue: '',
            ddwOccupationIsOpen: false,
            ddwOcupationValue: '',
            ddwOvernightGuestsIsOpen: false,
            ddwOvernightGuestsValue: '',
            ddwPartyIsOpen: false,
            ddwOverPartyValue: '',
            ddwPetIsOpen: false,
            ddwPetValue: '',
            ddwSmokingIsOpen: false,
            ddwSmokingValue: '',
            ddwWakeUpIsOpen: false,
            ddwWakeUpValue: '',
            ddwGoBedIsOpen: false,
            ddwGoBedValue: '',
            ageRange: {
                min: 18,
                max: 99
            },
            details_work_schedule: {
                work_in: '',
                work_out: '',
            },
            isFurnitured: false,
            hasWifi: false,
            hasAir: false,
            hasBalcony: false,
            showMessageError: false
        }

        this.roomTypeInput = React.createRef()

        this.toggleRoomType = this.toggleRoomType.bind(this);
        this.toggleClean = this.toggleClean.bind(this);
        this.toggleFoodPreference = this.toggleFoodPreference.bind(this);
        this.toggleBathType = this.toggleBathType.bind(this);
        this.toggleParty = this.toggleParty.bind(this);
        this.togglePet = this.togglePet.bind(this);
        this.toggleSmoking = this.toggleSmoking.bind(this);
        this.toggleWakeUp = this.toggleWakeUp.bind(this);
        this.toggleGoBed = this.toggleGoBed.bind(this);

        this.handleCLickRoomType = this.handleCLickRoomType.bind(this);
        this.handleCLickClean = this.handleCLickClean.bind(this);
        this.handleFoodPreference = this.handleFoodPreference.bind(this);
        this.handleBathtype = this.handleBathtype.bind(this);
        this.handleOcupation = this.handleOcupation.bind(this);
        this.handleOvernightGuest = this.handleOvernightGuest.bind(this);
        this.handleParty = this.handleParty.bind(this);
        this.handlePet = this.handlePet.bind(this);
        this.handleSmoking = this.handleSmoking.bind(this);
        this.handleWakeUp = this.handleWakeUp.bind(this);
        this.handleGoBed = this.handleGoBed.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.parseData = this.parseData.bind(this);
    }

    handleSave = (e) => {
        e && e.preventDefault();

        if (this.state && (this.state.ddwRoomTypeValue !== '' && this.state.ddwCleanlinessValue !== '' &&
            this.state.ddwFoodPreferenceValue !== '' && this.state.ddwBathTypeValue !== '' &&
            this.state.ddwOcupationValue !== '' && this.state.ddwOvernightGuestsValue !== '' &&
            this.state.ddwOverPartyValue !== '' && this.state.ddwPetValue !== '' &&
            this.state.ddwSmokingValue !== '' && this.state.ddwWakeUpValue !== '' && this.state.ddwGoBedValue !== '')) {

            this.setState({
                showError: false
            })

            let data = {
                room_type: this.state.ddwRoomTypeValue,
                details_cleanliness: this.state.ddwCleanlinessValue,
                details_food_preferences: this.state.ddwFoodPreferenceValue,
                details_bathroom_type: this.state.ddwBathTypeValue,
                details_occupation: this.state.ddwOcupationValue,
                details_overnight_guests: this.state.ddwOvernightGuestsValue,
                details_party_habits: this.state.ddwOverPartyValue,

                details_pet_allowed: this.state.ddwPetValue,
                details_smoking_preferences: this.state.ddwSmokingValue,
                details_get_up_time: this.state.ddwWakeUpValue,
                details_go_to_bed_time: this.state.ddwGoBedValue,
                specs_furnished: this.state.isFurnitured,
                specs_wifi: this.state.hasWifi,
                specs_balcony: this.state.hasBalcony,
                specs_air: this.state.hasAir,

                details_age: {
                    age_min: this.state.ageRange.min,
                    age_max: this.state.ageRange.max
                },
                // details_work_schedule: {
                //     work_in: this.state.details_work_schedule.work_in,
                //     work_out: this.state.details_work_schedule.work_out
                // },
            }

            let parseData = this.parseData(data);

            this.props.createRoom(parseData);
        } else {
            this.setState({
                showError: true
            })
        }
    }

    parseData(data) {
        switch (data.room_type) {
            case 'Simple':
                data.room_type = 'SINGLE';
                break;
            case 'Compartida':
                data.room_type = 'SHARED';
                break;
            case 'Doble':
                data.room_type = 'DOUBLE';
                break;
            default: data.room_type = 'SINGLE'
        }

        switch (data.details_cleanliness) {
            case 'Limpio':
                data.details_cleanliness = 'CLEAN';
                break;
            case 'Moderado':
                data.details_cleanliness = 'AVERAGE';
                break;
            default: data.details_cleanliness = 'CLEAN'
        }

        switch (data.details_food_preferences) {
            case 'Vegana':
                data.details_food_preferences = 'VEGAN';
                break;
            case 'Vegetariana':
                data.details_food_preferences = 'VEGETARIAN';
                break;
            case 'Variada':
                data.details_food_preferences = 'ALMOST_ANYTHING';
                break;
            default:
                data.details_food_preferences = 'ALMOST_ANYTHING';
        }

        switch (data.details_bathroom_type) {
            case 'Suite':
                data.details_bathroom_type = 'SUITE';
                break;
            case 'Compartido':
                data.details_bathroom_type = 'SHARED';
                break;
            default: data.details_bathroom_type = 'SHARED';
        }

        switch (data.details_occupation) {
            case 'Profesional':
                data.details_occupation = 'PROFESSIONAL';
                break;
            case 'Estudiante':
                data.details_occupation = 'STUDENT';
                break;
            case 'Ambos':
                data.details_occupation = 'BOTH';
                break;
            default: data.details_occupation = 'STUDENT';
        }

        switch (data.details_overnight_guests) {
            case 'Nunca':
                data.details_overnight_guests = 'NEVER';
                break;
            case 'Raramente':
                data.details_overnight_guests = 'RARELY';
                break;
            case 'Ocacionalmente':
                data.details_overnight_guests = 'OCCASIONALLY';
                break;
            default: data.details_overnight_guests = 'NEVER';

        }

        switch (data.details_party_habits) {
            case 'Nunca':
                data.details_party_habits = 'NEVER';
                break;
            case 'Raramente':
                data.details_party_habits = 'RARELY';
                break;
            case 'Ocacionalmente':
                data.details_party_habits = 'OCCASIONALLY';
                break;
            default: data.details_party_habits = 'NEVER';
        }

        switch (data.details_pet_allowed) {
            case 'Si':
                data.details_pet_allowed = true;
                break;
            case 'No':
                data.details_pet_allowed = false;
                break;
            default: data.details_pet_allowed = false;
        }

        switch (data.details_smoking_preferences) {
            case 'Si':
                data.details_smoking_preferences = true;
                break;
            case 'No':
                data.details_smoking_preferences = false;
                break;
            default: data.details_smoking_preferences = false;
        }

        switch (data.details_get_up_time) {
            case 'Antes de las 8':
                data.details_get_up_time = "BEFORE 8";
                break;
            case '8 - 10':
                data.details_get_up_time = "8 - 10";
                break;
            case 'Despues de las 10':
                data.details_get_up_time = "AFTER 10";
                break;
            default: data.details_get_up_time = "BEFORE 8";
        }

        switch (data.details_go_to_bed_time) {
            case 'Antes de las 20':
                data.details_go_to_bed_time = "BEFORE 20";
                break;
            case '20 - 22':
                data.details_go_to_bed_time = "20 - 22";
                break;
            case 'Despues de las 22':
                data.details_go_to_bed_time = "AFTER 22";
                break;
            default: data.details_go_to_bed_time = "AFTER 22"
        }

        return data;
    }

    handleAddressSelect(address, location) {
        if (location)
            this.setState({
                address: address
            })
    }

    toggleRoomType = () => {
        this.setState(
            prevState => ({
                ddwRoomTypeIsOpen: !prevState.ddwRoomTypeIsOpen,

            }));
    }

    toggleClean = () => {
        this.setState(
            prevState => ({
                ddwCleanlinessIsOpen: !prevState.ddwCleanlinessIsOpen,

            }));
    }

    toggleFoodPreference = () => {
        this.setState(
            prevState => ({
                ddwFoodPreferenceIsOpen: !prevState.ddwFoodPreferenceIsOpen,
            }));
    }

    toggleBathType = () => {
        this.setState(
            prevState => ({
                ddwBathTypeIsOpen: !prevState.ddwBathTypeIsOpen,
            }));
    }

    toggleOcupation = () => {
        this.setState(
            prevState => ({
                ddwOccupationIsOpen: !prevState.ddwOccupationIsOpen,
            }));
    }

    toggleOvernightGuests = () => {
        this.setState(
            prevState => ({
                ddwOvernightGuestsIsOpen: !prevState.ddwOvernightGuestsIsOpen,
            }));
    }

    toggleParty = () => {
        this.setState(
            prevState => ({
                ddwPartyIsOpen: !prevState.ddwPartyIsOpen,
            }));
    }

    togglePet = () => {
        this.setState(
            prevState => ({
                ddwPetIsOpen: !prevState.ddwPetIsOpen,
            }));
    }

    toggleSmoking = () => {
        this.setState(
            prevState => ({
                ddwSmokingIsOpen: !prevState.ddwSmokingIsOpen,
            }));
    }

    toggleWakeUp = () => {
        this.setState(
            prevState => ({
                ddwWakeUpIsOpen: !prevState.ddwWakeUpIsOpen,
            }));
    }

    toggleGoBed = () => {
        this.setState(
            prevState => ({
                ddwGoBedIsOpen: !prevState.ddwGoBedIsOpen,
            }));
    }

    handleCLickRoomType = e => {
        this.setState({
            ddwRoomTypeValue: e.target.innerText,
            ddwRoomTypeIsOpen: true,
        });
    }

    handleCLickClean = e => {
        this.setState({
            ddwCleanlinessValue: e.target.innerText,
            ddwCleanlinessIsOpen: true,
        });
    }

    handleFoodPreference = e => {
        this.setState({
            ddwFoodPreferenceValue: e.target.innerText,
            ddwFoodPreferenceIsOpen: true,
        });
    }

    handleBathtype = e => {
        this.setState({
            ddwBathTypeValue: e.target.innerText,
            ddwBathTypeIsOpen: true,
        });
    }

    handleOcupation = e => {
        this.setState({
            ddwOcupationValue: e.target.innerText,
            ddwOccupationIsOpen: true,
        });
    }

    handleOvernightGuest = e => {
        this.setState({
            ddwOvernightGuestsValue: e.target.innerText,
            ddwOvernightGuestsIsOpen: true,
        });
    }

    handleParty = e => {
        this.setState({
            ddwOverPartyValue: e.target.innerText,
            ddwPartyIsOpen: true,
        });
    }

    handlePet = e => {
        this.setState({
            ddwPetValue: e.target.innerText,
            ddwPetIsOpen: true,
        });
    }

    handleSmoking = e => {
        this.setState({
            ddwSmokingValue: e.target.innerText,
            ddwSmokingIsOpen: true,
        });
    }

    handleWakeUp = e => {
        this.setState({
            ddwWakeUpValue: e.target.innerText,
            ddwWakeUpIsOpen: true,
        });
    }

    handleGoBed = e => {
        this.setState({
            ddwGoBedValue: e.target.innerText,
            ddwGoBedIsOpen: true,
        });
    }

    render() {
        let errorColor = {
            color: "red"
        }
        return (
            <Container>
                <div id="add-room-specifications" className="text-center row">
                    <div className="col-md-12 room-spec room-age-spec">
                        <Label className="control-label col-md-12">Edad <sup style={errorColor}>*</sup></Label>
                        <div className="col-md-11" style={{ display: "inline-block" }}>
                            <AgeRange
                                maxValue={99}
                                minValue={18}
                                value={this.state.ageRange}
                                onChange={ageRange => this.setState({ ageRange })}
                            />
                        </div>
                    </div>

                    {this.props.isRoom &&
                        <div className="col-md-12 room-spec" style={{padding: "50px 0 35px 30px"}}>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <div className="pretty p-switch p-slim">
                                        <input ref="slimSmoke" type="checkbox" onChange={(val)=>this.setState({isFurnitured: val.target.checked})} />
                                        <div className="state">
                                            <label>Amueblado</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="pretty p-switch p-slim">
                                        <input ref="slimWifi" type="checkbox"  onChange={(val)=>this.setState({hasWifi: val.target.checked})} />
                                        <div className="state">
                                            <label>Wifi</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="pretty p-switch p-slim">
                                        <input ref="slimBalcony" type="checkbox"  onChange={(val)=>this.setState({hasBalcony: val.target.checked})} />
                                        <div className="state">
                                            <label>Bálcon</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-3">
                                    <div className="pretty p-switch p-slim">
                                        <input ref="slimAir" type="checkbox" onChange={(val)=>this.setState({hasAir: val.target.checked})} />
                                        <div className="state">
                                            <label>Aire</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Habitación <sup style={errorColor}>*</sup></Label>
                        <Dropdown ref={this.roomTypeInput} className="col-md-6" isOpen={this.state.ddwRoomTypeIsOpen} toggle={this.toggleRoomType}>
                            <DropdownToggle caret>
                                {this.state.ddwRoomTypeValue !== '' ? this.state.ddwRoomTypeValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem defaultValue={0} onClick={this.handleCLickRoomType}>Simple</DropdownItem>
                                <DropdownItem defaultValue={1} onClick={this.handleCLickRoomType}>Doble</DropdownItem>
                                <DropdownItem defaultValue={2} onClick={this.handleCLickRoomType}>Compartida</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-md-4 room-spec">
                        <Label className="control-label  col-md-12 lbl-room-filter">Limpieza <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwCleanlinessIsOpen} toggle={this.toggleClean}>
                            <DropdownToggle caret>
                                {this.state.ddwCleanlinessValue !== '' ? this.state.ddwCleanlinessValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleCLickClean}>Limpio</DropdownItem>
                                <DropdownItem onClick={this.handleCLickClean}>Moderado</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Tipo de alimentación <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwFoodPreferenceIsOpen} toggle={this.toggleFoodPreference}>
                            <DropdownToggle caret>
                                {this.state.ddwFoodPreferenceValue !== '' ? this.state.ddwFoodPreferenceValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleFoodPreference}>Variada</DropdownItem>
                                <DropdownItem onClick={this.handleFoodPreference}>Vegetariana</DropdownItem>
                                <DropdownItem onClick={this.handleFoodPreference}>Vegana</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Tipo de baño <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwBathTypeIsOpen} toggle={this.toggleBathType}>
                            <DropdownToggle caret>
                                {this.state.ddwBathTypeValue !== '' ? this.state.ddwBathTypeValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleBathtype}>Suite</DropdownItem>
                                <DropdownItem onClick={this.handleBathtype}>Compartido</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Ocupación <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwOccupationIsOpen} toggle={this.toggleOcupation}>
                            <DropdownToggle caret>
                                {this.state.ddwOcupationValue !== '' ? this.state.ddwOcupationValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleOcupation}>Profesional</DropdownItem>
                                <DropdownItem onClick={this.handleOcupation}>Estudiante</DropdownItem>
                                <DropdownItem onClick={this.handleOcupation}>Ambos</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Invitados nocturnos <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwOvernightGuestsIsOpen} toggle={this.toggleOvernightGuests}>
                            <DropdownToggle caret>
                                {this.state.ddwOvernightGuestsValue !== '' ? this.state.ddwOvernightGuestsValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleOvernightGuest}>Raramente</DropdownItem>
                                <DropdownItem onClick={this.handleOvernightGuest}>Nunca</DropdownItem>
                                <DropdownItem onClick={this.handleOvernightGuest}>Ocacionalmente</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Habitos nocturnos <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwPartyIsOpen} toggle={this.toggleParty}>
                            <DropdownToggle caret>
                                {this.state.ddwOverPartyValue !== '' ? this.state.ddwOverPartyValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleParty}>Raramente</DropdownItem>
                                <DropdownItem onClick={this.handleParty}>Nunca</DropdownItem>
                                <DropdownItem onClick={this.handleParty}>Ocacionalmente</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Mascotas <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwPetIsOpen} toggle={this.togglePet}>
                            <DropdownToggle caret>
                                {this.state.ddwPetValue !== '' ? this.state.ddwPetValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handlePet}>Si</DropdownItem>
                                <DropdownItem onClick={this.handlePet}>No</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Despertarse <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwWakeUpIsOpen} toggle={this.toggleWakeUp}>
                            <DropdownToggle caret>
                                {this.state.ddwWakeUpValue !== '' ? this.state.ddwWakeUpValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleWakeUp}>Antes de las 8</DropdownItem>
                                <DropdownItem onClick={this.handleWakeUp}>8 - 10</DropdownItem>
                                <DropdownItem onClick={this.handleWakeUp}>Despues de las 10</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Acostarse <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwGoBedIsOpen} toggle={this.toggleGoBed}>
                            <DropdownToggle caret>
                                {this.state.ddwGoBedValue !== '' ? this.state.ddwGoBedValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleGoBed}>Antes de las 20</DropdownItem>
                                <DropdownItem onClick={this.handleGoBed}>20 - 22</DropdownItem>
                                <DropdownItem onClick={this.handleGoBed}>Despues de las 22</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="col-md-4 room-spec">
                        <Label className="control-label col-md-12 lbl-room-filter">Fumadores <sup style={errorColor}>*</sup></Label>
                        <Dropdown className="col-md-6" isOpen={this.state.ddwSmokingIsOpen} toggle={this.toggleSmoking}>
                            <DropdownToggle caret>
                                {this.state.ddwSmokingValue !== '' ? this.state.ddwSmokingValue : 'Seleccionar'}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.handleSmoking}>Si</DropdownItem>
                                <DropdownItem onClick={this.handleSmoking}>No</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    {/* <div className="row work-schedule-room-filter" >
                        <div className="col-md-12 room-spec">
                            <Label className="control-label col-md-4">Horario trabajo <sup style={errorColor}>*</sup></Label>
                            <div className="col-md-4" style={{ display: "inline-block"}}>
                                <Label className="control-label col-md-12">Entrada:</Label>
                                <Input
                                    type="time"
                                    name="time"
                                    id="exampleTime"
                                    className="room-input-work"
                                    placeholder="Entrada"
                                    onChange={(val) => this.setState({
                                        details_work_schedule: {
                                            work_in: val.target.value,
                                            work_out: this.state.details_work_schedule.work_out
                                        },
                                    })}
                                />
                            </div>
                            <div className="col-md-4" style={{ display: "inline-block"}}>
                                <Label className="control-label col-md-4">Salida:</Label>
                                <Input
                                    type="time"
                                    name="time"
                                    id="room-input-work"
                                    placeholder="salida"
                                    onChange={(val) => this.setState({
                                        details_work_schedule: {
                                            work_in: this.state.details_work_schedule.work_in,
                                            work_out: val.target.value,
                                        },
                                    })}
                                />
                            </div>
                        </div>
                    </div> */}
                </div>
                {
                    this.state.showError &&
                    <div id="" className="row">
                        <div className="col-md-12 text-center">
                            <span style={{ color: "red" }}>Falta completar campos</span>
                        </div>
                    </div>
                }
                <button type="submit" className="btn btn-primary btn-save" onClick={this.handleSave}>Guardar</button>
            </Container>
        )
    }
}
