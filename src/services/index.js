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
    `${import.meta.env.VITE_APP_BACKEND}entries/${id}`,
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
};

export const addCommentService = async ({ data, id, token }) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}entries/${id}/comment`,
    {
      method: "POST",
      body: data,
      headers: {
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

export const getSingleUserService = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BACKEND}users/${id}`
  );

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
