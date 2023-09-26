import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSmoking, faWind, faCouch, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const RoomSpec = (props) => (
    <div>
        <div className="col-md-12 text-center">
            <div className="row">
                {props.room.specs_wifi &&
                    <div className="col-md-4">
                        <FontAwesomeIcon
                            icon={faWifi}
                            color="#663399"
                            size="2x"
                        /><p>Wifi</p>
                    </div>
                }

                {props.room.details_smoking_preferences &&
                    <div className="col-md-4">
                        <FontAwesomeIcon
                            icon={faSmoking}
                            color="#663399"
                            size="2x"
                        /><p>Smoking</p>
                    </div>
                }

                {props.room.specs_air &&
                    <div className="col-md-4">
                        <FontAwesomeIcon
                            icon={faWind}
                            color="#663399"
                            size="2x"
                        /><p>Aire</p>
                    </div>
                }

                {props.room.specs_furnished &&
                    <div className="col-md-4">
                        <FontAwesomeIcon
                            icon={faCouch}
                            color="#663399"
                            size="2x"
                        /><p>Amueblado</p>
                    </div>
                }

                {props.room.specs_balcony &&
                    <div className="col-md-4">
                        <FontAwesomeIcon
                            icon={faAlignLeft}
                            color="#663399"
                            size="2x"
                        /><p>Balcón</p>
                    </div>
                }
            </div>
        </div>
    </div>
)

export default RoomSpec;