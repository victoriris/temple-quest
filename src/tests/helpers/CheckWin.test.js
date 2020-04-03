import { CheckWin, getInitialPieces } from "../../utils";
// import App from '../../index';

// describe ('Aplication startup', () => {

//   it ('renders without crashing', () => {
//       shallow(<App />);
//   });

// });

describe ('Win check on rows', () => {

  let pieces = getInitialPieces();

  const placePiece = (id, row, column) => {
    pieces[id].location = { row, column };
  }

  const cases = [
    [0, 0, 0, false],
    [1, 0, 1, false],
    [2, 0, 2, false],
    [3, 0, 3, true],
  ];

  cases.forEach((test) => {
    const piece = test[0];
    const row = test[1]
    const column = test[2]
    const expectedValue = test[3]
    const label = test[3] ? '' : 'not'
    it (`${piece} -> (${row},${column}) is ${label} win`, () => {
      placePiece(piece, row, column);
      expect(CheckWin(pieces, piece)).toBe(expectedValue);
    });
  });

});


describe ('Win check on columns', () => {

  let pieces = getInitialPieces();

  const placePiece = (id, row, column) => {
    pieces[id].location = { row, column };
  }

  const cases = [
    [0, 0, 0, false],
    [1, 1, 0, false],
    [2, 2, 0, false],
    [3, 3, 0, true],
  ];

  cases.forEach((test) => {
    const piece = test[0];
    const row = test[1]
    const column = test[2]
    const expectedValue = test[3]
    const label = test[3] ? '' : 'not'
    it (`${piece} -> (${row},${column}) is ${label} win`, () => {
      placePiece(piece, row, column);
      expect(CheckWin(pieces, piece)).toBe(expectedValue);
    });
  });

});

describe ('Win check on down diagonals', () => {

  let pieces = getInitialPieces();

  const placePiece = (id, row, column) => {
    pieces[id].location = { row, column };
  }

  const cases = [
    [5, 0, 0, false],
    [7, 1, 1, false],
    [4, 2, 2, false],
    [6, 3, 3, true],
  ];

  cases.forEach((test) => {
    const piece = test[0];
    const row = test[1]
    const column = test[2]
    const expectedValue = test[3]
    const label = test[3] ? '' : 'not'
    it (`${piece} -> (${row},${column}) is ${label} win`, () => {
      placePiece(piece, row, column);
      expect(CheckWin(pieces, piece)).toBe(expectedValue);
    });
  });

});

describe ('Win check on up diagonals', () => {

  let pieces = getInitialPieces();

  const placePiece = (id, row, column) => {
    pieces[id].location = { row, column };
  }

  const cases = [
    [5, 3, 0, false],
    [7, 2, 1, false],
    [4, 1, 2, false],
    [6, 0, 3, true],
  ];

  cases.forEach((test) => {
    const piece = test[0];
    const row = test[1]
    const column = test[2]
    const expectedValue = test[3]
    const label = test[3] ? '' : 'not'
    it (`${piece} -> (${row},${column}) is ${label} win`, () => {
      placePiece(piece, row, column);
      expect(CheckWin(pieces, piece)).toBe(expectedValue);
    });
  });

});

describe ('Win check on random', () => {

  let pieces = getInitialPieces();

  const placePiece = (id, row, column) => {
    pieces[id].location = { row, column };
  }

  const cases = [
    [0, 0, 0, false],
    [1, 2, 2, false],
    [3, 2, 0, false],
    [4, 0, 1, false],
    [5, 0, 2, false],
    [6, 1, 2, false],
    [7, 1, 0, false],
    [8, 2, 1, false],
    [2, 1, 1, false],
  ];

  cases.forEach((test) => {
    const piece = test[0];
    const row = test[1]
    const column = test[2]
    const expectedValue = test[3]
    const label = test[3] ? '' : 'not'
    it (`${piece} -> (${row},${column}) is ${label} win`, () => {
      placePiece(piece, row, column);
      expect(CheckWin(pieces, piece)).toBe(expectedValue);
    });
  });

});
