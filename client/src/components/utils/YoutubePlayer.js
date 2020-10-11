import React, { useEffect, useState } from "react";

const YoutubePlayer = ({ src, title, className }) => {
  const [Width, setWidth] = useState(500);
  const [Height, setHeight] = useState(400);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setWidth(500);
      setHeight(400);
    } else {
      setWidth(300);
      setHeight(200);
    }
  }, [window.innerWidth]);

  if (!src) {
    return <div>Loading...</div>;
  }

  console.log(Width, Height);

  return (
    <iframe
      title={title}
      id="ytplayer"
      type="text/html"
      src={src}
      allowFullScreen="1"
      className={className}
      width={Width}
      height={Height}
    />
  );
};

export default YoutubePlayer;
