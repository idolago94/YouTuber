import React, { Component } from 'react';
import SideBar from './SideBar';
import MediaPlayer from './MediaPlayer';

class Main extends Component {
  render() {
    return (
      <div className='row'>
          <div className='col-sm-3'>
            <SideBar />
          </div>
          <div className='col-sm-6'>
            <div>
              <MediaPlayer />
            </div>
          </div>
      </div>
    );
  }
}

export default Main;
