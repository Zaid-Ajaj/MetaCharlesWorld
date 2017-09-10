import { Ball, WorldState, Player, EmptyCell, Wall } from './models'
import * as Create from './create'
import * as Canvas from './render'
import * as World from './world'
import { StateManager, StateManagerOptions } from './state-manager'

var stateManager = new StateManager({
    canvas: <HTMLCanvasElement>document.getElementById("worldMap"),
    renderDelay: 200
});

stateManager.makeInstanceMethodGlobal(stateManager);
stateManager.initializeWorld();
stateManager.render();

var btnRun = document.getElementById("btnRun");
btnRun.addEventListener("click", (ev) => {
    var code = window["editor"].getValue();
    try {
        eval(code);
        stateManager.render();
    } catch (ex) {
        alert(ex);
    }
});

var btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", (ev) => {
    stateManager.reset();
});