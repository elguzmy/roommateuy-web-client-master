import React from 'react';
import './roomOwner.css';

const RoomOwner = (props) => (
    <div className="row">
        <div className="col-md-3">
            {
                props.roomOwner && props.roomOwner.profile_image &&
                    <img className="room-owner-image" src={props.roomOwner.profile_image} alt=""/>
            }
        </div>
        <div className="offset-md-1 col-md-8">
            {
                props.roomOwner &&
                    <div>
                        {
                            props.roomOwner.first_name && props.roomOwner.last_name &&
                                <h6 style={{color: "#663399"}}>{`${props.roomOwner.first_name} ${props.roomOwner.last_name}`}</h6>
                        }
                        {
                            props.roomOwner.address && props.roomOwner.address.city && props.roomOwner.address.state ?
                                (<p>{`${props.roomOwner.address.city}, ${props.roomOwner.address.state}`}</p>):
                                (<p>&nbsp;</p>)
                        }
                        
                        <span style={{color: "#663399", cursor: "pointer"}} onClick={val => props.viewProfile(val)}>Ver</span>
                    </div>
            }
        </div>
    </div>
)

export default RoomOwner;