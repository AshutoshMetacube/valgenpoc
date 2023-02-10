import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(decodeURIComponent(searchParams.get("code")));
    const getToken = async () => {
      const baseURL = "https://login.salesforce.com/services/oauth2/token";
      let body = {
        grant_type: "authorization_code",
        code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      };

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(body),
        url: baseURL,
      };
      console.log("options >>>", JSON.stringify(options));
      await axios(options)
        .then((response) => {
          console.log("response>>>>", response);
        })
        .catch((e) => {
          console.log("e >>>", e);
        });
    };
    if (code) {
      getToken();
    }
  }, [code, searchParams]);

  return <div>Auth code page</div>;
};

export default Auth;
