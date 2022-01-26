const initialState=false
const changeTheUserLog=(state=initialState,action)=>{
    switch(action.type){
        case "Login":
            state=true
            return state;
        case "Logout":
            state=false
            return state;
        default:
            return state;
    }
}
export default changeTheUserLog;
