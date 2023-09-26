import { connect } from 'react-redux';
import { getProfile } from '../../actions/profileActions';
import Profile from '../../components/Profile';

const mapStateToProps = ({ profile }) => ({
    profile
});

const mapDispatchToProps = ({
    getProfile,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)