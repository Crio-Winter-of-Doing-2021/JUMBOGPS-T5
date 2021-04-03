const USER_KEY = "user";

export const saveUser = (user) =>
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      name: user.name,
      email: user.email,
      token: user.token,
    })
  );

export const retrieveUser = () => localStorage.getItem(USER_KEY);

export const removeUser = () => localStorage.removeItem(USER_KEY);
