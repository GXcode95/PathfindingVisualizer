import { useEffect, useState } from 'react'
import './App.css'
import { getNodesInShortestPathOrder, dijkstra } from './pathfinders/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function App() {
  const [grid, setGrid] = useState([])

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
  };

  const execDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log("visited nodes in order:", visitedNodesInOrder)

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    console.log("Node in shortest path:", nodesInShortestPathOrder)
  }

  const showGrid = () => {
    console.log(grid)
  }

  useEffect(() => {
    console.log("setGrid")
    setGrid(getInitialGrid())
  }, [])

  return (
    <>
      <button onClick={showGrid}>Grid</button>
      <button onClick={execDijkstra}>Start !</button>
    </>
  )
}

export default App
