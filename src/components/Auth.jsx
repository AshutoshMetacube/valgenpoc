import React, { useEffect, useState } from "react";
import { RouterProvider, useSearchParams } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const [code, setCode] = useState("");

  useEffect(() => {
    debugger;
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const foo = params.get("code");
    setCode(decodeURIComponent(searchParams.get("code")));
    const getToken = async () => {
      //const baseURL = "https://login.salesforce.com/services/oauth2/token";
      //const baseU = '';
      const baseURL = `https://resilient-narwhal-ue20v8-dev-ed.trailblaze.my.salesforce.com/services/oauth2/token`;
      //const baseURL = `${process.env.REACT_APP_HOST}/services/oauth2/token`;
      let body = {
        grant_type: "authorization_code",
        //grant_type: "password",
        //code,
        code : foo,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      };

      const options = {
        method: "POST",
        headers: {
          //"Access-Control-Allow-Methods": "POST",
          "Accept": "application/x-www-form-urlencoded",
          //"content-type": "application/json",
          //"Access-Control-Allow-Origin": "*",
          //"Accept": "application/json",
        },
        body: qs.stringify(body),
        url: baseURL,
      };
      //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      console.log("options >>>");
      console.log(body);
      console.log(options);
      await axios(options)
        .then((response) => {
          console.log("response>>>>");
          console.log(response);
        })
        .catch((e) => {
          console.log("e >>>");
          console.log(e);
        });
    };
    if (code) {
      getToken();
    }
  }, [code, searchParams]);

  return <div>Auth code page</div>;
};

export default Auth;
