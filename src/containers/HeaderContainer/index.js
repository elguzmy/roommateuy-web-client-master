import { connect } from 'react-redux'
import { loginFacebook } from '../../actions/sessionActions'
import Header from '../../components/Header'

const mapStateToProps = ({ session }) => ({

});

const mapDispatchToProps = ({
    loginFacebook,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);