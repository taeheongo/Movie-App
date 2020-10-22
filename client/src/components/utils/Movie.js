import React from "react";
import { Card } from "antd";

const { Meta } = Card;

function Movie({ title, image, subtitle }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Card
        style={{ width: "100%", height: "100%" }}
        hoverable
        cover={<img alt={subtitle || title} src={image} />}
      >
        <Meta title={subtitle || title} />
      </Card>
    </div>
  );
}

export default Movie;
