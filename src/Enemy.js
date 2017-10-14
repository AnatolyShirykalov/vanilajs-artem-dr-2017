export default class Enemy {
  constructor(settings){
    const { item, id, root } = settings;
    this.type = item.type;
    this.id = id;
    this.el = document.createElement('div');
    this.el.classList.add(item.type);
    this.el.classList.add('enemy');
    this.el.setAttribute('data-diff', item.diff)
    this.el.style = this.style();
    root.appendChild(this.el);

  }

  style(){
    const i = this.id
    return `animation-delay: ${4*i}s; left: ${_.random(0, 790)}px; animation-duration: ${parseInt(100/(i+1))}s`;
  }
}
