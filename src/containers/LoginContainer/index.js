import { connect } from 'react-redux'
import { loginLocal } from '../../actions/sessionActions'
import LoginPage from '../../components/LoginPage'

const mapStateToProps = ({ session }) => ({
    session,
});

const mapDispatchToProps = ({
    loginLocal,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);