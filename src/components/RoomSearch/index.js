import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import Dotdotdot from 'react-dotdotdot';
import home from '../../statics/img/home.jpg';
import history from '../../utils/history';
import sessionHelper from '../../lib/httpClient/sessionHelper';

import Carousel from 'nuka-carousel';
import './roomSearch.css';

const roomTypeMap = {
    'DOUBLE': 'Doble',
    'SHARED': 'Compartida',
    'SINGLE': 'Simple',
}

const roomRateType = {
    'MONTHLY': 'mes',
    'WEEKLY': 'semana',
    'YEARLY': 'anual',
}

export default class RoomSearch extends React.Component {
    constructor(props) {
        super(props);

        this.handleShowInMap = this.handleShowInMap.bind(this);
        this.handleFavourite = this.handleFavourite.bind(this);
        this.setFavouriteColor = this.setFavouriteColor.bind(this);
    }

    componentDidMount = () => {
        this.setFavouriteColor()
    }

    shouldComponentUpdate = () => {
        if(this.props.favouritePage){
            this.setFavouriteColor();
        }
        return true;
    }

    handleShowInMap(e) {
        if (e) {
            e.preventDefault();

            if (this.props && this.props.room && this.props.room.room_id && this.props.room.location && this.props.room.location.length) {
                try {
                    history.push(`/room?room_id=${this.props.room.room_id}`);
                } catch (e) {

                }
            }
        }
    }

    async handleFavourite(e){
        if (e && this.props.profile && this.props.profile.room_bookmarks && this.props.room && this.props.room.room_id) {
            await this.props.getProfile();

            if (!e.classList.contains("isFavourite")) {
                if (!this.props.profile.room_bookmarks.includes(this.props.room.room_id)) {
                    e.classList.add("isFavourite")
                    this.props.updateUserProfile({ $push: { "room_bookmarks": this.props.room.room_id } })
                }
            }

            if (e.classList.contains("isFavourite")) {
                if (this.props.profile.room_bookmarks.includes(this.props.room.room_id)) {
                    e.classList.remove("isFavourite")
                    this.props.updateUserProfile({ $pull: { "room_bookmarks": this.props.room.room_id } })
                }
            }

            if(this.props.favouritePage && this.props.renderFavouritePage)
                this.props.renderFavouritePage(this.props.room.room_id);
        }
    }

    setFavouriteColor = () => {
        if (this.props.profile && this.props.profile.room_bookmarks && this.props.room && this.props.room.room_id){
            let icon = document.getElementById(this.props.room.room_id);
            
            if(icon) 
                if (this.props.profile.room_bookmarks.includes(this.props.room.room_id)) {
                    icon.classList.add("isFavourite") 
                }
        }
    }

    render() {
        let room = this.props.room;

        return (
            <div>
                {
                    room &&
                    <div className="room-search-box">
                        <div className="row">
                            <div className="col-md-4">
                                {
                                    room.images && room.images.length > 0 &&
                                    <Carousel
                                        autoplay={room.images.length > 1}
                                        pauseOnHover={true}
                                        speed={2000}
                                        withoutControls={true}
                                        wrapAround={true}
                                        transitionMode="fade"
                                    >
                                        {
                                            room &&
                                            room.images.map((image, i) => (
                                                <div key={i}>
                                                    <img className="room-search-images" src={image} alt='' />
                                                </div>
                                            ))
                                        }
                                    </Carousel>
                                }
                                {
                                    (!room.images || !room.images.length) &&
                                    <div className="default-room-image text-center">
                                        <img src={home} className="room-search-images" alt="" />
                                    </div>
                                }
                            </div>
                            <div className="col-md-5 room-search-drescription-box">
                            {
                                sessionHelper.isAuthenticated() &&
                                <FontAwesomeIcon
                                    id={`${room.room_id}`}
                                    className="icon-favourite-room-search"
                                    icon={faStar}
                                    color="#d3d3d3"
                                    size="1x"
                                    onClick={e => this.handleFavourite(e.target)}

                                />
                            }

                                {room.headline &&
                                    <Dotdotdot clamp={2}>
                                        <p className="room-search-headline">{room.headline}</p>
                                    </Dotdotdot>
                                }

                                {room.description &&
                                    <Dotdotdot clamp={1}>
                                        <p className="room-search-description">{room.description}</p>
                                    </Dotdotdot>
                                }

                                {room.room_type &&
                                    <p className="room-search-room-type">{roomTypeMap[room.room_type]}</p>
                                }

                                {room.address && room.address.address1 &&
                                    <div className="room-search-country-box">
                                        <Dotdotdot clamp={1}>
                                            <p className="room-search-country">{room.address.address1}</p>
                                        </Dotdotdot>
                                    </div>
                                }
                                {room.address && room.address.city &&
                                    <p className="room-search-city">{room.address.city}</p>
                                }
                            </div>
                            <div className="col-md-3 text-center">
                                <div className="room-search-price-box">
                                    <p className="room-search-price">$ {room.rate}</p>
                                    <p className="room-search-per-time">{roomRateType[room.rate_type]}</p>
                                    <FontAwesomeIcon
                                        className="icon-home-room-search"
                                        icon={faHome}
                                        color="#663399"
                                        size="2x"
                                    />
                                    <div className="move-in-date-box">
                                        <FontAwesomeIcon
                                            className="icon-calendar-room-search"
                                            icon={faCalendarCheck}
                                            color="#663399"
                                            size="2x"
                                        />
                                        <label className="lbl-move-in-date">Mudanza:</label>
                                        <p className="room-search-move-in-date">Disponible</p>
                                    </div>
                                    <input className="btn-view-room-search" type="buttom" defaultValue="Ver" onClick={this.handleShowInMap} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}