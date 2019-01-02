export default class Tile {
	protected image: Promise<HTMLImageElement>;
	constructor(
		public readonly fileName: string,
		public readonly position: [number, number]
	) {
		this.image = new Promise<HTMLImageElement>((resolve, reject) => {
			const image: HTMLImageElement = document.createElement('img')
			image.onload = () => resolve(image)
			image.src = `sprites/${this.fileName}`;
		})
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.image.then(image => ctx.drawImage(image, 0, 0, 16, 16))
	}

}