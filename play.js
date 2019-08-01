const worlds = require('./game/worlds');
const Game = require('./game/Game');
const Interface = require('./game/Interface');

const interface = new Interface(worlds);
interface.init();

const game = new Game(interface);
game.init();