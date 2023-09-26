import React from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types';
import RoomSearchContainer from '../../containers/RoomSearchContainer';
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import history from '../../utils/history';

import './userListing.css';

export default class UserListing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            user_rooms_list: [],
            isLoading: false
        };

        this.handleAddRoom = this.handleAddRoom.bind(this);
        this.handleAddRoommate = this.handleAddRoommate.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        })
    }

    componentDidMount() {
        this.props.getUserRooms()
            .then(() =>
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    });
                }, 2000)
            );
    }

    handleAddRoom = () => history.push("/listings/room");

    handleAddRoommate = () => history.push("/search");

    onOpenModal = () => this.setState({ isModalOpen: true });

    onCloseModal = () => this.setState({ isModalOpen: false });

    render() {
        let rooms = this.props.room.user_rooms_list;

        return (
            <Container>
                <div id="user-listings-box">
                    <FontAwesomeIcon
                        icon={faHome}
                        color="#778899"
                        size="2x"
                    /><h5 style={{ display: "inline-block", marginLeft: "15px" }}>Listado de Habitaciones</h5>

                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            {
                                this.state.isLoading &&
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
                                !this.state.isLoading &&
                                <div id="room-results" className="row">
                                    {
                                        rooms &&
                                        rooms.map((room, i) => {
                                            if (room.user_id === localStorage.getItem("UserId"))
                                                return (<div key={i} className="col-md-12">
                                                    <RoomSearchContainer room={room} />
                                                </div>)
                                            else return null
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className="col-md-2" style={{ marginTop: "-30px" }}>
                            <button id="add-listings" onClick={this.onOpenModal}>
                                <FontAwesomeIcon
                                    id="icon-add-listings"
                                    icon={faPlus}
                                    color="#663399"
                                    size="lg"
                                />Agregar
                            </button>
                        </div>
                    </div>
                    <div id="user-add-listings-modal-box" className="row">
                        <Modal
                            open={this.state.isModalOpen}
                            onClose={this.onCloseModal}
                            center
                        >
                            <div id="user-add-listings-modal-box">
                                <h5>Qué estas buscando ?</h5>

                                <div className="row">
                                    <div id="add-room-listing" className="col-lg-12"><button onClick={this.handleAddRoom}>Publicar habitación</button></div>
                                    <div id="add-roommate-listing" className="col-lg-12"><button onClick={this.handleAddRoommate}>Buscar habitación</button></div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </Container>
        )
    }
}