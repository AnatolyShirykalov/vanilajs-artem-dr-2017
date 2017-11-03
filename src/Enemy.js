export default class Enemy {
  constructor(settings){
    const { item, id, root, baseDelay } = settings;
    this.type = item.type;
    this.id = id;
    this.baseDelay = baseDelay;
    this.el = document.createElement('div');
    this.el.classList.add(item.type);
    this.el.classList.add('enemy');
    this.el.setAttribute('data-diff', item.diff)
    this.el.style = this.style();
    root.appendChild(this.el);

  }

  style(){
    const i = this.id
    return `animation-delay: ${this.delay()}ms; left: ${_.random(0, 790)}px; animation-duration: ${this.duration()}s`;
  }

  delay() {
     //return this.id < 2 *this.baseDelay ? parseInt((this.baseDelay  - this.id/2) * this.id) : 1
    return parseInt(2*Math.sqrt(this.id)*4000)
  }

  duration() {
    return parseInt(100/Math.sqrt(this.id+100));
  }
}
