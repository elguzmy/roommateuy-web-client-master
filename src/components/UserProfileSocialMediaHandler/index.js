import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import './userProfileSocialMediaHandler.css';

const UserProfileSocialMediaHandler = (props) => (
    <div id="user-social-media-box">
        <div className="col-lg-12">
            <label id="lbl-social-media">Redes sociales</label>
        </div>

        <div id="user-social-media-links" className="col-lg-12">
            <a href="http://www.facebook.com/elguzmy">
                <FontAwesomeIcon
                    id="user-social-media-facebook"
                    icon={faFacebook}
                    color="#4267b2"
                    size="lg"
                />
            </a>
        </div>

        <div id="add-social-media-box" className="col-lg-12">
            <a id="add-social-media" href="/">+ Agregar</a>
        </div>
    </div>
);

export default UserProfileSocialMediaHandler;
