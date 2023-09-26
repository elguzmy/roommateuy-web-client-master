import React from 'react';
import history from '../../utils/history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons'
import './userProfileSuggestionCart.css';

export default class UserProfileSuggestioncart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#778899'
        };
    }

    componentDidMount = () => {
        let avg = parseInt(this.props.avg);

        if(avg){
            if(avg < 70){
                this.setState({ color: '#ff9100'})
            }

            if(avg > 70 && avg < 80){
                this.setState({ color: '#ffc107'})
            }

            if(avg >= 80){
                this.setState({ color: '#008000'})
            }
        }
    }

    render() {
        return (
            <div id="profile-suggestion-box" className="row">
                <div className="col-md-12">
                    <div className="badge-avg">

                        <FontAwesomeIcon
                            className="icon-badge"
                            icon={faCertificate}
                            color={this.state.color}
                            size="4x"
                        />{this.props.avg &&
                            <h5>{`${Math.round(this.props.avg)}%`}</h5>
                        }
                        <div />
                    </div>

                    {
                        this.props.profile && this.props.profile.profile_image &&
                        <img className="profile-suggestion-image" src={this.props.profile.profile_image} alt="" />
                    }
                </div>
                <div className="col-md-12 text-center">
                    {
                        this.props.profile &&
                        <div>
                            {
                                this.props.profile.first_name && this.props.profile.last_name &&
                                <h6 style={{ color: "#663399" }}>{`${this.props.profile.first_name} ${this.props.profile.last_name}`}</h6>
                            }
                            {
                                this.props.profile.address && this.props.profile.address.city && this.props.profile.address.state ?
                                    (<p>{`${this.props.profile.address.city}, ${this.props.profile.address.state}`}</p>) : (
                                        <p>&nbsp;</p>)
                            }

                            <button className="btn btn-primary btn-view-profile-suggested " style={{ color: "#663399", cursor: "pointer" }} onClick={() => history.push(`/search/profile?profile_id=${this.props.profile.user_id}`)}>Ver</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}








// const UserProfileSuggestioncart = (props) => (
//     <div id="profile-suggestion-box" className="row">
//         <div className="col-md-12">
//             <div className="badge-avg">
//                 <FontAwesomeIcon
//                     className="icon-badge"
//                     icon={faCertificate}
//                     color="#778899"
//                     size="4x"
//                 /><h5>{`${props.avg}%`}</h5>
//                 <div />
//             </div>

//             {
//                 props.profile && props.profile.profile_image &&
//                 <img className="profile-suggestion-image" src={props.profile.profile_image} alt="" />
//             }
//         </div>
//         <div className="col-md-12 text-center">
//             {
//                 props.profile &&
//                 <div>
//                     {
//                         props.profile.first_name && props.profile.last_name &&
//                         <h6 style={{ color: "#663399" }}>{`${props.profile.first_name} ${props.profile.last_name}`}</h6>
//                     }
//                     {
//                         props.profile.address && props.profile.address.city && props.profile.address.state ?
//                             (<p>{`${props.profile.address.city}, ${props.profile.address.state}`}</p>) : (
//                                 <p>No especifica</p>)
//                     }

//                     <span style={{ color: "#663399", cursor: "pointer" }} onClick={() => history.push(`/search/profile?profile_id=${props.profile.user_id}`)}>Ver</span>
//                 </div>
//             }
//         </div>
//     </div>
// )

// export default UserProfileSuggestioncart;

