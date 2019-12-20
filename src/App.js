import React, { Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Dashboard from './dashboard';
import Signup from './signup';
import Newsfeed  from './feed';
import Signin from './signin';
import User from './user';
import Follow from './follow';
import Userprofile from './userprofile';
import DirectLogin from './directLogin';
import Groups from './grps';
import GrpPosts from './grpposts';
import Notification from './msgs';
import MyProfile from './myprofile';
import CreateGrp from './creategrp';
import editGrpProfile from './grpedit';
import GrpAbout from './grpabout';
import GrpMembers from './grpmembers';
import GrpGallery from './grpgallery';
import EditProfile from './editprofile';
import GrpAddMembers from './grpaddmembers';
import JoinGrp from './joingrp';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
      <div className='App'>
      <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route path='/signup' component={Signup} />
      <Route path='/signin' component={Signin} />
      <Route path='/msgs' component={Notification} />
      <Route path='/feed' component={Newsfeed} />
      <Route path='/user' component={User} />
      <Route path='/follow' component={Follow} />
      <Route path='/userprofile/:id' component={Userprofile} />
      <Route path='/directLogin' component={DirectLogin} />
      <Route path='/myprofile/:id' component={MyProfile} />
      <Route path='/editprofile/:id' component={EditProfile} />
      <Route path='/creategrp/:id' component={CreateGrp} />
      <Route path='/grps' component={Groups} />
      <Route path='/grp/posts/:id' component={GrpPosts} />
      <Route path='/grp/edit/:id' component={editGrpProfile} />
      <Route path='/grp/about/:id' component={GrpAbout} />
      <Route path='/grp/members/:id' component={GrpMembers} />
      <Route path='/grp/gallery/:id' component={GrpGallery} />
      <Route path='/grp/addmembers/:grpid/:usrid' component={GrpAddMembers} />
      <Route path='/joingrp/:id' component={JoinGrp} />

      </Switch>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
