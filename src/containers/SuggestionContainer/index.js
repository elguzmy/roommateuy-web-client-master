import { connect } from 'react-redux';
import { getProfile, getProfileSuggestion } from '../../actions/profileActions';
import UserProfileSuggestion from '../../components/UserProfileSuggestion';

const mapStateToProps = ({ profile }) => ({
    profile
});

const mapDispatchToProps = ({
    getProfile,
    getProfileSuggestion
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileSuggestion)