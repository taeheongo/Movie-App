import React from "react";

export default (WrappedComponent, hotMovies) => {
  const hocComponent = ({ ...props }) => {
    console.log(props);
    return <WrappedComponent {...props} hotMovies={hotMovies} />;
  };

  return hocComponent;
};
