import React from 'react';
import QueryString from 'query-string';
import { Container } from 'reactstrap';
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faHome, faHSquare } from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';

import RoomData from '../RoomData';
import RoomImages from '../RoomImages';
import RoomOwner from '../RoomOwner';
import RoomSpec from '../RoomSpec';
import './room.css';

export default class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomOwner: {},
            isLoading: true,
        }
    }

    async componentDidMount() {
        let roomId;

        if (this.props.location && this.props.location.search) {
            const { room_id } = new QueryString.parse(this.props.location.search);

            if (room_id) {
                roomId = room_id;

                this.props.getRoomById({}, roomId);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.room && this.props.room.room && !!this.props.room.room.profile.user_id && this.state.isLoading) {
            this.setState({
                isLoading: false,
                roomOwner: this.props.room.room.profile,
            });
        }
    }

    viewProfile = e => {
        e.preventDefault();

        history.push(`/search/profile?profile_id=${this.props.room.room.user_id}`)
    }

    render() {
        let room = this.props.room.room;
        let roomOwner = this.props.room.room.profile;
        
        return (    
            <Container className="col-md-7">
                <div id="room-box" className="row">
                    {this.state.isLoading &&
                        <div className="col-md-12 text-center">
                            <Loader
                                type="Ball-Triangle"
                                color="#663399"
                                height="100"
                                width="100"
                            />
                        </div>
                    }
                    {!this.state.isLoading &&
                        <div className="col-md-12 padding-0">
                            <div className="row">
                                <div className="col-md-12 padding-0 room-carrousel-box">
                                    <RoomImages room={room} />
                                </div>

                                <div className="col-md-12 text-left room-data-box">
                                    <div className="row data-room">
                                        <div className="col-md-4 text-center">
                                            <FontAwesomeIcon
                                                icon={faHome}
                                                color="#778899"
                                                size="2x"
                                            /><label style={{ display: "block" }}>Acerca del lugar</label>
                                        </div>
                                        <div className="offset-md-1 col-md-7">
                                            <RoomData room={room} />
                                        </div>
                                    </div>
                                    <div className="row data-room">
                                        <div className="col-md-4 text-center">
                                            <FontAwesomeIcon
                                                icon={faInfo}
                                                color="#778899"
                                                size="2x"
                                            /><label style={{ display: "block" }}>Preferencias</label>
                                        </div>
                                        <div className="offset-md-1 col-md-7">
                                            <RoomSpec room={room} />
                                        </div>
                                    </div>
                                    <div className="row data-room">
                                        <div className="col-md-4 text-center">
                                            <FontAwesomeIcon
                                                icon={faHSquare}
                                                color="#778899"
                                                size="2x"
                                            /><label style={{ display: "block" }}>Inquilíno</label>
                                        </div>
                                        <div className="offset-md-1 col-md-7">
                                            <RoomOwner viewProfile={this.viewProfile} roomOwner={roomOwner} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Container>
        )
    }
}