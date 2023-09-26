import React from 'react';
import HeaderContainer from '../../containers/HeaderContainer';
import LoginPageContainer from '../../containers/LoginContainer';
import UserRegisterContainer from '../../containers/UserRegisterContainer';
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../MainPage';
import UserProfileContainer from '../../containers/UserProfileContainer';
import UserSettings from '../UserSettings';
import UserListingContainer from '../../containers/ListingContainer';
import UserNewRoomContainer from '../../containers/UserNewRoomContainer';
import RoomContainer from '../../containers/RoomContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import FavouriteContainer from '../../containers/FavouriteContainer';
import SuggestionContainer from '../../containers/SuggestionContainer';
import Privacy from '../Privacy';
import SearchContainer from '../../containers/SearchContainer';
import NotFound from '../../utils/notFound.js';
import Tutorial from '../../utils/tutorial.js';
import sessionHelper from '../../lib/httpClient/sessionHelper';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    }
  }

  componentWillMount() {
    this.setState({
      isAuthenticated: sessionHelper.isAuthenticated()
    })
  }

  render() {
    let isAuth = this.state.isAuthenticated;

    return (
      <div className="App">
        <HeaderContainer isAuthenticated={isAuth} />

        <div id="app-root">
          <Router>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path='/login' render={() => isAuth ? <Redirect to="/" /> : <LoginPageContainer />} />
              <Route path='/register' render={() => isAuth ? <Redirect to="/" /> : <UserRegisterContainer />}  />
              <Route path='/profile' render={() => isAuth ? <UserProfileContainer /> : <Redirect to="/" />} />
              <Route path='/settings' render={() => isAuth ? <UserSettings /> : <Redirect to="/" />} />
              <Route path='/favourite' render={() => isAuth ? <FavouriteContainer /> : <Redirect to="/" />} />
              <Route path='/suggestion' render={() => isAuth ? <SuggestionContainer /> : <Redirect to="/" />} />
              <Route path='/privacy' component={Privacy} />

              <Route exact path='/listings' render={() => isAuth ? <UserListingContainer /> : <Redirect to="/" />} />
              <Route path='/listings/room' render={() => isAuth ? <UserNewRoomContainer /> : <Redirect to="/" />} />

              <Route exact path='/search' component={SearchContainer} />
              <Route path='/search/profile' component={ProfileContainer} />
              <Route path='/room' component={RoomContainer} />
              <Route path='/tutorial' component={Tutorial} />

              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}