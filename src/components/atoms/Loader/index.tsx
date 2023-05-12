import React from "react";
import { Oval } from "react-loader-spinner";
import LoaderContainer from "./Loader.style";

export interface LoaderCSSProps {
  bgColor?: string;
}

interface LoaderProps extends LoaderCSSProps {
  width?: number;
  height?: number;
}

function Loader({ width = 40, height = 40, bgColor }: LoaderProps) {
  return (
    <LoaderContainer bgColor={bgColor}>
      <Oval
        height={width}
        width={height}
        color="#037ef3"
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#037ef3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </LoaderContainer>
  );
}

export default Loader;
