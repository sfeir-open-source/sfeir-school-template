(()=>{
/* Nudeps v0.4.1 */
let cS = document.currentScript;
let mapUrl = cS?.src;
let map = {
	"imports": {
		"sfeir-school-theme": "./web_modules/sfeir-school-theme@4.0.0-rc-14/dist/sfeir-school-theme.mjs",
		"sfeir-school-theme/theme": "./web_modules/sfeir-school-theme@4.0.0-rc-14/dist/sfeir-school-theme.css"
	}
};
if (!mapUrl && !cS) {
	throw new Error('nudeps: Import map script appears to be loaded as a module. Set module: true in nudeps config, or remove type="module" from the script tag.');
}
if (document.querySelector("script[type=module]")) {
	console.warn("nudeps: " + cS.getAttribute("src") + " is included after module scripts, which is not supported in all browsers.");
}
const rebase = m => { for (let k in m) m[k] = new URL(m[k], mapUrl).href; return m; };
rebase(map.imports);
for (let scope in map.scopes) rebase(map.scopes[scope]);
let script = Object.assign(document.createElement("script"), { type: "importmap", textContent: JSON.stringify(map) });
if (cS) cS.after(script);
else (document.head ?? document.documentElement).append(script);
})();