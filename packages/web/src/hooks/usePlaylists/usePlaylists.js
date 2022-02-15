import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import * as auth from "../../services/auth";
import api from "../../api";

const usePlaylists = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(authSelector);
 
  useEffect(() => {
    if (Object.entries(currentUser).length !== 0) {
      getPlaylists();
    }
  }, [currentUser]);

  const getPlaylists = async () => {
    try {

      const token = await auth.getCurrentUserToken();
      if (!token) setError('Token not valid')

      const response = await api.getPlaylists(
        {
          Authorization: `Bearer ${token}`,
        },

      );

      if (response.data.error) throw Error(response.errorMessage);

      setData(response.data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return [
    data,
    error
  ];
};

export default usePlaylists;
