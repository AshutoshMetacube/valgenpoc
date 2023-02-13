import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";
//import LoadingOverlay from "react-loading-overlay";
import Loader from "./Loader";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const [code, setCode] = useState("");
  const navigate = useNavigate();
  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const codeText = params.get("code");

  useEffect(() => {
    setCode(decodeURIComponent(searchParams.get("code")));
    const getToken = async () => {
      const baseURL = "https://resilient-narwhal-ue20v8-dev-ed.trailblaze.my.salesforce.com/services/oauth2/token";
      let body = {
        grant_type: "authorization_code",
        code:codeText,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: 'https://ashutoshmetacube.github.io/velgenpoc/#/auth',
      };

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(body),
        url: baseURL,
      };

      await axios(options)
        .then((response) => {
          console.log("response>>>>", response);
          console.log("response.data>>>>", JSON.stringify(response.data));
          console.log("response.data.access_token>>>>", JSON.stringify(response.data.access_token));
          sessionStorage.setItem('data', JSON.stringify(response.data))
          sessionStorage.setItem('token', response.data.access_token)
          navigate('/csv')
        })
        .catch((e) => {
          // sessionStorage.setItem('data', JSON.stringify(sample))
          // sessionStorage.setItem('token', sample.access_token)
          // navigate('/csv')
          console.log("e >>>", e);
        });
    };
    if (code) {
      getToken();
    }
  }, [code, searchParams]);

  return (
    <Loader isActive={true} />
  )
};

export default Auth;
