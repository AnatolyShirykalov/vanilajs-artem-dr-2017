import './index.css'

import _ from 'lodash'

const root = document.getElementById('root')

const items = ["cock", "food"]

let health = 15000;

let bar = document.createElement('div');
bar.id = 'status-bar';
bar.innerHTML = health;
document.body.appendChild(bar);

let artem = document.createElement('div');
artem.id = 'artem';
artem.style = `left: ${300}px`;
root.appendChild(artem);

const animationEndHandler = (event) => {
  const el = event.currentTarget;
  const style = window.getComputedStyle(artem)
  const left = parseInt(style.getPropertyValue('left'));
  const width = parseInt(style.getPropertyValue('width'));
  const elStyle = window.getComputedStyle(el)
  const elLeft = parseInt(elStyle.getPropertyValue('left'))
  if (left + width < elLeft || left > elLeft + 10) return;
  if (el.classList.contains('food')) health += 1;
  if (el.classList.contains('cock')) health -= 10;
  bar.innerHTML = health;
}

_.times(100, (i) => {
  let el = document.createElement('div');
  el.classList.add(_.sample(items))
  const style = `animation-delay: ${4*i}s; left: ${_.random(0, 790)}px; animation-duration: ${parseInt(100/(i+1))}s`;
  el.style = style;
  root.appendChild(el);
  el.addEventListener('animationend', animationEndHandler)
})

document.addEventListener('mousemove', (event) => {
  const rootRect = root.getBoundingClientRect();
  const rect = artem.getBoundingClientRect();
  const x = parseInt(rect.x + rect.width/2);
  const left = parseInt(artem.style.left);
  let newLeft = left + event.clientX - x;
  if (event.clientX < rootRect.x + rect.width/2)
    newLeft = 0;
  if(event.clientX + rect.width/2 > rootRect.x + rootRect.width)
    newLeft = rootRect.width - rect.width;
  artem.style.left = `${newLeft}px`;
})
