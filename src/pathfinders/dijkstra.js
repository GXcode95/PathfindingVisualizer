// HOW IT WORKS 
// All node have a distance of Infinity 
// We start by giving the first node a distance from 0
// while we didn't reached a dead-end or the finishNode
  // We get the node with closest distance (0 for the start)
  // We ignore it if it's a wall
  // We set this node as visited
  // We sore it in visitedNodes
  // We set distance of neighbors node as currNode.distance + 1
// When we reached a dead end or finish node we return the visitedNodes

export const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
 
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    
    if (closestNode.isWall)
      continue;

    const pathIsDeadEnd = closestNode.distance === Infinity
    if (pathIsDeadEnd)
      return visitedNodesInOrder
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode)
      return visitedNodesInOrder;
    
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0)
    neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1)
    neighbors.push(grid[row + 1][col]);
  if (col > 0)
    neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1)
    neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
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


// Backtracks from the finishNode to find the shortest path.
export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}