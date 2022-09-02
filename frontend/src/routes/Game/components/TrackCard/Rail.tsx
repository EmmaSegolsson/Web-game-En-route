import { FC } from "react";

type RailProps = {
  color: string;
  rotate: boolean;
};
const Rail: FC<RailProps> = ({ color, rotate }) => {
  if (color === "bridge") {
    return (
      <path
        fill="#3e4341"
        d={
          rotate
            ? "M107.77,91.86l0-12.62a42.39,42.39,0,0,1-8.18-4.87l0,17.51,8.16,0m-8.12,16.35-8.16,0,0-8.16-8.16,0,0-8.17,8.16,0-.08-28.58,8.17,0,0,5.84A44.18,44.18,0,0,0,156.7,69V63.15l8.16,0,.08,28.57,8.16,0,0,8.17-8.17,0,0,8.16-8.16,0,0-8.17L99.63,100l0,8.17m48.91-29.07,0,12.61,8.16,0,0-17.52a41.8,41.8,0,0,1-8.15,4.93m-4,12.62,0-10.94A50.15,50.15,0,0,1,136.33,83l0,8.82,8.17,0m-12.25,0,0-8.33-4.08.18-4.08-.16,0,8.33,8.17,0m-12.25,0L120,83a49.66,49.66,0,0,1-8.17-2.1l0,10.94Z"
            : "M91.72,148.48l-12.62,0a41.89,41.89,0,0,1-4.87,8.18l17.51,0,0-8.17m16.35,8.12,0,8.17-8.16,0,0,8.17-8.17,0,0-8.17-28.57.08,0-8.17H69a44.16,44.16,0,0,0-.15-57.16l-5.84,0,0-8.16,28.57-.08,0-8.16,8.17,0,0,8.17,8.16,0,0,8.17-8.17,0,.16,57.15,8.16,0M79,107.69l12.61,0,0-8.17-17.52.05A42.4,42.4,0,0,1,79,107.69m12.62,4-10.94,0a49.64,49.64,0,0,1,2.15,8.16l8.81,0,0-8.17m0,12.25-8.33,0,.18,4.08-.15,4.09,8.33,0,0-8.16m0,12.25-8.82,0a49.92,49.92,0,0,1-2.1,8.17l10.94,0Z"
        }
      />
    );
  }
  if (rotate) {
    return (
      <g>
        <g>
          <rect
            fill={color}
            x="82.47"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(172.05 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="78.72"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(171.49 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="78.99"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(172.05 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="82.47"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(172.05 172.77) rotate(180)"
          />
          <rect fill={color} x="82.47" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="78.72" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="78.72" y="74.3" width="14.06" height="1.74" />
        </g>
        <g>
          <rect
            fill={color}
            x="110.59"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(228.28 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="106.83"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(227.72 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="107.11"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(228.28 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="110.59"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(228.28 172.77) rotate(180)"
          />
          <rect fill={color} x="110.59" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="106.83" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="106.83" y="74.3" width="14.06" height="1.74" />
        </g>
        <g>
          <rect
            fill={color}
            x="96.53"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(200.16 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="92.78"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(199.61 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="93.05"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(200.16 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="96.53"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(200.16 172.77) rotate(180)"
          />
          <rect fill={color} x="96.53" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="92.78" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="92.78" y="74.3" width="14.06" height="1.74" />
        </g>
        <g>
          <rect
            fill={color}
            x="138.7"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(284.51 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="134.95"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(283.96 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="135.23"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(284.51 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="138.7"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(284.51 172.77) rotate(180)"
          />
          <rect fill={color} x="138.7" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="134.95" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="134.95" y="74.3" width="14.06" height="1.74" />
        </g>
        <g>
          <rect
            fill={color}
            x="124.65"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(256.39 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="120.89"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(255.84 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="121.17"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(256.39 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="124.65"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(256.39 172.77) rotate(180)"
          />
          <rect fill={color} x="124.65" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="120.89" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="120.89" y="74.3" width="14.06" height="1.74" />
        </g>
        <g>
          <rect
            fill={color}
            x="166.82"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(340.74 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="163.07"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(340.19 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="163.34"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(340.74 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="166.82"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(340.74 172.77) rotate(180)"
          />
          <rect fill={color} x="166.82" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="163.07" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="163.07" y="74.3" width="14.06" height="1.74" />
        </g>
        <g>
          <rect
            fill={color}
            x="152.76"
            y="100.88"
            width="7.1"
            height="9.12"
            transform="translate(312.63 210.87) rotate(180)"
          />
          <rect
            fill={color}
            x="149.01"
            y="100.88"
            width="14.06"
            height="1.74"
            transform="translate(312.07 203.5) rotate(180)"
          />
          <rect
            fill={color}
            x="149.28"
            y="96.72"
            width="14.06"
            height="1.74"
            transform="translate(312.63 195.19) rotate(180)"
          />
          <rect
            fill={color}
            x="152.76"
            y="74.3"
            width="7.1"
            height="24.17"
            transform="translate(312.63 172.77) rotate(180)"
          />
          <rect fill={color} x="152.76" y="61.64" width="7.1" height="10.37" />
          <rect fill={color} x="149.01" y="70.27" width="14.06" height="1.74" />
          <rect fill={color} x="149.01" y="74.3" width="14.06" height="1.74" />
        </g>
      </g>
    );
  }
  return (
    <g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="81.6"
          width="7.1"
          height="9.12"
          transform="translate(-20.16 152.16) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="85.01"
          width="14.06"
          height="1.74"
          transform="translate(-16.2 155.57) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="85.29"
          width="14.06"
          height="1.74"
          transform="translate(-12.32 160) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="74.08"
          width="7.1"
          height="24.17"
          transform="translate(-1.11 171.21) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="80.98"
          width="7.1"
          height="10.37"
          transform="translate(190.77 -18.45) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="85.01"
          width="14.06"
          height="1.74"
          transform="translate(186.18 -14.41) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="85.01"
          width="14.06"
          height="1.74"
          transform="translate(182.15 -10.38) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="109.72"
          width="7.1"
          height="9.12"
          transform="translate(-48.28 180.28) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="113.13"
          width="14.06"
          height="1.74"
          transform="translate(-44.31 183.69) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="113.41"
          width="14.06"
          height="1.74"
          transform="translate(-40.44 188.12) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="102.19"
          width="7.1"
          height="24.17"
          transform="translate(-29.22 199.33) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="109.09"
          width="7.1"
          height="10.37"
          transform="translate(218.89 9.67) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="113.13"
          width="14.06"
          height="1.74"
          transform="translate(214.3 13.7) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="113.13"
          width="14.06"
          height="1.74"
          transform="translate(210.27 17.74) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="95.66"
          width="7.1"
          height="9.12"
          transform="translate(-34.22 166.22) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="99.07"
          width="14.06"
          height="1.74"
          transform="translate(-30.26 169.63) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="99.35"
          width="14.06"
          height="1.74"
          transform="translate(-26.38 174.06) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="88.14"
          width="7.1"
          height="24.17"
          transform="translate(-15.17 185.27) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="95.03"
          width="7.1"
          height="10.37"
          transform="translate(204.83 -4.39) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="99.07"
          width="14.06"
          height="1.74"
          transform="translate(200.24 -0.35) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="99.07"
          width="14.06"
          height="1.74"
          transform="translate(196.21 3.68) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="137.84"
          width="7.1"
          height="9.12"
          transform="translate(-76.39 208.39) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="141.25"
          width="14.06"
          height="1.74"
          transform="translate(-72.43 211.8) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="141.52"
          width="14.06"
          height="1.74"
          transform="translate(-68.55 216.24) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="130.31"
          width="7.1"
          height="24.17"
          transform="translate(-57.34 227.45) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="137.21"
          width="7.1"
          height="10.37"
          transform="translate(247.01 37.78) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="141.25"
          width="14.06"
          height="1.74"
          transform="translate(242.41 41.82) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="141.25"
          width="14.06"
          height="1.74"
          transform="translate(238.38 45.85) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="123.78"
          width="7.1"
          height="9.12"
          transform="translate(-62.34 194.34) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="127.19"
          width="14.06"
          height="1.74"
          transform="translate(-58.37 197.75) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="127.46"
          width="14.06"
          height="1.74"
          transform="translate(-54.49 202.18) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="116.25"
          width="7.1"
          height="24.17"
          transform="translate(-43.28 213.39) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="123.15"
          width="7.1"
          height="10.37"
          transform="translate(232.95 23.72) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="127.19"
          width="14.06"
          height="1.74"
          transform="translate(228.36 27.76) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="127.19"
          width="14.06"
          height="1.74"
          transform="translate(224.32 31.79) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="165.95"
          width="7.1"
          height="9.12"
          transform="translate(-104.51 236.51) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="169.36"
          width="14.06"
          height="1.74"
          transform="translate(-100.55 239.92) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="169.64"
          width="14.06"
          height="1.74"
          transform="translate(-96.67 244.35) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="158.43"
          width="7.1"
          height="24.17"
          transform="translate(-85.46 255.56) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="165.32"
          width="7.1"
          height="10.37"
          transform="translate(275.12 65.9) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="169.36"
          width="14.06"
          height="1.74"
          transform="translate(270.53 69.94) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="169.36"
          width="14.06"
          height="1.74"
          transform="translate(266.5 73.97) rotate(90)"
        />
      </g>
      <g>
        <rect
          fill={color}
          x="62.45"
          y="151.89"
          width="7.1"
          height="9.12"
          transform="translate(-90.45 222.45) rotate(-90)"
        />
        <rect
          fill={color}
          x="62.66"
          y="155.3"
          width="14.06"
          height="1.74"
          transform="translate(-86.49 225.86) rotate(-90)"
        />
        <rect
          fill={color}
          x="66.81"
          y="155.58"
          width="14.06"
          height="1.74"
          transform="translate(-82.61 230.29) rotate(-90)"
        />
        <rect
          fill={color}
          x="81.5"
          y="144.37"
          width="7.1"
          height="24.17"
          transform="translate(-71.4 241.51) rotate(-90)"
        />
        <rect
          fill={color}
          x="101.06"
          y="151.27"
          width="7.1"
          height="10.37"
          transform="translate(261.06 51.84) rotate(90)"
        />
        <rect
          fill={color}
          x="93.27"
          y="155.3"
          width="14.06"
          height="1.74"
          transform="translate(256.47 55.88) rotate(90)"
        />
        <rect
          fill={color}
          x="89.24"
          y="155.3"
          width="14.06"
          height="1.74"
          transform="translate(252.44 59.91) rotate(90)"
        />
      </g>
    </g>
  );
};

export default Rail;
