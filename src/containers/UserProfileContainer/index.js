import { connect } from 'react-redux';
import { getCurrentUser } from '../../actions/sessionActions';
import { getProfile, updateUserProfile, uploadProfileImage } from '../../actions/profileActions';
import UserProfile from '../../components/UserProfile';

const mapStateToProps = ({ profile, session }) => ({
    profile,
    session,
});

const mapDispatchToProps = ({
    getCurrentUser,
    updateUserProfile,
    getProfile,
    uploadProfileImage,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)