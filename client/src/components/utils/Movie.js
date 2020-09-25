import React from "react";
import { Card } from "antd";

const { Meta } = Card;

function Movie({ title, image, subtitle, onClick }) {
  return (
    <div onClick={onClick}>
      <Card
        hoverable
        style={{ height: "100%" }}
        cover={<img alt={subtitle || title} src={image} />}
      >
        <Meta title={subtitle || title} />
      </Card>
    </div>
  );
}

export default Movie;
