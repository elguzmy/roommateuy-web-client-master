import { connect } from 'react-redux';
import { getRoomById } from '../../actions/roomAction';
import { getProfile } from '../../actions/profileActions';
import Favourite from '../../components/Favourite';

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
)(Favourite)