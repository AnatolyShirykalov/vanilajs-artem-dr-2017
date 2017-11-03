import './index.css'
import './help.css'

import _ from 'lodash'

import Game from './Game'


document.getElementById('ok').addEventListener('click', ()=>{
  document.getElementById('root').innerHTML='';
  new Game();
})

