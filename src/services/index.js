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

// Token
// export const getMyDataService = async (token) => {
//   const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user`, {
//     headers: {
//       authorization: token,
//     },
//   });

//   const json = await response.json();

//   if (!response.ok) {
//     throw new Error(json.message);
//   }

//   return json.data;
// };
