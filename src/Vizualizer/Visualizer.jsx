import './Visualizer.css'
import { useEffect, useState } from 'react'
import { getNodesInShortestPathOrder, dijkstra } from '../pathfinders/dijkstra';
import Node from './Node/Node';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const  Visualizer = () => {
  const [grid, setGrid] = useState([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row))
      }
      grid.push(currentRow)
    }
    return grid
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
      isWall: false,
    }
  }
  
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      const allNodeVisited = i === visitedNodesInOrder.length
      if (allNodeVisited) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i)
    
        return
      }
    
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited'
      }, 10 * i)
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path'
      }, 50 * i)
    }
  }
  
  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const newGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
      ...node,
      isWall: !node.isWall,
    }
    newGrid[row][col] = newNode
    
    return newGrid
  };

  
  const handleMouseDown = () => {
    console.log("mousedown")  
    setMouseIsPressed(true)
  }

  const handleMouseUp = () => {
    console.log("mouseup")
    setMouseIsPressed(false)
  }

  const handleMouseEnter = (row, col) => {
    console.log("mouseEnter")
    if (!mouseIsPressed)
      return
    
      console.log("mouseEnterPressed")
    const newGrid = newGridWithWallToggled(grid, row, col)
    console.log('newgrid', newGrid)
    setGrid(newGrid)
  }

  useEffect(() => {
    setGrid(getInitialGrid())
  }, [])

  return (
    <>
       <button onClick={() => visualizeDijkstra()}>
          Start
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseUp={handleMouseUp}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
    </>
  )
}

export default Visualizer
