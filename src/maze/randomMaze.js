export const generateRandomMaze = (grid) => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const walls = [];
  const wallProbability = 0.6;
  
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const node = grid[row][col];  
      const isWall = Math.random() > wallProbability
      if (!isWall || node.isStart || node.isFinish)
        continue
      
      node.isWall = true;
      walls.push(node)
    }
  }
  
  return walls;
};
