import axios from "axios";

export const formSubmit = async (values) => {
  const { firstName, lastName, email, username, password } = values;

  try {
    await axios.post(
      "http://localhost:1337/profiles",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await router.push(`/profile/${username}`);
  } catch (error) {
    let users = await axios.get("http://localhost:1337/profiles");

    if (users.data.filter((user) => user.username === username).length > 0) {
      setError("username already exists");
    }

    if (users.data.filter((user) => user.email === email).length > 0) {
      setError("email already exists");
    }
  }
};
