import * as Create from './create'
import * as Models from './models'
import { Maybe } from './maybe'

function clone<T>(x: T) : T {
    return JSON.parse(JSON.stringify(x));
}

export function turn_left(world: Models.WorldState) : Models.WorldState {
    world = clone(world);
    var direction = world.player.direction;
    if (direction == "north") {
        world.player.direction = "west";
    } else if (direction == "south") {
        world.player.direction = "east";
    } else if (direction == "west") {
        world.player.direction = "south";
    } else {
        // direction == "east"
        world.player.direction = "north";
    }
    return world;
}

export function turn_right(world: Models.WorldState) : Models.WorldState {
    world = clone(world);
    var direction = world.player.direction;
    if (direction == "north") {
        world.player.direction = "east";
    } else if (direction == "south") {
        world.player.direction = "west";
    } else if (direction == "west") {
        world.player.direction = "north";
    } else {
        // direction == "east"
        world.player.direction = "south";
    }
    return world;
}

export function turn_around(world: Models.WorldState) : Models.WorldState {
    return turn_left(turn_left(world));
}

export function put_ball(world: Models.WorldState) : Models.WorldState {
    world = clone(world);
    var currentPosition = world.player.position;
    var x = currentPosition.X;
    var y = currentPosition.Y;
    world.state[y][x] = Create.ball(x, y);
    return world;
}

export function createWalls(world: Models.WorldState) : Models.WorldState {
    world = clone(world);
    var height = world.height;
    var width = world.width;

    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {

            if (x == 0 || x == width - 1) {
                world.state[y][x] = Create.wall(x, y);
            }
            if (y == 0 || y == height - 1) {
                world.state[y][x] = Create.wall(x, y);
            }
        }
    }

    return world;
}

export function get_ball(world: Models.WorldState) : Models.WorldState {
    var currentPosition = world.player.position;
    var x = currentPosition.X;
    var y = currentPosition.Y;
    var currentCell = world.state[y][x];
    if (currentCell.content.type == "ball") {
        world = clone(world);
        world.state[y][x] = Create.emptyCell(x, y);
    }
    return world;
}

export function in_front_of_wall(world: Models.WorldState) : boolean {
    world = clone(world);
    var x = world.player.position.X;
    var y = world.player.position.Y;
    var width = world.width;
    var height = world.height;
    var currentCell = world.state[y][x];

    if (world.player.direction == "south") {
        if (y == height - 1) {
            // already at the max height
            return true;
        }

        var nextCellPositionY = y + 1;
        var nextCellPositionX = x;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";

    } else if (world.player.direction == "north") {
        if (y == 0) {
            return true;
        }

        var nextCellPositionY = y - 1;
        var nextCellPositionX = x;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";

    } else if (world.player.direction == "west") {
        if (x == 0) {
           return true;
        }

        var nextCellPositionY = y;
        var nextCellPositionX = x - 1;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";

    } else {
        // world.player.direction == "east" 
        if (x == width - 1) {
            return true;
        }

        var nextCellPositionY = y;
        var nextCellPositionX = x + 1;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";
    }
}

export function on_ball(world: Models.WorldState) : boolean {
    var x = world.player.position.X;
    var y = world.player.position.Y;

    return world.state[y][x].content.type === "ball";
}

export function make_string_with_balls(world: Models.WorldState) : Models.WorldState {
    var height = world.height;
    var width = world.width;

    for(var y = 1; y < height - 1; y++) {
        for(var x = 1; x < width - 1; x++) {
            if (x == 1 || x == width - 2) {
                world.state[y][x] = Create.ball(x, y);
            }
            if (y == 1 || y == height - 2) {
                world.state[y][x] = Create.ball(x, y);
            }
        }
    }
    
    

    return world;
}

export function step(world: Models.WorldState) : Models.WorldState {
    world = clone(world);
    var x = world.player.position.X;
    var y = world.player.position.Y;
    var width = world.width;
    var height = world.height;
    var currentCell = world.state[y][x];

    if (in_front_of_wall(world)) {
        throw new Error("Player crashed into wall");
    }

    if (world.player.direction == "south") {
        if (y == height - 1) {
            // already at the max height
            throw new Error("Player out of bounds");
        }

        world.player.position.Y = world.player.position.Y + 1;
        return world;

    } else if (world.player.direction == "north") {
        if (y == 0) {
            throw new Error("Player out of bounds");
        }

        world.player.position.Y = world.player.position.Y - 1;
        return world;

    } else if (world.player.direction == "west") {
        if (x == 0) {
            throw new Error("Player out of bounds");
        }

        world.player.position.X = world.player.position.X - 1;
        return world;
    } else {
        // world.player.direction == "east" 
        if (x == width - 1) {
            throw new Error("Player out of bounds");
        }

        world.player.position.X =  world.player.position.X + 1;
        return world;
    }
}