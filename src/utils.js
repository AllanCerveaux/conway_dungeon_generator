export const $ = (str) => document.querySelector(str)

export const getRandomInt = (max) => Math.floor(Math.random() * (Math.floor(max) - 0)) + 0;

export const initializeBoard = (width, height, config = {}) => {
    const { random } = config;
    const cells = [];
    for (let y = 0; y < height; y++) {
        cells[y] = [];
        for (let x = 0; x < width; x++) {
            cells[y][x] = {
                alive: random ? Math.random() > 0.5 : false,
            };
        }
    }
    return { cells };
};



export const checkNeighborIsAlive = (board, x, y) => checkAlives(board, [
    [x - 1, y],
    [x, y - 1],
    [x + 1, y],
    [x, y + 1]
])

export const checkAlives = (board, indices) =>
	indices
		.filter(([xIndex, yIndex]) =>
			Math.min(xIndex, yIndex) >= 0 &&
			xIndex < board.cells[0].length &&
			yIndex < board.cells.length,
		)
		.map(([xIndex, yIndex]) => ({ x: xIndex, y: yIndex }))
		.map(target => {
			if(!board.cells[target.y][target.x].target){
				if(!board.cells[target.y][target.x].startRoom) board.cells[target.y][target.x].target = true;
					return {
						alive: board.cells[target.y][target.x].alive,
						x: target.x,
						y: target.y
					}
				}
		})
		.filter(cell => cell !== undefined && cell.alive)
		.map(({x, y}) => checkNeighborIsAlive(board, x, y))