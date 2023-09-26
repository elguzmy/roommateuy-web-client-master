import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const roomTypeMap = {
    'DOUBLE': 'Doble',
    'SHARED': 'Compartida',
    'SINGLE': 'Simple',
}

// const roomRateType = {
//     'MONTHLY': 'mes',
//     'WEEKLY': 'semana',
//     'YEARLY': 'anual',
// }

const RoomData = (props) => (
    <div className="row">
        <div className="col-md-12">
            {props.room.description &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Descripción</h6>
                    <textarea className="room-description col-md-5" value={props.room.description} disabled />
                </div>
            }

            {props.room.room_type &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Tipo</h6>
                    <p className="room-type col-md-5">{roomTypeMap[props.room.room_type]}</p>
                </div>
            }

            {props.room.address && props.room.address.address1 &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Dirección</h6>
                    <p className="room-country col-md-5">{props.room.address.address1}</p>
                </div>
            }
            {props.room.address && props.room.address.city &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Ciudad</h6>
                    <p className="room-city col-md-5">{props.room.address.city}</p>
                </div>
            }
            {props.room.details_age &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Edad estimada</h6>
                    <p className="room-city col-md-5">{`entre ${props.room.details_age.age_min} y ${props.room.details_age.age_max}`}</p>
                </div>
            }
            {props.room.current_roommates &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Roommates viviendo</h6>
                    <p className="room-city col-md-5">{`${props.room.current_roommates}`}</p>
                </div>
            }
            {props.room.calendar &&
                <div className="row" style={{ marginBottom: "10px" }}>
                    <FontAwesomeIcon
                        className="icon-circle"
                        icon={faCircle}
                        color="#663399"
                        size="1x"
                    />
                    <h6 className="col-md-6">Disponible</h6>
                    <p className="room-city col-md-5">{`entre ${String(props.room.calendar.date_in).substring(0, 10)} y ${String(props.room.calendar.date_out).substring(0, 10)}`}</p>
                </div>
            }
        </div>
    </div>
)

export default RoomData;