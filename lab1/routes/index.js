"use strict";
exports.__esModule = true;
function constructorMethod(app) {
    app.use("*", function (req, res) {
        res.status(404).json({ error: "Route not found." });
    });
}
exports["default"] = constructorMethod;
