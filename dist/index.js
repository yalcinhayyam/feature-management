"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feature_manager_1 = require("./feature.manager");
const express_1 = __importDefault(require("express"));
const featureService = new feature_manager_1.FeatureManager();
featureService.add({ keyword: "maintenance", value: true });
const app = express_1.default();
app.use((req, res, next) => {
    if (!req.params.maintenance) {
        return next();
    }
    res.send("Maintenance mode");
});
app.get("/", (req, res) => {
    const asx = req.params.asx;
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    return res.send({ result: getRandomArbitrary(10, 10000).toString() });
});
app.listen(4);
