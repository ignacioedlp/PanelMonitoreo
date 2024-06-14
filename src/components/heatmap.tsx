import { ResponsiveTreeMap } from "@nivo/treemap";

const Heatmaps = ({ data }) => (
  <div style={{ height: 350 }}>
    <ResponsiveTreeMap
      data={data}
      identity="id"
      value="value"
      innerPadding={3}
      outerPadding={3}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      label="id"
      labelSkipSize={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={11}
    />
  </div>
);

export default Heatmaps;