import React from 'react';
import history from '../../utils/history';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faHome, faHeartbeat, faGraduationCap, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import sessionHelper from '../../lib/httpClient/sessionHelper';
import sessionAPI from "../../api/sessionAPI";

import './userMenu.css';

export default class UserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userAuthenticated: false
        }

        this.handleSignOff = this.handleSignOff.bind(this)
    }

    componentWillMount() {
        sessionHelper.isAuthenticated ? this.setState({
            userAuthenticated: true
        })
            : this.setState({
                userAuthenticated: false
            });
    }

    handleSignOff = () => {
        sessionAPI.logout().finally(() => {
            sessionHelper.destroyLocalStorage();
            history.push('/')
        });
    };

    render() {
        return (
            <UncontrolledDropdown nav inNavbar id='user-menu'>
                <DropdownToggle nav caret>
                    <FontAwesomeIcon
                        id="icon-user-menu"
                        icon={faUserCircle}
                        color="#663399"
                        size="2x"
                    />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <NavLink href="/profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                color="#663399"
                                size="lg"
                            />Mi perfil
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <NavLink href="/listings">
                            <FontAwesomeIcon
                                icon={faHome}
                                color="#663399"
                                size="lg"
                            />Mis habitaciones
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink href="/favourite">
                            <FontAwesomeIcon
                                icon={faHeartbeat}
                                color="#663399"
                                size="lg"
                            />Favoritos
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <NavLink href="/tutorial">
                            <FontAwesomeIcon
                                icon={faGraduationCap}
                                color="#663399"
                                size="lg"
                            />Tutorial
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink href="/tutorial">
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                color="#663399"
                                size="lg"
                            />Ayuda
                        </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    {/* <DropdownItem>
                        <NavLink href="/settings">
                            <FontAwesomeIcon
                                icon={faCog}
                                color="#663399"
                                size="lg"
                            />Configuración
                        </NavLink>
                    </DropdownItem> */}
                    <DropdownItem>
                        <NavLink onClick={this.handleSignOff}>
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                color="#663399"
                                size="lg"
                            />Cerrar sesión
                        </NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}