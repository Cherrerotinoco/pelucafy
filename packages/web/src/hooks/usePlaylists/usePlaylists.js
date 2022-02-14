import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";

const usePlaylists = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector(authSelector);
 
  useEffect(() => {
    if (Object.entries(currentUser).length === 0) {
      getPlaylists();
    }
  }, [currentUser]);

  const getPlaylists = async () => {
    try {
      const response = await api.getPlaylists();

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
