import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "./../../../../components/recharts";

import colors from "./../../../../colors";

const COLORS = [colors["primary"], colors["purple"], colors["success"], colors["yellow"]];

export const PieChartWithPaddingAngleHalf = (props) => {
  let data = props.data;
  if (props.data === undefined)
    data = [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
    ];
  return (
    <ResponsiveContainer width="100%" aspect={6.0 / 3.0} minHeight="7em">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={40}
          stroke={colors["white"]}
          outerRadius={60}
          startAngle={180}
          endAngle={0}
          fill="#8884d8"
          paddingAngle={1}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

PieChartWithPaddingAngleHalf.propTypes = {
  data: PropTypes.array,
};
