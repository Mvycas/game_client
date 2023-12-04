import {candyColors} from "../constants/gameConstants"
import {boardWidth, boardDepth} from "../constants/gameConstants"
import {create, move, Position} from "../game/board"



    // const createBoard = () => {
    //     const randomColorArrangement = [];
    
    //     for(let i = 0; i < boardWidth*boardWidth; i++)
    //     {
    //         const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)];
    //         randomColorArrangement.push(randomColor);
    //     }
    
    //     return randomColorArrangement;
    // }

    type Generator<T> = { next: () => T };

    class SequenceGenerator implements Generator<string> {
        private tiles: string[]
    
        constructor(tiles: string[]) {
            this.tiles = tiles;
        }
    
        next(): string {
            const randomIndex = Math.floor(Math.random() * this.tiles.length);
            return this.tiles[randomIndex];
        }
    }

    let generator : any;
    let board : any;
    let score = 0;


    export const getBoard = () : any => {
        return init();
    }

    function init() {
        const candyColorsArray = Object.values(candyColors); // This creates an array of the image paths
        generator = new SequenceGenerator(candyColorsArray);
        board = create(generator, boardWidth, boardDepth, score);
        return board;
    }

    export function moveTile(first: Position, second: Position, board : any){
        return move(generator, board, first, second);
        
    }

    export default getBoard;