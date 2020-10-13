import React from "react";

const YoutubePlayer = ({ src, title, className }) => {
  if (!src) {
    return <div>Loading...</div>;
  }
  return (
    <iframe
      title={title}
      id="ytplayer"
      type="text/html"
      src={src}
      allowFullScreen="1"
      className={className}
      width="100%"
      height="100%"
    />
  );
};

export default YoutubePlayer;
