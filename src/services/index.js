// Register
export const registerUserService = async ({
  email,
  name,
  username,
  pwd,
  repeatpwd,
}) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/register`, {
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
  return json
};



// Login
export const logInUserService = async ({ email, pwd }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
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



// Edit
export const editUserDataService = async ({ token, idUser, email, name, username, pwd, pwdNew, repeatpwd }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users/${idUser}`, {
    method: "PUT",
    body: JSON.stringify({ email, name, username, pwd, pwdNew, repeatpwd }),
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json
};



// Borrar cuenta
export const deleteAccountService = async ({ token, idUser }) => {

  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users/${idUser}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  });
  const json = await response.json();
  console.log(json)

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};



// Cambiar avatar
export const changeAvatarService = async ({ token, avatar }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users/avatar`, {
    method: "POST",
    body: avatar,
    headers: {
      authorization: token,
    },
  });

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};



// Obtener los datos del usuario logueado
export const getMyUserDataService = async (idUser) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/users/${idUser}`
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};



export const getAllPhotosService = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};



export const deletePhotosService = async ({ id, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/entries/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json
};

export const addCommentService = async ({ comment, id, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/entries/${id}/comment`,
    {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const deleteCommentService = async ({ id, idComment, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/entries/${id}/comment/${idComment}`,
    {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json
};

// Editar comment
export const editCommentService = async ({ id, idComment, comment, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/entries/${id}/comment/${idComment}`,
  {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ comment }),
  }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json
};


export const getSingleUserService = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/users/${id}`
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};



export const getUserByUsernameService = async (username) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/users/search?username=${username}`
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const getPhotosByDescService = async (description) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND
    }/entries/photos/search?description=${description}`
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.photos;
};

export const likePhotoService = async ({ token, idEntry }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/entries/${idEntry}/votes`,
    {
      method: "POST",
      headers: {
        authorization: token,
      },
    }
  );

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message);
  }

  const updatedLikes = await response.json();
  return updatedLikes; 


};

// Añadir foto
export const addPhotoService = async ({ token, formData }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}/entries/photos`,
    {
      method: "POST",
      body: formData,
      headers: {
        authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};




