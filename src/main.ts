import { Ball, WorldState, Player, EmptyCell, Wall } from './models'
import * as Create from './create'
import * as Canvas from './render'
import * as World from './world'
import { StateManager, StateManagerOptions } from './state-manager'

var stateManager = new StateManager({
    canvas: <HTMLCanvasElement>document.getElementById("worldMap"),
    renderDelay: 100
});

stateManager.makeInstanceMethodsGlobal(stateManager);
stateManager.initializeWorld();
stateManager.render();
console.log(stateManager.snapshots);

var btnRun = document.getElementById("btnRun");
btnRun.addEventListener("click", (ev) => {
    var code = window["editor"].getValue();
    try {
        stateManager.reset();
        stateManager.initializeWorld();
        eval(code);
        stateManager.render();
    } catch (ex) {
        alert(ex);
        console.log(ex);
    }
});

var btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", (ev) => {
    stateManager.reset();
});

// initialize Ace editor
var ace = window["ace"];
window["editor"] = ace.edit("editor");
window["editor"].getSession().setMode("ace/mode/javascript");