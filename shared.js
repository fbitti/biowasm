// Shared JavaScript logic injected into the Emscripten glue code. This fetches
// the corresponding .wasm and .data files relative to where the .js file is
// stored. Works in the main thread and in WebWorkers.
var Module = typeof Module !== "undefined" ? Module : {};

if(typeof Module["locateFile"] == "undefined")
	Module["locateFile"] = function(path, dir)
	{
		var dirRoot = "", dirJS = "";
		// Inside a WebWorker
		if(typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope)
			dirJS = self.location.href;
		// In the main thread
		else if(document.currentScript)
			dirJS = document.currentScript.src;
	
		dirRoot = dirJS.substring(0, dirJS.lastIndexOf("/") + 1);

		return dirRoot + path;
	}
