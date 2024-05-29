"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
