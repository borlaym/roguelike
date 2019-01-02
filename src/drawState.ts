import State from "./State";
import Tile from "./Tile";
import Map from "./Map";


export default function drawState(state: State, ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

	const map = new Map()
	const tiles = map.generateTiles()
	console.log(tiles)
	tiles.forEach(tile => tile.draw(ctx))
}