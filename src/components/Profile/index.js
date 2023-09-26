import React from 'react';
import QueryString from 'query-string';
import { Container } from 'reactstrap';
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHiking, faPhone } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-responsive-modal';

import './profile.css';

const profileGenderType = {
    'MALE': 'Hombre',
    'FEMALE': 'Mujer',
    'NOT_SPECIFIED': 'No especifíca',
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            isloading: true,
            isModalPhoneOpen: false
        }
    }

    async componentDidMount() {
        let profileId;
        if (this.props.location && this.props.location.search) {
            const { profile_id } = new QueryString.parse(this.props.location.search);

            if (profile_id) {
                profileId = profile_id;

                this.props.getProfile(profileId)
                    .then((res) => {
                        setTimeout(() => {
                            this.setState({
                                profile: this.props.profile,
                                isloading: false
                            })
                        }, 2500);
                    })
            }
        }
    }

    getAge = born => {
        let today = new Date(),
            birthDate = new Date(born),
            age = today.getFullYear() - birthDate.getFullYear(),
            m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    onOpenModal = () => {
        this.setState({ isModalPhoneOpen: true });
    };

    onCloseModal = () => {
        this.setState({ isModalPhoneOpen: false });
    };

    render() {
        let profile = this.props.profile;

        return (
            <Container className="col-md-10">
                <div id="profile-box" className="row">
                    {
                        this.state.isloading &&
                        <div className="col-md-12 text-center">
                            <Loader
                                type="Ball-Triangle"
                                color="#663399"
                                height="100"
                                width="100"
                            />
                        </div>
                    }
                    {
                        !this.state.isloading && profile &&
                        <div className="col-md-12 padding-0">
                            <div className="row">
                                <div className="col-md-8 head-profile-box">
                                    <div className="row">
                                        <div className="offset-md-1 col-md-4">
                                            {
                                                profile.profile_image &&
                                                <img className="img-profile" src={profile.profile_image} alt="" />
                                            }
                                        </div>
                                        <div className="col-md-7">
                                            {
                                                profile.first_name && profile.last_name &&
                                                <h4 style={{ marginTop: "95px", marginBottom: "60px" }}>{`${profile.first_name} ${profile.last_name}`}</h4>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 data-profile-box">
                                    <div className="row">
                                        <div className="offset-md-1 col-md-4">
                                            <FontAwesomeIcon
                                                style={{ marginTop: "25px", marginLeft: "40px" }}
                                                className="icon-circle"
                                                icon={faUser}
                                                color="#778899"
                                                size="2x"
                                            /><label style={{ marginLeft: "10px", display: "block" }}>¿ Quién soy ?</label>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row">
                                                <span className="col-md-6">Género</span>
                                                {
                                                    profile.gender &&
                                                    <p className="col-md-6">{profileGenderType[profile.gender]}</p>
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Edad</span>
                                                {
                                                    profile.date_of_birth &&
                                                    <p className="col-md-6">{this.getAge(String(profile.date_of_birth).substring(0, 10))}</p>
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Ciudad</span>
                                                {
                                                    profile.address && profile.address.city &&
                                                    <p className="col-md-6">{profile.address.city}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "40px" }}>
                                <div className="col-md-8 data-profile-box">
                                    <div className="row">
                                        <div className="offset-md-1 col-md-4">
                                            <FontAwesomeIcon
                                                style={{ marginTop: "25px", marginLeft: "40px" }}
                                                className="icon-circle"
                                                icon={faHiking}
                                                color="#778899"
                                                size="2x"
                                            /><label style={{ marginLeft: "10px", display: "block" }}>¿ Cómo soy ?</label>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row">
                                                <span className="col-md-6">Limpieza</span>
                                                {
                                                    profile.my_cleanliness ?
                                                    (<p className="col-md-6">{cleanLiness[profile.my_cleanliness]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Tipo de alimentación</span>
                                                {
                                                    profile.my_food_preferences ?
                                                    (<p className="col-md-6">{foodPreferences[profile.my_food_preferences]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Ocupación</span>
                                                {
                                                    profile.my_occupation ?
                                                    (<p className="col-md-6">{ocupation[profile.my_occupation]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Invitados nocturnos</span>
                                                {
                                                    profile.my_overnight_guests ?
                                                    (<p className="col-md-6">{overnightGuest[profile.my_overnight_guests]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Habitos nocturnos</span>
                                                {
                                                    profile.my_party_habits ?
                                                    (<p className="col-md-6">{partyHabits[profile.my_party_habits]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Despertarse</span>
                                                {
                                                    profile.my_get_up_time ?
                                                    (<p className="col-md-6">{getUpTime[profile.my_get_up_time]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                            <div className="row">
                                                <span className="col-md-6">Acostarse</span>
                                                {
                                                    profile.my_go_to_bed_time ?
                                                    (<p className="col-md-6">{goBed[profile.my_go_to_bed_time]}</p>):
                                                    (<p>&nbsp;</p>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal phone */}
                            <button className="btn-view-phone" onClick={this.onOpenModal}>
                                Ver teléfono
                                    <FontAwesomeIcon
                                    icon={faPhone}
                                    color="#white"
                                    size="1x"
                                />
                            </button>
                            <Modal open={this.state.isModalPhoneOpen} onClose={this.onCloseModal} center>
                                <div className="text-center" style={{ padding: "30px" }}>
                                    <h3>Teléfono</h3>
                                    {
                                        profile.phone &&
                                        <h4>{profile.phone}</h4>
                                    }
                                </div>
                            </Modal>
                        </div>
                    }
                </div>
            </Container>
        )
    }
}

const getUpTime = {
    'BEFORE 8': 'Antes de las 8',
    '8 - 10': '8 - 10',
    'AFTER 10': 'Despues de las 10',
}

const goBed = {
    'BEFORE 20': 'Antes de las 20',
    '20 - 22': '20 - 22',
    'AFTER 22': 'Despues de las 22',
}

const cleanLiness = {
    'CLEAN': 'Limpio',
    'AVERAGE': 'Moderado'
}

const foodPreferences = {
    'VEGAN': 'Vegana',
    'VEGETARIAN': 'Vegetariana',
    'ALMOST_ANYTHING': 'Variada'
}


const ocupation = {
    'PROFESSIONAL': 'Profesional',
    'STUDENT': 'Estudiante',
    'BOTH': 'Ambos'
}

const overnightGuest = {
    'NEVER': 'Nunca',
    'RARELY': 'Raramente',
    'OCCASIONALLY': 'Ocacionalmente'
}

const partyHabits = {
    'NEVER': 'Nunca',
    'RARELY': 'Raramente',
    'OCCASIONALLY': 'Ocacionalmente'
}