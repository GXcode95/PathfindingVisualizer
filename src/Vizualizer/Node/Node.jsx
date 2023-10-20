/* eslint-disable react/prop-types */
import './Node.css';
const Node = ({col, row, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, onClick, isVisited, isShortestPath}) => {
  
  return (
    <div
      id={`node-${row}-${col}`}
      className={`
        node
        ${isFinish? 'node-finish' : ''}
        ${isStart ? 'node-start' : ''}
        ${isWall ? 'node-wall' : ''}
        ${isShortestPath ? 'node-shortest-path' : ''}
        ${isVisited ? 'node-visited' : ''}`
      }
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()} 
      onClick={onClick}
    ></div>
  )
}

export default Node