import { connect } from 'react-redux';
import { getUserRooms } from '../../actions/roomAction';
import UserListing from '../../components/UserListing';

const mapStateToProps = ({ room }) => ({
    room
});

const mapDispatchToProps = ({
    getUserRooms,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserListing)