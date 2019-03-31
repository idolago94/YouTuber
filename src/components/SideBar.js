import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from './AutoComplete';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return state;
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        changeSong: (s) => dispatch({type: 'CHANGE_SONG', song: s})
    }
  }


class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            songs: []
        }
    }

    componentDidMount() {
        axios.get('https://glacial-escarpment-40412.herokuapp.com/songs').then((data) => {
            this.setState({songs: data.data});
        })
    }

  render() {
    return (
      <div>
          <AutoComplete data={this.state.songs} />
          <h4>Select from list:</h4>
          {
              this.state.songs.map((song) => {
                  return (
                      <div onClick={this.props.changeSong.bind(this, song)} id={song.youtubeId} >{song.title}</div>
                  )
              })
          }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
