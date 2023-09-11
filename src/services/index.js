// Register
export const registerUserService = async ({ email, name, username, pwd, repeatpwd }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}register`, {
    method: "POST",
    body: JSON.stringify({ email, name, username, pwd, repeatpwd }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  console.log(json)
};

// Login
export const logInUserService = async ({ email, pwd }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}login`, {
    method: "POST",
    body: JSON.stringify({ email, pwd }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

// Obtener los datos del usuario logueado
export const getMyUserDataService = async ( idUser ) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users/${idUser}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getUserByUsernameService = async (username) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}users/search?username=${username}`
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getPhotosByDesc = async (description) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_BACKEND
    }entries/photos/search?description=${description}`
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.photos;
};
