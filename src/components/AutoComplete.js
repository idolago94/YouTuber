import React, { Component } from 'react';
import { TextField, MenuItem, MenuList, FormControl, Input } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';


function mapStateToProps(state) {
    return state;
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        changeSong: (s) => dispatch({type: 'CHANGE_SONG', song: s})
    }
  }

class AutoComplete extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hideMenu: true,
            items: [],
            value: ''
        }
    }

    list = [];

    keyPress(e) {
        if(e.key === 'Enter'){
            let selectedSong = this.props.data.find(s => s.title == e.target.value);
            if(selectedSong) {
                this.props.changeSong(selectedSong);
            }
        }
    }

    componentDidMount() {
        axios.get('https://glacial-escarpment-40412.herokuapp.com/songs').then((data) => {
            this.list = data.data.map((s) => {
                return {label: s.title};
            })
            this.setState((state) => {
                return {
                    ...state,
                    items: this.list
                }
            });
        })
    }

    itemSelected(e) {
        this.setState({
            ...this.state,
            value: e.target.innerText
        })
    }

    hundleChange(e) {
        let updateItems = this.list.filter((it) => it.label.startsWith(e.target.value));
        if( updateItems.length<1 || e.target.value=='' ) {
            this.setState({
                ...this.state,
                value: e.target.value,
                items:updateItems,
                hideMenu: true
            })
        }
        else {
            this.setState({
                ...this.state,
                value: e.target.value,
                items: updateItems,
                hideMenu: false
                })
        }
        
    }


  render() {
    return (
      <div>
        <TextField helperText='press Enter for search' label='Search song' onKeyPress={this.keyPress.bind(this)} onChange={this.hundleChange.bind(this)} value={this.state.value} />
        <MenuList hidden={this.state.hideMenu}>
            {
                this.state.items.map((item) => {
                    return (
                        <MenuItem onClick={this.itemSelected.bind(this)}>{item.label}</MenuItem>
                    )
                })
            }
        </MenuList>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
