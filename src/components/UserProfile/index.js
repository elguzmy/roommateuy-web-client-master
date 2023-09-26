import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import UserProfilePhotograph from '../UserProfilePhotograph';
import UserProfileBirthGender from '../UserProfileBirthGender';
import UserProfilePersonalData from '../UserProfilePersonalData';
import UserProfileSocialMediaHandler from '../UserProfileSocialMediaHandler';
import './userProfile.css';

export default class UserProfile extends React.Component {
    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        return (
            <Container id="user-profile-box">
                <div className="row">
                    <div className="col-lg-3">
                        <UserProfilePhotograph profile={this.props.profile} uploadProfileImage={this.props.uploadProfileImage} />
                        <UserProfileBirthGender profile={this.props.profile} getProfile={this.props.getProfile} updateUserProfile={this.props.updateUserProfile} />
                        <UserProfileSocialMediaHandler profile={this.props.getProfile} updateUserProfile={this.props.updateUserProfile} />
                    </div>
                    <div className="offset-lg-1 col-lg-8">
                        <UserProfilePersonalData profile={this.props.profile} getProfile={this.props.getProfile} updateUserProfile={this.props.updateUserProfile} />
                    </div>
                </div>
            </Container>
        )
    }
}

UserProfile.propTypes = {
    updateUserProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    uploadProfileImage: PropTypes.func.isRequired,
};