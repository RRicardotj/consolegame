const keypress = require('keypress');

function Game(interface) {
  this.init = () => {
    keypress(process.stdin);

// listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
      const buttom = key.name;
  
      const movementKeys = [
        'up', 'down', 'left', 'right'
      ];

      if (movementKeys.includes(buttom)) {
        interface.interact(buttom);
      }

      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  };
}

module.exports = Game;
