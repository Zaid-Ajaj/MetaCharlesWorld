/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function position(x, y) {
    return { X: x, Y: y };
}
exports.position = position;
function ball(x, y) {
    var ball = { type: "ball", color: "lightgreen" };
    return cell(x, y, ball);
}
exports.ball = ball;
function wall(x, y) {
    var wall = { type: "wall" };
    return cell(x, y, wall);
}
exports.wall = wall;
function cell(x, y, content) {
    return {
        position: position(x, y),
        content: content
    };
}
exports.cell = cell;
function emptyCell(x, y) {
    var empty = { type: "empty" };
    return cell(x, y, empty);
}
exports.emptyCell = emptyCell;
/* Creates an empty world with initial player position */
function world(height, width, cellSize) {
    var worldMap = new Array(height);
    for (var y = 0; y < height; y++) {
        var row = new Array(width);
        for (var x = 0; x < width; x++) {
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
    };
}
exports.world = world;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var state_manager_1 = __webpack_require__(2);
var stateManager = new state_manager_1.StateManager({
    canvas: document.getElementById("worldMap"),
    renderDelay: 100
});
stateManager.makeInstanceMethodsGlobal(stateManager);
stateManager.initializeWorld();
stateManager.render();
console.log(stateManager.snapshots);
var btnRun = document.getElementById("btnRun");
btnRun.addEventListener("click", function (ev) {
    var code = window["editor"].getValue();
    try {
        stateManager.reset();
        stateManager.initializeWorld();
        eval(code);
        stateManager.render();
    }
    catch (ex) {
        alert(ex);
        console.log(ex);
    }
});
var btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", function (ev) {
    stateManager.reset();
});
// initialize Ace editor
var ace = window["ace"];
window["editor"] = ace.edit("editor");
window["editor"].getSession().setMode("ace/mode/javascript");


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Create = __webpack_require__(0);
var Canvas = __webpack_require__(3);
var World = __webpack_require__(4);
var StateManager = /** @class */ (function () {
    function StateManager(options) {
        this.snapshots = [];
        this.canvas = undefined;
        this.hasError = false;
        this.snapshotClones = [];
        this.renderDelay = 1000;
        this.canvas = options.canvas;
        this.renderDelay = options.renderDelay;
    }
    StateManager.prototype.initializeWorld = function () {
        var emptyWorld = Create.world(20, 30, 5);
        emptyWorld.player.position.X = 1;
        emptyWorld.player.position.Y = 1;
        var withWalls = World.createWalls(emptyWorld);
        this.snapshots.push({ hasValue: true, value: withWalls });
    };
    StateManager.prototype.turn_right = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var nextWorld = World.turn_right(prevWorld);
        this.snapshots.push({ hasValue: true, value: nextWorld });
    };
    StateManager.prototype.turn_left = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var nextWorld = World.turn_left(prevWorld);
        this.snapshots.push({ hasValue: true, value: nextWorld });
    };
    StateManager.prototype.turn_around = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var nextWorld = World.turn_around(prevWorld);
        this.snapshots.push({ hasValue: true, value: nextWorld });
    };
    StateManager.prototype.step = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            // alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var maybeNext = World.step(prevWorld);
        this.snapshots.push({ hasValue: true, value: maybeNext });
    };
    StateManager.prototype.in_front_of_wall = function () {
        if (this.hasError) {
            return false;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return true;
        }
        var prevWorld = lastWorldSnapshot.value;
        return World.in_front_of_wall(prevWorld);
    };
    StateManager.prototype.makeInstanceMethodsGlobal = function (stateManager) {
        window["put_ball"] = function () { stateManager.put_ball(); };
        window["step"] = function () { stateManager.step(); };
        window["turn_right"] = function () { stateManager.turn_right(); };
        window["turn_left"] = function () { stateManager.turn_left(); };
        window["turn_around"] = function () { stateManager.turn_around(); };
        window["render"] = function () { stateManager.render(); };
        window["reset"] = function () { stateManager.reset(); };
        window["in_front_of_wall"] = function () { return stateManager.in_front_of_wall(); };
        window["make_string_with_balls"] = function () { stateManager.make_string_with_balls(); };
        window["on_ball"] = function () { return stateManager.on_ball(); };
        window["get_ball"] = function () { stateManager.get_ball(); };
    };
    StateManager.prototype.on_ball = function () {
        if (this.hasError) {
            return true;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return true;
        }
        var prevWorld = lastWorldSnapshot.value;
        return World.on_ball(prevWorld);
    };
    StateManager.prototype.pause = function (milliseconds) {
        var dt = new Date();
        while (((new Date()) - dt) <= milliseconds) {
            /* Do nothing */
        }
    };
    StateManager.prototype.make_string_with_balls = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return true;
        }
        var prevWorld = lastWorldSnapshot.value;
        var nextWorld = World.make_string_with_balls(prevWorld);
        this.snapshots.push({ hasValue: true, value: nextWorld });
    };
    StateManager.prototype.put_ball = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var nextWorld = World.put_ball(prevWorld);
        this.snapshots.push({ hasValue: true, value: nextWorld });
    };
    StateManager.prototype.get_ball = function () {
        if (this.hasError) {
            return;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var nextWorld = World.get_ball(prevWorld);
        this.snapshots.push({ hasValue: true, value: nextWorld });
    };
    StateManager.prototype.renderSnapshots = function () {
        var _this = this;
        if (this.snapshotClones.length === 0) {
            return;
        }
        var lastSnapshot = this.snapshotClones.pop();
        setTimeout(function () {
            // clear canvas
            _this.canvas.getContext('2d').clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            // draw next snapshot
            if (lastSnapshot.hasValue) {
                Canvas.render({
                    canvas: _this.canvas,
                    cellPadding: 13,
                    world: lastSnapshot.value
                });
            }
            else {
                alert(lastSnapshot.error);
            }
            // go to next snapshot
            _this.renderSnapshots();
        }, this.renderDelay);
    };
    StateManager.prototype.reset = function () {
        this.snapshots = [];
        this.initializeWorld();
        this.render();
    };
    StateManager.prototype.render = function () {
        if (this.snapshots.length === 0) {
            return;
        }
        this.snapshotClones = JSON.parse(JSON.stringify(this.snapshots));
        this.snapshotClones.reverse();
        this.renderSnapshots();
    };
    return StateManager;
}());
exports.StateManager = StateManager;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function toCanvasCoordinates(pos, cellSize, padding) {
    return {
        X: padding + pos.X * (cellSize + padding),
        Y: padding + pos.Y * (cellSize + padding)
    };
}
var arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjYzNiA1MS42MzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjYzNiA1MS42MzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTUxLjM1MywwLjkxNGMtMC4yOTUtMC4zMDUtMC43NS0wLjM5LTEuMTM1LTAuMjEzTDAuNTgzLDIzLjQ4MWMtMC4zOTksMC4xODQtMC42MzIsMC42MDUtMC41NzQsMS4wNDEgIHMwLjM5MywwLjc4MiwwLjgyNiwwLjg1NGwyMi4yNjMsMy43MzFsMi41NDUsMjEuMDM4YzAuMDU0LDAuNDM4LDAuMzg5LDAuNzkxLDAuODI0LDAuODY1YzAuMDU3LDAuMDEsMC4xMTMsMC4wMTUsMC4xNjksMC4wMTUgIGMwLjM3NSwwLDAuNzI2LTAuMjExLDAuODk2LTAuNTU2bDI0LTQ4LjQxNUM1MS43MiwxLjY3NSw1MS42NDgsMS4yMTgsNTEuMzUzLDAuOTE0eiBNMjcuMjI2LDQ2LjU4MmwtMi4yMzItMTguNDU3ICBjLTAuMDU0LTAuNDQtMC4zOTEtMC43OTMtMC44MjgtMC44NjZMNC4zNzQsMjMuOTQxTDQ4LjQ4NSwzLjY5N0wyNy4yMjYsNDYuNTgyeiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
function render(options) {
    var canvas = options.canvas;
    var ctx = canvas.getContext('2d');
    var world = options.world;
    var height = world.height;
    var width = world.width;
    var cellPadding = options.cellPadding;
    var cellSize = world.cellSize;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var cell = world.state[y][x];
            var canvasPosition = toCanvasCoordinates(cell.position, cellSize, cellPadding);
            var cellX = canvasPosition.X;
            var cellY = canvasPosition.Y;
            var cellType = cell.content.type;
            if (cellType == "empty") {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.arc(cellX, cellY, 1, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
            if (cellType == "ball") {
                ctx.beginPath();
                ctx.fillStyle = "lightgreen";
                ctx.arc(cellX, cellY, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            }
            if (cellType == "wall") {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.arc(cellX, cellY, 5, 0, 2 * Math.PI);
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
exports.render = render;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Create = __webpack_require__(0);
function clone(x) {
    return JSON.parse(JSON.stringify(x));
}
function turn_left(world) {
    world = clone(world);
    var direction = world.player.direction;
    if (direction == "north") {
        world.player.direction = "west";
    }
    else if (direction == "south") {
        world.player.direction = "east";
    }
    else if (direction == "west") {
        world.player.direction = "south";
    }
    else {
        // direction == "east"
        world.player.direction = "north";
    }
    return world;
}
exports.turn_left = turn_left;
function turn_right(world) {
    world = clone(world);
    var direction = world.player.direction;
    if (direction == "north") {
        world.player.direction = "east";
    }
    else if (direction == "south") {
        world.player.direction = "west";
    }
    else if (direction == "west") {
        world.player.direction = "north";
    }
    else {
        // direction == "east"
        world.player.direction = "south";
    }
    return world;
}
exports.turn_right = turn_right;
function turn_around(world) {
    return turn_left(turn_left(world));
}
exports.turn_around = turn_around;
function put_ball(world) {
    world = clone(world);
    var currentPosition = world.player.position;
    var x = currentPosition.X;
    var y = currentPosition.Y;
    world.state[y][x] = Create.ball(x, y);
    return world;
}
exports.put_ball = put_ball;
function createWalls(world) {
    world = clone(world);
    var height = world.height;
    var width = world.width;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
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
exports.createWalls = createWalls;
function get_ball(world) {
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
exports.get_ball = get_ball;
function in_front_of_wall(world) {
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
    }
    else if (world.player.direction == "north") {
        if (y == 0) {
            return true;
        }
        var nextCellPositionY = y - 1;
        var nextCellPositionX = x;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";
    }
    else if (world.player.direction == "west") {
        if (x == 0) {
            return true;
        }
        var nextCellPositionY = y;
        var nextCellPositionX = x - 1;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";
    }
    else {
        // world.player.direction == "east" 
        if (x == width - 1) {
            return true;
        }
        var nextCellPositionY = y;
        var nextCellPositionX = x + 1;
        return world.state[nextCellPositionY][nextCellPositionX].content.type == "wall";
    }
}
exports.in_front_of_wall = in_front_of_wall;
function on_ball(world) {
    var x = world.player.position.X;
    var y = world.player.position.Y;
    return world.state[y][x].content.type === "ball";
}
exports.on_ball = on_ball;
function make_string_with_balls(world) {
    var height = world.height;
    var width = world.width;
    for (var y = 1; y < height - 1; y++) {
        for (var x = 1; x < width - 1; x++) {
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
exports.make_string_with_balls = make_string_with_balls;
function step(world) {
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
    }
    else if (world.player.direction == "north") {
        if (y == 0) {
            throw new Error("Player out of bounds");
        }
        world.player.position.Y = world.player.position.Y - 1;
        return world;
    }
    else if (world.player.direction == "west") {
        if (x == 0) {
            throw new Error("Player out of bounds");
        }
        world.player.position.X = world.player.position.X - 1;
        return world;
    }
    else {
        // world.player.direction == "east" 
        if (x == width - 1) {
            throw new Error("Player out of bounds");
        }
        world.player.position.X = world.player.position.X + 1;
        return world;
    }
}
exports.step = step;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjQ4MjQ2ZmQzNDEwZTU3Y2UxODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUtbWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREEsa0JBQXlCLENBQVMsRUFBRSxDQUFTO0lBQ3pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFGRCw0QkFFQztBQUVELGNBQXFCLENBQVMsRUFBRSxDQUFTO0lBQ3JDLElBQUksSUFBSSxHQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFHLENBQUM7SUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFIRCxvQkFHQztBQUVELGNBQXFCLENBQVMsRUFBRSxDQUFTO0lBQ3JDLElB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QUFDO1FBQzVDLENBQUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBRWpCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0FBQ0wsQ0FBQztBQTdDRCxvQkE2Q0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjQ4MjQ2ZmQzNDEwZTU3Y2UxODkiLCJpbXBvcnQgeyBXb3JsZFN0YXRlLCBFbXB0eUNlbGwsIFBvc2l0aW9uLCBDZWxsLCBDZWxsQ29udGVudCwgQmFsbCwgV2FsbCB9IGZyb20gJy4vbW9kZWxzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSA6IFBvc2l0aW9uIHtcclxuICAgIHJldHVybiB7IFg6IHgsIFk6IHkgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJhbGwoeDogbnVtYmVyLCB5OiBudW1iZXIpIDogQ2VsbCB7XHJcbiAgICB2YXIgYmFsbCA6IEJhbGwgPSB7IHR5cGU6IFwiYmFsbFwiLCBjb2xvcjogXCJsaWdodGdyZWVuXCIgIH07XHJcbiAgICByZXR1cm4gY2VsbCh4LCB5LCBiYWxsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhbGwoeDogbnVtYmVyLCB5OiBudW1iZXIpIDogQ2VsbCB7XHJcbiAgICB2YXIgd2FsbCA6IFdhbGwgPSB7IHR5cGU6IFwid2FsbFwiIH07XHJcbiAgICByZXR1cm4gY2VsbCh4LCB5LCB3YWxsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNlbGwoeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbnRlbnQ6IENlbGxDb250ZW50KSA6IENlbGwge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24oeCwgeSksXHJcbiAgICAgICAgY29udGVudDogY29udGVudFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1wdHlDZWxsKHg6IG51bWJlciwgeTogbnVtYmVyLCkgOiBDZWxsIHtcclxuICAgIHZhciBlbXB0eSA9ICB7IHR5cGU6IFwiZW1wdHlcIiB9O1xyXG4gICAgcmV0dXJuIGNlbGwoeCwgeSwgZW1wdHkpO1xyXG59XHJcblxyXG5cclxuXHJcbi8qIENyZWF0ZXMgYW4gZW1wdHkgd29ybGQgd2l0aCBpbml0aWFsIHBsYXllciBwb3NpdGlvbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd29ybGQoaGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGNlbGxTaXplOiBudW1iZXIpIDogV29ybGRTdGF0ZSB7XHJcbiAgICB2YXIgd29ybGRNYXAgOiBDZWxsW11bXSA9IG5ldyBBcnJheShoZWlnaHQpO1xyXG5cclxuICAgIGZvcih2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHZhciByb3cgPSAgbmV3IEFycmF5PENlbGw+KHdpZHRoKTtcclxuICAgICAgICBmb3IodmFyIHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICByb3dbeF0gPSBlbXB0eUNlbGwoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdvcmxkTWFwW3ldID0gcm93O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdGU6IHdvcmxkTWFwLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBjZWxsU2l6ZTogY2VsbFNpemUsXHJcbiAgICAgICAgcGxheWVyOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IFwiZWFzdFwiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24oMCwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3JlYXRlLnRzIiwiaW1wb3J0IHsgQmFsbCwgV29ybGRTdGF0ZSwgUGxheWVyLCBFbXB0eUNlbGwsIFdhbGwgfSBmcm9tICcuL21vZGVscydcclxuaW1wb3J0ICogYXMgQ3JlYXRlIGZyb20gJy4vY3JlYXRlJ1xyXG5pbXBvcnQgKiBhcyBDYW52YXMgZnJvbSAnLi9yZW5kZXInXHJcbmltcG9ydCAqIGFzIFdvcmxkIGZyb20gJy4vd29ybGQnXHJcbmltcG9ydCB7IFN0YXRlTWFuYWdlciwgU3RhdGVNYW5hZ2VyT3B0aW9ucyB9IGZyb20gJy4vc3RhdGUtbWFuYWdlcidcclxuXHJcbnZhciBzdGF0ZU1hbmFnZXIgPSBuZXcgU3RhdGVNYW5hZ2VyKHtcclxuICAgIGNhbnZhczogPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29ybGRNYXBcIiksXHJcbiAgICByZW5kZXJEZWxheTogMTAwXHJcbn0pO1xyXG5cclxuc3RhdGVNYW5hZ2VyLm1ha2VJbnN0YW5jZU1ldGhvZHNHbG9iYWwoc3RhdGVNYW5hZ2VyKTtcclxuc3RhdGVNYW5hZ2VyLmluaXRpYWxpemVXb3JsZCgpO1xyXG5zdGF0ZU1hbmFnZXIucmVuZGVyKCk7XHJcbmNvbnNvbGUubG9nKHN0YXRlTWFuYWdlci5zbmFwc2hvdHMpO1xyXG5cclxudmFyIGJ0blJ1biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuUnVuXCIpO1xyXG5idG5SdW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldikgPT4ge1xyXG4gICAgdmFyIGNvZGUgPSB3aW5kb3dbXCJlZGl0b3JcIl0uZ2V0VmFsdWUoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc3RhdGVNYW5hZ2VyLnJlc2V0KCk7XHJcbiAgICAgICAgc3RhdGVNYW5hZ2VyLmluaXRpYWxpemVXb3JsZCgpO1xyXG4gICAgICAgIGV2YWwoY29kZSk7XHJcbiAgICAgICAgc3RhdGVNYW5hZ2VyLnJlbmRlcigpO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICBhbGVydChleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBidG5SZXNldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuUmVzZXRcIik7XHJcbmJ0blJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXYpID0+IHtcclxuICAgIHN0YXRlTWFuYWdlci5yZXNldCgpO1xyXG59KTtcclxuXHJcbi8vIGluaXRpYWxpemUgQWNlIGVkaXRvclxyXG52YXIgYWNlID0gd2luZG93W1wiYWNlXCJdO1xyXG53aW5kb3dbXCJlZGl0b3JcIl0gPSBhY2UuZWRpdChcImVkaXRvclwiKTtcclxud2luZG93W1wiZWRpdG9yXCJdLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvamF2YXNjcmlwdFwiKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi50cyIsImltcG9ydCAqIGFzIE1vZGVscyBmcm9tICcuL21vZGVscydcclxuaW1wb3J0ICogYXMgQ3JlYXRlIGZyb20gJy4vY3JlYXRlJ1xyXG5pbXBvcnQgKiBhcyBDYW52YXMgZnJvbSAnLi9yZW5kZXInXHJcbmltcG9ydCAqIGFzIFdvcmxkIGZyb20gJy4vd29ybGQnXHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSAnLi9tYXliZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGVNYW5hZ2VyT3B0aW9ucyB7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxyXG4gICAgcmVuZGVyRGVsYXk6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdGVNYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBzbmFwc2hvdHMgOiBNYXliZTxNb2RlbHMuV29ybGRTdGF0ZT5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBoYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzbmFwc2hvdENsb25lcyA6IE1heWJlPE1vZGVscy5Xb3JsZFN0YXRlPltdID0gW107XHJcbiAgICBwcml2YXRlIHJlbmRlckRlbGF5OiBudW1iZXIgPSAxMDAwO1xyXG4gICAgcHJpdmF0ZSB3b3JsZFN0YXRlOiBNb2RlbHMuV29ybGRTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTdGF0ZU1hbmFnZXJPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgICAgICB0aGlzLnJlbmRlckRlbGF5ID0gb3B0aW9ucy5yZW5kZXJEZWxheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZVdvcmxkKCkge1xyXG4gICAgICAgIHZhciBlbXB0eVdvcmxkID0gQ3JlYXRlLndvcmxkKDIwLCAzMCwgNSk7XHJcbiAgICAgICAgZW1wdHlXb3JsZC5wbGF5ZXIucG9zaXRpb24uWCAgPSAxO1xyXG4gICAgICAgIGVtcHR5V29ybGQucGxheWVyLnBvc2l0aW9uLlkgID0gMTsgXHJcbiAgICAgICAgdmFyIHdpdGhXYWxscyA9IFdvcmxkLmNyZWF0ZVdhbGxzKGVtcHR5V29ybGQpO1xyXG4gICAgICAgIHRoaXMuc25hcHNob3RzLnB1c2goeyBoYXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IHdpdGhXYWxscyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHVybl9yaWdodCgpIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgdmFyIG5leHRXb3JsZCA9IFdvcmxkLnR1cm5fcmlnaHQocHJldldvcmxkKTtcclxuICAgICAgICB0aGlzLnNuYXBzaG90cy5wdXNoKHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiBuZXh0V29ybGQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHR1cm5fbGVmdCgpIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgdmFyIG5leHRXb3JsZCA9IFdvcmxkLnR1cm5fbGVmdChwcmV2V29ybGQpO1xyXG4gICAgICAgIHRoaXMuc25hcHNob3RzLnB1c2goeyBoYXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG5leHRXb3JsZCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHVybl9hcm91bmQoKSB7IFxyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZXb3JsZCA9IGxhc3RXb3JsZFNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgIHZhciBuZXh0V29ybGQgPSBXb3JsZC50dXJuX2Fyb3VuZChwcmV2V29ybGQpO1xyXG4gICAgICAgIHRoaXMuc25hcHNob3RzLnB1c2goeyBoYXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG5leHRXb3JsZCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RlcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGFzdFdvcmxkU25hcHNob3QgPSB0aGlzLnNuYXBzaG90c1t0aGlzLnNuYXBzaG90cy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAoIWxhc3RXb3JsZFNuYXBzaG90Lmhhc1ZhbHVlKSB7XHJcbiAgICAgICAgICAgLy8gYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZXb3JsZCA9IGxhc3RXb3JsZFNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgIHZhciBtYXliZU5leHQgPSBXb3JsZC5zdGVwKHByZXZXb3JsZCk7XHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdHMucHVzaCh7IGhhc1ZhbHVlOiB0cnVlLCB2YWx1ZTptYXliZU5leHQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluX2Zyb250X29mX3dhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIFdvcmxkLmluX2Zyb250X29mX3dhbGwocHJldldvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFrZUluc3RhbmNlTWV0aG9kc0dsb2JhbChzdGF0ZU1hbmFnZXI6IFN0YXRlTWFuYWdlcikge1xyXG4gICAgICAgIHdpbmRvd1tcInB1dF9iYWxsXCJdID0gZnVuY3Rpb24oKSB7IHN0YXRlTWFuYWdlci5wdXRfYmFsbCgpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcInN0ZXBcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLnN0ZXAoKTsgfTtcclxuICAgICAgICB3aW5kb3dbXCJ0dXJuX3JpZ2h0XCJdID0gZnVuY3Rpb24oKSB7IHN0YXRlTWFuYWdlci50dXJuX3JpZ2h0KCk7IH07XHJcbiAgICAgICAgd2luZG93W1widHVybl9sZWZ0XCJdID0gZnVuY3Rpb24oKSB7IHN0YXRlTWFuYWdlci50dXJuX2xlZnQoKTsgfTtcclxuICAgICAgICB3aW5kb3dbXCJ0dXJuX2Fyb3VuZFwiXSA9IGZ1bmN0aW9uKCkgeyBzdGF0ZU1hbmFnZXIudHVybl9hcm91bmQoKTsgfTtcclxuICAgICAgICB3aW5kb3dbXCJyZW5kZXJcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLnJlbmRlcigpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcInJlc2V0XCJdID0gZnVuY3Rpb24oKSB7IHN0YXRlTWFuYWdlci5yZXNldCgpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcImluX2Zyb250X29mX3dhbGxcIl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHN0YXRlTWFuYWdlci5pbl9mcm9udF9vZl93YWxsKCk7IH07XHJcbiAgICAgICAgd2luZG93W1wibWFrZV9zdHJpbmdfd2l0aF9iYWxsc1wiXSA9IGZ1bmN0aW9uKCkgeyBzdGF0ZU1hbmFnZXIubWFrZV9zdHJpbmdfd2l0aF9iYWxscygpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcIm9uX2JhbGxcIl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHN0YXRlTWFuYWdlci5vbl9iYWxsKCk7IH07XHJcbiAgICAgICAgd2luZG93W1wiZ2V0X2JhbGxcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLmdldF9iYWxsKCk7IH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX2JhbGwoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIFdvcmxkLm9uX2JhbGwocHJldldvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGF1c2UobWlsbGlzZWNvbmRzKSB7XHJcbiAgICAgICAgdmFyIGR0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICB3aGlsZSAoPGFueT4oPGFueT4obmV3IERhdGUoKSkgLSA8YW55PmR0KSA8PSBtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICAgICAgIC8qIERvIG5vdGhpbmcgKi8gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIG1ha2Vfc3RyaW5nX3dpdGhfYmFsbHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwcmV2V29ybGQgPSBsYXN0V29ybGRTbmFwc2hvdC52YWx1ZTtcclxuICAgICAgICB2YXIgbmV4dFdvcmxkID0gV29ybGQubWFrZV9zdHJpbmdfd2l0aF9iYWxscyhwcmV2V29ybGQpO1xyXG4gICAgICAgIHRoaXMuc25hcHNob3RzLnB1c2goeyBoYXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG5leHRXb3JsZCB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHB1dF9iYWxsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZXb3JsZCA9IGxhc3RXb3JsZFNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgIHZhciBuZXh0V29ybGQgPSBXb3JsZC5wdXRfYmFsbChwcmV2V29ybGQpO1xyXG4gICAgICAgIHRoaXMuc25hcHNob3RzLnB1c2goeyBoYXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG5leHRXb3JsZCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2JhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgdmFyIG5leHRXb3JsZCA9IFdvcmxkLmdldF9iYWxsKHByZXZXb3JsZCk7XHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdHMucHVzaCh7IGhhc1ZhbHVlOiB0cnVlLCB2YWx1ZTogbmV4dFdvcmxkIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyU25hcHNob3RzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNuYXBzaG90Q2xvbmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGFzdFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdENsb25lcy5wb3AoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY2FudmFzXHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJykuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAvLyBkcmF3IG5leHQgc25hcHNob3RcclxuICAgICAgICAgICAgaWYgKGxhc3RTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzLnJlbmRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsUGFkZGluZzogMTMsXHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGQ6IGxhc3RTbmFwc2hvdC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChsYXN0U25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBnbyB0byBuZXh0IHNuYXBzaG90XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU25hcHNob3RzKCk7XHJcbiAgICAgICAgfSwgdGhpcy5yZW5kZXJEZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkgeyBcclxuICAgICAgICB0aGlzLnNuYXBzaG90cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmxkKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNuYXBzaG90cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHRoaXMuc25hcHNob3RDbG9uZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuc25hcHNob3RzKSlcclxuXHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdENsb25lcy5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyU25hcHNob3RzKCk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RhdGUtbWFuYWdlci50cyIsImltcG9ydCAqIGFzIE1vZGVscyBmcm9tICcuL21vZGVscydcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyT3B0aW9ucyB7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxyXG4gICAgY2VsbFBhZGRpbmc6IG51bWJlcixcclxuICAgIHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b0NhbnZhc0Nvb3JkaW5hdGVzKHBvczogTW9kZWxzLlBvc2l0aW9uLCBjZWxsU2l6ZTogbnVtYmVyLCBwYWRkaW5nOiBudW1iZXIpIDogTW9kZWxzLlBvc2l0aW9uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgWDogcGFkZGluZyArIHBvcy5YICogKGNlbGxTaXplICsgcGFkZGluZyksXHJcbiAgICAgICAgWTogcGFkZGluZyArIHBvcy5ZICogKGNlbGxTaXplICsgcGFkZGluZylcclxuICAgIH1cclxufVxyXG5cclxudmFyIGFycm93ID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmODtiYXNlNjQsUEQ5NGJXd2dkbVZ5YzJsdmJqMGlNUzR3SWlCbGJtTnZaR2x1WnowaWFYTnZMVGc0TlRrdE1TSS9QZ284SVMwdElFZGxibVZ5WVhSdmNqb2dRV1J2WW1VZ1NXeHNkWE4wY21GMGIzSWdNVGt1TUM0d0xDQlRWa2NnUlhod2IzSjBJRkJzZFdjdFNXNGdMaUJUVmtjZ1ZtVnljMmx2YmpvZ05pNHdNQ0JDZFdsc1pDQXdLU0FnTFMwK0NqeHpkbWNnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JaUI0Yld4dWN6cDRiR2x1YXowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzk0YkdsdWF5SWdkbVZ5YzJsdmJqMGlNUzR4SWlCcFpEMGlRMkZ3WVY4eElpQjRQU0l3Y0hnaUlIazlJakJ3ZUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFV4TGpZek5pQTFNUzQyTXpZaUlITjBlV3hsUFNKbGJtRmliR1V0WW1GamEyZHliM1Z1WkRwdVpYY2dNQ0F3SURVeExqWXpOaUExTVM0Mk16WTdJaUI0Yld3NmMzQmhZMlU5SW5CeVpYTmxjblpsSWlCM2FXUjBhRDBpTVRad2VDSWdhR1ZwWjJoMFBTSXhObkI0SWo0S1BIQmhkR2dnWkQwaVRUVXhMak0xTXl3d0xqa3hOR010TUM0eU9UVXRNQzR6TURVdE1DNDNOUzB3TGpNNUxURXVNVE0xTFRBdU1qRXpUREF1TlRnekxESXpMalE0TVdNdE1DNHpPVGtzTUM0eE9EUXRNQzQyTXpJc01DNDJNRFV0TUM0MU56UXNNUzR3TkRFZ0lITXdMak01TXl3d0xqYzRNaXd3TGpneU5pd3dMamcxTkd3eU1pNHlOak1zTXk0M016RnNNaTQxTkRVc01qRXVNRE00WXpBdU1EVTBMREF1TkRNNExEQXVNemc1TERBdU56a3hMREF1T0RJMExEQXVPRFkxWXpBdU1EVTNMREF1TURFc01DNHhNVE1zTUM0d01UVXNNQzR4Tmprc01DNHdNVFVnSUdNd0xqTTNOU3d3TERBdU56STJMVEF1TWpFeExEQXVPRGsyTFRBdU5UVTJiREkwTFRRNExqUXhOVU0xTVM0M01pd3hMalkzTlN3MU1TNDJORGdzTVM0eU1UZ3NOVEV1TXpVekxEQXVPVEUwZWlCTk1qY3VNakkyTERRMkxqVTRNbXd0TWk0eU16SXRNVGd1TkRVM0lDQmpMVEF1TURVMExUQXVORFF0TUM0ek9URXRNQzQzT1RNdE1DNDRNamd0TUM0NE5qWk1OQzR6TnpRc01qTXVPVFF4VERRNExqUTROU3d6TGpZNU4wd3lOeTR5TWpZc05EWXVOVGd5ZWlJZ1ptbHNiRDBpSXpBd01EQXdNQ0l2UGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOFp6NEtQQzluUGdvOEwzTjJaejRLXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKG9wdGlvbnM6IFJlbmRlck9wdGlvbnMpIHtcclxuICAgIHZhciBjYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHZhciB3b3JsZCA9IG9wdGlvbnMud29ybGQ7XHJcbiAgICB2YXIgaGVpZ2h0ID0gd29ybGQuaGVpZ2h0O1xyXG4gICAgdmFyIHdpZHRoID0gd29ybGQud2lkdGg7XHJcbiAgICB2YXIgY2VsbFBhZGRpbmcgPSBvcHRpb25zLmNlbGxQYWRkaW5nO1xyXG4gICAgdmFyIGNlbGxTaXplID0gd29ybGQuY2VsbFNpemU7XHJcblxyXG4gICAgZm9yKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yKHZhciB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSB3b3JsZC5zdGF0ZVt5XVt4XTtcclxuICAgICAgICAgICAgdmFyIGNhbnZhc1Bvc2l0aW9uID0gdG9DYW52YXNDb29yZGluYXRlcyhjZWxsLnBvc2l0aW9uLCBjZWxsU2l6ZSwgY2VsbFBhZGRpbmcpO1xyXG4gICAgICAgICAgICB2YXIgY2VsbFggPSBjYW52YXNQb3NpdGlvbi5YO1xyXG4gICAgICAgICAgICB2YXIgY2VsbFkgPSBjYW52YXNQb3NpdGlvbi5ZO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNlbGxUeXBlID0gY2VsbC5jb250ZW50LnR5cGU7XHJcbiAgICAgICAgICAgIGlmIChjZWxsVHlwZSA9PSBcImVtcHR5XCIpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgICBjdHguYXJjKGNlbGxYLCBjZWxsWSwgMSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJiYWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgICAgICAgICAgIGN0eC5hcmMoY2VsbFgsIGNlbGxZLCA1LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGxUeXBlID09IFwid2FsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibHVlXCI7XHJcbiAgICAgICAgICAgICAgICBjdHguYXJjKGNlbGxYLCBjZWxsWSwgNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGN0eC5maWxsUmVjdChjZWxsWCwgY2VsbFksIGNlbGxTaXplLCBjZWxsU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRyYXcgcGxheWVyXHJcbiAgICB2YXIgcGxheWVyUG9zaXRpb24gPSB0b0NhbnZhc0Nvb3JkaW5hdGVzKHdvcmxkLnBsYXllci5wb3NpdGlvbiwgY2VsbFNpemUsIGNlbGxQYWRkaW5nKTtcclxuICAgIHZhciBwbGF5ZXJYID0gcGxheWVyUG9zaXRpb24uWDtcclxuICAgIHZhciBwbGF5ZXJZID0gcGxheWVyUG9zaXRpb24uWTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgY3R4LmFyYyhwbGF5ZXJYLCBwbGF5ZXJZLCA2LCAwLCAyLjAgKiBNYXRoLlBJKTtcclxuICAgIGN0eC5maWxsKCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVuZGVyLnRzIiwiaW1wb3J0ICogYXMgQ3JlYXRlIGZyb20gJy4vY3JlYXRlJ1xyXG5pbXBvcnQgKiBhcyBNb2RlbHMgZnJvbSAnLi9tb2RlbHMnXHJcbmltcG9ydCB7IE1heWJlIH0gZnJvbSAnLi9tYXliZSdcclxuXHJcbmZ1bmN0aW9uIGNsb25lPFQ+KHg6IFQpIDogVCB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh4KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0dXJuX2xlZnQod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IE1vZGVscy5Xb3JsZFN0YXRlIHtcclxuICAgIHdvcmxkID0gY2xvbmUod29ybGQpO1xyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHdvcmxkLnBsYXllci5kaXJlY3Rpb247XHJcbiAgICBpZiAoZGlyZWN0aW9uID09IFwibm9ydGhcIikge1xyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcIndlc3RcIjtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IFwic291dGhcIikge1xyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcImVhc3RcIjtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IFwid2VzdFwiKSB7XHJcbiAgICAgICAgd29ybGQucGxheWVyLmRpcmVjdGlvbiA9IFwic291dGhcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZGlyZWN0aW9uID09IFwiZWFzdFwiXHJcbiAgICAgICAgd29ybGQucGxheWVyLmRpcmVjdGlvbiA9IFwibm9ydGhcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB3b3JsZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHR1cm5fcmlnaHQod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IE1vZGVscy5Xb3JsZFN0YXRlIHtcclxuICAgIHdvcmxkID0gY2xvbmUod29ybGQpO1xyXG4gICAgdmFyIGRpcmVjdGlvbiA9IHdvcmxkLnBsYXllci5kaXJlY3Rpb247XHJcbiAgICBpZiAoZGlyZWN0aW9uID09IFwibm9ydGhcIikge1xyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcImVhc3RcIjtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IFwic291dGhcIikge1xyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcIndlc3RcIjtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IFwid2VzdFwiKSB7XHJcbiAgICAgICAgd29ybGQucGxheWVyLmRpcmVjdGlvbiA9IFwibm9ydGhcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZGlyZWN0aW9uID09IFwiZWFzdFwiXHJcbiAgICAgICAgd29ybGQucGxheWVyLmRpcmVjdGlvbiA9IFwic291dGhcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB3b3JsZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHR1cm5fYXJvdW5kKHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZSkgOiBNb2RlbHMuV29ybGRTdGF0ZSB7XHJcbiAgICByZXR1cm4gdHVybl9sZWZ0KHR1cm5fbGVmdCh3b3JsZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHV0X2JhbGwod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IE1vZGVscy5Xb3JsZFN0YXRlIHtcclxuICAgIHdvcmxkID0gY2xvbmUod29ybGQpO1xyXG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHdvcmxkLnBsYXllci5wb3NpdGlvbjtcclxuICAgIHZhciB4ID0gY3VycmVudFBvc2l0aW9uLlg7XHJcbiAgICB2YXIgeSA9IGN1cnJlbnRQb3NpdGlvbi5ZO1xyXG4gICAgd29ybGQuc3RhdGVbeV1beF0gPSBDcmVhdGUuYmFsbCh4LCB5KTtcclxuICAgIHJldHVybiB3b3JsZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdhbGxzKHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZSkgOiBNb2RlbHMuV29ybGRTdGF0ZSB7XHJcbiAgICB3b3JsZCA9IGNsb25lKHdvcmxkKTtcclxuICAgIHZhciBoZWlnaHQgPSB3b3JsZC5oZWlnaHQ7XHJcbiAgICB2YXIgd2lkdGggPSB3b3JsZC53aWR0aDtcclxuXHJcbiAgICBmb3IodmFyIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBmb3IodmFyIHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHggPT0gMCB8fCB4ID09IHdpZHRoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgd29ybGQuc3RhdGVbeV1beF0gPSBDcmVhdGUud2FsbCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeSA9PSAwIHx8IHkgPT0gaGVpZ2h0IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgd29ybGQuc3RhdGVbeV1beF0gPSBDcmVhdGUud2FsbCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gd29ybGQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRfYmFsbCh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogTW9kZWxzLldvcmxkU3RhdGUge1xyXG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHdvcmxkLnBsYXllci5wb3NpdGlvbjtcclxuICAgIHZhciB4ID0gY3VycmVudFBvc2l0aW9uLlg7XHJcbiAgICB2YXIgeSA9IGN1cnJlbnRQb3NpdGlvbi5ZO1xyXG4gICAgdmFyIGN1cnJlbnRDZWxsID0gd29ybGQuc3RhdGVbeV1beF07XHJcbiAgICBpZiAoY3VycmVudENlbGwuY29udGVudC50eXBlID09IFwiYmFsbFwiKSB7XHJcbiAgICAgICAgd29ybGQgPSBjbG9uZSh3b3JsZCk7XHJcbiAgICAgICAgd29ybGQuc3RhdGVbeV1beF0gPSBDcmVhdGUuZW1wdHlDZWxsKHgsIHkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdvcmxkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5fZnJvbnRfb2Zfd2FsbCh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogYm9vbGVhbiB7XHJcbiAgICB3b3JsZCA9IGNsb25lKHdvcmxkKTtcclxuICAgIHZhciB4ID0gd29ybGQucGxheWVyLnBvc2l0aW9uLlg7XHJcbiAgICB2YXIgeSA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5ZO1xyXG4gICAgdmFyIHdpZHRoID0gd29ybGQud2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gd29ybGQuaGVpZ2h0O1xyXG4gICAgdmFyIGN1cnJlbnRDZWxsID0gd29ybGQuc3RhdGVbeV1beF07XHJcblxyXG4gICAgaWYgKHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPT0gXCJzb3V0aFwiKSB7XHJcbiAgICAgICAgaWYgKHkgPT0gaGVpZ2h0IC0gMSkge1xyXG4gICAgICAgICAgICAvLyBhbHJlYWR5IGF0IHRoZSBtYXggaGVpZ2h0XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25ZID0geSArIDE7XHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25YID0geDtcclxuICAgICAgICByZXR1cm4gd29ybGQuc3RhdGVbbmV4dENlbGxQb3NpdGlvblldW25leHRDZWxsUG9zaXRpb25YXS5jb250ZW50LnR5cGUgPT0gXCJ3YWxsXCI7XHJcblxyXG4gICAgfSBlbHNlIGlmICh3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID09IFwibm9ydGhcIikge1xyXG4gICAgICAgIGlmICh5ID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbmV4dENlbGxQb3NpdGlvblkgPSB5IC0gMTtcclxuICAgICAgICB2YXIgbmV4dENlbGxQb3NpdGlvblggPSB4O1xyXG4gICAgICAgIHJldHVybiB3b3JsZC5zdGF0ZVtuZXh0Q2VsbFBvc2l0aW9uWV1bbmV4dENlbGxQb3NpdGlvblhdLmNvbnRlbnQudHlwZSA9PSBcIndhbGxcIjtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPT0gXCJ3ZXN0XCIpIHtcclxuICAgICAgICBpZiAoeCA9PSAwKSB7XHJcbiAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbmV4dENlbGxQb3NpdGlvblkgPSB5O1xyXG4gICAgICAgIHZhciBuZXh0Q2VsbFBvc2l0aW9uWCA9IHggLSAxO1xyXG4gICAgICAgIHJldHVybiB3b3JsZC5zdGF0ZVtuZXh0Q2VsbFBvc2l0aW9uWV1bbmV4dENlbGxQb3NpdGlvblhdLmNvbnRlbnQudHlwZSA9PSBcIndhbGxcIjtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPT0gXCJlYXN0XCIgXHJcbiAgICAgICAgaWYgKHggPT0gd2lkdGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25ZID0geTtcclxuICAgICAgICB2YXIgbmV4dENlbGxQb3NpdGlvblggPSB4ICsgMTtcclxuICAgICAgICByZXR1cm4gd29ybGQuc3RhdGVbbmV4dENlbGxQb3NpdGlvblldW25leHRDZWxsUG9zaXRpb25YXS5jb250ZW50LnR5cGUgPT0gXCJ3YWxsXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbl9iYWxsKHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZSkgOiBib29sZWFuIHtcclxuICAgIHZhciB4ID0gd29ybGQucGxheWVyLnBvc2l0aW9uLlg7XHJcbiAgICB2YXIgeSA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5ZO1xyXG5cclxuICAgIHJldHVybiB3b3JsZC5zdGF0ZVt5XVt4XS5jb250ZW50LnR5cGUgPT09IFwiYmFsbFwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZV9zdHJpbmdfd2l0aF9iYWxscyh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogTW9kZWxzLldvcmxkU3RhdGUge1xyXG4gICAgdmFyIGhlaWdodCA9IHdvcmxkLmhlaWdodDtcclxuICAgIHZhciB3aWR0aCA9IHdvcmxkLndpZHRoO1xyXG5cclxuICAgIGZvcih2YXIgeSA9IDE7IHkgPCBoZWlnaHQgLSAxOyB5KyspIHtcclxuICAgICAgICBmb3IodmFyIHggPSAxOyB4IDwgd2lkdGggLSAxOyB4KyspIHtcclxuICAgICAgICAgICAgaWYgKHggPT0gMSB8fCB4ID09IHdpZHRoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgd29ybGQuc3RhdGVbeV1beF0gPSBDcmVhdGUuYmFsbCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeSA9PSAxIHx8IHkgPT0gaGVpZ2h0IC0gMikge1xyXG4gICAgICAgICAgICAgICAgd29ybGQuc3RhdGVbeV1beF0gPSBDcmVhdGUuYmFsbCh4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgcmV0dXJuIHdvcmxkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RlcCh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogTW9kZWxzLldvcmxkU3RhdGUge1xyXG4gICAgd29ybGQgPSBjbG9uZSh3b3JsZCk7XHJcbiAgICB2YXIgeCA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5YO1xyXG4gICAgdmFyIHkgPSB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWTtcclxuICAgIHZhciB3aWR0aCA9IHdvcmxkLndpZHRoO1xyXG4gICAgdmFyIGhlaWdodCA9IHdvcmxkLmhlaWdodDtcclxuICAgIHZhciBjdXJyZW50Q2VsbCA9IHdvcmxkLnN0YXRlW3ldW3hdO1xyXG5cclxuICAgIGlmIChpbl9mcm9udF9vZl93YWxsKHdvcmxkKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBjcmFzaGVkIGludG8gd2FsbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod29ybGQucGxheWVyLmRpcmVjdGlvbiA9PSBcInNvdXRoXCIpIHtcclxuICAgICAgICBpZiAoeSA9PSBoZWlnaHQgLSAxKSB7XHJcbiAgICAgICAgICAgIC8vIGFscmVhZHkgYXQgdGhlIG1heCBoZWlnaHRcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIG91dCBvZiBib3VuZHNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWSA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5ZICsgMTtcclxuICAgICAgICByZXR1cm4gd29ybGQ7XHJcblxyXG4gICAgfSBlbHNlIGlmICh3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID09IFwibm9ydGhcIikge1xyXG4gICAgICAgIGlmICh5ID09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIG91dCBvZiBib3VuZHNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWSA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5ZIC0gMTtcclxuICAgICAgICByZXR1cm4gd29ybGQ7XHJcblxyXG4gICAgfSBlbHNlIGlmICh3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID09IFwid2VzdFwiKSB7XHJcbiAgICAgICAgaWYgKHggPT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF5ZXIgb3V0IG9mIGJvdW5kc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdvcmxkLnBsYXllci5wb3NpdGlvbi5YID0gd29ybGQucGxheWVyLnBvc2l0aW9uLlggLSAxO1xyXG4gICAgICAgIHJldHVybiB3b3JsZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gd29ybGQucGxheWVyLmRpcmVjdGlvbiA9PSBcImVhc3RcIiBcclxuICAgICAgICBpZiAoeCA9PSB3aWR0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxheWVyIG91dCBvZiBib3VuZHNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWCA9ICB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWCArIDE7XHJcbiAgICAgICAgcmV0dXJuIHdvcmxkO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dvcmxkLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==