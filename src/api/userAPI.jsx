import axios from "axios";

const BACKEND_URL = "http://localhost:8000/api";

export const getUserDetails = async (userId, setUserDetails) => {
    try {
      await axios.get(`${BACKEND_URL}/user/get-user-details`, {params: {userId: userId}}).then((result) => {
        setUserDetails(result.data.user);
      });
    } catch (err) {
      console.log(err);
      setUserDetails("");
    }
  };