import * as Models from './models'

export interface RenderOptions {
    canvas: HTMLCanvasElement,
    cellPadding: number,
    world: Models.WorldState
}

function toCanvasCoordinates(pos: Models.Position, cellSize: number, padding: number) : Models.Position {
    return {
        X: padding + pos.X * (cellSize + padding),
        Y: padding + pos.Y * (cellSize + padding)
    }
}

var arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjYzNiA1MS42MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjYzNiA1MS42MzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTUxLjM1MywwLjkxNGMtMC4yOTUtMC4zMDUtMC43NS0wLjM5LTEuMTM1LTAuMjEzTDAuNTgzLDIzLjQ4MWMtMC4zOTksMC4xODQtMC42MzIsMC42MDUtMC41NzQsMS4wNDEgIHMwLjM5MywwLjc4MiwwLjgyNiwwLjg1NGwyMi4yNjMsMy43MzFsMi41NDUsMjEuMDM4YzAuMDU0LDAuNDM4LDAuMzg5LDAuNzkxLDAuODI0LDAuODY1YzAuMDU3LDAuMDEsMC4xMTMsMC4wMTUsMC4xNjksMC4wMTUgIGMwLjM3NSwwLDAuNzI2LTAuMjExLDAuODk2LTAuNTU2bDI0LTQ4LjQxNUM1MS43MiwxLjY3NSw1MS42NDgsMS4yMTgsNTEuMzUzLDAuOTE0eiBNMjcuMjI2LDQ2LjU4MmwtMi4yMzItMTguNDU3ICBjLTAuMDU0LTAuNDQtMC4zOTEtMC43OTMtMC44MjgtMC44NjZMNC4zNzQsMjMuOTQxTDQ4LjQ4NSwzLjY5N0wyNy4yMjYsNDYuNTgyeiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

export function render(options: RenderOptions) {
    var canvas = options.canvas;
    var ctx = canvas.getContext('2d');
    var world = options.world;
    var height = world.height;
    var width = world.width;
    var cellPadding = options.cellPadding;
    var cellSize = world.cellSize;

    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var cell = world.state[y][x];
            var canvasPosition = toCanvasCoordinates(cell.position, cellSize, cellPadding);
            var cellX = canvasPosition.X;
            var cellY = canvasPosition.Y;

            var cellType = cell.content.type;
            if (cellType == "empty") {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(cellX, cellY, 1, 0, 2*Math.PI);
                ctx.fill();
                ctx.closePath();
            } 

            if (cellType == "ball") {
                ctx.beginPath();
                ctx.fillStyle = "lightgreen";
                ctx.arc(cellX, cellY, 5, 0, 2*Math.PI);
                ctx.fill();
                ctx.closePath();
            }

            if (cellType == "wall") {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.arc(cellX, cellY, 5, 0, 2*Math.PI);
                ctx.fill();
                ctx.closePath();
            }
            
            // ctx.fillRect(cellX, cellY, cellSize, cellSize);
        }
    }

    // draw player
    var playerPosition = toCanvasCoordinates(world.player.position, cellSize, cellPadding);
    var playerX = playerPosition.X;
    var playerY = playerPosition.Y;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(playerX, playerY, 6, 0, 2.0 * Math.PI);
    ctx.fill();
    ctx.closePath();
}