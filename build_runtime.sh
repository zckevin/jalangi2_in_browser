#!/bin/bash
node jalangi2/src/js/commands/instrument.js \
   --copy_runtime \
   --inlineIID --inlineSource \
   --analysis ./Hook.js \
   --outputDir ./runtime_tmp \
   ./input

# then copy ./runtime_tmp/input/jalangiRuntime/* to ./runtime
