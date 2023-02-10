"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_location_1 = require("@tanstack/react-location");
const routes_1 = __importDefault(require("./routes"));
const location = new react_location_1.ReactLocation();
function App() {
    return (react_1.default.createElement(react_location_1.Router, { location: location, routes: routes_1.default },
        react_1.default.createElement(react_location_1.Outlet, null)));
}
exports.default = App;
