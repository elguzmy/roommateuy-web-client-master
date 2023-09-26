import { connect } from 'react-redux';
import { userRegister } from '../../actions/sessionActions';
import UserRegister from '../../components/UserRegister';

const mapStateToProps = ({ session }) => ({
    session,
});

const mapDispatchToProps = ({
    userRegister,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegister);