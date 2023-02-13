import React from "react";
import "./home.scss";
const Home = () => {
let  token = "";
if(localStorage.getItem('token')){
      token = localStorage.getItem('token');
}
  const handelAuthConnect = () => {

    //let targetUrl = `${process.env.REACT_APP_HOST}/services/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
    let targetUrl = `https://login.salesforce.com/services/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
    //let targetUrl = `https://login.salesforce.com/services/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_SF}&response_type=code`;

  window.location.href = targetUrl;
  };
  const handelAuthDisConnect = () => {

    localStorage.clear();
  };

  return (
    <div>
      <div  className="connect">
        <div className="leftBlock">
         <span className="sfImg"></span>
        <h6>Salesforce</h6>   
        </div>
        {(!token) ? <button className="salesforceBtn" onClick={handelAuthConnect}>Connect</button> : <button className="salesforceBtn" onClick={handelAuthDisConnect}>Disconnect</button> }
        
        
      </div>
    </div>
  );
};

export default Home;
