import { connect } from 'react-redux';
import { registerRoom } from '../../actions/roomAction';
import UserNewRoom from '../../components/UserNewRoom';

const mapStateToProps = ({ room }) => ({
    room
});

const mapDispatchToProps = ({
    registerRoom
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserNewRoom)