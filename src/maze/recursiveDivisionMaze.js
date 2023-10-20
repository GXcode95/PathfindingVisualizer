const recursiveDivisionMaze = (grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) => {
  
  const walls = []
  function recursiveDivision(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
    if (rowEnd < rowStart || colEnd < colStart) {
      return;
    }
    const gridHeight = grid.length
    const gridWidth = grid[0].length  
    const nodes = getAllNodes(grid)
    

    // Fill the enclosure
    if (!surroundingWalls) {
      nodes.forEach(node => {
        if (node.isStart || node.isFinish)
          return
        
        let row = node.row
        let col = node.col
  
        if (row === 0 || col === 0 || row === gridHeight - 1 || col === gridWidth - 1) {
          node.isWall = true
          walls.push(node)
        }
      });
      surroundingWalls = true;
    }
  
    if (orientation === "horizontal") {

      let possibleRows = [];
      for (let number = rowStart; number <= rowEnd; number += 2) {
        possibleRows.push(number);
      }

      let possibleCols = [];
      for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
        possibleCols.push(number);
      }
  
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let currentRow = possibleRows[randomRowIndex];
      let colRandom = possibleCols[randomColIndex];
      
      
      nodes.forEach(node => {        
        const isCurrentRow     =  node.row === currentRow
        const isNotCurrentCol  =  node.col !== colRandom
        const rowIsInEnclosure =  node.col >= colStart - 1 && node.col <= colEnd + 1
        const nodeIsFree       =  !node.isStart && !node.isFinish && !node.isWall
        
        if (isCurrentRow && isNotCurrentCol && rowIsInEnclosure && nodeIsFree) {
          node.isWall = true
          walls.push(node)
        }
      });
  
      if (currentRow - 2 - rowStart > colEnd - colStart) {
        recursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
      } else {
        recursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls);
      }
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        recursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
      } else {
        recursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
      }
    } 
    else {
      let possibleCols = [];
      for (let number = colStart; number <= colEnd; number += 2) {
        possibleCols.push(number);
      }
      let possibleRows = [];
      for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
        possibleRows.push(number);
      }
  
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      let currentCol = possibleCols[randomColIndex];
      let rowRandom = possibleRows[randomRowIndex];
  
      nodes.forEach(node => {
        const isCurrCol = node.col === currentCol
        const isNotCurrentRow = node.row !== rowRandom
        const rowIsInEnclosure =  node.row >= rowStart - 1 && node.row <= rowEnd + 1
        const nodeIsFree = !node.isStart && !node.isFinish && !node.isWall
        if (isCurrCol && isNotCurrentRow && rowIsInEnclosure && nodeIsFree) {
          node.isWall = true
          walls.push(node)  
        }
      })
  
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        recursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls);
      } else {
        recursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
      }
      
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        recursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls);
      } else {
        recursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
      }
    }
  }

  recursiveDivision(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls)

  return walls
}

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  console.log("nodes",nodes)
  return nodes;
}

export default recursiveDivisionMaze
