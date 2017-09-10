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
    renderDelay: 200
});
stateManager.makeInstanceMethodGlobal(stateManager);
stateManager.initializeWorld();
stateManager.render();
var btnRun = document.getElementById("btnRun");
btnRun.addEventListener("click", function (ev) {
    var code = window["editor"].getValue();
    try {
        eval(code);
        stateManager.render();
    }
    catch (ex) {
        alert(ex);
    }
});
var btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", function (ev) {
    stateManager.reset();
});


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
        this.validSnapshots = [];
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
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        var maybeNext = World.step(prevWorld);
        this.snapshots.push(maybeNext);
    };
    StateManager.prototype.in_front_of_wall = function () {
        if (this.hasError) {
            return true;
        }
        var lastWorldSnapshot = this.snapshots[this.snapshots.length - 1];
        if (!lastWorldSnapshot.hasValue) {
            alert(lastWorldSnapshot.error);
            this.hasError = true;
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        return World.in_front_of_wall(prevWorld);
    };
    StateManager.prototype.makeInstanceMethodGlobal = function (stateManager) {
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
            return;
        }
        var prevWorld = lastWorldSnapshot.value;
        return World.on_ball(prevWorld);
    };
    StateManager.prototype.make_string_with_balls = function () {
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
        if (this.validSnapshots.length === 0) {
            return;
        }
        var lastSnapshot = this.validSnapshots.pop();
        setTimeout(function () {
            // clear canvas
            _this.canvas.getContext('2d').clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            // draw next snapshot
            Canvas.render({
                canvas: _this.canvas,
                cellPadding: 13,
                world: lastSnapshot
            });
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
        this.validSnapshots = this.snapshots
            .filter(function (snapshot) { return snapshot.hasValue; })
            .map(function (snapshot) { return snapshot.value; });
        this.validSnapshots.reverse();
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
    if (world.player.direction == "south") {
        if (y == height - 1) {
            // already at the max height
            return { hasValue: false, error: "Player out of bounds" };
        }
        world.player.position.Y = world.player.position.Y + 1;
        return { hasValue: true, value: world };
    }
    else if (world.player.direction == "north") {
        if (y == 0) {
            return { hasValue: false, error: "Player out of bounds" };
        }
        world.player.position.Y = world.player.position.Y - 1;
        return { hasValue: true, value: world };
    }
    else if (world.player.direction == "west") {
        if (x == 0) {
            return { hasValue: false, error: "Player out of bounds" };
        }
        world.player.position.X = world.player.position.X - 1;
        return { hasValue: true, value: world };
    }
    else {
        // world.player.direction == "east" 
        if (x == width - 1) {
            return { hasValue: false, error: "Player out of bounds" };
        }
        world.player.position.X = world.player.position.X + 1;
        return { hasValue: true, value: world };
    }
}
exports.step = step;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2NkZWVlNGM4MjEwYTYwYTFiZmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUtbWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUMzREEsa0JBQXlCLENBQVMsRUFBRSxDQUFTO0lBQ3pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFGRCw0QkFFQztBQUVELGNBQXFCLENBQVMsRUFBRSxDQUFTO0lBQ3JDLElBQUksSUFBSSxHQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFHLENBQUM7SUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFIRCxvQkFHQztBQUVELGNBQXFCLENBQVMsRUFBRSxDQUFTO0lBQ3JDLElB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QUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDO1FBQzlELENBQUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0FBQ0wsQ0FBQztBQXpDRCxvQkF5Q0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2NkZWVlNGM4MjEwYTYwYTFiZmQiLCJpbXBvcnQgeyBXb3JsZFN0YXRlLCBFbXB0eUNlbGwsIFBvc2l0aW9uLCBDZWxsLCBDZWxsQ29udGVudCwgQmFsbCwgV2FsbCB9IGZyb20gJy4vbW9kZWxzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSA6IFBvc2l0aW9uIHtcclxuICAgIHJldHVybiB7IFg6IHgsIFk6IHkgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJhbGwoeDogbnVtYmVyLCB5OiBudW1iZXIpIDogQ2VsbCB7XHJcbiAgICB2YXIgYmFsbCA6IEJhbGwgPSB7IHR5cGU6IFwiYmFsbFwiLCBjb2xvcjogXCJsaWdodGdyZWVuXCIgIH07XHJcbiAgICByZXR1cm4gY2VsbCh4LCB5LCBiYWxsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhbGwoeDogbnVtYmVyLCB5OiBudW1iZXIpIDogQ2VsbCB7XHJcbiAgICB2YXIgd2FsbCA6IFdhbGwgPSB7IHR5cGU6IFwid2FsbFwiIH07XHJcbiAgICByZXR1cm4gY2VsbCh4LCB5LCB3YWxsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNlbGwoeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbnRlbnQ6IENlbGxDb250ZW50KSA6IENlbGwge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24oeCwgeSksXHJcbiAgICAgICAgY29udGVudDogY29udGVudFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1wdHlDZWxsKHg6IG51bWJlciwgeTogbnVtYmVyLCkgOiBDZWxsIHtcclxuICAgIHZhciBlbXB0eSA9ICB7IHR5cGU6IFwiZW1wdHlcIiB9O1xyXG4gICAgcmV0dXJuIGNlbGwoeCwgeSwgZW1wdHkpO1xyXG59XHJcblxyXG5cclxuXHJcbi8qIENyZWF0ZXMgYW4gZW1wdHkgd29ybGQgd2l0aCBpbml0aWFsIHBsYXllciBwb3NpdGlvbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd29ybGQoaGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGNlbGxTaXplOiBudW1iZXIpIDogV29ybGRTdGF0ZSB7XHJcbiAgICB2YXIgd29ybGRNYXAgOiBDZWxsW11bXSA9IG5ldyBBcnJheShoZWlnaHQpO1xyXG5cclxuICAgIGZvcih2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHZhciByb3cgPSAgbmV3IEFycmF5PENlbGw+KHdpZHRoKTtcclxuICAgICAgICBmb3IodmFyIHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgICAgICByb3dbeF0gPSBlbXB0eUNlbGwoeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdvcmxkTWFwW3ldID0gcm93O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdGU6IHdvcmxkTWFwLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICBjZWxsU2l6ZTogY2VsbFNpemUsXHJcbiAgICAgICAgcGxheWVyOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBcInJlZFwiLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IFwiZWFzdFwiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24oMCwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY3JlYXRlLnRzIiwiaW1wb3J0IHsgQmFsbCwgV29ybGRTdGF0ZSwgUGxheWVyLCBFbXB0eUNlbGwsIFdhbGwgfSBmcm9tICcuL21vZGVscydcclxuaW1wb3J0ICogYXMgQ3JlYXRlIGZyb20gJy4vY3JlYXRlJ1xyXG5pbXBvcnQgKiBhcyBDYW52YXMgZnJvbSAnLi9yZW5kZXInXHJcbmltcG9ydCAqIGFzIFdvcmxkIGZyb20gJy4vd29ybGQnXHJcbmltcG9ydCB7IFN0YXRlTWFuYWdlciwgU3RhdGVNYW5hZ2VyT3B0aW9ucyB9IGZyb20gJy4vc3RhdGUtbWFuYWdlcidcclxuXHJcbnZhciBzdGF0ZU1hbmFnZXIgPSBuZXcgU3RhdGVNYW5hZ2VyKHtcclxuICAgIGNhbnZhczogPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29ybGRNYXBcIiksXHJcbiAgICByZW5kZXJEZWxheTogMjAwXHJcbn0pO1xyXG5cclxuc3RhdGVNYW5hZ2VyLm1ha2VJbnN0YW5jZU1ldGhvZEdsb2JhbChzdGF0ZU1hbmFnZXIpO1xyXG5zdGF0ZU1hbmFnZXIuaW5pdGlhbGl6ZVdvcmxkKCk7XHJcbnN0YXRlTWFuYWdlci5yZW5kZXIoKTtcclxuXHJcbnZhciBidG5SdW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0blJ1blwiKTtcclxuYnRuUnVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXYpID0+IHtcclxuICAgIHZhciBjb2RlID0gd2luZG93W1wiZWRpdG9yXCJdLmdldFZhbHVlKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGV2YWwoY29kZSk7XHJcbiAgICAgICAgc3RhdGVNYW5hZ2VyLnJlbmRlcigpO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICBhbGVydChleCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIGJ0blJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5SZXNldFwiKTtcclxuYnRuUmVzZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldikgPT4ge1xyXG4gICAgc3RhdGVNYW5hZ2VyLnJlc2V0KCk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLnRzIiwiaW1wb3J0ICogYXMgTW9kZWxzIGZyb20gJy4vbW9kZWxzJ1xyXG5pbXBvcnQgKiBhcyBDcmVhdGUgZnJvbSAnLi9jcmVhdGUnXHJcbmltcG9ydCAqIGFzIENhbnZhcyBmcm9tICcuL3JlbmRlcidcclxuaW1wb3J0ICogYXMgV29ybGQgZnJvbSAnLi93b3JsZCdcclxuaW1wb3J0IHsgTWF5YmUgfSBmcm9tICcuL21heWJlJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZU1hbmFnZXJPcHRpb25zIHtcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXHJcbiAgICByZW5kZXJEZWxheTogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzbmFwc2hvdHMgOiBNYXliZTxNb2RlbHMuV29ybGRTdGF0ZT5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBoYXNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB2YWxpZFNuYXBzaG90cyA6IE1vZGVscy5Xb3JsZFN0YXRlW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmVuZGVyRGVsYXk6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogU3RhdGVNYW5hZ2VyT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJEZWxheSA9IG9wdGlvbnMucmVuZGVyRGVsYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemVXb3JsZCgpIHtcclxuICAgICAgICB2YXIgZW1wdHlXb3JsZCA9IENyZWF0ZS53b3JsZCgyMCwgMzAsIDUpO1xyXG4gICAgICAgIGVtcHR5V29ybGQucGxheWVyLnBvc2l0aW9uLlggID0gMTtcclxuICAgICAgICBlbXB0eVdvcmxkLnBsYXllci5wb3NpdGlvbi5ZICA9IDE7IFxyXG4gICAgICAgIHZhciB3aXRoV2FsbHMgPSBXb3JsZC5jcmVhdGVXYWxscyhlbXB0eVdvcmxkKTtcclxuICAgICAgICB0aGlzLnNuYXBzaG90cy5wdXNoKHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiB3aXRoV2FsbHMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHR1cm5fcmlnaHQoKSB7IFxyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZXb3JsZCA9IGxhc3RXb3JsZFNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgIHZhciBuZXh0V29ybGQgPSBXb3JsZC50dXJuX3JpZ2h0KHByZXZXb3JsZCk7XHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdHMucHVzaCh7IGhhc1ZhbHVlOiB0cnVlLCB2YWx1ZTogbmV4dFdvcmxkIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0dXJuX2xlZnQoKSB7IFxyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZXb3JsZCA9IGxhc3RXb3JsZFNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgIHZhciBuZXh0V29ybGQgPSBXb3JsZC50dXJuX2xlZnQocHJldldvcmxkKTtcclxuICAgICAgICB0aGlzLnNuYXBzaG90cy5wdXNoKHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiBuZXh0V29ybGQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHR1cm5fYXJvdW5kKCkgeyBcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGFzdFdvcmxkU25hcHNob3QgPSB0aGlzLnNuYXBzaG90c1t0aGlzLnNuYXBzaG90cy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAoIWxhc3RXb3JsZFNuYXBzaG90Lmhhc1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGxhc3RXb3JsZFNuYXBzaG90LmVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwcmV2V29ybGQgPSBsYXN0V29ybGRTbmFwc2hvdC52YWx1ZTtcclxuICAgICAgICB2YXIgbmV4dFdvcmxkID0gV29ybGQudHVybl9hcm91bmQocHJldldvcmxkKTtcclxuICAgICAgICB0aGlzLnNuYXBzaG90cy5wdXNoKHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiBuZXh0V29ybGQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0ZXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgdmFyIG1heWJlTmV4dCA9IFdvcmxkLnN0ZXAocHJldldvcmxkKTtcclxuICAgICAgICB0aGlzLnNuYXBzaG90cy5wdXNoKG1heWJlTmV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluX2Zyb250X29mX3dhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIFdvcmxkLmluX2Zyb250X29mX3dhbGwocHJldldvcmxkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFrZUluc3RhbmNlTWV0aG9kR2xvYmFsKHN0YXRlTWFuYWdlcjogU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgd2luZG93W1wicHV0X2JhbGxcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLnB1dF9iYWxsKCk7IH07XHJcbiAgICAgICAgd2luZG93W1wic3RlcFwiXSA9IGZ1bmN0aW9uKCkgeyBzdGF0ZU1hbmFnZXIuc3RlcCgpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcInR1cm5fcmlnaHRcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLnR1cm5fcmlnaHQoKTsgfTtcclxuICAgICAgICB3aW5kb3dbXCJ0dXJuX2xlZnRcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLnR1cm5fbGVmdCgpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcInR1cm5fYXJvdW5kXCJdID0gZnVuY3Rpb24oKSB7IHN0YXRlTWFuYWdlci50dXJuX2Fyb3VuZCgpOyB9O1xyXG4gICAgICAgIHdpbmRvd1tcInJlbmRlclwiXSA9IGZ1bmN0aW9uKCkgeyBzdGF0ZU1hbmFnZXIucmVuZGVyKCk7IH07XHJcbiAgICAgICAgd2luZG93W1wicmVzZXRcIl0gPSBmdW5jdGlvbigpIHsgc3RhdGVNYW5hZ2VyLnJlc2V0KCk7IH07XHJcbiAgICAgICAgd2luZG93W1wiaW5fZnJvbnRfb2Zfd2FsbFwiXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3RhdGVNYW5hZ2VyLmluX2Zyb250X29mX3dhbGwoKTsgfTtcclxuICAgICAgICB3aW5kb3dbXCJtYWtlX3N0cmluZ193aXRoX2JhbGxzXCJdID0gZnVuY3Rpb24oKSB7IHN0YXRlTWFuYWdlci5tYWtlX3N0cmluZ193aXRoX2JhbGxzKCk7IH07XHJcbiAgICAgICAgd2luZG93W1wib25fYmFsbFwiXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3RhdGVNYW5hZ2VyLm9uX2JhbGwoKTsgfTtcclxuICAgICAgICB3aW5kb3dbXCJnZXRfYmFsbFwiXSA9IGZ1bmN0aW9uKCkgeyBzdGF0ZU1hbmFnZXIuZ2V0X2JhbGwoKTsgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25fYmFsbCgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIFdvcmxkLm9uX2JhbGwocHJldldvcmxkKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtYWtlX3N0cmluZ193aXRoX2JhbGxzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYXN0V29ybGRTbmFwc2hvdCA9IHRoaXMuc25hcHNob3RzW3RoaXMuc25hcHNob3RzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICghbGFzdFdvcmxkU25hcHNob3QuaGFzVmFsdWUpIHtcclxuICAgICAgICAgICAgYWxlcnQobGFzdFdvcmxkU25hcHNob3QuZXJyb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHByZXZXb3JsZCA9IGxhc3RXb3JsZFNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgIHZhciBuZXh0V29ybGQgPSBXb3JsZC5tYWtlX3N0cmluZ193aXRoX2JhbGxzKHByZXZXb3JsZCk7XHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdHMucHVzaCh7IGhhc1ZhbHVlOiB0cnVlLCB2YWx1ZTogbmV4dFdvcmxkIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcHV0X2JhbGwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxhc3RXb3JsZFNuYXBzaG90ID0gdGhpcy5zbmFwc2hvdHNbdGhpcy5zbmFwc2hvdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKCFsYXN0V29ybGRTbmFwc2hvdC5oYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChsYXN0V29ybGRTbmFwc2hvdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcHJldldvcmxkID0gbGFzdFdvcmxkU25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgdmFyIG5leHRXb3JsZCA9IFdvcmxkLnB1dF9iYWxsKHByZXZXb3JsZCk7XHJcbiAgICAgICAgdGhpcy5zbmFwc2hvdHMucHVzaCh7IGhhc1ZhbHVlOiB0cnVlLCB2YWx1ZTogbmV4dFdvcmxkIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfYmFsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGFzdFdvcmxkU25hcHNob3QgPSB0aGlzLnNuYXBzaG90c1t0aGlzLnNuYXBzaG90cy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAoIWxhc3RXb3JsZFNuYXBzaG90Lmhhc1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGxhc3RXb3JsZFNuYXBzaG90LmVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwcmV2V29ybGQgPSBsYXN0V29ybGRTbmFwc2hvdC52YWx1ZTtcclxuICAgICAgICB2YXIgbmV4dFdvcmxkID0gV29ybGQuZ2V0X2JhbGwocHJldldvcmxkKTtcclxuICAgICAgICB0aGlzLnNuYXBzaG90cy5wdXNoKHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiBuZXh0V29ybGQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJTbmFwc2hvdHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRTbmFwc2hvdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsYXN0U25hcHNob3QgPSB0aGlzLnZhbGlkU25hcHNob3RzLnBvcCgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjbGVhciBjYW52YXNcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIC8vIGRyYXcgbmV4dCBzbmFwc2hvdFxyXG4gICAgICAgICAgICBDYW52YXMucmVuZGVyKHtcclxuICAgICAgICAgICAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXHJcbiAgICAgICAgICAgICAgICBjZWxsUGFkZGluZzogMTMsXHJcbiAgICAgICAgICAgICAgICB3b3JsZDogbGFzdFNuYXBzaG90XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBnbyB0byBuZXh0IHNuYXBzaG90XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU25hcHNob3RzKCk7XHJcbiAgICAgICAgfSwgdGhpcy5yZW5kZXJEZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkgeyBcclxuICAgICAgICB0aGlzLnNuYXBzaG90cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVdvcmxkKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc25hcHNob3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZFNuYXBzaG90cyA9IHRoaXMuc25hcHNob3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHNuYXBzaG90ID0+IHNuYXBzaG90Lmhhc1ZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChzbmFwc2hvdCA9PiBzbmFwc2hvdC52YWx1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRTbmFwc2hvdHMucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclNuYXBzaG90cygpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0YXRlLW1hbmFnZXIudHMiLCJpbXBvcnQgKiBhcyBNb2RlbHMgZnJvbSAnLi9tb2RlbHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlck9wdGlvbnMge1xyXG4gICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcclxuICAgIGNlbGxQYWRkaW5nOiBudW1iZXIsXHJcbiAgICB3b3JsZDogTW9kZWxzLldvcmxkU3RhdGVcclxufVxyXG5cclxuZnVuY3Rpb24gdG9DYW52YXNDb29yZGluYXRlcyhwb3M6IE1vZGVscy5Qb3NpdGlvbiwgY2VsbFNpemU6IG51bWJlciwgcGFkZGluZzogbnVtYmVyKSA6IE1vZGVscy5Qb3NpdGlvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFg6IHBhZGRpbmcgKyBwb3MuWCAqIChjZWxsU2l6ZSArIHBhZGRpbmcpLFxyXG4gICAgICAgIFk6IHBhZGRpbmcgKyBwb3MuWSAqIChjZWxsU2l6ZSArIHBhZGRpbmcpXHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBhcnJvdyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO3V0Zjg7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGdvOElTMHRJRWRsYm1WeVlYUnZjam9nUVdSdlltVWdTV3hzZFhOMGNtRjBiM0lnTVRrdU1DNHdMQ0JUVmtjZ1JYaHdiM0owSUZCc2RXY3RTVzRnTGlCVFZrY2dWbVZ5YzJsdmJqb2dOaTR3TUNCQ2RXbHNaQ0F3S1NBZ0xTMCtDanh6ZG1jZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnZG1WeWMybHZiajBpTVM0eElpQnBaRDBpUTJGd1lWOHhJaUI0UFNJd2NIZ2lJSGs5SWpCd2VDSWdkbWxsZDBKdmVEMGlNQ0F3SURVeExqWXpOaUExTVM0Mk16WWlJSE4wZVd4bFBTSmxibUZpYkdVdFltRmphMmR5YjNWdVpEcHVaWGNnTUNBd0lEVXhMall6TmlBMU1TNDJNelk3SWlCNGJXdzZjM0JoWTJVOUluQnlaWE5sY25abElpQjNhV1IwYUQwaU1UWndlQ0lnYUdWcFoyaDBQU0l4Tm5CNElqNEtQSEJoZEdnZ1pEMGlUVFV4TGpNMU15d3dMamt4TkdNdE1DNHlPVFV0TUM0ek1EVXRNQzQzTlMwd0xqTTVMVEV1TVRNMUxUQXVNakV6VERBdU5UZ3pMREl6TGpRNE1XTXRNQzR6T1Rrc01DNHhPRFF0TUM0Mk16SXNNQzQyTURVdE1DNDFOelFzTVM0d05ERWdJSE13TGpNNU15d3dMamM0TWl3d0xqZ3lOaXd3TGpnMU5Hd3lNaTR5TmpNc015NDNNekZzTWk0MU5EVXNNakV1TURNNFl6QXVNRFUwTERBdU5ETTRMREF1TXpnNUxEQXVOemt4TERBdU9ESTBMREF1T0RZMVl6QXVNRFUzTERBdU1ERXNNQzR4TVRNc01DNHdNVFVzTUM0eE5qa3NNQzR3TVRVZ0lHTXdMak0zTlN3d0xEQXVOekkyTFRBdU1qRXhMREF1T0RrMkxUQXVOVFUyYkRJMExUUTRMalF4TlVNMU1TNDNNaXd4TGpZM05TdzFNUzQyTkRnc01TNHlNVGdzTlRFdU16VXpMREF1T1RFMGVpQk5NamN1TWpJMkxEUTJMalU0TW13dE1pNHlNekl0TVRndU5EVTNJQ0JqTFRBdU1EVTBMVEF1TkRRdE1DNHpPVEV0TUM0M09UTXRNQzQ0TWpndE1DNDROalpNTkM0ek56UXNNak11T1RReFREUTRMalE0TlN3ekxqWTVOMHd5Tnk0eU1qWXNORFl1TlRneWVpSWdabWxzYkQwaUl6QXdNREF3TUNJdlBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhaejRLUEM5blBnbzhMM04yWno0S1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihvcHRpb25zOiBSZW5kZXJPcHRpb25zKSB7XHJcbiAgICB2YXIgY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB2YXIgd29ybGQgPSBvcHRpb25zLndvcmxkO1xyXG4gICAgdmFyIGhlaWdodCA9IHdvcmxkLmhlaWdodDtcclxuICAgIHZhciB3aWR0aCA9IHdvcmxkLndpZHRoO1xyXG4gICAgdmFyIGNlbGxQYWRkaW5nID0gb3B0aW9ucy5jZWxsUGFkZGluZztcclxuICAgIHZhciBjZWxsU2l6ZSA9IHdvcmxkLmNlbGxTaXplO1xyXG5cclxuICAgIGZvcih2YXIgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIGZvcih2YXIgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gd29ybGQuc3RhdGVbeV1beF07XHJcbiAgICAgICAgICAgIHZhciBjYW52YXNQb3NpdGlvbiA9IHRvQ2FudmFzQ29vcmRpbmF0ZXMoY2VsbC5wb3NpdGlvbiwgY2VsbFNpemUsIGNlbGxQYWRkaW5nKTtcclxuICAgICAgICAgICAgdmFyIGNlbGxYID0gY2FudmFzUG9zaXRpb24uWDtcclxuICAgICAgICAgICAgdmFyIGNlbGxZID0gY2FudmFzUG9zaXRpb24uWTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjZWxsVHlwZSA9IGNlbGwuY29udGVudC50eXBlO1xyXG4gICAgICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICAgICAgY3R4LmFyYyhjZWxsWCwgY2VsbFksIDEsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGxUeXBlID09IFwiYmFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgICAgICAgICAgICBjdHguYXJjKGNlbGxYLCBjZWxsWSwgNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsVHlwZSA9PSBcIndhbGxcIikge1xyXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xyXG4gICAgICAgICAgICAgICAgY3R4LmFyYyhjZWxsWCwgY2VsbFksIDUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjdHguZmlsbFJlY3QoY2VsbFgsIGNlbGxZLCBjZWxsU2l6ZSwgY2VsbFNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkcmF3IHBsYXllclxyXG4gICAgdmFyIHBsYXllclBvc2l0aW9uID0gdG9DYW52YXNDb29yZGluYXRlcyh3b3JsZC5wbGF5ZXIucG9zaXRpb24sIGNlbGxTaXplLCBjZWxsUGFkZGluZyk7XHJcbiAgICB2YXIgcGxheWVyWCA9IHBsYXllclBvc2l0aW9uLlg7XHJcbiAgICB2YXIgcGxheWVyWSA9IHBsYXllclBvc2l0aW9uLlk7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcclxuICAgIGN0eC5hcmMocGxheWVyWCwgcGxheWVyWSwgNiwgMCwgMi4wICogTWF0aC5QSSk7XHJcbiAgICBjdHguZmlsbCgpO1xyXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlbmRlci50cyIsImltcG9ydCAqIGFzIENyZWF0ZSBmcm9tICcuL2NyZWF0ZSdcclxuaW1wb3J0ICogYXMgTW9kZWxzIGZyb20gJy4vbW9kZWxzJ1xyXG5pbXBvcnQgeyBNYXliZSB9IGZyb20gJy4vbWF5YmUnXHJcblxyXG5mdW5jdGlvbiBjbG9uZTxUPih4OiBUKSA6IFQge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoeCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHVybl9sZWZ0KHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZSkgOiBNb2RlbHMuV29ybGRTdGF0ZSB7XHJcbiAgICB3b3JsZCA9IGNsb25lKHdvcmxkKTtcclxuICAgIHZhciBkaXJlY3Rpb24gPSB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcIm5vcnRoXCIpIHtcclxuICAgICAgICB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID0gXCJ3ZXN0XCI7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBcInNvdXRoXCIpIHtcclxuICAgICAgICB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID0gXCJlYXN0XCI7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBcIndlc3RcIikge1xyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcInNvdXRoXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRpcmVjdGlvbiA9PSBcImVhc3RcIlxyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcIm5vcnRoXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd29ybGQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0dXJuX3JpZ2h0KHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZSkgOiBNb2RlbHMuV29ybGRTdGF0ZSB7XHJcbiAgICB3b3JsZCA9IGNsb25lKHdvcmxkKTtcclxuICAgIHZhciBkaXJlY3Rpb24gPSB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcIm5vcnRoXCIpIHtcclxuICAgICAgICB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID0gXCJlYXN0XCI7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBcInNvdXRoXCIpIHtcclxuICAgICAgICB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID0gXCJ3ZXN0XCI7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBcIndlc3RcIikge1xyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcIm5vcnRoXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRpcmVjdGlvbiA9PSBcImVhc3RcIlxyXG4gICAgICAgIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPSBcInNvdXRoXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd29ybGQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0dXJuX2Fyb3VuZCh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogTW9kZWxzLldvcmxkU3RhdGUge1xyXG4gICAgcmV0dXJuIHR1cm5fbGVmdCh0dXJuX2xlZnQod29ybGQpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1dF9iYWxsKHdvcmxkOiBNb2RlbHMuV29ybGRTdGF0ZSkgOiBNb2RlbHMuV29ybGRTdGF0ZSB7XHJcbiAgICB3b3JsZCA9IGNsb25lKHdvcmxkKTtcclxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB3b3JsZC5wbGF5ZXIucG9zaXRpb247XHJcbiAgICB2YXIgeCA9IGN1cnJlbnRQb3NpdGlvbi5YO1xyXG4gICAgdmFyIHkgPSBjdXJyZW50UG9zaXRpb24uWTtcclxuICAgIHdvcmxkLnN0YXRlW3ldW3hdID0gQ3JlYXRlLmJhbGwoeCwgeSk7XHJcbiAgICByZXR1cm4gd29ybGQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXYWxscyh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogTW9kZWxzLldvcmxkU3RhdGUge1xyXG4gICAgd29ybGQgPSBjbG9uZSh3b3JsZCk7XHJcbiAgICB2YXIgaGVpZ2h0ID0gd29ybGQuaGVpZ2h0O1xyXG4gICAgdmFyIHdpZHRoID0gd29ybGQud2lkdGg7XHJcblxyXG4gICAgZm9yKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yKHZhciB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh4ID09IDAgfHwgeCA9PSB3aWR0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHdvcmxkLnN0YXRlW3ldW3hdID0gQ3JlYXRlLndhbGwoeCwgeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHkgPT0gMCB8fCB5ID09IGhlaWdodCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHdvcmxkLnN0YXRlW3ldW3hdID0gQ3JlYXRlLndhbGwoeCwgeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdvcmxkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2JhbGwod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IE1vZGVscy5Xb3JsZFN0YXRlIHtcclxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB3b3JsZC5wbGF5ZXIucG9zaXRpb247XHJcbiAgICB2YXIgeCA9IGN1cnJlbnRQb3NpdGlvbi5YO1xyXG4gICAgdmFyIHkgPSBjdXJyZW50UG9zaXRpb24uWTtcclxuICAgIHZhciBjdXJyZW50Q2VsbCA9IHdvcmxkLnN0YXRlW3ldW3hdO1xyXG4gICAgaWYgKGN1cnJlbnRDZWxsLmNvbnRlbnQudHlwZSA9PSBcImJhbGxcIikge1xyXG4gICAgICAgIHdvcmxkID0gY2xvbmUod29ybGQpO1xyXG4gICAgICAgIHdvcmxkLnN0YXRlW3ldW3hdID0gQ3JlYXRlLmVtcHR5Q2VsbCh4LCB5KTtcclxuICAgIH1cclxuICAgIHJldHVybiB3b3JsZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluX2Zyb250X29mX3dhbGwod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IGJvb2xlYW4ge1xyXG4gICAgd29ybGQgPSBjbG9uZSh3b3JsZCk7XHJcbiAgICB2YXIgeCA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5YO1xyXG4gICAgdmFyIHkgPSB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWTtcclxuICAgIHZhciB3aWR0aCA9IHdvcmxkLndpZHRoO1xyXG4gICAgdmFyIGhlaWdodCA9IHdvcmxkLmhlaWdodDtcclxuICAgIHZhciBjdXJyZW50Q2VsbCA9IHdvcmxkLnN0YXRlW3ldW3hdO1xyXG5cclxuICAgIGlmICh3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID09IFwic291dGhcIikge1xyXG4gICAgICAgIGlmICh5ID09IGhlaWdodCAtIDEpIHtcclxuICAgICAgICAgICAgLy8gYWxyZWFkeSBhdCB0aGUgbWF4IGhlaWdodFxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBuZXh0Q2VsbFBvc2l0aW9uWSA9IHkgKyAxO1xyXG4gICAgICAgIHZhciBuZXh0Q2VsbFBvc2l0aW9uWCA9IHg7XHJcbiAgICAgICAgcmV0dXJuIHdvcmxkLnN0YXRlW25leHRDZWxsUG9zaXRpb25ZXVtuZXh0Q2VsbFBvc2l0aW9uWF0uY29udGVudC50eXBlID09IFwid2FsbFwiO1xyXG5cclxuICAgIH0gZWxzZSBpZiAod29ybGQucGxheWVyLmRpcmVjdGlvbiA9PSBcIm5vcnRoXCIpIHtcclxuICAgICAgICBpZiAoeSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25ZID0geSAtIDE7XHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25YID0geDtcclxuICAgICAgICByZXR1cm4gd29ybGQuc3RhdGVbbmV4dENlbGxQb3NpdGlvblldW25leHRDZWxsUG9zaXRpb25YXS5jb250ZW50LnR5cGUgPT0gXCJ3YWxsXCI7XHJcblxyXG4gICAgfSBlbHNlIGlmICh3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID09IFwid2VzdFwiKSB7XHJcbiAgICAgICAgaWYgKHggPT0gMCkge1xyXG4gICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25ZID0geTtcclxuICAgICAgICB2YXIgbmV4dENlbGxQb3NpdGlvblggPSB4IC0gMTtcclxuICAgICAgICByZXR1cm4gd29ybGQuc3RhdGVbbmV4dENlbGxQb3NpdGlvblldW25leHRDZWxsUG9zaXRpb25YXS5jb250ZW50LnR5cGUgPT0gXCJ3YWxsXCI7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyB3b3JsZC5wbGF5ZXIuZGlyZWN0aW9uID09IFwiZWFzdFwiIFxyXG4gICAgICAgIGlmICh4ID09IHdpZHRoIC0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBuZXh0Q2VsbFBvc2l0aW9uWSA9IHk7XHJcbiAgICAgICAgdmFyIG5leHRDZWxsUG9zaXRpb25YID0geCArIDE7XHJcbiAgICAgICAgcmV0dXJuIHdvcmxkLnN0YXRlW25leHRDZWxsUG9zaXRpb25ZXVtuZXh0Q2VsbFBvc2l0aW9uWF0uY29udGVudC50eXBlID09IFwid2FsbFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25fYmFsbCh3b3JsZDogTW9kZWxzLldvcmxkU3RhdGUpIDogYm9vbGVhbiB7XHJcbiAgICB2YXIgeCA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5YO1xyXG4gICAgdmFyIHkgPSB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWTtcclxuXHJcbiAgICByZXR1cm4gd29ybGQuc3RhdGVbeV1beF0uY29udGVudC50eXBlID09PSBcImJhbGxcIjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2Vfc3RyaW5nX3dpdGhfYmFsbHMod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IE1vZGVscy5Xb3JsZFN0YXRlIHtcclxuICAgIHZhciBoZWlnaHQgPSB3b3JsZC5oZWlnaHQ7XHJcbiAgICB2YXIgd2lkdGggPSB3b3JsZC53aWR0aDtcclxuXHJcbiAgICBmb3IodmFyIHkgPSAxOyB5IDwgaGVpZ2h0IC0gMTsgeSsrKSB7XHJcbiAgICAgICAgZm9yKHZhciB4ID0gMTsgeCA8IHdpZHRoIC0gMTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh4ID09IDEgfHwgeCA9PSB3aWR0aCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIHdvcmxkLnN0YXRlW3ldW3hdID0gQ3JlYXRlLmJhbGwoeCwgeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHkgPT0gMSB8fCB5ID09IGhlaWdodCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIHdvcmxkLnN0YXRlW3ldW3hdID0gQ3JlYXRlLmJhbGwoeCwgeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB3b3JsZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0ZXAod29ybGQ6IE1vZGVscy5Xb3JsZFN0YXRlKSA6IE1heWJlPE1vZGVscy5Xb3JsZFN0YXRlPiB7XHJcbiAgICB3b3JsZCA9IGNsb25lKHdvcmxkKTtcclxuICAgIHZhciB4ID0gd29ybGQucGxheWVyLnBvc2l0aW9uLlg7XHJcbiAgICB2YXIgeSA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5ZO1xyXG4gICAgdmFyIHdpZHRoID0gd29ybGQud2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gd29ybGQuaGVpZ2h0O1xyXG4gICAgdmFyIGN1cnJlbnRDZWxsID0gd29ybGQuc3RhdGVbeV1beF07XHJcblxyXG4gICAgaWYgKHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPT0gXCJzb3V0aFwiKSB7XHJcbiAgICAgICAgaWYgKHkgPT0gaGVpZ2h0IC0gMSkge1xyXG4gICAgICAgICAgICAvLyBhbHJlYWR5IGF0IHRoZSBtYXggaGVpZ2h0XHJcbiAgICAgICAgICAgIHJldHVybiB7IGhhc1ZhbHVlOiBmYWxzZSwgZXJyb3I6IFwiUGxheWVyIG91dCBvZiBib3VuZHNcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd29ybGQucGxheWVyLnBvc2l0aW9uLlkgPSB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWSArIDE7XHJcbiAgICAgICAgcmV0dXJuIHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiB3b3JsZCB9O1xyXG5cclxuICAgIH0gZWxzZSBpZiAod29ybGQucGxheWVyLmRpcmVjdGlvbiA9PSBcIm5vcnRoXCIpIHtcclxuICAgICAgICBpZiAoeSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGhhc1ZhbHVlOiBmYWxzZSwgZXJyb3I6IFwiUGxheWVyIG91dCBvZiBib3VuZHNcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd29ybGQucGxheWVyLnBvc2l0aW9uLlkgPSB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWSAtIDE7XHJcbiAgICAgICAgcmV0dXJuIHsgaGFzVmFsdWU6IHRydWUsIHZhbHVlOiB3b3JsZCB9O1xyXG5cclxuICAgIH0gZWxzZSBpZiAod29ybGQucGxheWVyLmRpcmVjdGlvbiA9PSBcIndlc3RcIikge1xyXG4gICAgICAgIGlmICh4ID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaGFzVmFsdWU6IGZhbHNlLCBlcnJvcjogXCJQbGF5ZXIgb3V0IG9mIGJvdW5kc1wiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3b3JsZC5wbGF5ZXIucG9zaXRpb24uWCA9IHdvcmxkLnBsYXllci5wb3NpdGlvbi5YIC0gMTtcclxuICAgICAgICByZXR1cm4geyBoYXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IHdvcmxkIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHdvcmxkLnBsYXllci5kaXJlY3Rpb24gPT0gXCJlYXN0XCIgXHJcbiAgICAgICAgaWYgKHggPT0gd2lkdGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGhhc1ZhbHVlOiBmYWxzZSwgZXJyb3I6IFwiUGxheWVyIG91dCBvZiBib3VuZHNcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd29ybGQucGxheWVyLnBvc2l0aW9uLlggPSAgd29ybGQucGxheWVyLnBvc2l0aW9uLlggKyAxO1xyXG4gICAgICAgIHJldHVybiB7IGhhc1ZhbHVlOiB0cnVlLCB2YWx1ZTogd29ybGQgfTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93b3JsZC50cyJdLCJzb3VyY2VSb290IjoiIn0=