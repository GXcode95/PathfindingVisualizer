import './Visualizer.css'
import { useEffect, useState } from 'react'
import { getNodesInShortestPathOrder, dijkstra } from '../pathfinders/dijkstra';
import Node from './Node/Node';
import { generateRandomMaze } from '../maze/randomMaze';
import recursiveDivisionMaze from '../maze/recursiveDivisionMaze';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const SPEED = 1;

const  Visualizer = () => {
  const [grid, setGrid] = useState([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  // ********** Constructors  **********
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
      isShortestPath: false
    }
  }
  
  // ********** Dijkstra  **********
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      const allNodeVisited = i === visitedNodesInOrder.length
      if (allNodeVisited) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, SPEED * i)
    
        return
      }
    
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const newGrid = newGridWithVisitedTrue(grid, node.row, node.col)
        
        setGrid(newGrid)
      }, SPEED * i)
    }
  }
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const newGrid = newGridWithShortestPathTrue(grid, node.row, node.col)
        
        setGrid(newGrid)
      }, SPEED * 5 * i)
    }
  }
  const visualizeDijkstra = () => {
    const newGrid = structuredClone(grid)
    const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // ********** NewGrid  **********
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
  const newGridWithVisitedTrue = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
      ...node,
      isVisited: !node.isVisited,
    }
    newGrid[row][col] = newNode
    
    return newGrid
  };
  const newGridWithShortestPathTrue = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
      ...node,
      isShortestPath: true,
    }
    newGrid[row][col] = newNode
    
    return newGrid
  };

  // ********** Maze  **********
  const animateMaze = (walls) => {
    for (let i = 0; i <= walls.length - 1; i++) {
      setTimeout(() => {
        const node = walls[i]
        const newGrid = newGridWithWallToggled(grid, node.row, node.col)

        setGrid(newGrid)
      }, SPEED * i)
    }
  }
  const vizualizeRandomMaze = () => {
    const newGrid = structuredClone(grid)
    const walls = generateRandomMaze(newGrid);
    
    animateMaze(walls)
  }
  const vizualizeRecursiveDivisionMaze = () => {
    const newGrid = structuredClone(grid)
    const gridHeight = newGrid.length
    const gridWidth = newGrid[0].length
    const walls = recursiveDivisionMaze(newGrid,  2, gridHeight - 3, 2, gridWidth - 3, "horizontal", false);
    
    animateMaze(walls)
  }

  // ********** EventHandlers  **********
  const handleClick = (row, col) => {
    const newGrid = newGridWithWallToggled(grid, row, col)

    setGrid(newGrid)
  }
  const handleMouseDown = () => {
    console.log("mousedown")  
    setMouseIsPressed(true)
  }
  const handleMouseUp = () => {
    console.log("mouseup")
    setMouseIsPressed(false)
  }
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed)
      return
    
    const newGrid = newGridWithWallToggled(grid, row, col)

    setGrid(newGrid)
  }


  // ********** UseEffects  **********
  useEffect(() => {
    setGrid(getInitialGrid())
  }, [])

  return (
    <>
       <button onClick={visualizeDijkstra}>
          Start Dijkstra
        </button>
        <button onClick={vizualizeRandomMaze}>
          Random Maze
        </button>
        <button onClick={vizualizeRecursiveDivisionMaze}>
          Recursive Division Maze
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isVisited, isWall, isShortestPath} = node;
                  
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isVisited={isVisited}
                      isShortestPath={isShortestPath}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseUp={handleMouseUp}
                      onClick={() => handleClick(row, col)}
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
