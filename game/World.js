const emoji = require('node-emoji');

function World(inputWorld) {
  if (!inputWorld) {
    throw new Error('You must pass a world to instance this object');
  }

  const loadWorld = (inputWorld) => {
    const outputWorld = Array.from(inputWorld);
    const finishPoints = { x: 0, y: 0 };
    const startingPoints = { x: 0, y: 0 };
  
    for (let i = 0; i < outputWorld.length; i += 1) {
      for (let j = 0; j < outputWorld[i].length; j += 1) {
        const x = j + 1;
        const y = i + 1;
        // console.log(x, y);
  
        let point = outputWorld[i][j];
  
        if (point === 'I') {
          // This is the starting point
          outputWorld[i][j] = this.personSymbol;
          startingPoints.x = x;
          startingPoints.y = y;
        }
  
        if (point === 'F') {
          // This is the finish point
          outputWorld[i][j] = ' ';
          finishPoints.x = x;
          finishPoints.y = y;
        }
      }
    }
  
    return { outputWorld, finishPoints, startingPoints };
  }

  const { outputWorld, finishPoints, startingPoints } = loadWorld(inputWorld.map);

  const setPostion = (x, y, symbol = this.personSymbol) => {
    const yAxis = y - 1;
    const xAxis = x - 1;
  
    this.map[yAxis][xAxis] = symbol;
  }

  const getPoint = (x, y) => {
    const yAxis = y - 1;
    const xAxis = x - 1;
    const point = this.map[yAxis][xAxis];
  
    return point;
  }

  const getNexPoint = (keyName) => {
    const maxY = this.map.length;
    const maxX = this.map[0].length;
    const nextPosition = { ...this.currentPosition };
  
    if (keyName === 'up') {
      nextPosition.y = nextPosition.y > 0 ? nextPosition.y - 1 : nextPosition.y;
    }
  
    if (keyName === 'down') {
      nextPosition.y = nextPosition.y < maxY ? nextPosition.y + 1 : nextPosition.y;
    }
  
    if (keyName === 'left') {
      nextPosition.x = nextPosition.x > 0 ? nextPosition.x - 1 : nextPosition.x;
    }
  
    if (keyName === 'right') {
      nextPosition.x = nextPosition.x < maxX ? nextPosition.x + 1 : nextPosition.x;
    }
  
    return nextPosition;
  }

  printWorld = () => {
    for (let i = 0; i < this.map.length; i += 1) {
      let line = '';
      for (let j = 0; j < this.map[i].length; j += 1) {
        const point = this.map[i][j] === 'x' ? this.wallSymbol : this.map[i][j];
        line += `${point} `;
      }
      console.log(line);
    }
  };

  const reRender = () => {
    console.clear();
    
    printWorld(this.map);
  };

  this.map = outputWorld;
  this.currentPosition = startingPoints;
  this.personSymbol = emoji.get(inputWorld.config.person);
  this.wallSymbol = emoji.get(inputWorld.config.wall);

  this.init = () => { reRender(); }

  this.move = (buttom) =>  {
    const nextPosition = getNexPoint(buttom);

    const nextPoint = getPoint(nextPosition.x, nextPosition.y);
  
    if (nextPosition.x === finishPoints.x && nextPosition.y === finishPoints.y) {
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
      
  
      return { success: true, continue: false };
    }
  
    if (nextPoint === ' ') {
      setPostion(nextPosition.x, nextPosition.y);
      setPostion(currentPosition.x, currentPosition.y, ' ');
  
      currentPosition.x = nextPosition.x;
      currentPosition.y = nextPosition.y;
    }
  
    reRender();

    return { success: false, continue: true };
  };
}

module.exports = World;