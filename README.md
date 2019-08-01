## Build

```
npm install
npm run build
```

## Usage

```javascript
// J$ is exposed to window

var options = {
        code: 'function test() { return 1; }'
        isEval: false,
        inlineSourceMap: false,
        inlineSource: true
};

var newFunc = J$.instrumentCode(options);
```
