const keypress = require('keypress');
const personSymbol = '*';

const world2 = [
  ['x','F','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x',],
  ['x',' ','x','x','x','x','x','x',' ','x','x','x','x','x','x','x','x','x',],
  ['x',' ',' ',' ',' ',' ',' ',' ',' ','x',' ',' ',' ',' ',' ','x','x','x',],
  ['x','x','x',' ','x','x','x','x','x','x',' ','x','x','x',' ','x','x','x',],
  ['x','x','x',' ','x',' ',' ',' ','x','x',' ','x','x','x',' ','x','x','x',],
  ['x','x','x',' ','x',' ','x',' ','x','x',' ','x',' ',' ',' ','x','x','x',],
  ['x','x','x',' ',' ',' ','x',' ',' ',' ',' ','x',' ','x','x','x','x','x',],
  ['x','x','x','x','x','x','x','x','x','x','x','x',' ','x','x','x','x','x',],
  ['x','x','x','x','x','x','x','x','x','x','x','x',' ','x','x','x','x','x',],
  ['x','x','x','x','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','x','x','x',],
  ['x','x','x',' ',' ',' ','x','x',' ','x','x','x','x','x','x','x','x','x',],
  ['x','x','x',' ','x','x','x','x',' ','x','x','x','x','x','x','x','x','x',],
  ['x',' ',' ',' ','x','x','x','x',' ','x','x','x','x','x','x','x','x','x',],
  ['x',' ','x','x','x','x','x','x','x','x','x',' ',' ',' ',' ',' ',' ','x',],
  ['x',' ','x','x','x','x','x','x','x','x','x',' ','x',' ','x',' ','x','x',],
  ['x',' ',' ',' ','x','x',' ',' ',' ',' ',' ',' ','x',' ','x',' ','x','x',],
  ['x','x','x',' ','x','x',' ','x','x','x','x','x','x',' ','x',' ','x','x',],
  ['x',' ','x',' ','x','x',' ','x','x','x','x','x','x',' ','x',' ','x','x',],
  ['x',' ','x',' ',' ',' ',' ','x',' ',' ',' ',' ',' ',' ','x',' ','x','x',],
  ['x',' ',' ',' ','x','x','x','x',' ','x','x',' ','x','x','x',' ','x','x',],
  ['x','x','x','x','x','x','x','x','I','x','x','x','x','x','x','x','x','x',],
];

const world = [
  ['x','x','x','x','x','x','F','x'],
  ['x','x','x','x','x','x',' ','x'],
  ['x','x','x','x','x','x',' ','x'],
  ['x',' ',' ',' ',' ',' ',' ','x'],
  ['x',' ','x','x','x','x','x','x'],
  ['x',' ',' ',' ',' ','x','x','x'],
  ['x','x','x','x',' ','x','x','x'],
  ['x','x','x','x','I','x','x','x'],
];

const printWorld = (worldToPrint) => {
  for (let i = 0; i < worldToPrint.length; i += 1) {
    let line = '';
    for (let j = 0; j < worldToPrint[i].length; j += 1) {
      line += `${worldToPrint[i][j]} `;
    }
    console.log(line);
  }
};

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

const  { outputWorld, startingPoints, finishPoints } = loadWorld(world);

const getPoint = (x, y) => {
  const yAxis = y - 1;
  const xAxis = x - 1;
  const point = outputWorld[yAxis][xAxis];

  return point;
}

const setPostion = (x, y, symbol = personSymbol) => {
  const yAxis = y - 1;
  const xAxis = x - 1;

  outputWorld[yAxis][xAxis] = symbol;
}

const getNexPoint = (currentPosition, keyName) => {
  const maxY = outputWorld.length;
  const maxX = outputWorld[0].length;
  const nextPosition = { ...currentPosition };

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

const reRender = () => {
  console.clear();
  
  printWorld(outputWorld);
}

const currentPosition = { x: startingPoints.x, y: startingPoints.y };

const move = (currentPosition, nextPosition) =>  {
  const nextPoint = getPoint(nextPosition.x, nextPosition.y);

  if (nextPosition.x === finishPoints.x && nextPosition.y === finishPoints.y) {
    console.clear();
    console.log(` 
    **    **   *******   **     **       **       ** ** ****     **       ** ** **
    //**  **   **/////** /**    /**      /**      /**/**/**/**   /**      /**/**/**
     //****   **     //**/**    /**      /**   *  /**/**/**//**  /**      /**/**/**
      //**   /**      /**/**    /**      /**  *** /**/**/** //** /**      /**/**/**
       /**   /**      /**/**    /**      /** **/**/**/**/**  //**/**      /**/**/**
       /**   //**     ** /**    /**      /**** //****/**/**   //****      // // // 
       /**    //*******  //*******       /**/   ///**/**/**    //***       ** ** **
       //      ///////    ///////        //       // // //      ///       // // // `);
    process.exit(0);
  }

  if (nextPoint === ' ') {
    setPostion(nextPosition.x, nextPosition.y);
    setPostion(currentPosition.x, currentPosition.y, ' ');

    currentPosition.x = nextPosition.x;
    currentPosition.y = nextPosition.y;
  }

  reRender();
};


reRender();

keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  // console.log('got "keypress"', key.name);

  // key.name
  // got "keypress" up
  // got "keypress" down
  // got "keypress" left
  // got "keypress" right
  
    const movementKeys = [
      'up', 'down', 'left', 'right'
    ];

  if (movementKeys.includes(key.name)) {
    const nextPosition = getNexPoint(currentPosition, key.name);
    move(currentPosition, nextPosition);
  }

  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
