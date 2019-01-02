import WallTile from "./WallTile";

export default class Map {
	layout: number[][]
	constructor() {
		this.layout = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 0, 1, 0, 1, 1, 1],
			[0, 0, 1, 0, 0, 0, 1, 0]
		]
	}
	generateTiles(): WallTile[] {
		const tiles: WallTile[] = []
		this.layout.forEach((row, rowIndex) => {
			row.forEach((self, columnIndex) => {
				const wallTile = new WallTile('Wall-Sheet.png', [columnIndex, rowIndex])
				const northRow = this.layout[rowIndex - 1] || []
				const southRow = this.layout[rowIndex + 1] || []
				wallTile.getSprite([
					Boolean(northRow[columnIndex-1]), Boolean(northRow[columnIndex]), Boolean(northRow[columnIndex + 1]),
					Boolean(row[columnIndex-1]), Boolean(self), Boolean(row[columnIndex + 1]),
					Boolean(southRow[columnIndex-1]), Boolean(southRow[columnIndex]), Boolean(southRow[columnIndex + 1])
				])
				tiles.push(wallTile)
			})
		})

		return tiles
	}
}