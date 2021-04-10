import * as uiActions from "../reducer/ui";
import {
  loadLocalUser,
  loadProfile,
  loadProfileSuccess,
  loadUser,
  performLogout,
  performSignin,
  performSignUp,
  removeUser,
  updateProfile,
  updatePassword
} from "../reducer/user";

/**
* Sign In Middleware
* @description
* Performs Signin API call. If call is successful, user is saved locally.
* Otherwise error handling is done.
* Dispatches setLoading, loadUser and setError
* @param {function} services.postSignin perform Sign In
* @param {function} services.saveLocalUser save user locally
*/ 
const performSignInFlow = ({ postSignin, saveLocalUser }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === performSignin.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await postSignin(action.payload);
      
      dispatch(loadUser(response.data.data));
      if (getState().user.token && getState().user.remember) {
        saveLocalUser(getState().user);
      }
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setLoading(false));
  }
};

/**
* Sign Up Middleware
* @description
* Performs SignUp API call. If call is successful, user is saved locally.
* Otherwise error handling is done.
* Dispatches setLoading, loadUser and setError
* @param {function} services.postSignup perform Sign Up
* @param {function} services.saveLocalUser save user locally
*/ 
const performSignUpFlow = ({ postSignup, saveLocalUser }) => ({
  dispatch,
  getState,
}) => (next) => async (action) => {
  next(action);
  if (action.type === performSignUp.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await postSignup(action.payload);
      dispatch(loadUser(response.data.data));
      if (getState().user.token && getState().user.remember) {
        saveLocalUser(getState().user);
      }
      dispatch(
        uiActions.setSuccessToast(
          "Registration Successful, Welcome aboard " + getState().user.name
        )
      );
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setLoading(false));
  }
};

/**
* Load Profile Middleware
* @description
* Performs GET Profile API call. If call is successful, profile data  is saved locally.
* Otherwise error handling is done.
* Dispatches setLoading, loadProfileSuccess and setError
* @param {function} services.getProfile perform get profile api call
*/ 
const getProfileFlow = ({ getProfile }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === loadProfile.type) {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await getProfile(getState().user.token);
      dispatch(loadProfileSuccess(response.data.data));
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setLoading(false));
  }
};

/**
* Update Profile Middleware
* @description
* Performs PUT Profile API call. If call is successful, profile data  is saved locally.
* Otherwise error handling is done.
* Dispatches setLoading, loadProfileSuccess and setError
* @param {function} services.getProfile perform get profile api call
*/ 
const updateProfileFlow = ({ putProfile, saveLocalUser, getLocalUser }) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === updateProfile.type) {
    dispatch(uiActions.setSpinner("profile"));
    try {
      await putProfile(getState().user.token,action.payload);
      dispatch(loadProfileSuccess(action.payload));
      dispatch(uiActions.setSuccessToast("Profile Updated Successfully"));
      if (getLocalUser()) {
        saveLocalUser(getState().user);
      }
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setSpinner(""));
  }
};

/**
* Update Password Middleware
* @description
* Performs PUT Profile API call. If call is successful, profile data  is saved locally.
* Otherwise error handling is done.
* Dispatches setLoading, loadProfileSuccess and setError
* @param {function} services.getProfile perform get profile api call
*/ 
const updatePasswordFlow = ({ putPassword}) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  next(action);
  if (action.type === updatePassword.type) {
    dispatch(uiActions.setSpinner("password"));
    try {
      await putPassword(getState().user.token,action.payload);
      dispatch(uiActions.setSuccessToast("Password Updated Successfully"));
    } catch (error) {
      if (error.response) {
        dispatch(uiActions.setError(error.response.data.error.message));
      } else {
        dispatch(uiActions.setError(error.message));
      }
    }
    dispatch(uiActions.setSpinner(""));
  }
};


/**
* Load Local User Middleware
* @description
* Retrieves locally saved user. If  successful, user data loaded into application.
* Dispatches loadUser,setSuccessToast
* @param {function} services.getLocalUser retrieve user saved locally
*/ 
const loadLocalUserFlow = ({ getLocalUser }) => ({ dispatch, getState }) => (
  next
) => (action) => {
  next(action);
  if (action.type === loadLocalUser.type) {
    if (!getState().user.token) {
      dispatch(uiActions.setLoading(true));
      const user = JSON.parse(getLocalUser());
      if (user) {
        dispatch(loadUser(user));
        dispatch(uiActions.setSuccessToast("Welcome " + user.name));
      }
      dispatch(uiActions.setLoading(false));
    }
  }
};

/**
* Logout  Middleware
* @description
* Deletes locally saved user.
* Dispatches loadUser,setSuccessToast, setshowLogoutModal
* @param {function} services.deleteLocalUser deletes local user
*/ 
const performLogoutFlow = ({ deleteLocalUser }) => ({ dispatch, getState }) => (
  next
) => (action) => {
  next(action);
  if (action.type === performLogout.type) {
    dispatch(removeUser());
    deleteLocalUser();
    dispatch(uiActions.setshowLogoutModal(false));
  }
};

const userFlow = [
  performSignInFlow,
  performSignUpFlow,
  getProfileFlow,
  loadLocalUserFlow,
  performLogoutFlow,
  updateProfileFlow,
  updatePasswordFlow,
];

export default userFlow;
