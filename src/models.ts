export interface Position {
    X: number,
    Y: number
}

export interface Ball {
    type: string,
    color: string
}

export interface Player {
    color: string,
    direction: "east" | "west" | "north" | "south",
    position: Position
}

export interface Wall {
    type: string
}


export interface EmptyCell {
    type: string
}

export type CellContent = EmptyCell | Ball | Wall

export interface Cell {
    position: Position,
    content: CellContent
}

export interface WorldState {
    state: Cell[][],
    player: Player,
    height: number,
    width: number,
    cellSize: number
}

