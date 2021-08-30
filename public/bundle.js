/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\nclass Board {\n    constructor(context, canvas, player) {\n        this.canvas = canvas;\n        this.player = player;\n        this.context = context;\n        this.heartFull = new Image();\n        this.heartFull.src = './sprites/heart.png';\n        this.heartEmpty = new Image();\n        this.heartEmpty.src = './sprites/heart-empty.png';\n    }\n    drawBackground() {\n        this.context.fillStyle = '#000000';\n        this.context.fillRect(0, 0, this.canvas.width, 60);\n    }\n    drawFloor() {\n        this.context.fillStyle = '#FFFFFF';\n        this.context.fillRect(10, this.canvas.height - 20, this.canvas.width - 20, 1);\n    }\n    drawScore() {\n        this.context.font = '20px Arial';\n        this.context.fillStyle = '#FFFFFF';\n        this.context.textAlign = 'right';\n        this.context.fillText(`Score: ${this.player.points}`, this.canvas.width - 10, 40);\n    }\n    drawFullHearts() {\n        let i = 0;\n        while (i < this.player.lives) {\n            this.context.drawImage(this.heartFull, 10 + (this.heartFull.width / 5) * i, 10, this.heartFull.width / 5, this.heartFull.height / 5);\n            i++;\n        }\n    }\n    drawEmptyHearts() {\n        let i = 0;\n        while (i < 4) {\n            this.context.drawImage(this.heartEmpty, 10 + (this.heartEmpty.width / 5) * i, 10, this.heartEmpty.width / 5, this.heartEmpty.height / 5);\n            i++;\n        }\n    }\n    draw() {\n        this.drawBackground();\n        this.drawScore();\n        this.drawEmptyHearts();\n        this.drawFullHearts();\n        this.drawFloor();\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Board.ts?");

/***/ }),

/***/ "./src/Bomb.ts":
/*!*********************!*\
  !*** ./src/Bomb.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bomb)\n/* harmony export */ });\n/* harmony import */ var _FallingObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FallingObject */ \"./src/FallingObject.ts\");\n\nclass Bomb extends _FallingObject__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor(context, difficulty) {\n        super(context, difficulty, 'bomb');\n        this.spriteRatio = 4;\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Bomb.ts?");

/***/ }),

/***/ "./src/FallingObject.ts":
/*!******************************!*\
  !*** ./src/FallingObject.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FallingObject)\n/* harmony export */ });\nclass FallingObject {\n    constructor(context, difficulty, sprite) {\n        this.context = context;\n        this.x = Math.floor(Math.random() * 251);\n        this.y = -100;\n        this.speed = 1;\n        this.difficulty = difficulty;\n        this.points = 0;\n        this.sprite = new Image();\n        this.sprite.src = `./sprites/${sprite}.png`;\n        this.spriteRatio = 14;\n        this.name = sprite;\n        this.hitTheFloor = false;\n    }\n    fall() {\n        this.y += this.speed;\n        this.increaseSpeed();\n    }\n    increaseSpeed() {\n        this.speed += 0.015 + 0.005 * this.difficulty;\n    }\n    updateState() {\n        if (this.y > 480)\n            this.hitTheFloor = true;\n        this.fall();\n    }\n    draw() {\n        this.context.drawImage(this.sprite, this.x, this.y, this.sprite.width / this.spriteRatio, this.sprite.height / this.spriteRatio);\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/FallingObject.ts?");

/***/ }),

/***/ "./src/Fruit.ts":
/*!**********************!*\
  !*** ./src/Fruit.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Fruit)\n/* harmony export */ });\n/* harmony import */ var _FallingObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FallingObject */ \"./src/FallingObject.ts\");\n/* harmony import */ var _fruits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fruits */ \"./src/fruits.ts\");\n\n\nclass Fruit extends _FallingObject__WEBPACK_IMPORTED_MODULE_0__.default {\n    constructor(context, difficulty, id) {\n        super(context, difficulty, _fruits__WEBPACK_IMPORTED_MODULE_1__.default[id].name);\n        this.points = _fruits__WEBPACK_IMPORTED_MODULE_1__.default[id].points;\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Fruit.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Fruit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fruit */ \"./src/Fruit.ts\");\n/* harmony import */ var _Bomb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bomb */ \"./src/Bomb.ts\");\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n\n\n\n\nclass Game {\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.canvas.height = 568;\n        this.canvas.width = 320;\n        this.context = this.canvas.getContext('2d');\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__.default(this.context, canvas.width / 2 - 30);\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_3__.default(this.context, canvas, this.player);\n        this.fruits = [];\n        this.bombs = [];\n        this.difficulty = 0;\n        this.isOver = false;\n    }\n    start() {\n        window.addEventListener('keydown', (e) => this.handleKey(e));\n        window.addEventListener('keyup', (e) => this.handleKey(e));\n        window.addEventListener('touchstart', (e) => this.handleTouch(e));\n        window.addEventListener('touchend', (e) => this.handleTouch(e));\n        this.startIntervals();\n    }\n    restart() {\n        this.isOver = false;\n        this.fruits = [];\n        this.bombs = [];\n        this.difficulty = 0;\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__.default(this.context, this.canvas.width / 2 - 30);\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_3__.default(this.context, this.canvas, this.player);\n        this.startIntervals();\n    }\n    startIntervals() {\n        const { setInterval } = window;\n        this.gameIntervalId = setInterval(() => this.gameLoop(), 1000 / 60);\n        this.increaseDifficultyIntervalId = setInterval(() => this.increaseDifficultyLoop(), 1000);\n        this.spawnFruitIntervalId = setInterval(() => this.spawnFruitLoop(), 500);\n        this.spawnBombIntervalId = setInterval(() => this.spawnBombLoop(), 1400);\n    }\n    gameLoop() {\n        this.updateState();\n        this.renderGame();\n        if (this.isOver)\n            this.gameOver();\n    }\n    increaseDifficultyLoop() {\n        this.difficulty++;\n    }\n    spawnFruitLoop() {\n        if (Math.random() > 0.5) {\n            this.fruits.push(new _Fruit__WEBPACK_IMPORTED_MODULE_1__.default(this.context, this.difficulty, this.randomFruitId()));\n        }\n    }\n    randomFruitId() {\n        const random = Math.random();\n        if (random > 0.95)\n            return 4;\n        if (random > 0.8)\n            return 3;\n        if (random > 0.6)\n            return 2;\n        if (random > 0.3)\n            return 1;\n        return 0;\n    }\n    spawnBombLoop() {\n        if (Math.random() > 0.5) {\n            this.bombs.push(new _Bomb__WEBPACK_IMPORTED_MODULE_2__.default(this.context, this.difficulty));\n        }\n    }\n    handleKey(e) {\n        this.player.handleKey(e);\n    }\n    handleTouch(e) {\n        this.player.handleTouch(e);\n    }\n    updateState() {\n        this.player.updateState(this);\n        this.updateFruits();\n        this.updateBombs();\n    }\n    updateFruits() {\n        const updatedFruits = [];\n        for (const fruit of this.fruits) {\n            if (this.player.checkCollision(fruit)) {\n                this.player.handleFruitCollision(fruit);\n            }\n            else {\n                if (fruit.hitTheFloor) {\n                    this.player.lives -= 1;\n                }\n                else {\n                    updatedFruits.push(fruit);\n                }\n            }\n            fruit.updateState();\n        }\n        this.fruits = updatedFruits;\n    }\n    updateBombs() {\n        const updatedBombs = [];\n        for (const bomb of this.bombs) {\n            if (this.player.checkCollision(bomb)) {\n                this.isOver = true;\n            }\n            else {\n                if (!bomb.hitTheFloor) {\n                    updatedBombs.push(bomb);\n                }\n            }\n            bomb.updateState();\n        }\n        this.bombs = updatedBombs;\n    }\n    renderGame() {\n        this.clearScreen();\n        this.player.draw();\n        this.fruits.forEach((fruit) => fruit.draw());\n        this.bombs.forEach((bomb) => bomb.draw());\n        this.board.draw();\n    }\n    clearScreen() {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n    gameOver() {\n        this.drawGameOver();\n        clearInterval(this.gameIntervalId);\n        clearInterval(this.increaseDifficultyIntervalId);\n        clearInterval(this.spawnFruitIntervalId);\n        clearInterval(this.spawnBombIntervalId);\n        setTimeout(() => {\n            this.restart();\n        }, 3000);\n    }\n    drawGameOver() {\n        this.context.font = '30px Arial';\n        this.context.fillStyle = '#FFFFFF';\n        this.context.textAlign = 'center';\n        this.context.fillText(`Game over`, this.canvas.width / 2, this.canvas.height / 2);\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Game.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(context, initialX) {\n        this.context = context;\n        this.x = initialX;\n        this.y = 460;\n        this.movingLeft = false;\n        this.movingRight = false;\n        this.sprite = new Image();\n        this.sprite.src = './sprites/alien.png';\n        this.lives = 4;\n        this.points = 0;\n    }\n    move() {\n        if (this.movingLeft && this.x > 0)\n            this.x += -5;\n        if (this.movingRight && this.x < 260)\n            this.x += 5;\n    }\n    handleKey(e) {\n        if (e.type === 'keydown') {\n            if (e.code === 'ArrowRight')\n                this.movingRight = true;\n            if (e.code === 'ArrowLeft')\n                this.movingLeft = true;\n        }\n        else if (e.type === 'keyup') {\n            if (e.code === 'ArrowRight')\n                this.movingRight = false;\n            if (e.code === 'ArrowLeft')\n                this.movingLeft = false;\n        }\n    }\n    handleTouch(e) {\n        if (e.type === 'touchstart') {\n            if (e.touches[0].clientX > window.innerWidth / 2)\n                this.movingRight = true;\n            if (e.touches[0].clientX < window.innerWidth / 2)\n                this.movingLeft = true;\n        }\n        else if (e.type === 'touchend') {\n            this.movingRight = false;\n            this.movingLeft = false;\n        }\n    }\n    checkCollision(fallingObject) {\n        const xAligned = fallingObject.x > this.x - 45 && fallingObject.x < this.x + 45;\n        const yAligned = fallingObject.y > this.y - 50;\n        return xAligned && yAligned ? true : false;\n    }\n    handleFruitCollision(fallingObject) {\n        if (fallingObject.name === 'banana') {\n            this.points *= 2;\n        }\n        else {\n            this.points += fallingObject.points;\n        }\n    }\n    updateState(game) {\n        if (this.movingLeft || this.movingRight)\n            this.move();\n        if (this.lives <= 0)\n            game.isOver = true;\n    }\n    draw() {\n        this.context.drawImage(this.sprite, this.x, this.y, this.sprite.width / 4, this.sprite.height / 4);\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Player.ts?");

/***/ }),

/***/ "./src/fruits.ts":
/*!***********************!*\
  !*** ./src/fruits.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fruits = [\n    { name: 'orange', points: 5 },\n    { name: 'red-apple', points: 10 },\n    { name: 'watermelon', points: 20 },\n    { name: 'strawberry', points: 30 },\n    { name: 'banana', points: 0 },\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fruits);\n\n\n//# sourceURL=webpack://banana-game/./src/fruits.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nconst canvas = window.document.querySelector('#canvas');\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\ngame.start();\n\n\n//# sourceURL=webpack://banana-game/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;