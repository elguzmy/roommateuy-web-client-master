import { connect } from 'react-redux';
import { getRoomById } from '../../actions/roomAction';
import { getProfile } from '../../actions/profileActions';
import Room from '../../components/Room';

const mapStateToProps = ({ room, profile }) => ({
    room,
    profile
});

const mapDispatchToProps = ({
    getRoomById,
    getProfile
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);