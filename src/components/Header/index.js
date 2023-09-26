import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import UserMenu from '../UserMenu';
import logo from "../../statics/img/roommate-loge.svg";
import Modal from 'react-responsive-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBullhorn } from '@fortawesome/free-solid-svg-icons'
import './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            isAuthenticated: false,
            isFacebookLogin: false,
            isModalOpen: false,
            autoLoad: false
        };

        this.responseFacebook = this.responseFacebook.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            isAuthenticated: this.props.isAuthenticated
        })
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    responseFacebook = response => {
        if (response) {
            console.log(response);

            let data = {
                access_token: response.accessToken,
                email: response.email,
                first_name: response.first_name,
                last_name: response.last_name,

            }

            this.props.loginFacebook(data);
        }
    }

    facebookLogin = e => {
        this.setState({ autoLoad: true });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        let roommateLogo = {
            height: '30px',
            marginTop: '5px'
        }
        let headerStyle = {
            height: "60px",
            fontSize: "13px"
        }

        return (
            <header>
                <Navbar color="white" light expand="md" style={headerStyle}>
                    <NavbarBrand href="/">
                        <img src={logo} style={roommateLogo} alt="" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/* <NavItem>
                                <NavLink href="/privacy">Privacidad</NavLink>
                            </NavItem> */}
                            {
                                !this.state.isAuthenticated && !this.state.isFacebookLogin &&
                                <NavItem>
                                    <FacebookLogin
                                        appId="312965192689755"
                                        autoLoad={this.state.autoLoad}
                                        fields="name,email,picture,first_name,last_name,birthday,gender"
                                        onClick={this.facebookLogin}
                                        cookie={false}
                                        textButton={"Entrar con Facebook"}
                                        cssClass="btn-fb-authentication"
                                        icon="fa-facebook"
                                        // onClick={this.facebookLogin}
                                        callback={this.responseFacebook}
                                    />
                                </NavItem>
                            }
                            {
                                !this.state.isAuthenticated &&
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                            }
                            {
                                !this.state.isAuthenticated &&
                                <NavItem>
                                    <NavLink href="/register">Registrar</NavLink>
                                </NavItem>
                            }
                            <NavItem>
                                <NavLink href="/search">
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        color="#663399"
                                        size="2x"
                                    />
                                </NavLink>
                            </NavItem>
                            {
                                this.state.isAuthenticated &&
                                <NavItem>
                                <NavLink href="/suggestion">
                                    <FontAwesomeIcon
                                        className="icon-megaphone"
                                        icon={faBullhorn}
                                        color="#663399"
                                        size="2x"
                                    />
                                </NavLink>
                            </NavItem>
                            }
                            {
                                this.state.isAuthenticated &&
                                <UserMenu />
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                <Modal open={this.state.isModalOpen} onClose={this.onCloseModal} center>
                    <h2>Simple centered modal</h2>
                </Modal>
            </header>
        );
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool
}