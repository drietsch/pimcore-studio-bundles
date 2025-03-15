/*!
 * 
 *       /**
 *        * Pimcore
 *        *
 *        * This source file is available under two different licenses:
 *        * - Pimcore Open Core License (POCL)
 *        * - Pimcore Commercial License (PCL)
 *        * Full copyright and license information is available in
 *        * LICENSE.md which is distributed with this source code.
 *        *
 *        *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *        *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 *        * /
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pimcore_studio_ui_sdk", [], factory);
	else if(typeof exports === 'object')
		exports["pimcore_studio_ui_sdk"] = factory();
	else
		root["pimcore_studio_ui_sdk"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/src/core/components/background/background.tsx":
/*!***************************************************************************************************!*\
  !*** delegated ./js/src/core/components/background/background.tsx from dll-reference studio_core ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/components/background/background.tsx");

/***/ }),

/***/ "./js/src/core/components/dropdown/dropdown.tsx":
/*!***********************************************************************************************!*\
  !*** delegated ./js/src/core/components/dropdown/dropdown.tsx from dll-reference studio_core ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/components/dropdown/dropdown.tsx");

/***/ }),

/***/ "./js/src/core/components/icon/icon.tsx":
/*!***************************************************************************************!*\
  !*** delegated ./js/src/core/components/icon/icon.tsx from dll-reference studio_core ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/components/icon/icon.tsx");

/***/ }),

/***/ "./js/src/core/components/pimcore-image/pimcore-image.tsx":
/*!*********************************************************************************************************!*\
  !*** delegated ./js/src/core/components/pimcore-image/pimcore-image.tsx from dll-reference studio_core ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/components/pimcore-image/pimcore-image.tsx");

/***/ }),

/***/ "./js/src/core/modules/asset/asset-api-slice.gen.ts":
/*!***************************************************************************************************!*\
  !*** delegated ./js/src/core/modules/asset/asset-api-slice.gen.ts from dll-reference studio_core ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/modules/asset/asset-api-slice.gen.ts");

/***/ }),

/***/ "./js/src/core/modules/asset/asset-provider.tsx":
/*!***********************************************************************************************!*\
  !*** delegated ./js/src/core/modules/asset/asset-provider.tsx from dll-reference studio_core ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/modules/asset/asset-provider.tsx");

/***/ }),

/***/ "./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts":
/*!**********************************************************************************************************************************!*\
  !*** delegated ./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts from dll-reference studio_core ***!
  \**********************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts");

/***/ }),

/***/ "./js/src/core/modules/icon-library/services/icon-library.ts":
/*!************************************************************************************************************!*\
  !*** delegated ./js/src/core/modules/icon-library/services/icon-library.ts from dll-reference studio_core ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/modules/icon-library/services/icon-library.ts");

/***/ }),

/***/ "./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts":
/*!*****************************************************************************************************************!*\
  !*** delegated ./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts from dll-reference studio_core ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");

/***/ }),

/***/ "./js/src/core/modules/widget-manager/services/widget-registry.ts":
/*!*****************************************************************************************************************!*\
  !*** delegated ./js/src/core/modules/widget-manager/services/widget-registry.ts from dll-reference studio_core ***!
  \*****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference studio_core */ "dll-reference studio_core"))("./js/src/core/modules/widget-manager/services/widget-registry.ts");

/***/ }),

/***/ "dll-reference studio_core":
/*!******************************!*\
  !*** external "studio_core" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = studio_core;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./js/src/sdk/main.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_9__.AssetContext),
/* harmony export */   AssetProvider: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_9__.AssetProvider),
/* harmony export */   Background: () => (/* reexport safe */ _Pimcore_components_background_background__WEBPACK_IMPORTED_MODULE_1__.Background),
/* harmony export */   Dropdown: () => (/* reexport safe */ _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__.Dropdown),
/* harmony export */   FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_8__.FolderTabManager),
/* harmony export */   Icon: () => (/* reexport safe */ _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon),
/* harmony export */   IconLibrary: () => (/* reexport safe */ _Pimcore_modules_icon_library_services_icon_library__WEBPACK_IMPORTED_MODULE_0__.IconLibrary),
/* harmony export */   Pimcore: () => (/* binding */ Pimcore),
/* harmony export */   PimcoreImage: () => (/* reexport safe */ _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_3__.PimcoreImage),
/* harmony export */   WidgetRegistry: () => (/* reexport safe */ _Pimcore_modules_widget_manager_services_widget_registry__WEBPACK_IMPORTED_MODULE_6__.WidgetRegistry),
/* harmony export */   container: () => (/* binding */ container),
/* harmony export */   serviceIds: () => (/* binding */ serviceIds),
/* harmony export */   useAssetGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.useAssetGetByIdQuery),
/* harmony export */   useAssetGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.useAssetGetTreeQuery),
/* harmony export */   useWidgetManager: () => (/* reexport safe */ _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager)
/* harmony export */ });
/* harmony import */ var _Pimcore_modules_icon_library_services_icon_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Pimcore/modules/icon-library/services/icon-library */ "./js/src/core/modules/icon-library/services/icon-library.ts");
/* harmony import */ var _Pimcore_components_background_background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Pimcore/components/background/background */ "./js/src/core/components/background/background.tsx");
/* harmony import */ var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Pimcore/components/dropdown/dropdown */ "./js/src/core/components/dropdown/dropdown.tsx");
/* harmony import */ var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Pimcore/components/pimcore-image/pimcore-image */ "./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* harmony import */ var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Pimcore/components/icon/icon */ "./js/src/core/components/icon/icon.tsx");
/* harmony import */ var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Pimcore/modules/widget-manager/hooks/use-widget-manager */ "./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* harmony import */ var _Pimcore_modules_widget_manager_services_widget_registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Pimcore/modules/widget-manager/services/widget-registry */ "./js/src/core/modules/widget-manager/services/widget-registry.ts");
/* harmony import */ var _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Pimcore/modules/asset/asset-api-slice.gen */ "./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* harmony import */ var _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Pimcore/modules/asset/editor/types/folder/tab-manager/folder-tab-manager */ "./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* harmony import */ var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @Pimcore/modules/asset/asset-provider */ "./js/src/core/modules/asset/asset-provider.tsx");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

// Components




// Modules





var Pimcore = window.Pimcore;
var container = window.Pimcore.container;
var serviceIds = window.Pimcore.serviceIds;
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7QUNWQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNrRjtBQUNsRjtBQUN1RTtBQUNOO0FBQ2M7QUFDMUI7QUFDckQ7QUFDNEY7QUFDRjtBQUNjO0FBQ0s7QUFDekI7QUFDN0UsSUFBTVksT0FBTyxHQUFHQyxNQUFNLENBQUNELE9BQU87QUFDOUIsSUFBTUUsU0FBUyxHQUFHRCxNQUFNLENBQUNELE9BQU8sQ0FBQ0UsU0FBUztBQUMxQyxJQUFNQyxVQUFVLEdBQUdGLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDRyxVQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9waW1jb3JlX3N0dWRpb191aV9zZGsvZGVsZWdhdGVkIFwiLi9qcy9zcmMvY29yZS9jb21wb25lbnRzL2JhY2tncm91bmQvYmFja2dyb3VuZC50c3hcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2RlbGVnYXRlZCBcIi4vanMvc3JjL2NvcmUvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi50c3hcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2RlbGVnYXRlZCBcIi4vanMvc3JjL2NvcmUvY29tcG9uZW50cy9pY29uL2ljb24udHN4XCIgZnJvbSBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlIiwid2VicGFjazovL3BpbWNvcmVfc3R1ZGlvX3VpX3Nkay9kZWxlZ2F0ZWQgXCIuL2pzL3NyYy9jb3JlL2NvbXBvbmVudHMvcGltY29yZS1pbWFnZS9waW1jb3JlLWltYWdlLnRzeFwiIGZyb20gZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZSIsIndlYnBhY2s6Ly9waW1jb3JlX3N0dWRpb191aV9zZGsvZGVsZWdhdGVkIFwiLi9qcy9zcmMvY29yZS9tb2R1bGVzL2Fzc2V0L2Fzc2V0LWFwaS1zbGljZS5nZW4udHNcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2RlbGVnYXRlZCBcIi4vanMvc3JjL2NvcmUvbW9kdWxlcy9hc3NldC9hc3NldC1wcm92aWRlci50c3hcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2RlbGVnYXRlZCBcIi4vanMvc3JjL2NvcmUvbW9kdWxlcy9hc3NldC9lZGl0b3IvdHlwZXMvZm9sZGVyL3RhYi1tYW5hZ2VyL2ZvbGRlci10YWItbWFuYWdlci50c1wiIGZyb20gZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZSIsIndlYnBhY2s6Ly9waW1jb3JlX3N0dWRpb191aV9zZGsvZGVsZWdhdGVkIFwiLi9qcy9zcmMvY29yZS9tb2R1bGVzL2ljb24tbGlicmFyeS9zZXJ2aWNlcy9pY29uLWxpYnJhcnkudHNcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2RlbGVnYXRlZCBcIi4vanMvc3JjL2NvcmUvbW9kdWxlcy93aWRnZXQtbWFuYWdlci9ob29rcy91c2Utd2lkZ2V0LW1hbmFnZXIudHNcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2RlbGVnYXRlZCBcIi4vanMvc3JjL2NvcmUvbW9kdWxlcy93aWRnZXQtbWFuYWdlci9zZXJ2aWNlcy93aWRnZXQtcmVnaXN0cnkudHNcIiBmcm9tIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL2V4dGVybmFsIHZhciBcInN0dWRpb19jb3JlXCIiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BpbWNvcmVfc3R1ZGlvX3VpX3Nkay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcGltY29yZV9zdHVkaW9fdWlfc2RrLy4vanMvc3JjL3Nkay9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwicGltY29yZV9zdHVkaW9fdWlfc2RrXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInBpbWNvcmVfc3R1ZGlvX3VpX3Nka1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJwaW1jb3JlX3N0dWRpb191aV9zZGtcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZSAqLyBcImRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmVcIikpKFwiLi9qcy9zcmMvY29yZS9jb21wb25lbnRzL2JhY2tncm91bmQvYmFja2dyb3VuZC50c3hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZSAqLyBcImRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmVcIikpKFwiLi9qcy9zcmMvY29yZS9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLnRzeFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlICovIFwiZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZVwiKSkoXCIuL2pzL3NyYy9jb3JlL2NvbXBvbmVudHMvaWNvbi9pY29uLnRzeFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlICovIFwiZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZVwiKSkoXCIuL2pzL3NyYy9jb3JlL2NvbXBvbmVudHMvcGltY29yZS1pbWFnZS9waW1jb3JlLWltYWdlLnRzeFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlICovIFwiZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZVwiKSkoXCIuL2pzL3NyYy9jb3JlL21vZHVsZXMvYXNzZXQvYXNzZXQtYXBpLXNsaWNlLmdlbi50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlICovIFwiZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZVwiKSkoXCIuL2pzL3NyYy9jb3JlL21vZHVsZXMvYXNzZXQvYXNzZXQtcHJvdmlkZXIudHN4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oLyohIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUgKi8gXCJkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlXCIpKShcIi4vanMvc3JjL2NvcmUvbW9kdWxlcy9hc3NldC9lZGl0b3IvdHlwZXMvZm9sZGVyL3RhYi1tYW5hZ2VyL2ZvbGRlci10YWItbWFuYWdlci50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlICovIFwiZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZVwiKSkoXCIuL2pzL3NyYy9jb3JlL21vZHVsZXMvaWNvbi1saWJyYXJ5L3NlcnZpY2VzL2ljb24tbGlicmFyeS50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlICovIFwiZGxsLXJlZmVyZW5jZSBzdHVkaW9fY29yZVwiKSkoXCIuL2pzL3NyYy9jb3JlL21vZHVsZXMvd2lkZ2V0LW1hbmFnZXIvaG9va3MvdXNlLXdpZGdldC1tYW5hZ2VyLnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oLyohIGRsbC1yZWZlcmVuY2Ugc3R1ZGlvX2NvcmUgKi8gXCJkbGwtcmVmZXJlbmNlIHN0dWRpb19jb3JlXCIpKShcIi4vanMvc3JjL2NvcmUvbW9kdWxlcy93aWRnZXQtbWFuYWdlci9zZXJ2aWNlcy93aWRnZXQtcmVnaXN0cnkudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSBzdHVkaW9fY29yZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuKiBQaW1jb3JlXG4qXG4qIFRoaXMgc291cmNlIGZpbGUgaXMgYXZhaWxhYmxlIHVuZGVyIHR3byBkaWZmZXJlbnQgbGljZW5zZXM6XG4qIC0gUGltY29yZSBPcGVuIENvcmUgTGljZW5zZSAoUE9DTClcbiogLSBQaW1jb3JlIENvbW1lcmNpYWwgTGljZW5zZSAoUENMKVxuKiBGdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiBpcyBhdmFpbGFibGUgaW5cbiogTElDRU5TRS5tZCB3aGljaCBpcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXG4qXG4qICBAY29weXJpZ2h0ICBDb3B5cmlnaHQgKGMpIFBpbWNvcmUgR21iSCAoaHR0cDovL3d3dy5waW1jb3JlLm9yZylcbiogIEBsaWNlbnNlICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9waW1jb3JlL3N0dWRpby11aS1idW5kbGUvYmxvYi8xLngvTElDRU5TRS5tZCBQT0NMIGFuZCBQQ0xcbiovXG5leHBvcnQgeyBJY29uTGlicmFyeSB9IGZyb20gJ0BQaW1jb3JlL21vZHVsZXMvaWNvbi1saWJyYXJ5L3NlcnZpY2VzL2ljb24tbGlicmFyeSc7XG4vLyBDb21wb25lbnRzXG5leHBvcnQgeyBCYWNrZ3JvdW5kIH0gZnJvbSAnQFBpbWNvcmUvY29tcG9uZW50cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQnO1xuZXhwb3J0IHsgRHJvcGRvd24gfSBmcm9tICdAUGltY29yZS9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duJztcbmV4cG9ydCB7IFBpbWNvcmVJbWFnZSB9IGZyb20gJ0BQaW1jb3JlL2NvbXBvbmVudHMvcGltY29yZS1pbWFnZS9waW1jb3JlLWltYWdlJztcbmV4cG9ydCB7IEljb24gfSBmcm9tICdAUGltY29yZS9jb21wb25lbnRzL2ljb24vaWNvbic7XG4vLyBNb2R1bGVzXG5leHBvcnQgeyB1c2VXaWRnZXRNYW5hZ2VyIH0gZnJvbSAnQFBpbWNvcmUvbW9kdWxlcy93aWRnZXQtbWFuYWdlci9ob29rcy91c2Utd2lkZ2V0LW1hbmFnZXInO1xuZXhwb3J0IHsgV2lkZ2V0UmVnaXN0cnkgfSBmcm9tICdAUGltY29yZS9tb2R1bGVzL3dpZGdldC1tYW5hZ2VyL3NlcnZpY2VzL3dpZGdldC1yZWdpc3RyeSc7XG5leHBvcnQgeyB1c2VBc3NldEdldEJ5SWRRdWVyeSwgdXNlQXNzZXRHZXRUcmVlUXVlcnkgfSBmcm9tICdAUGltY29yZS9tb2R1bGVzL2Fzc2V0L2Fzc2V0LWFwaS1zbGljZS5nZW4nO1xuZXhwb3J0IHsgRm9sZGVyVGFiTWFuYWdlciB9IGZyb20gJ0BQaW1jb3JlL21vZHVsZXMvYXNzZXQvZWRpdG9yL3R5cGVzL2ZvbGRlci90YWItbWFuYWdlci9mb2xkZXItdGFiLW1hbmFnZXInO1xuZXhwb3J0IHsgQXNzZXRDb250ZXh0LCBBc3NldFByb3ZpZGVyIH0gZnJvbSAnQFBpbWNvcmUvbW9kdWxlcy9hc3NldC9hc3NldC1wcm92aWRlcic7XG5leHBvcnQgY29uc3QgUGltY29yZSA9IHdpbmRvdy5QaW1jb3JlO1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5lciA9IHdpbmRvdy5QaW1jb3JlLmNvbnRhaW5lcjtcbmV4cG9ydCBjb25zdCBzZXJ2aWNlSWRzID0gd2luZG93LlBpbWNvcmUuc2VydmljZUlkcztcbiJdLCJuYW1lcyI6WyJJY29uTGlicmFyeSIsIkJhY2tncm91bmQiLCJEcm9wZG93biIsIlBpbWNvcmVJbWFnZSIsIkljb24iLCJ1c2VXaWRnZXRNYW5hZ2VyIiwiV2lkZ2V0UmVnaXN0cnkiLCJ1c2VBc3NldEdldEJ5SWRRdWVyeSIsInVzZUFzc2V0R2V0VHJlZVF1ZXJ5IiwiRm9sZGVyVGFiTWFuYWdlciIsIkFzc2V0Q29udGV4dCIsIkFzc2V0UHJvdmlkZXIiLCJQaW1jb3JlIiwid2luZG93IiwiY29udGFpbmVyIiwic2VydmljZUlkcyJdLCJzb3VyY2VSb290IjoiIn0=