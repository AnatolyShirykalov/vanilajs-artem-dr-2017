import _ from 'lodash'
import * as settings from './settings'
import Enemy from './Enemy'
import Chip from './Chip'

export default class Game {
  constructor(){
    this.health = settings.health;
    this.chip = new Chip(settings);
    this.alcos = settings.alcos;
    this.root = settings.root;
    this.items = settings.items;
    this.addArtem(settings.leftArtem);
    this.ultItems = settings.ultItems
    this.enemies = []
    this.bar = this.addStat('health-bar', this.health)
    this.alcoBar = this.addStat('alco-bar', this.alcos)
    this.addEnemies(1000, 4000);
    this.initControls();
  }

  addArtem(left) {
    this.artem = document.createElement('div');
    this.artem.id = 'artem-b';
    this.artem.style = `left: ${left}px`;
    this.root.appendChild(this.artem);
  }

  addStat(id, value){
    let el = document.createElement('div');
    el.id = id;
    el.innerHTML = value;
    document.body.appendChild(el);
    return el;
  }

  addEnemies(size, baseDelay) {
    if (!this.enemies) this.enemies = [];
    this.enemies = _.concat(this.enemies, _.times(size, id => {
      const item = _.sample(this.items)
      const enemy = new Enemy({id, item, root: this.root, baseDelay});
      enemy.el.addEventListener('animationstart', this.onAnimationStart);
      this.setAnimationEnd(enemy);
      return enemy;
    }))
  }

  onAnimationStart(event) {
    event.currentTarget.classList.add('started');
  }

  setAnimationEnd(enemy) {
    enemy.el.addEventListener('animationend', event => {
      const el = event.currentTarget;
      const style = window.getComputedStyle(this.artem)
      const left = parseInt(style.getPropertyValue('left'));
      const width = parseInt(style.getPropertyValue('width'));
      const elStyle = window.getComputedStyle(el)
      const elLeft = parseInt(elStyle.getPropertyValue('left'))
      if (left + width < elLeft || left > elLeft + 10) return;
      if (el.classList.contains('alco')) this.alcos+=1;
      const delt = parseInt(el.getAttribute('data-diff'))
      this.health += delt;
      this.chip.changeHealth(delt);
      this.bar.innerHTML = this.health;
      this.alcoBar.innerHTML = this.alcos;
    })
  }

  initArtemMover() {
    let _this = this;
    document.addEventListener('mousemove', (event) => {
      const rootRect = _this.root.getBoundingClientRect();
      const rect = _this.artem.getBoundingClientRect();
      const x = parseInt(rect.x + rect.width/2);
      const left = parseInt(_this.artem.style.left);
      let newLeft = left + event.clientX - x;
      if (event.clientX < rootRect.x + rect.width/2) newLeft = 0;
      if(event.clientX + rect.width/2 > rootRect.x + rootRect.width)
        newLeft = rootRect.width - rect.width;
      _this.artem.style.left = `${newLeft}px`;
    })
  }

  initUlt() {
    const selector = _.each(this.ultItems, item => `#root > .${item}.started`)
      .join(', ')
    let _this = this;
    document.addEventListener('keydown', event => {
      if (event.keyCode == 32 && this.alcos >= 5) {
        _this.alcos -=5;
        _this.alcoBar.innerHTML = this.alcos;
        _.each(
          document.querySelectorAll('#root > .axe.started, #root > .shuriken.started'),
          (e) => e.remove()
        )
        _this.chip.drink();
      }
    })
  }

  initControls() {
    this.initArtemMover();
    this.initUlt()
  }
}
