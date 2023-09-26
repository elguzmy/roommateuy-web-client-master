//Imports
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import Dropdown from 'react-dropdown';
import DatePicker from 'react-date-picker';
import MainBanner from '../MainBanner';
import Footer from '../Footer';
import '../UserRegister/userRegister.css';
import '../MainBanner/mainBanner.css';

const alertStyles = {
    color: '#721c24',
    marginBottom: '10px',
};

export class UserRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birth: new Date(),
            gender: "Género",
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBirth = this.handleBirth.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.parseGender = this.parseGender.bind(this);
        this.dateValidator = this.dateValidator.bind(this);
    }

    handleBirth = (date, formattedValue) => {
        this.dateValidator(date)
        this.setState({
            birth: date, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    dateValidator = date => (date < new Date() ? true : false)

    handleSubmit = e => {
        e && e.preventDefault();

        if (this.dateValidator(this.state.birth)) {
            this.setState({ error: null })

            let user = {
                first_name: this.userFirstName.value,
                last_name: this.userLastName.value,
                email: this.userEmail.value,
                password: this.userPassword.value,
                gender: this.parseGender(),
                date_of_birth: this.state.birth
            }

            this.props.userRegister(user);
        }
        else this.setState({ error: "La fecha ingresada debe ser menor a la fecha actual" })
    }

    parseError() {
        if (this.props.session.error.error.status) {
            if (this.props.session.error.error.status === 409) {
                return (
                    <Alert style={alertStyles} id="alert-user-register-confirmation" color="danger" type="error" >
                        <p>Ya existe un usuario registrado con ese email</p>
                    </Alert>
                );
            }

            if (this.props.session.error.error.status === 500) {
                return (
                    <Alert style={alertStyles} id="alert-user-register-confirmation" color="danger" type="error">
                        <p>Correo invalido</p>
                    </Alert> 
                );
            }
        }
    }

    parseGender = () => {
        switch (this.state.gender) {
            case 'Hombre': return 'MALE'
            case 'Mujer': return 'FEMALE'
            case 'No especifíca': return 'NOT_SPECIFIED'
            default: return 'NOT_SPECIFIED'
        }
    }

    handleGender = e => {
        if (e.value)
            this.setState({
                gender: e.value
            })
    }

    render() {
        let options = [
            "Hombre", "Mujer", "No especifíca"
        ];

        return (
            <div>
                <div id="user-register-box">
                    <div id="carousel-container">
                        <div className="login-page register-page">
                            <div className="form">
                                <form id="create-acount-form" className="login-form" onSubmit={val => this.handleSubmit(val)}>
                                    <span id="span-register"><p>REGISTRAR</p></span>
                                    <input id="txt-first-name" type="text" placeholder="Nombre" ref={node => this.userFirstName = node} required />
                                    <input id="txt-last-name" type="text" placeholder="Apellido" ref={node => this.userLastName = node} required />
                                    <input id="txt-email" type="text" placeholder="Email" ref={node => this.userEmail = node} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required />
                                    <input id="txt-password" type="password" placeholder="Contraseña: almenos 7 caracteres" ref={node => this.userPassword = node} minLength="7" maxLength="13" required />

                                    <Dropdown
                                        className="dropdown-gender"
                                        options={options}
                                        onChange={this.handleGender}
                                        value={this.state.gender}
                                        placeholder="Select an option"
                                    />

                                    <label id='lbl-birth'>Nacimiento</label>

                                    <DatePicker
                                        value={this.state.birth}
                                        onChange={this.handleBirth}
                                    />

                                    <input type="submit" className="btn-form" value="Registrar" />

                                    <div>
                                        {
                                            this.props.session.error && !this.state.error &&
                                            this.parseError()
                                        }

                                        {
                                            this.state.error &&
                                            <Alert style={alertStyles} id="alert-user-register-confirmation" color="danger" type="error">
                                                <p>{this.state.error}</p>
                                            </Alert>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>

                        <MainBanner />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

UserRegister.propTypes = {
    userRegister: PropTypes.func.isRequired,
};

export default UserRegister;