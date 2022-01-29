import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";

import React from 'react';
import logo from './logo.svg';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const {
  Polly,
  PollyClient,
  StartSpeechSynthesisTaskCommand,
} = require("@aws-sdk/client-polly");

// Set the AWS Region.
const REGION = "ap-northeast-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const pollyClient = new PollyClient({ region: REGION });

// Create the parameters
var params = {
  OutputFormat: "mp3",
  OutputS3BucketName: "arn:aws:s3:::harukaze-polly",
  Text: "こんにちは",
  TextType: "text",
  VoiceId: "Joanna",
  SampleRate: "22050",
};

const run = async () => {
  try {
    const data = await pollyClient.send(
      new StartSpeechSynthesisTaskCommand(params)
    );
    console.log("Success, audio file added to " + params.OutputS3BucketName);
  } catch (err) {
    console.log("Error putting object", err);
  }
};
run();


const style = {
  width: 200,
  height: 150,
  border: "1px dotted #888"
};


function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
