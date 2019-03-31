import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import './MediaPlayer.css';


function mapStateToProps(state) {
    return state;
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    }
  }

class MediaPlayer extends Component {


    forwardTo(time) {
        this.media.target.seekTo(time);
    }

    videoReady(e) {
        this.media = e;
        e.target.playVideo();
    }

    playerChange(e) {
        if(e.data == '5') {
            e.target.playVideo();
        }
    }


  render() {
    if(this.props.mediaPlayer.currentSong.quotes) {
        return (
      <div >
         <h1>{this.props.mediaPlayer.currentSong.title}</h1>
         <YouTube onReady={this.videoReady.bind(this)} id='mediaPlayer' onStateChange={this.playerChange.bind(this)} videoId={this.props.mediaPlayer.currentSong.youtubeId} />
         <div className='quotes'>
            <h4>Quotes <span>{this.props.mediaPlayer.currentSong.quotes.length} quotes</span></h4>
            {
                this.props.mediaPlayer.currentSong.quotes.map((q) => {
                    return (
                        <div>
                            <img onClick={this.forwardTo.bind(this, q.offset)} className='play-icon' src='https://cdn.iconscout.com/icon/premium/png-256-thumb/play-button-34-569708.png' height='30' />
                            <span>"{q.text}" </span>
                            {
                                q.offset<10 ? (<label>00:0{q.offset}</label>) : (
                                    q.offset>60 ? (<label>{Math.floor(q.offset/60)}:{q.offset%60}</label>) : (<label>00:{q.offset}</label>)
                                )
                            }
                        </div>
                    )
                })
            }
         </div>
      </div>
        )}
    else{
        return (<div></div>)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
