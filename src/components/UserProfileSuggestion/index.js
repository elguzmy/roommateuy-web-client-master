import React from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'

import './suggestionProfile.css';
import UserProfileSuggestionCart from '../UserProfileSuggestionCart';

export default class UserProfileSuggestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            profileSuggestion: null
        };

        this.getSuggestion = this.getSuggestion.bind(this);
    }

    shouldComponentUpdate = nextProps => (
        nextProps.profile.pending !== this.props.profile.pending
    )

    componentDidUpdate(props) {
        this.setState({
            isLoading: false,
            profileSuggestion: this.props.profile.profileSuggestion
        })
    }

    getSuggestion = e => {
        e.preventDefault();

        this.setState({
            isLoading: true
        })

        this.props.getProfileSuggestion();
    }

    render() {
        return (
            <Container>
                <div id="user-suggestion-box">
                    <FontAwesomeIcon
                        icon={faBullhorn}
                        color="#778899"
                        size="2x"
                    /><h5 style={{ display: "inline-block", marginLeft: "15px" }}>Sugerencias de roommates</h5>

                    <div className="row">
                        <div className="offset-md-3 col-md-7">
                            {
                                this.state.isLoading &&
                                <div className="col-md-12 text-center" style={{marginLeft: "-10%"}}>
                                    <Loader
                                        type="Ball-Triangle"
                                        color="#663399"
                                        height="100"
                                        width="100"
                                    />
                                </div>
                            }
                            <div id="suggestion-results" className="row">
                                {
                                    !this.state.isLoading && this.props.profile.profileSuggestion &&
                                    this.props.profile.profileSuggestion.map((suggestion,i) => (
                                        <div className="col-md-3" key={i} style={{margin: '20px', marginBottom: '30px'}}>
                                            <UserProfileSuggestionCart profile={suggestion.profile} avg={suggestion.avg}/>
                                        </div>)
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: "-30px" }}>
                            <button id="btn-get-suggestion" onClick={this.getSuggestion}>
                                <FontAwesomeIcon
                                    icon={faSyncAlt}
                                    color="#663399"
                                    size="lg"
                                    style={{ marginRight: '10px' }}
                                />Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}