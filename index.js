var acorn = require("acorn");
var esotope = require("esotope");
global.acorn = acorn;
global.esotope = esotope;

// require order matters (maybe)
_ = require("./runtime/Constants.js");
_ = require("./runtime/Config.js");
_ = require("./runtime/astUtil.js");
_ = require("./runtime/esnstrument.js");
_ = require("./runtime/iidToLocation.js");
_ = require("./runtime/analysis.js");

_ = require("./Hook.js");

global.J$ = J$;
