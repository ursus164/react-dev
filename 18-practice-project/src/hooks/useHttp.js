import { useEffect, useState, useCallback } from "react";

// using async/await will result in returning promise object
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

export default function useHttp(url,config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);


  // sendRequest is a dependency in useEffect because it is defined outside of request function. Therefore
  // to make sure that we do not end up in infinite loop - because we are updating some state in function, which wiill cause the component which uses this hook to execute again, and which will cause effect function to execute again - because sendRequest will change every time the surrounding component executes again because a new function object will be created - and to make sure we do not enter in infinite loop - the function should be wrapper with useCallback
  const sendRequest = useCallback(async function sendRequest() {
    setIsLoading(true);
    try {
      const resData =  await sendHttpRequest(url,config);
      setData(resData);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[url,config]) // we have to add url, and config as dependencies because when either of them changes, we will need to create a new function object with new parameteres

// useEffect() is called after the component renders (in which we are executing the hook) - the first time the component renders, will be with default values set in useState above (isLoading : false etc...)
  useEffect(() => {
    if(config && (config.method === 'GET' || !config.method) || !config) {
        sendRequest();
    }
  }, [sendRequest,config])

  return {
    data,
    isLoading,
    error,
    sendRequest // for other components when they want to execute function (for example for submitting form)
  };
}
