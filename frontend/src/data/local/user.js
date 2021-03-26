export const saveUser = (user) =>
  localStorage.setItem(
    "user",
    JSON.stringify({
      name: user.name,
      email: user.email,
      token: user.token,
    })
  );

export const retrieveUser = () => localStorage.getItem("user");

export const removeUser = () => localStorage.removeItem("user");
