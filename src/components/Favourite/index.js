import React from 'react';
import { Container } from 'reactstrap';
import RoomSearchContainer from '../../containers/RoomSearchContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'


export default class Favourite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile_favourite_rooms: [],
            isLoading: false
        };

        this.forceRender = this.forceRender.bind(this);
    }

    componentWillMount() {
        this.setState({
            isLoading: true
        })
    }

    async componentDidMount() {
        await this.props.getProfile();

        let favourite_rooms = [];

        if (this.props.profile.room_bookmarks) {
            this.props.profile.room_bookmarks.map(async (room_id, i) => {
                await this.props.getRoomById({}, room_id)

                favourite_rooms.push(this.props.room.room)
            })
        }

        this.setState({
            profile_favourite_rooms: favourite_rooms
        })

        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 2000)
    }

    forceRender = room_id => {
        if (room_id && this.state.profile_favourite_rooms.length ) {
            let favourite_rooms = this.state.profile_favourite_rooms.filter(r => (r.room_id !== room_id))

            this.setState({
                profile_favourite_rooms: favourite_rooms
            })
        }
    }

    render() {
        let rooms = this.state.profile_favourite_rooms;

        return (
            <Container>
                <div id="user-listings-box">
                    <FontAwesomeIcon
                        icon={faHeartbeat}
                        color="#778899"
                        size="2x"
                    /><h5 style={{ display: "inline-block", marginLeft: "15px" }}>Habitaciones favoritas</h5>

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
                                            return (<div key={i} className="col-md-12">
                                                <RoomSearchContainer room={room} favouritePage={true} renderFavouritePage={this.forceRender} />
                                            </div>)
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}