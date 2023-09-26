import React from 'react';
import history from '../../utils/history';

import homeImg from '../../statics/img/home.jpg';
import './mapRoomInfoBubble.css';

const roomTypeMap = {
    'DOUBLE': 'Doble',
    'SHARED': 'Compartida',
    'SINGLE': 'Simple',
};

const roomRateType = {
    'MONTHLY': 'mes',
    'WEEKLY': 'semana',
    'YEARLY': 'año',
};

const MapRoomInfoBuuble = (props) => (
    <div className="map-room-info-bubble-container" style={{ marginTop: "20px", width: '200px' }}>
        <div className="map-room-info-bubble">
            {props.room.images && props.room.images.length ?
                <div className="map-room-info-bubble-image-wrapper" style={{ marginBottom: "15px", textAlign: 'center', width: '100%' }}>
                    <div className="map-room-info-bubble-image" style={{ marginBottom: "10px" }}>
                        <img src={props.room.images[0]} style={{ 'maxHeight': '100px' }} alt=''/>
                    </div>
                </div>
                :
                <div className="map-room-info-bubble-image-wrapper" style={{ marginBottom: "10px", textAlign: 'center' }}>
                    <div className="map-room-info-bubble-image" style={{ marginBottom: "10px" }}>
                        <img src={homeImg} style={{ 'maxHeight': '100px' }} alt="home" />
                    </div>
                </div>
            }
            <div className="map-room-info-bubble-specs-container" style={{ padding: '0 10px' }}>
                {props.room.headline ?
                    <div className="map-room-info-bubble-headline" style={{
                        marginBottom: "10px", color: 'white', fontWeight: 'bold',
                        textTransform: 'uppercase', fontSize: '15px'
                    }}>
                            <span>{props.room.headline}</span>
                    </div>
                    :
                    null
                }
                {props.room.description ?
                    <div className="map-room-info-bubble-description" style={{ marginBottom: '10px', lineHeight: '1', color: 'white', fontSize: '12px' }}>
                        <span>{props.room.description}</span>
                    </div>
                    :
                    null
                }
                {props.room.room_type && roomTypeMap[props.room.room_type] ?
                    <div className="map-room-info-bubble-room-type" style={{ marginBottom: "5px", lineHeight: '1', color: 'white', fontSize: '12px' }}>
                        <span>Tipo: {roomTypeMap[props.room.room_type]}</span>
                    </div>
                    :
                    null
                }
                {props.room.rate && props.room.rate_type && roomRateType[props.room.rate_type] ?
                    <div className="map-room-info-bubble-rate" style={{ marginBottom: "5px", color: 'white', fontSize: '12px', lineHeight: '1' }}>
                        <span>Precio: ${props.room.rate} / {roomRateType[props.room.rate_type]}</span>
                    </div>
                    :
                    null
                }
            </div>
            {props.room.room_id ?
                <div className="map-room-info-bubble-view-btn-container">
                    <a className="map-room-info-bubble-view-btn" onClick={() => history.push(`/room?room_id=${props.room.room_id}`)}>Ver</a>
                </div>
                :
                null
            }
        </div>
    </div>
);

export default MapRoomInfoBuuble;