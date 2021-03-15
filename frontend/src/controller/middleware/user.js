import {
  performSignin,
  performSignUp,
  loadUser,
  loadError,
  loadLocalUser,
  performLogout,
  removeUser,
}from "../reducer/user";
import * as uiActions from "../reducer/ui";

const performSignInFlow =  ({postSignin}) => ({ dispatch,getState }) => (next) => async (
  action
) => {
  next(action);
  if (action.type === performSignin.type) {
    dispatch(uiActions.setLoading(true));
    try {
      console.log(action.payload);
      const response = await postSignin(action.payload);
      console.log(response);
      dispatch(loadUser(response.data.data));

      if(getState().user.token && getState().user.remember) {
        localStorage.setItem('user',JSON.stringify(getState().user));
        // dispatch(setRemember(false));
      }
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error));
      }  else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setLoading(false));
  }
}

const performSignUpFlow = ({postSignup}) => ({ dispatch }) => next =>  async (action)  => {
  next(action);
  if (action.type === performSignUp.type) {
    console.log(action.payload);
    dispatch(uiActions.setLoading(true));
    try {
      const response = await postSignup(action.payload);
      console.log(response);
      dispatch(loadUser(response.data.data));
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error));
      }  else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setLoading(false));
  }
}

const getProfileFlow = () => ({ dispatch, getState }) => next => action => {
  next(action);
}

const loadLocalUserFlow = () => ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type === loadLocalUser.type) {
      if(!getState().user.token) {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) dispatch(loadUser(user));
      }   
  }
}

const performLogoutFlow = () => ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type === performLogout.type) {
    dispatch(removeUser());
    localStorage.removeItem('user');   
    dispatch(uiActions.setshowLogoutModal(false));
  }
}

const userFlow = [performSignInFlow, performSignUpFlow,getProfileFlow,loadLocalUserFlow,performLogoutFlow];

export default userFlow;


