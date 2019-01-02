import './style.css';
import drawState from './drawState';
import State from './State';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d');
if (!ctx) {
	throw new Error()
}

const startState = new State()

drawState(startState, ctx)

document.body.appendChild(canvas)

export default canvas