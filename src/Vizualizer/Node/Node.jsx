/* eslint-disable react/prop-types */
import './Node.css';
const Node = ({col, row, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp}) => {
  
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${isFinish? 'node-finish' : ''} ${isStart ? 'node-start' : ''} ${isWall ? 'node-wall' : ''}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()} 
    ></div>
  )
}

export default Node