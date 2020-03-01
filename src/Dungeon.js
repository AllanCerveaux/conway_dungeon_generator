import {
		getRandomInt,
		initializeBoard,
		checkNeighborIsAlive,
		$
} from './utils';

export default class Dungeon 
{
	constructor({width, height}){
		this.width = width;
		this.height = height;
		this.startRoom;
		this.randY;
		this.randX;

		this.board = initializeBoard(this.width, this.height, { random: true })
		
		this.generate()
	}
	
	generate(){
		this.setStartRoom();
		const check = checkNeighborIsAlive(this.board, this.startRoom.x, this.startRoom.y)
	}

	setStartRoom(){
		this.randX = getRandomInt(this.height);
		this.randY = getRandomInt(this.width);
		this.startRoom = this.board.cells[this.randY][this.randX]

		do {
			this.randX = getRandomInt(this.height);
			this.randY = getRandomInt(this.width);
			this.startRoom = this.board.cells[this.randY][this.randX]
		}while(!this.startRoom.alive)
		
		this.startRoom.startRoom = true
		this.startRoom.x = this.randX
		this.startRoom.y = this.randY
	}

	drawToHtml(){
		let rowElm
		let cellElm
		
		const boardDisplay = document.createElement('div')
		
		$("body").append(boardDisplay)
		boardDisplay.classList.add('boardDisplay')

		this.board.cells.map((row, i) => {
			rowElm = document.createElement('div')
			rowElm.classList.add('row')
			boardDisplay.append(rowElm)
			
			row.map((cell, index) => {
				cellElm = document.createElement('div')
				cellElm.classList.add('cell')
				cellElm.innerHTML = index
	
				if(cell.startRoom) cellElm.classList.add('start')
				if(cell.alive){
					cellElm.classList.add('alive')
					if(cell.target) cellElm.classList.add('target')
				}
				else {
					cellElm.classList.add('die')
				}
				rowElm.append(cellElm)
			})
		})
	}
}