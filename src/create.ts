import { WorldState, EmptyCell, Position, Cell, CellContent, Ball, Wall } from './models'

export function position(x: number, y: number) : Position {
    return { X: x, Y: y };
}

export function ball(x: number, y: number) : Cell {
    var ball : Ball = { type: "ball", color: "lightgreen"  };
    return cell(x, y, ball);
}

export function wall(x: number, y: number) : Cell {
    var wall : Wall = { type: "wall" };
    return cell(x, y, wall);
}

export function cell(x: number, y: number, content: CellContent) : Cell {
    return {
        position: position(x, y),
        content: content
    }
}

export function emptyCell(x: number, y: number,) : Cell {
    var empty =  { type: "empty" };
    return cell(x, y, empty);
}



/* Creates an empty world with initial player position */
export function world(height: number, width: number, cellSize: number) : WorldState {
    var worldMap : Cell[][] = new Array(height);

    for(var y = 0; y < height; y++) {
        var row =  new Array<Cell>(width);
        for(var x = 0; x < width; x++) {
            row[x] = emptyCell(x, y);
        }
        worldMap[y] = row;
    }

    return {
        state: worldMap,
        height: height,
        width: width,
        cellSize: cellSize,
        player: {
            color: "red",
            direction: "east",
            position: position(0, 0)
        }
    }
}