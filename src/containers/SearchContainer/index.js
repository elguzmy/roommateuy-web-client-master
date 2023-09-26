import { connect } from 'react-redux';
import { searchRoomsByLocation } from '../../actions/roomAction';
import { getProfile } from '../../actions/profileActions';
import Search from '../../components/Search';

const mapStateToProps = ({ room, profile }) => ({
    room,
    profile
});

const mapDispatchToProps = ({
    searchRoomsByLocation,
    getProfile
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)