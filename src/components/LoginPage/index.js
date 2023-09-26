import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import MainBanner from '../MainBanner';
import Footer from '../Footer';
import './loginPage.css';
import '../MainBanner/mainBanner.css';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e && e.preventDefault();

        if (this.email.value !== '' && this.userPassword.value !== '') {
            let data = {
                email: this.email.value,
                password: this.userPassword.value
            };

            this.props.loginLocal(data);
        }
    }

    parseError() {
        if (this.props.session.error.status === 401 || this.props.session.error.status === 400) {
            const alertStyles = {
                color: '#721c24',
            };

            return (
                <Alert id="alert-login-confirmation" color="danger">
                    <p style={alertStyles}>Correo o contraseña incorrecta</p>
                </Alert>
            );
        }
    }

    render() {
        const pending = this.props.session.pending;

        return (
            <div>
                <div id="login-page-box">
                    <div id="carousel-container">
                        <div className="login-page">
                            <div className="form">
                                <form className="login-form" onSubmit={val => this.handleSubmit(val)}>
                                    <span id="span-login"><p>LOGIN</p></span>
                                    <input id="txtEmail_login" type="email" placeholder="email" ref={node => this.email = node} required />
                                    <input id="txtUserPassword_login" type="password" placeholder="Contraseña" ref={node => this.userPassword = node} required />
                                    <input type="submit" className="btn-form" value={pending ? 'Ingresando...' : 'Ingresar'} />

                                    <p className="message">No registrado aún? <a href="/register">Registrar</a></p>

                                    <div>
                                        {
                                            this.props.session.error &&
                                            this.parseError()
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

LoginPage.propTypes = {
    loginLocal: PropTypes.func.isRequired
};

export default LoginPage;