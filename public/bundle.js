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

/***/ "./src/Fruit.ts":
/*!**********************!*\
  !*** ./src/Fruit.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Fruit)\n/* harmony export */ });\n/* harmony import */ var _fruits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fruits */ \"./src/fruits.ts\");\n\nclass Fruit {\n    constructor(context, id) {\n        this.context = context;\n        this.x = Math.floor(Math.random() * 251);\n        this.y = -100;\n        this.speed = 1;\n        this.sprite = new Image();\n        this.sprite.src = `./sprites/${_fruits__WEBPACK_IMPORTED_MODULE_0__.default[id].name}.png`;\n        this.points = _fruits__WEBPACK_IMPORTED_MODULE_0__.default[id].points;\n        this.name = _fruits__WEBPACK_IMPORTED_MODULE_0__.default[id].name;\n    }\n    fall() {\n        this.y += this.speed;\n        this.increaseSpeed();\n    }\n    increaseSpeed() {\n        this.speed += 0.015;\n    }\n    updateState() {\n        this.fall();\n    }\n    draw() {\n        this.context.drawImage(this.sprite, this.x, this.y, this.sprite.width / 14, this.sprite.height / 14);\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Fruit.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Fruit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fruit */ \"./src/Fruit.ts\");\n\n\nclass Game {\n    constructor(canvas) {\n        this.canvas = canvas;\n        this.canvas.height = 568;\n        this.canvas.width = 320;\n        this.context = this.canvas.getContext('2d');\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__.default(this.context, canvas.width / 2 - 30);\n        this.drawables = [];\n    }\n    start() {\n        window.addEventListener('keydown', (e) => this.handleKey(e));\n        window.addEventListener('keyup', (e) => this.handleKey(e));\n        window.addEventListener('touchstart', (e) => this.handleTouch(e));\n        window.addEventListener('touchend', (e) => this.handleTouch(e));\n        this.startIntervals();\n    }\n    startIntervals() {\n        const { setInterval } = window;\n        this.gameIntervalId = setInterval(() => this.gameLoop(), 1000 / 60);\n        this.spawnIntervalId = setInterval(() => this.spawnLoop(), 1000);\n    }\n    gameLoop() {\n        if (this.player.lives === 0)\n            this.gameOver();\n        this.updateState();\n        this.renderGame();\n    }\n    spawnLoop() {\n        let id;\n        const random = Math.random();\n        if (random <= 0.3)\n            id = 0;\n        if (random >= 0.3)\n            id = 1;\n        if (random >= 0.6)\n            id = 2;\n        if (random >= 0.8)\n            id = 3;\n        if (random >= 0.95)\n            id = 4;\n        if (Math.random() > 0.5) {\n            this.drawables.push(new _Fruit__WEBPACK_IMPORTED_MODULE_1__.default(this.context, id));\n        }\n    }\n    handleKey(e) {\n        this.player.handleKey(e);\n    }\n    handleTouch(e) {\n        this.player.handleTouch(e);\n    }\n    updateState() {\n        this.player.updateState();\n        const newDrawables = [];\n        this.drawables.forEach((drawable) => {\n            drawable.updateState(this);\n            if (this.checkCollision(drawable)) {\n                if (drawable.name === \"banana\") {\n                    this.player.points *= 2;\n                }\n                else {\n                    this.player.points += drawable.points;\n                }\n                console.log(this.player.points);\n            }\n            else {\n                if (drawable.y < 500) {\n                    newDrawables.push(drawable);\n                }\n                else {\n                    this.player.lives -= 1;\n                }\n            }\n        });\n        this.drawables = newDrawables;\n    }\n    checkCollision(drawable) {\n        const xAligned = drawable.x > this.player.x - 45 && drawable.x < this.player.x + 45;\n        const yAligned = drawable.y > this.player.y - 50;\n        if (xAligned && yAligned) {\n            return true;\n        }\n        return false;\n    }\n    renderGame() {\n        this.clearScreen();\n        this.player.draw();\n        this.drawables.forEach((drawable) => drawable.draw());\n    }\n    clearScreen() {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n    gameOver() {\n        clearInterval(this.gameIntervalId);\n        clearInterval(this.spawnIntervalId);\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Game.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(context, initialX) {\n        this.context = context;\n        this.x = initialX;\n        this.y = 460;\n        this.movingLeft = false;\n        this.movingRight = false;\n        this.sprite = new Image();\n        this.sprite.src = \"./sprites/alien.png\";\n        this.lives = 4;\n        this.points = 0;\n    }\n    move() {\n        if (this.movingLeft && this.x > 0)\n            this.x += -5;\n        if (this.movingRight && this.x < 260)\n            this.x += 5;\n    }\n    handleKey(e) {\n        if (e.type === \"keydown\") {\n            if (e.code === \"ArrowRight\")\n                this.movingRight = true;\n            if (e.code === \"ArrowLeft\")\n                this.movingLeft = true;\n        }\n        else if (e.type === \"keyup\") {\n            if (e.code === \"ArrowRight\")\n                this.movingRight = false;\n            if (e.code === \"ArrowLeft\")\n                this.movingLeft = false;\n        }\n    }\n    handleTouch(e) {\n        if (e.type === \"touchstart\") {\n            if (e.touches[0].clientX > window.innerWidth / 2)\n                this.movingRight = true;\n            if (e.touches[0].clientX < window.innerWidth / 2)\n                this.movingLeft = true;\n        }\n        else if (e.type === \"touchend\") {\n            this.movingRight = false;\n            this.movingLeft = false;\n        }\n    }\n    updateState() {\n        if (this.movingLeft || this.movingRight)\n            this.move();\n    }\n    draw() {\n        this.context.drawImage(this.sprite, this.x, this.y, this.sprite.width / 4, this.sprite.height / 4);\n    }\n}\n\n\n//# sourceURL=webpack://banana-game/./src/Player.ts?");

/***/ }),

/***/ "./src/fruits.ts":
/*!***********************!*\
  !*** ./src/fruits.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fruits = [\n    { name: \"orange\", points: 5 },\n    { name: \"red-apple\", points: 10 },\n    { name: \"watermelon\", points: 20 },\n    { name: \"strawberry\", points: 30 },\n    { name: \"banana\", points: 0 },\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fruits);\n\n\n//# sourceURL=webpack://banana-game/./src/fruits.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nconst canvas = window.document.querySelector(\"#canvas\");\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\ngame.start();\n\n\n//# sourceURL=webpack://banana-game/./src/index.ts?");

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