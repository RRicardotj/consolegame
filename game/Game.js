const keypress = require('keypress');
const readLine = require('readline-sync');
const World = require('./World');
const worlds = require('./worlds');

function Game() {
  this.getCurrentWorld = () => {
    return worlds[this.currentLevel];
  }
  this.init = () => {
    let totalLevels = worlds.length;
    this.currentLevel = 0;

    this.world = new World(this.getCurrentWorld());
    console.log(this.world);
    // this.world.init();

    /*
    keypress(process.stdin);

// listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
      const buttom = key.name;
  
      const movementKeys = [
        'up', 'down', 'left', 'right'
      ];

      if (movementKeys.includes(buttom) && this.world) {
        // const nextPosition = getNexPoint(currentPosition, key.buttom);
        // move(currentPosition, nextPosition);

        const result = this.world.move(buttom);
        
        if (result.sucess && !result.continue) {
          this.currentLevel += 1;

          if (this.currentLevel === totalLevels) {
            console.clear();
            console.log(`
            ___oooo______oooo_______oooo____oooooo_______ooooooo__oo____oo_ooooooo_
            _oo____oo__oo____oo___oo____oo__oo____oo_____oo____oo_oo____oo_oo______
            oo________oo______oo_oo______oo_oo_____oo____oooooooo__oo__oo__oooo____
            oo____ooo_oo______oo_oo______oo_oo_____oo____oo____oo____oo____oo______
            _oo____oo__oo____oo___oo____oo__oo____oo_____oo____oo____oo____oo______
            ___oooo______oooo_______oooo____oooooo_______ooooooo_____oo____ooooooo_
            _______________________________________________________________________
            `);
            process.exit();
          }

          readLine.question('Press any key to continue');

          this.world = new World(this.getCurrentWorld());
          this.world.init();
        }
      }

      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    */
  };
}

module.exports = Game;
