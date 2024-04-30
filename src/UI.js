import './style.css';
import boardRender from './boardRender';
import Player from "./player";

const ui = document.createElement('div');
ui.id = 'ui';

// topbar
const topbar = document.createElement('div');
topbar.id = 'topbar';
topbar.textContent = 'Battleship';
ui.appendChild(topbar);

const boardScreens = document.createElement('div');
boardScreens.id = 'boardScreens';
ui.appendChild(boardScreens);

// board placement
const playerScreen = document.createElement('div');
playerScreen.id = 'pScreen';
playerScreen.classList.add('board')
const player = Player();
player.predeterminedPlacement();
boardRender(playerScreen,player);
boardScreens.appendChild(playerScreen);

const compScreen = document.createElement('div');
compScreen.id = 'cScreen';
compScreen.classList.add('board');
const computer = Player();
computer.predeterminedPlacement();
boardRender(compScreen,computer);
boardScreens.appendChild(compScreen);

export default ui;