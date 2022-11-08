const INIT_STATE = {
    currAlbum: {}, reviewList: [], currReview: {},
    currUser: { noUser: 'User not detected' }
}

function rootReducer(state = INIT_STATE, action) {

    switch (action.type) {

        case "LOAD-CURR-USER":
            return { ...state, currUser: action.payload }
        case "LOGOUT-CURR-USER":
            return { ...state, currUser: { noUser: 'User not detected' } };
        default:
            return state;

    }

}



export default rootReducer;