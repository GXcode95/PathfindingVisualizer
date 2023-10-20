/* eslint-disable react/prop-types */
import './Node.css';
const Node = ({col, row, isFinish, isStart}) => {
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${isFinish && 'node-finish'} ${isStart && 'node-start'}`}
    ></div>
  )
}

export default Node