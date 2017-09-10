import * as Models from './models'
import * as Create from './create'
import * as Canvas from './render'
import * as World from './world'
import { Maybe } from './maybe'

export interface StateManagerOptions {
    canvas: HTMLCanvasElement,
    renderDelay: number
}

export class StateManager {
    public snapshots : Maybe<Models.WorldState>[] = [];
    private canvas: HTMLCanvasElement = undefined;
    private hasError: boolean = false;
    private snapshotClones : Maybe<Models.WorldState>[] = [];
    private renderDelay: number = 1000;
    private worldState: Models.WorldState;

    constructor(options: StateManagerOptions) {
        this.canvas = options.canvas;
        this.renderDelay = options.renderDelay;
    }

    public initializeWorld() {
        var emptyWorld = Create.world(20, 30, 5);
        emptyWorld.player.position.X  = 1;
        emptyWorld.player.position.Y  = 1; 
        var withWalls = World.createWalls(emptyWorld);
        this.snapshots.push({ hasValue: true, value: withWalls });
    }

    public turn_right() { 
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
    }

    public turn_left() { 
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
    }

    public turn_around() { 
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
    }

    public step() {
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
        this.snapshots.push({ hasValue: true, value:maybeNext });
    }

    public in_front_of_wall() {
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
    }

    public makeInstanceMethodsGlobal(stateManager: StateManager) {
        window["put_ball"] = function() { stateManager.put_ball(); };
        window["step"] = function() { stateManager.step(); };
        window["turn_right"] = function() { stateManager.turn_right(); };
        window["turn_left"] = function() { stateManager.turn_left(); };
        window["turn_around"] = function() { stateManager.turn_around(); };
        window["render"] = function() { stateManager.render(); };
        window["reset"] = function() { stateManager.reset(); };
        window["in_front_of_wall"] = function() { return stateManager.in_front_of_wall(); };
        window["make_string_with_balls"] = function() { stateManager.make_string_with_balls(); };
        window["on_ball"] = function() { return stateManager.on_ball(); };
        window["get_ball"] = function() { stateManager.get_ball(); };
    }

    public on_ball() : boolean {
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
    }

    public pause(milliseconds) {
        var dt = new Date();
        while (<any>(<any>(new Date()) - <any>dt) <= milliseconds) {
             /* Do nothing */ 
        }
    }
    public make_string_with_balls() {
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
    }


    public put_ball() {
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
    }

    public get_ball() {
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
    }

    private renderSnapshots() {
        if (this.snapshotClones.length === 0) {
            return;
        }

        var lastSnapshot = this.snapshotClones.pop();
        setTimeout(() => {
            // clear canvas
            this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
            // draw next snapshot
            if (lastSnapshot.hasValue) {
                Canvas.render({
                    canvas: this.canvas,
                    cellPadding: 13,
                    world: lastSnapshot.value
                });
            } else {
                alert(lastSnapshot.error);
            }
            
            // go to next snapshot
            this.renderSnapshots();
        }, this.renderDelay);
    }

    public reset() { 
        this.snapshots = [];
        this.initializeWorld();
        this.render();
    }

    public render() {
        if (this.snapshots.length === 0) {
            return;
        } 

        this.snapshotClones = JSON.parse(JSON.stringify(this.snapshots))

        this.snapshotClones.reverse();

        this.renderSnapshots();
    }
}