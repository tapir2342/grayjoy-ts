import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

const app = new PIXI.Application({
	autoResize: true,
	// resolution: devicePixelRatio,
	backgroundColor: 0xFFFFFF
});
document.body.appendChild(app.view);

// load spine data
app.loader
	.add('spineboypro', 'spineboy-pro.json')
	.load(onAssetsLoaded);

app.stage.interactive = true;

var spineBoyPro;

function onAssetsLoaded(loader, res) {
	// create a spine boy
	spineBoyPro = new Spine(res.spineboypro.spineData);

	// set the position
	spineBoyPro.x = app.screen.width / 2;
	spineBoyPro.y = app.screen.height;

	spineBoyPro.scale.set(0.5);

	app.stage.addChild(spineBoyPro);

	const singleAnimations = ['aim', 'death', 'jump', 'portal'];
	const loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk'];
	const allAnimations = [].concat(singleAnimations, loopAnimations);

	let lastAnimation = '';

	// Press the screen to play a random animation
	app.stage.on('pointerdown', () => {
		let animation = '';
		do {
			animation = allAnimations[Math.floor(Math.random() * allAnimations.length)];
		} while (animation === lastAnimation);

		spineBoyPro.state.setAnimation(0, animation, loopAnimations.includes(animation));

		lastAnimation = animation;
	});
}

window.addEventListener('resize', resize);

// Resize function window
function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);
	if (spineBoyPro != null) {
		spineBoyPro.x = app.screen.width / 2;
		spineBoyPro.y = app.screen.height;
	}
}

resize();
