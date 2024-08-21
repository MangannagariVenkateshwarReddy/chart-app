import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#f0f','#f00'];
const MyPieChart = (props) => {
  
    return (
      <PieChart  width={300}  height={200}>
        <Pie
          data={props.data[0]}
          cx={100}
          cy={100}
          innerRadius={30}
          outerRadius={60}
          paddingAngle={0}
          dataKey="value"
        >
          {props.data[0].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };
export {MyPieChart};