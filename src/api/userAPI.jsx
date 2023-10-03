import axios from "axios";
import { useSession } from "../hooks/useSession";

const BACKEND_URL = "http://localhost:8000/api";

const CheckSession = () => {
  const { getItem } = useSession();
  const tokenValue = getItem("token");
  return tokenValue;
};

export const getUserDetails = async (userId, setUserDetails) => {
  const token = CheckSession();

  try {
    await axios
      .get(
        `${BACKEND_URL}/user/get-user-details`,
        {
          headers: {
            "x-access-token": token,
          },
        },
        { params: { userId: userId } }
      )
      .then((result) => {
        setUserDetails(result.data.user);
      });
  } catch (err) {
    console.log(err);
    setUserDetails("");
  }
};
