import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (config) => {
  const [State, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const [Trigger, setTrigger] = useState(false);

  const refetch = () => {
    setTrigger(true);
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        setState({
          loading: false,
          data: response.data,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          loading: false,
          data: null,
          error,
        });
      });
  }, [Trigger]);

  return {
    ...State,
    refetch,
  };
};

export default useAxios;
