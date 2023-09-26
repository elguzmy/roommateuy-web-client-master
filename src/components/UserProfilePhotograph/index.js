import React from 'react';
import './userProfilePhotograph.css';
import { MoonLoader } from "react-spinners";
import noProfileImage from '../../statics/img/user.png';

export default class UserProfilePhotograph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    submitFile = (e) => {
        e.preventDefault();

        const formData = new FormData();
        const file = e.target.files[0];

        if (file) {
            const size = file.size;

            if ((size / 1024 / 1024) > 5) {
                alert('La foto no puede ser mayor a 5MB')
                return;
            }

            formData.append('file', file);

            this.props.uploadProfileImage(formData);
        }
    };

    render() {
        const imgSrc = this.props.profile.profile_image || noProfileImage;
        const imgStyles = {
            backgroundImage: `url(${imgSrc})`,
        };

        return (
            <div id="user-photograph-box">
                {!this.props.profile.uploading &&
                    <div>
                        <div id="user-photograph">
                            <div id="user-photograph-container" style={imgStyles} />
                        </div>

                        <div id="user-photograph-settings" className="row">
                            <div className="user-photograph-form-wrapper col-xs-12 text-center">
                                <form onSubmit={this.submitFile}>
                                    <input type='file' id="user-photograph-file-input" accept="image/*" onChange={this.submitFile} />
                                    <label htmlFor="user-photograph-file-input">Cambiar Imagen</label>
                                </form>
                            </div>
                        </div>
                    </div>
                }
                {this.props.profile.uploading &&
                    <div id="user-photograph">
                        <MoonLoader
                            size={60}
                        />
                    </div>
                }
            </div>
        )
    }
}
