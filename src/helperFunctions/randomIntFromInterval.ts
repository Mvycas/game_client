// this function was taken from: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
// AUTHOR: Francisc

export default function randomIntFromInterval(min:number, max:number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }