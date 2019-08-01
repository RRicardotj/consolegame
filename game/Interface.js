const World = require('./World');

function Interface(worlds) {
  let isInit = false;
  this.currentWorld = null;
  this.Totallevels = 0;
  this.currentLevel = 0;
  this.levels = []

  this.init = () => {
    for (const world of worlds) {
      const level = new World(world);

      this.levels.push(level);
    }

    this.currentWorld = this.levels[0];

    console.log('INITIALIZING GAME');
    isInit = true;
    this.Totallevels = this.levels.length;
    this.currentWorld.init();
  }

  this.interact = (movement) => {
    if (isInit) {
      const result = this.currentWorld.move(movement);

      if (!result.continue) {
        isInit = false;

        if (result.success) {
          this.currentLevel += 1;

          if (this.currentLevel === this.Totallevels) {
            console.clear();
            console.log('\x1b[32m%s\x1b[0m',` 
            **    **   *******   **     **       **       ** ** ****     **       ** ** **
            //**  **   **/////** /**    /**      /**      /**/**/**/**   /**      /**/**/**
             //****   **     //**/**    /**      /**   *  /**/**/**//**  /**      /**/**/**
              //**   /**      /**/**    /**      /**  *** /**/**/** //** /**      /**/**/**
               /**   /**      /**/**    /**      /** **/**/**/**/**  //**/**      /**/**/**
               /**   //**     ** /**    /**      /**** //****/**/**   //****      // // // 
               /**    //*******  //*******       /**/   ///**/**/**    //***       ** ** **
               //      ///////    ///////        //       // // //      ///       // // // `);
            process.exit();
          } else {
            console.clear();
            console.log(`
            __    _  _______  __   __  _______    ___      _______  __   __  _______  ___     
            |  |  | ||       ||  |_|  ||       |  |   |    |       ||  | |  ||       ||   |    
            |   |_| ||    ___||       ||_     _|  |   |    |    ___||  |_|  ||    ___||   |    
            |       ||   |___ |       |  |   |    |   |    |   |___ |       ||   |___ |   |    
            |  _    ||    ___| |     |   |   |    |   |___ |    ___||       ||    ___||   |___ 
            | | |   ||   |___ |   _   |  |   |    |       ||   |___  |     | |   |___ |       |
            |_|  |__||_______||__| |__|  |___|    |_______||_______|  |___|  |_______||_______|
            `);

            setTimeout(() => {
              this.currentWorld = this.levels[this.currentLevel];
              this.currentWorld.init();
              isInit = true;
            }, 2000);
          }
        } else {
          console.clear();
          console.log('\x1b[32m%s\x1b[0m',`
          ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄               ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌▐░▌             ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
          ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░█▀▀▀▀▀▀▀█░▌ ▐░▌           ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌
          ▐░▌          ▐░▌       ▐░▌▐░▌▐░▌ ▐░▌▐░▌▐░▌               ▐░▌       ▐░▌  ▐░▌         ▐░▌  ▐░▌          ▐░▌       ▐░▌
          ▐░▌ ▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌       ▐░▌   ▐░▌       ▐░▌   ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌
          ▐░▌▐░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌       ▐░▌    ▐░▌     ▐░▌    ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
          ▐░▌ ▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌       ▐░▌     ▐░▌   ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀ 
          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌               ▐░▌       ▐░▌      ▐░▌ ▐░▌      ▐░▌          ▐░▌     ▐░▌  
          ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░█▄▄▄▄▄▄▄█░▌       ▐░▐░▌       ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌ 
          ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌        ▐░▌        ▐░░░░░░░░░░░▌▐░▌       ▐░▌
            ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀▀▀▀▀▀▀▀▀▀▀          ▀          ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀                                                                                                                    
          `);
        }
      }
    }
  }
};

module.exports = Interface;