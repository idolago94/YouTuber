const initialState = {
    currentSong: {}
}

const mediaPlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_SONG':
            return {
                ...state,
                currentSong: action.song
            }
        default: return state
    }
}

export default mediaPlayerReducer;
