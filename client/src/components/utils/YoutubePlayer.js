import React from "react";

const YoutubePlayer = ({ videoId, className, style, title }) => {
  if (videoId) {
    return <div>Loading...</div>;
  }

  return (
    <iframe
      title={title}
      id="ytplayer"
      type="text/html"
      style={style}
      className={className}
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen="1"
    />
  );
};

export default YoutubePlayer;
