import Image from "react-bootstrap/lib/Image";
import React, { Component } from "react";

export default function picUrlReplace(message, callback) {
  let picRegEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

  const picLink = (message || "").match(picRegEx);
  let imageURL;

  if (picLink !== null) {
    let urlImages = picLink.map(imageLink => {
      imageURL = (
        <Image className="picture" onLoad={callback} src={imageLink} rounded />
      );

      return imageURL;
    });

    message.replace(picRegEx, "");

    let messageContent = (
      <div>
        <div> {message.replace(picRegEx, "")} </div>
        {imageURL}
      </div>
    );

    return messageContent;
  } else {
    return [<div> {message} </div>];
  }
}
