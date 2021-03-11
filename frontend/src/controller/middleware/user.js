import {
  performSignin,
  performSignUp,
  loadProfile,
}from "../reducer/user";

const performSignInFlow = () => ({ dispatch, getState }) => next => action => {
    

  next(action);
}

const performSignUpFlow = () => ({ dispatch, getState }) => next => action => {
    

  next(action);
}

const getProfileFlow = () => ({ dispatch, getState }) => next => action => {
    

  next(action);
}

const userFlow = [performSignInFlow, performSignUpFlow,getProfileFlow];

export default userFlow;


