import Tile from "./Tile";

const TILESET_WIDTH = 16 * 3
const TILE_POSITION_IN_TILESET = [16, 16]

const TILE_SCALE = 5

function getNthTile(n: number): [number, number] {
	return [n * TILESET_WIDTH + TILE_POSITION_IN_TILESET[0], TILE_POSITION_IN_TILESET[1]]
}

export default class WallTile extends Tile {
	spriteCoordinates: [number, number] = [0, 0]; // coordinates of the tile on the sprite sheet
	neighborhood: boolean[] = []
	getSprite(neighborhood: boolean[]) {
		this.neighborhood = neighborhood
		const [nw, n, ne, w, self, e, sw, s, se] = neighborhood;

		// If it is a floor tile: draw blank
		if (!self) {
			this.spriteCoordinates = [0, 0]
			return
		}
		// If the ortogonal tiles are walls: draw blank
		if (n && e && s && w) {
			this.spriteCoordinates = [0, 0]
			return
		}
		// If this is the only wall in the neighborhood: draw a column
		if (neighborhood.filter(Boolean).length === 1) {
			this.spriteCoordinates = getNthTile(0)
			return
		}
		// Only neighbor is N: slim wall end
		if (neighborhood.filter(Boolean).length === 2 && n) {
			this.spriteCoordinates = getNthTile(1)
			return
		}
		// If there is a wall to the north other than straight north but nothing on the sides: wide wall end
		if (n && !w && !e && (ne || nw)) {
			this.spriteCoordinates = getNthTile(2)
			return
		}
		// Tile to north and to both sides
		if (n && w && e) {
			this.spriteCoordinates = getNthTile(3)
			return
		}
		// Tile to north and west but not east
		if (n && w && !e) {
			this.spriteCoordinates = getNthTile(6)
			return
		}
		// Tile to north and east but not west
		if (n && e && !w) {
			this.spriteCoordinates = getNthTile(7)
			return
		}
		// No tiles to north, slim wall. Both west and east
		if (!n && w && e) {
			this.spriteCoordinates = getNthTile(4)
			return
		}
		// No tiles to north, slim wall. West
		if (!n && w) {
			this.spriteCoordinates = getNthTile(5)
			return
		}
		// No tiles to north, slim wall. East
		if (!n && e) {
			this.spriteCoordinates = getNthTile(8)
			return
		}
		// South, no east or west
		if (s && !w && !e) {
			this.spriteCoordinates = getNthTile(9)
			return
		}
		// South, east
		if (s && !w && e) {
			this.spriteCoordinates = getNthTile(10)
			return
		}
		// South, west
		if (s && w && !e) {
			this.spriteCoordinates = getNthTile(11)
			return
		}
		// South, both west and east
		if (s && w && e) {
			this.spriteCoordinates = getNthTile(12)
			return
		}

		console.error('Sprite didnt match', neighborhood)
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.image.then(image => ctx.drawImage(
			image,
			this.spriteCoordinates[0], this.spriteCoordinates[1],
			16, 16,
			this.position[0] * 16 * TILE_SCALE, this.position[1] * 16 * TILE_SCALE,
			16 * TILE_SCALE, 16 * TILE_SCALE
			)
		)
	}

}