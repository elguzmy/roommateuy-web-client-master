import React from 'react';
import { Input, Label } from 'reactstrap';
import DatePicker from 'react-date-picker';
import './userProfileBirthGender.css';
import PropTypes from "prop-types";
import UserProfilePersonalData from "../UserProfilePersonalData";

const genderMap = {
    '0': 'MALE',
    '1': 'FEMALE',
    '2': 'NOT_SPECIFIED',
};

const reverseGenderMap = {
    '0': 'Hombre',
    '1': 'Mujer',
    '2': 'No especifíca',
};

const selectedValueMap = {
    'MALE': '0',
    'FEMALE': '1',
    'NOT_SPECIFIED': '2',
};

export default class UserProfileBirthGender extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birth: null,
        };

        this.handleBirth = this.handleBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
    }

    handleBirth = (date, formattedValue) => {
        this.setState({
            birth: date, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    };

    handleGender = e => {
        e.preventDefault();

        const target = e.currentTarget;

        if (target) {
            const value = target.value;

            if (genderMap[value]) {
                this.props.updateUserProfile({
                    gender: genderMap[value],
                });
            }
        }
    };

    render() {
        let date_birth = this.props.profile && this.props.profile.date_of_birth ? this.props.profile.date_of_birth : new Date();
        const gender = (this.props.profile && this.props.profile.gender) || '2';

        return (
            <div id="user-birth-gender-box">
                <form>
                    <div className="form-group">
                        <label htmlFor="date-user-birth" className="control-label">Fecha de nacimiento</label>
                        <div className="col-lg-12">
                        <div className="user-birth-box">
                            <DatePicker
                                value={date_birth}
                                onChange={this.handleBirth}
                                disabled
                                calendarIcon={false}
                                clearIcon={false}
                                locale="es-ES"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <Label for="slc-user-gender" className="control-label">Género</Label>

                        <Input type="select" name="slc-user-gender" id="slc-user-gender" onChange={this.handleGender} value={selectedValueMap[gender]}>
                            {
                                Object.keys(genderMap).map((k) =>
                                    <option key={k} value={k}>{reverseGenderMap[k]}</option>)
                            }
                        </Input>
                    </div>
                </form>
            </div>
        )
    }
}

UserProfilePersonalData.propTypes = {
    updateUserProfile: PropTypes.func.isRequired,
};
