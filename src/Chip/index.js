import './index.css'
import './artem.css'
import './moves.css'
export default class Chip {
  constructor({health, volume}) {
    this.health = 15000;
    this.volume = volume;
    this.root = document.getElementById('artem');
    this.ends = this.root.querySelectorAll('.leg, .arm');
  }

  changeHealth(delta) {
    this.health += delta;
    for (let i = 0; i < 4; i++) {
      const f = this.health < 15000/4*(i+1) ? this.remove : this.restore;
      f(this.ends[i]);
    }
  }

  remove(end) {
    end.classList.add('hidden');
  }

  restore(end) {
    end.classList.remove('hidden');
  }

  drink() {
    this.volume -= 5;
    this.root.classList.add(`drunk-${this.volume}`);
  }
}
