export const health = 15000;
export const alcos = 0;
export const root = document.getElementById('root')
export const items = [
  {type: "cock", diff: -10},
  ..._.times(1, ()=>{return {type: "redbull", diff: 0}}),
  ..._.times(100, ()=>{return {type: "food", diff: 100}}),
  ..._.times(100, ()=>{return {type: "alco", diff: -20}}),
  ..._.times(100, ()=>{return {type: "shuriken", diff: -250}}),
  ..._.times(100, ()=>{return {type: "axe", diff: -500}})
]
export const leftArtem = 300;
export const ultItems = ["axe", "shuriken"]



