import { connect } from 'react-redux';
import { getProfile, updateUserProfile } from '../../actions/profileActions';
import RoomSearch from '../../components/RoomSearch';

const mapStateToProps = ({ profile }) => ({
    profile
});

const mapDispatchToProps = ({
    updateUserProfile,
    getProfile
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomSearch);