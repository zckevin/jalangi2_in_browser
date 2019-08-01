/*
 * Copyright 2014 Samsung Information Systems America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: Koushik Sen

// do not remove the following comment
// JALANGI DO NOT INSTRUMENT

(function(sandbox) {
  function MyAnalysis() {
    var iidToLocation = sandbox.iidToLocation;
    var Constants = sandbox.Constants;
    var HOP = Constants.HOP;
    var sort = Array.prototype.sort;

    var info = {};

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    function wrap(func) {
      let s = func.toString();
      if (s.indexOf("jalangiLabel") != -1 || s.endsWith("{ [native code] }")) {
        return;
      }
      {
        /*
        let target = function() {
          return _$sb;
        };
        if (Match(target, func)) {
          return;
        }
        */
      }
      {
        let target = function(_$uX) {
          return _$ni.call(
            _$uX[_$tp()](),
            /{\s*return\s*([A-Za-z0-9$_]+);?\s*}/
          )[1];
        };
        if (Match(target, func)) {
          s =
            "function _$eL(_$uX){return _$ni.call(_$uX._origin,/{s*returns*([A-Za-z0-9$_]+);?s*}/)[1];}";
        }
      }

      let origin = s;
      let funcTempName = `f_${func.name || ""}_${makeid(5)}`;
      // console.log(func.name, func, funcTempName);
      var options = {
        code: s.replace(
          /(function)( ?)([_\$\w]*)(\(.*)/,
          `$1 ${funcTempName}$4`
        ),
        isEval: false,
        inlineSourceMap: false,
        inlineSource: true
      };

      obj = J$.instrumentCode(options);
      eval(obj.code);
      try {
        let code = eval(funcTempName).toString();
        eval("%ModifyFunction(func, `(${code})`)");
        // func._wrapped = true;
        func._origin = origin;
      } catch (e) {
        console.log(obj.code);
      }
    }

    this.invokeFunPre = function(
      iid,
      f,
      base,
      args,
      isConstructor,
      isMethod,
      functionIid,
      functionSid
    ) {
      if (!isMethod) {
        // wrap(f);
      } else if (f.name == "call" || f.name == "apply") {
        // wrap(base);
      }
    };

    let ident = 0;

    this.functionEnter = function(iid, f, dis, args) {
      ident += 4;

      if (f._called) {
        return;
      }
      f._called = true;

      if (ident < 0) ident = 0;
      console.log(ident / 4, " ".repeat(ident), "->call", f.name);
      args = Array.from(args);
      if (dis === window) {
        dis = "[[window]]";
      }
      console.log(dis, args, f._origin);
    };

    this.functionExit = function(iid, returnVal, wrappedExceptionVal) {
      ident -= 4;
      console.log(returnVal);
    };

    this.getField = function(
      iid,
      base,
      offset,
      val,
      isComputed,
      isOpAssign,
      isMethodCall
    ) {
      if (Array.isArray(base) || offset == "call" || offset == "apply") {
        return;
      }
      let s = base.constructor.toString();
      if (s.indexOf("[native code]") != -1) {
        let arr = s.split(" ");
        // console.log("ACCESSOR -> ", arr.length >= 2 ? arr[1] : null, offset);
        if (arr.length > 2) {
          let s = arr[1];
          if (
            s.startsWith("HTML") ||
            s.startsWith("Location") ||
            s.startsWith("Window")
          ) {
            console.log("ACCESSOR -> ", s, base, offset, val);
          }
        }
      }
    };

    this.invokeFun = function(
      iid,
      f,
      base,
      args,
      result,
      isConstructor,
      isMethod,
      functionIid,
      functionSid
    ) {
      // if (f === document.createElement) {
      //   console.log(args, result);
      // }
      console.log("invokeFun");
      console.log(f.toString());
      console.log(base);
      console.log(args);
      console.log(result);
      console.log("");
    };
  }
  sandbox.analysis = new MyAnalysis();
})(J$);
