import State from "./State";
import Tile from "./Tile";


export default function drawState(state: State, ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

	const character = new Tile('Sprite-0002.png', [0, 0])
	character.draw(ctx)
}