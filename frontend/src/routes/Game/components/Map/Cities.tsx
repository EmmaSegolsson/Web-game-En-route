import { FC } from "react";
import styled from "styled-components";

const CityCircle = styled.circle`
  fill: #f39b37;
  stroke: #000;
  stroke-miterlimit: 10;
`;

const CityText = styled.text`
  font-size: 27px;
  font-family: Amatic SC;
  font-weight: 700;
  letter-spacing: 0.03em;
  user-select: none;
  cursor: default;
`;

const Cities: FC = () => {
  return (
    <g id="cities">
      <g id="edinburgh">
        <CityCircle cx="325.1019" cy="81.3288" r="11.75" />
        <CityText transform="translate(249.4492 65.3237)">Edinburgh</CityText>
      </g>
      <g id="warszawa">
        <CityCircle cx="1249.063" cy="341.1658" r="11.75" />
        <CityText transform="translate(1288.1982 348.6733)">Warszawa</CityText>
      </g>
      <g id="gdansk">
        <CityCircle cx="1160.7589" cy="233.9812" r="11.75" />
        <g>
          <CityText transform="translate(1096.8896 267.9253)">Gdansk</CityText>
          <CityText transform="translate(1128.6924 264.6118)">´</CityText>
        </g>
      </g>
      <g id="copenhagen">
        <CityCircle cx="901.7589" cy="167.9812" r="11.75" />
        <CityText transform="translate(919.335 199.9648)">Copenhagen</CityText>
      </g>
      <g id="stockholm">
        <CityCircle cx="1090.0085" cy="50.7313" r="11.75" />
        <CityText transform="translate(935.6162 43.3579)">Stockholm</CityText>
      </g>
      <g id="riga">
        <CityCircle cx="1311.0085" cy="94.7313" r="11.75" />
        <CityText transform="translate(1328.6436 131.7324)">Riga</CityText>
      </g>
      <g id="moscow">
        <CityCircle cx="1619.2795" cy="87.2857" r="11.75" />
        <CityText transform="translate(1632.7217 75.7695)">Moscow</CityText>
      </g>
      <g id="voronezh">
        <CityCircle cx="1796.9753" cy="271.22" r="11.75" />
        <CityText transform="translate(1693.2734 270.9424)">Voronezh</CityText>
      </g>
      <g id="kharkiv">
        <CityCircle cx="1769.1709" cy="503.2953" r="11.75" />
        <CityText transform="translate(1692.7881 492.9888)">Kharkiv</CityText>
      </g>
      <g id="smolensk">
        <CityCircle cx="1640.9753" cy="309.22" r="11.75" />
        <CityText transform="translate(1543.29 334.6919)">Smolensk</CityText>
      </g>
      <g id="rostov">
        <CityCircle cx="1843.1709" cy="586.2953" r="11.75" />
        <CityText transform="translate(1769.5049 615.4766)">Rostov</CityText>
      </g>
      <g id="kyiv">
        <CityCircle cx="1524.9753" cy="424.22" r="11.75" />
        <CityText transform="translate(1544.1533 409.0513)">Kyiv</CityText>
      </g>
      <g id="vilnius">
        <CityCircle cx="1454.9753" cy="303.22" r="11.75" />
        <CityText transform="translate(1397.9395 338.1968)">Vilnius</CityText>
      </g>
      <g id="sochi">
        <CityCircle cx="1834.1709" cy="724.2953" r="11.75" />
        <CityText transform="translate(1768.6152 753.4795)">Sochi</CityText>
      </g>
      <g id="sevastopol">
        <CityCircle cx="1672.1709" cy="700.2953" r="11.75" />
        <CityText transform="translate(1556.7588 710.3867)">
          Sevastopol
        </CityText>
      </g>
      <g id="erzurum">
        <CityCircle cx="1799.0517" cy="918.9796" r="11.75" />
        <CityText transform="translate(1712.5498 942.501)">Erzurum</CityText>
      </g>
      <g id="ankara">
        <CityCircle cx="1654.0517" cy="952.9796" r="11.75" />
        <CityText transform="translate(1553.7305 965.2783)">Ankara</CityText>
      </g>
      <g id="izmir">
        <CityCircle cx="1432.0517" cy="992.9796" r="11.75" />
        <CityText transform="translate(1465.9229 983.0801)">İzmir</CityText>
      </g>
      <g id="athens">
        <CityCircle cx="1276.8128" cy="954.3383" r="11.75" />
        <CityText transform="translate(1290.3613 939.2764)">Athens</CityText>
      </g>
      <g id="istanbul">
        <CityCircle cx="1513.0517" cy="869.9796" r="11.75" />
        <CityText transform="translate(1546.79 874.7754)">Istanbul</CityText>
      </g>
      <g id="sofia">
        <CityCircle cx="1309.5195" cy="776.0127" r="11.75" />
        <CityText transform="translate(1293.5977 824.46)">Sofia</CityText>
      </g>
      <g id="bucharest">
        <CityCircle cx="1419.5195" cy="679.0127" r="11.75" />
        <CityText transform="translate(1447.7227 701.1299)">Bucharest</CityText>
      </g>
      <g id="budapest">
        <CityCircle cx="1143.5195" cy="570.0127" r="11.75" />
        <CityText transform="translate(1177.1113 564.3965)">Budapest</CityText>
      </g>
      <g id="vienna">
        <CityCircle cx="1056.9882" cy="534.1764" r="11.75" />
        <CityText transform="translate(957.7061 524.6196)">Vienna</CityText>
      </g>
      <g id="sarajevo">
        <CityCircle cx="1186.5195" cy="764.0127" r="11.75" />
        <CityText transform="translate(1090.71 755.6553)">Sarajevo</CityText>
      </g>
      <g id="zagreb">
        <CityCircle cx="1032.9882" cy="674.1764" r="11.75" />
        <CityText transform="translate(1050.4902 699.3486)">Zagreb</CityText>
      </g>
      <g id="venice">
        <CityCircle cx="878.9882" cy="656.1764" r="11.75" />
        <CityText transform="translate(897.2471 679.833)">Venice</CityText>
      </g>
      <g id="bari">
        <CityCircle cx="1049.5195" cy="833.0127" r="11.75" />
        <CityText transform="translate(1051.1299 817.0068)">Bari</CityText>
      </g>
      <g id="palermo">
        <CityCircle cx="961.0742" cy="997.447" r="11.75" />
        <CityText transform="translate(876.0796 1005.916)">Palermo</CityText>
      </g>
      <g id="rome">
        <CityCircle cx="893.5195" cy="793.0127" r="11.75" />
        <CityText transform="translate(833.978 817.3896)">Rome</CityText>
      </g>
      <g id="marseille">
        <CityText transform="translate(663.5259 785.4746)">Marseille</CityText>
        <CityCircle cx="677.5094" cy="749.9257" r="11.75" />
      </g>
      <g id="zurich">
        <CityCircle cx="727.9882" cy="606.1764" r="11.75" />
        <CityText transform="translate(669.6284 591.9766)">Zürich</CityText>
      </g>
      <g id="paris">
        <CityCircle cx="517.5864" cy="519.6763" r="11.75" />
        <CityText transform="translate(423.6641 546.127)">Paris</CityText>
      </g>
      <g id="brest">
        <CityCircle cx="263.75" cy="495.75" r="11.75" />
        <CityText transform="translate(206.2314 504.3716)">Brest</CityText>
      </g>
      <g id="le_havre">
        <CityCircle cx="427.5864" cy="451.6763" r="11.75" />
        <CityText transform="translate(366.7866 487.1943)">Le Havre</CityText>
      </g>
      <g id="brussels">
        <CityCircle cx="580.5864" cy="390.6763" r="11.75" />
        <CityText transform="translate(509.1758 374.5249)">Brussels</CityText>
      </g>
      <g id="amsterdam">
        <CityCircle cx="622.5864" cy="317.6763" r="11.75" />
        <CityText transform="translate(511.6333 297.1533)">Amsterdam</CityText>
      </g>
      <g id="london">
        <CityCircle cx="446.5864" cy="311.6763" r="11.75" />
        <CityText transform="translate(345.3765 325.4424)">London</CityText>
      </g>
      <g id="pamplona">
        <CityCircle cx="400.0101" cy="757.7953" r="11.75" />
        <CityText transform="translate(294.4438 738.1309)">Pamplona</CityText>
      </g>
      <g id="barcelona">
        <CityCircle cx="421.3799" cy="897.1645" r="11.75" />
        <CityText transform="translate(386.2725 933.5264)">Barcelona</CityText>
      </g>
      <g id="madrid">
        <CityCircle cx="217.3799" cy="882.1645" r="11.75" />
        <CityText transform="translate(144.7661 898.873)">Madrid</CityText>
      </g>
      <g id="lisbon">
        <CityCircle cx="96.3799" cy="916.1645" r="11.75" />
        <CityText transform="translate(110.4678 923.0498)">Lisbon</CityText>
      </g>
      <g id="malaga">
        <CityCircle cx="217.3799" cy="996.1645" r="11.75" />
        <CityText transform="translate(193.3438 977.5059)">Málaga</CityText>
      </g>
      <g id="munich">
        <CityCircle cx="849.9882" cy="507.1764" r="11.75" />
        <CityText transform="translate(867.5059 509.231)">Munich</CityText>
      </g>
      <g id="frankfurt">
        <CityCircle cx="742.5864" cy="439.6763" r="11.75" />
        <CityText transform="translate(609.1182 447.769)">Frankfurt</CityText>
      </g>
      <g id="berlin">
        <CityCircle cx="952.9882" cy="355.1764" r="11.75" />
        <CityText transform="translate(889.5669 318.8071)">Berlin</CityText>
      </g>
      <g id="bremen">
        <CityCircle cx="770.5864" cy="331.6763" r="11.75" />
        <CityText transform="translate(713.9248 367.7534)">Bremen</CityText>
      </g>
    </g>
  );
};

export default Cities;
