const emoji = require('node-emoji');

function World(inputWorld) {
  this.finish = false;
  if (!inputWorld) {
    throw new Error('You must pass a world to instance this object');
  }

  const loadWorld = (inputWorld, personSymbol) => {
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
          outputWorld[i][j] = personSymbol;
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

  this.setPostion = (x, y, symbol = this.personSymbol) => {
    const yAxis = y - 1;
    const xAxis = x - 1;
  
    this.map[yAxis][xAxis] = symbol;
  }

  this.getPoint = (x, y) => {
    const yAxis = y - 1;
    const xAxis = x - 1;
    const point = this.map[yAxis][xAxis];
  
    return point;
  }

  this.getNexPoint = (keyName) => {
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

  printWorld = (map, wallSymbol) => {
    for (let i = 0; i < map.length; i += 1) {
      let line = '';
      for (let j = 0; j < map[i].length; j += 1) {
        const point = map[i][j] === 'x' ? wallSymbol : map[i][j];
        line += `${point} `;
      }
      console.log(line);
    }
  };

  const reRender = (map, wallSymbol) => {
    console.clear();
    
    printWorld(map, wallSymbol);
  };

  this.init = () => {
    this.personSymbol = inputWorld.config.person && emoji.get(inputWorld.config.person) || 'X';
    const { outputWorld, finishPoints, startingPoints } = loadWorld(inputWorld.map, this.personSymbol);
    this.finishPoints = finishPoints;
    this.map = outputWorld;
    this.currentPosition = startingPoints;
    this.wallSymbol = inputWorld.config.wall && emoji.get(inputWorld.config.wall) || 'T';

    reRender(this.map, this.wallSymbol);
  };

  this.move = (buttom) =>  {
    if (!this.finish) {
      const nextPosition = this.getNexPoint(buttom);

      const nextPoint = this.getPoint(nextPosition.x, nextPosition.y);
    
      if (nextPosition.x === this.finishPoints.x && nextPosition.y === this.finishPoints.y) {
        this.finish = true;
        return { success: true, continue: false };
      }
    
      if (nextPoint === ' ') {
        this.setPostion(nextPosition.x, nextPosition.y);
        this.setPostion(this.currentPosition.x, this.currentPosition.y, ' ');
    
        this.currentPosition.x = nextPosition.x;
        this.currentPosition.y = nextPosition.y;
      }
    
      reRender(this.map, this.wallSymbol);

      return { success: false, continue: true };
    }
  };
}

module.exports = World;
