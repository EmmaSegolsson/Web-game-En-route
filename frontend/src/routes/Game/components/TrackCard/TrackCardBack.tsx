import { FC } from "react";
import styled from "styled-components";
import BasicCard from "../BasicCard";

const BackCardWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

const Polygon2 = styled.polygon`
  fill: #ededed;
  stroke: #fff;
  stroke-miterlimit: 10;
  stroke-width: 2px;
`;

const Polygon5 = styled.polygon`
  stroke: #fff;
  stroke-miterlimit: 10;
  stroke-width: 2px;
  fill: url(#backCardPattern);
`;

const Rect2 = styled.rect`
  fill: #ededed;
  stroke: #fff;
  stroke-miterlimit: 10;
`;
const Rect3 = styled.rect`
  fill: #f5eae4;
`;
const Rect4 = styled.rect`
  stroke: #fff;
  stroke-miterlimit: 10;
  fill: #f5eae4;
  stroke-width: 2px;
`;

const Text6 = styled.text`
  isolation: isolate;
  font-size: 29px;
  fill: #656564;
  font-family: AmaticSC-Bold, Amatic SC;
  font-weight: 700;
`;

const Wrapper = styled.g`
  clip-path: url(#backCard_clipPath_1);
`;

type TrackCardBackProps = {
  style?: React.CSSProperties;
};
const TrackCardBack: FC<TrackCardBackProps> = ({ style = {} }) => {
  return (
    <BasicCard style={style} rotate={true} hoverable interactable raised>
      <BackCardWrapper
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 255.12 170.08"
      >
        <pattern
          id="backCardPattern"
          data-name="backCardPattern"
          width="53.86"
          height="56.69"
          patternUnits="userSpaceOnUse"
          // viewBox="0 0 53.86 56.69"
        >
          <g>
            <Polygon2 points="52.64 0.12 39.89 -12.62 27.14 0.12 39.89 12.87 52.64 0.12" />
            <Polygon2 points="66.59 13.85 53.85 1.1 41.1 13.85 53.85 26.6 66.59 13.85" />
          </g>
          <g>
            <Polygon2 points="12.73 13.85 -0.01 1.1 -12.76 13.85 -0.01 26.6 12.73 13.85" />
            <Polygon2 points="26.71 -0.13 13.97 -12.88 1.22 -0.13 13.97 12.62 26.71 -0.13" />
          </g>
          <Polygon2 points="79.57 28.47 66.82 15.72 54.07 28.47 66.82 41.22 79.57 28.47" />
          <g>
            <Polygon2 points="25.71 28.47 12.96 15.72 0.22 28.47 12.96 41.22 25.71 28.47" />
            <Polygon2 points="39.69 14.49 26.94 1.74 14.19 14.49 26.94 27.24 39.69 14.49" />
            <Polygon2 points="39.66 42.19 26.92 29.45 14.17 42.19 26.92 54.94 39.66 42.19" />
            <Polygon2 points="53.64 28.22 40.9 15.47 28.15 28.22 40.9 40.96 53.64 28.22" />
          </g>
          <Polygon2 points="-0.22 28.22 -12.96 15.47 -25.71 28.22 -12.96 40.96 -0.22 28.22" />
          <g>
            <Polygon2 points="52.64 56.82 39.89 44.07 27.14 56.82 39.89 69.56 52.64 56.82" />
            <Polygon2 points="66.62 42.84 53.87 30.09 41.12 42.84 53.87 55.58 66.62 42.84" />
          </g>
          <g>
            <Polygon2 points="12.76 42.84 0.01 30.09 -12.73 42.84 0.01 55.58 12.76 42.84" />
            <Polygon2 points="26.71 56.56 13.97 43.81 1.22 56.56 13.97 69.31 26.71 56.56" />
          </g>
        </pattern>
        <Wrapper>
          <Rect3 x="13.41" y="14.24" width="228.31" height="141.59" />
          <Rect4 x="25.41" y="24.23" width="205.5" height="121.6" />
          <Polygon5 points="31.33 29.73 225 29.73 225 140.33 31.33 140.33 31.33 29.73" />
          <Rect3 x="31.34" y="41.17" width="193.66" height="34.98" />
          <Text6 transform="translate(44.59 69.57) scale(1.88 1)">
            Track cards
          </Text6>
        </Wrapper>
      </BackCardWrapper>
    </BasicCard>
  );
};

export default TrackCardBack;
