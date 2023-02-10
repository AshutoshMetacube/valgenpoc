import React, { useState } from "react";
import { CreateJob } from "../../service/auth";

const CsvImporter = () => {
  const [baseFile, setBaseFile] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseFile(base64);
    const token = await localStorage.setItem("token","00D5h000008PDCm!AQ4AQKXe8B2QcEQLuZ0sZI1UG5n8n54HQbhnWoN6zCdjdNg17VhCcvG8DdLwRQ.cpHX5_5jiv6Il3vq4YeszVh_olg9dayUw");

    CreateJob({
      object: "Account",
      externalIdFieldName: "myExtId__c",
      contentType: "CSV",
      operation: "upsert",
      lineEnding: "CRLF",
    }).then((result) => {
      console.log("result >>>>", result);
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          uploadFile(e);
        }}
      />
      <br></br>
      <img src={baseFile} height="200px" />
    </div>
  );
};

export default CsvImporter;
