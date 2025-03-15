"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const Attribute_1 = require("../Attribute");
const AttributeDefinitions_1 = require("../AttributeDefinitions");
const DockLocation_1 = require("../DockLocation");
const Orientation_1 = require("../Orientation");
const Rect_1 = require("../Rect");
const Actions_1 = require("./Actions");
const BorderNode_1 = require("./BorderNode");
const BorderSet_1 = require("./BorderSet");
const RowNode_1 = require("./RowNode");
const TabNode_1 = require("./TabNode");
const TabSetNode_1 = require("./TabSetNode");
const Utils_1 = require("./Utils");
/**
 * Class containing the Tree of Nodes used by the FlexLayout component
 */
class Model {
    /**
     * Loads the model from the given json object
     * @param json the json model to load
     * @returns {Model} a new Model object
     */
    static fromJson(json) {
        const model = new Model();
        Model._attributeDefinitions.fromJson(json.global, model._attributes);
        if (json.borders) {
            model._borders = BorderSet_1.BorderSet._fromJson(json.borders, model);
        }
        model._root = RowNode_1.RowNode._fromJson(json.layout, model);
        model._tidy(); // initial tidy of node tree
        return model;
    }
    /** @internal */
    static _createAttributeDefinitions() {
        const attributeDefinitions = new AttributeDefinitions_1.AttributeDefinitions();
        attributeDefinitions.add("legacyOverflowMenu", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("enableEdgeDock", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("rootOrientationVertical", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("marginInsets", { top: 0, right: 0, bottom: 0, left: 0 })
            .setType("IInsets");
        attributeDefinitions.add("enableUseVisibility", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("enableRotateBorderIcons", true).setType(Attribute_1.Attribute.BOOLEAN);
        // splitter
        attributeDefinitions.add("splitterSize", -1).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("splitterExtra", 0).setType(Attribute_1.Attribute.NUMBER);
        // tab
        attributeDefinitions.add("tabEnableClose", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabCloseType", 1).setType("ICloseType");
        attributeDefinitions.add("tabEnableFloat", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabEnableDrag", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabEnableRename", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabContentClassName", undefined).setType(Attribute_1.Attribute.STRING);
        attributeDefinitions.add("tabClassName", undefined).setType(Attribute_1.Attribute.STRING);
        attributeDefinitions.add("tabIcon", undefined).setType(Attribute_1.Attribute.STRING);
        attributeDefinitions.add("tabEnableRenderOnDemand", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabDragSpeed", 0.3).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("tabBorderWidth", -1).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("tabBorderHeight", -1).setType(Attribute_1.Attribute.NUMBER);
        // tabset
        attributeDefinitions.add("tabSetEnableDeleteWhenEmpty", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetEnableDrop", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetEnableDrag", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetEnableDivide", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetEnableMaximize", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetEnableClose", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetEnableSingleTabStretch", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetAutoSelectTab", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetClassNameTabStrip", undefined).setType(Attribute_1.Attribute.STRING);
        attributeDefinitions.add("tabSetClassNameHeader", undefined).setType(Attribute_1.Attribute.STRING);
        attributeDefinitions.add("tabSetEnableTabStrip", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("tabSetHeaderHeight", 0).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("tabSetTabStripHeight", 0).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("tabSetMarginInsets", { top: 0, right: 0, bottom: 0, left: 0 })
            .setType("IInsets");
        attributeDefinitions.add("tabSetBorderInsets", { top: 0, right: 0, bottom: 0, left: 0 })
            .setType("IInsets");
        attributeDefinitions.add("tabSetTabLocation", "top").setType("ITabLocation");
        attributeDefinitions.add("tabSetMinWidth", 0).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("tabSetMinHeight", 0).setType(Attribute_1.Attribute.NUMBER);
        // border
        attributeDefinitions.add("borderSize", 200).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("borderMinSize", 0).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("borderBarSize", 0).setType(Attribute_1.Attribute.NUMBER);
        attributeDefinitions.add("borderEnableDrop", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("borderAutoSelectTabWhenOpen", true).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("borderAutoSelectTabWhenClosed", false).setType(Attribute_1.Attribute.BOOLEAN);
        attributeDefinitions.add("borderClassName", undefined).setType(Attribute_1.Attribute.STRING);
        attributeDefinitions.add("borderEnableAutoHide", false).setType(Attribute_1.Attribute.BOOLEAN);
        return attributeDefinitions;
    }
    /**
     * 'private' constructor. Use the static method Model.fromJson(json) to create a model
     *  @internal
     */
    constructor() {
        /** @internal */
        this._borderRects = { inner: Rect_1.Rect.empty(), outer: Rect_1.Rect.empty() };
        this._attributes = {};
        this._idMap = {};
        this._borders = new BorderSet_1.BorderSet(this);
        this._pointerFine = true;
        this._showHiddenBorder = DockLocation_1.DockLocation.CENTER;
    }
    /** @internal */
    _setChangeListener(listener) {
        this._changeListener = listener;
    }
    /**
     * Get the currently active tabset node
     */
    getActiveTabset() {
        if (this._activeTabSet && this.getNodeById(this._activeTabSet.getId())) {
            return this._activeTabSet;
        }
        else {
            return undefined;
        }
    }
    /** @internal */
    _getShowHiddenBorder() {
        return this._showHiddenBorder;
    }
    /** @internal */
    _setShowHiddenBorder(location) {
        this._showHiddenBorder = location;
    }
    /** @internal */
    _setActiveTabset(tabsetNode) {
        this._activeTabSet = tabsetNode;
    }
    /**
     * Get the currently maximized tabset node
     */
    getMaximizedTabset() {
        return this._maximizedTabSet;
    }
    /** @internal */
    _setMaximizedTabset(tabsetNode) {
        this._maximizedTabSet = tabsetNode;
    }
    /**
     * Gets the root RowNode of the model
     * @returns {RowNode}
     */
    getRoot() {
        return this._root;
    }
    isRootOrientationVertical() {
        return this._attributes.rootOrientationVertical;
    }
    isUseVisibility() {
        return this._attributes.enableUseVisibility;
    }
    isEnableRotateBorderIcons() {
        return this._attributes.enableRotateBorderIcons;
    }
    /**
     * Gets the
     * @returns {BorderSet|*}
     */
    getBorderSet() {
        return this._borders;
    }
    /** @internal */
    _getOuterInnerRects() {
        return this._borderRects;
    }
    /** @internal */
    _getPointerFine() {
        return this._pointerFine;
    }
    /** @internal */
    _setPointerFine(pointerFine) {
        this._pointerFine = pointerFine;
    }
    /**
     * Visits all the nodes in the model and calls the given function for each
     * @param fn a function that takes visited node and a integer level as parameters
     */
    visitNodes(fn) {
        this._borders._forEachNode(fn);
        this._root._forEachNode(fn, 0);
    }
    /**
     * Gets a node by its id
     * @param id the id to find
     */
    getNodeById(id) {
        return this._idMap[id];
    }
    /**
     * Finds the first/top left tab set of the given node.
     * @param node The top node you want to begin searching from, deafults to the root node
     * @returns The first Tab Set
     */
    getFirstTabSet(node = this._root) {
        const child = node.getChildren()[0];
        if (child instanceof TabSetNode_1.TabSetNode) {
            return child;
        }
        else {
            return this.getFirstTabSet(child);
        }
    }
    /**
     * Update the node tree by performing the given action,
     * Actions should be generated via static methods on the Actions class
     * @param action the action to perform
     * @returns added Node for Actions.addNode; undefined otherwise
     */
    doAction(action) {
        let returnVal = undefined;
        // console.log(action);
        switch (action.type) {
            case Actions_1.Actions.ADD_NODE: {
                const newNode = new TabNode_1.TabNode(this, action.data.json, true);
                const toNode = this._idMap[action.data.toNode];
                if (toNode instanceof TabSetNode_1.TabSetNode || toNode instanceof BorderNode_1.BorderNode || toNode instanceof RowNode_1.RowNode) {
                    toNode.drop(newNode, DockLocation_1.DockLocation.getByName(action.data.location), action.data.index, action.data.select);
                    returnVal = newNode;
                }
                break;
            }
            case Actions_1.Actions.MOVE_NODE: {
                const fromNode = this._idMap[action.data.fromNode];
                if (fromNode instanceof TabNode_1.TabNode || fromNode instanceof TabSetNode_1.TabSetNode) {
                    const toNode = this._idMap[action.data.toNode];
                    if (toNode instanceof TabSetNode_1.TabSetNode || toNode instanceof BorderNode_1.BorderNode || toNode instanceof RowNode_1.RowNode) {
                        toNode.drop(fromNode, DockLocation_1.DockLocation.getByName(action.data.location), action.data.index, action.data.select);
                    }
                }
                break;
            }
            case Actions_1.Actions.DELETE_TAB: {
                const node = this._idMap[action.data.node];
                if (node instanceof TabNode_1.TabNode) {
                    node._delete();
                }
                break;
            }
            case Actions_1.Actions.DELETE_TABSET: {
                const node = this._idMap[action.data.node];
                if (node instanceof TabSetNode_1.TabSetNode) {
                    // first delete all child tabs that are closeable
                    const children = [...node.getChildren()];
                    for (let i = 0; i < children.length; i++) {
                        const child = children[i];
                        if (child.isEnableClose()) {
                            child._delete();
                        }
                    }
                    if (node.getChildren().length === 0) {
                        node._delete();
                    }
                    this._tidy();
                }
                break;
            }
            case Actions_1.Actions.FLOAT_TAB: {
                const node = this._idMap[action.data.node];
                if (node instanceof TabNode_1.TabNode) {
                    node._setFloating(true);
                    (0, Utils_1.adjustSelectedIndexAfterFloat)(node);
                }
                break;
            }
            case Actions_1.Actions.UNFLOAT_TAB: {
                const node = this._idMap[action.data.node];
                if (node instanceof TabNode_1.TabNode) {
                    node._setFloating(false);
                    (0, Utils_1.adjustSelectedIndexAfterDock)(node);
                }
                break;
            }
            case Actions_1.Actions.RENAME_TAB: {
                const node = this._idMap[action.data.node];
                if (node instanceof TabNode_1.TabNode) {
                    node._setName(action.data.text);
                }
                break;
            }
            case Actions_1.Actions.SELECT_TAB: {
                const tabNode = this._idMap[action.data.tabNode];
                if (tabNode instanceof TabNode_1.TabNode) {
                    const parent = tabNode.getParent();
                    const pos = parent.getChildren().indexOf(tabNode);
                    if (parent instanceof BorderNode_1.BorderNode) {
                        if (parent.getSelected() === pos) {
                            parent._setSelected(-1);
                        }
                        else {
                            parent._setSelected(pos);
                        }
                    }
                    else if (parent instanceof TabSetNode_1.TabSetNode) {
                        if (parent.getSelected() !== pos) {
                            parent._setSelected(pos);
                        }
                        this._activeTabSet = parent;
                    }
                }
                break;
            }
            case Actions_1.Actions.SET_ACTIVE_TABSET: {
                if (action.data.tabsetNode === undefined) {
                    this._activeTabSet = undefined;
                }
                else {
                    const tabsetNode = this._idMap[action.data.tabsetNode];
                    if (tabsetNode instanceof TabSetNode_1.TabSetNode) {
                        this._activeTabSet = tabsetNode;
                    }
                }
                break;
            }
            case Actions_1.Actions.ADJUST_SPLIT: {
                const node1 = this._idMap[action.data.node1];
                const node2 = this._idMap[action.data.node2];
                if ((node1 instanceof TabSetNode_1.TabSetNode || node1 instanceof RowNode_1.RowNode) && (node2 instanceof TabSetNode_1.TabSetNode || node2 instanceof RowNode_1.RowNode)) {
                    this._adjustSplitSide(node1, action.data.weight1, action.data.pixelWidth1);
                    this._adjustSplitSide(node2, action.data.weight2, action.data.pixelWidth2);
                }
                break;
            }
            case Actions_1.Actions.ADJUST_BORDER_SPLIT: {
                const node = this._idMap[action.data.node];
                if (node instanceof BorderNode_1.BorderNode) {
                    node._setSize(action.data.pos);
                }
                break;
            }
            case Actions_1.Actions.MAXIMIZE_TOGGLE: {
                const node = this._idMap[action.data.node];
                if (node instanceof TabSetNode_1.TabSetNode) {
                    if (node === this._maximizedTabSet) {
                        this._maximizedTabSet = undefined;
                    }
                    else {
                        this._maximizedTabSet = node;
                        this._activeTabSet = node;
                    }
                }
                break;
            }
            case Actions_1.Actions.UPDATE_MODEL_ATTRIBUTES: {
                this._updateAttrs(action.data.json);
                break;
            }
            case Actions_1.Actions.UPDATE_NODE_ATTRIBUTES: {
                const node = this._idMap[action.data.node];
                node._updateAttrs(action.data.json);
                break;
            }
            default:
                break;
        }
        this._updateIdMap();
        if (this._changeListener !== undefined) {
            this._changeListener(action);
        }
        return returnVal;
    }
    /** @internal */
    _updateIdMap() {
        // regenerate idMap to stop it building up
        this._idMap = {};
        this.visitNodes((node) => (this._idMap[node.getId()] = node));
        // console.log(JSON.stringify(Object.keys(this._idMap)));
    }
    /** @internal */
    _adjustSplitSide(node, weight, pixels) {
        node._setWeight(weight);
        if (node.getWidth() != null && node.getOrientation() === Orientation_1.Orientation.VERT) {
            node._updateAttrs({ width: pixels });
        }
        else if (node.getHeight() != null && node.getOrientation() === Orientation_1.Orientation.HORZ) {
            node._updateAttrs({ height: pixels });
        }
    }
    /**
     * Converts the model to a json object
     * @returns {IJsonModel} json object that represents this model
     */
    toJson() {
        const global = {};
        Model._attributeDefinitions.toJson(global, this._attributes);
        // save state of nodes
        this.visitNodes((node) => {
            node._fireEvent("save", undefined);
        });
        return { global, borders: this._borders._toJson(), layout: this._root.toJson() };
    }
    getSplitterSize() {
        let splitterSize = this._attributes.splitterSize;
        if (splitterSize === -1) {
            // use defaults
            splitterSize = this._pointerFine ? 8 : 12; // larger for mobile
        }
        return splitterSize;
    }
    isLegacyOverflowMenu() {
        return this._attributes.legacyOverflowMenu;
    }
    getSplitterExtra() {
        return this._attributes.splitterExtra;
    }
    isEnableEdgeDock() {
        return this._attributes.enableEdgeDock;
    }
    /** @internal */
    _addNode(node) {
        const id = node.getId();
        if (this._idMap[id] !== undefined) {
            throw new Error(`Error: each node must have a unique id, duplicate id:${node.getId()}`);
        }
        if (node.getType() !== "splitter") {
            this._idMap[id] = node;
        }
    }
    /** @internal */
    _layout(rect, metrics) {
        var _a;
        // let start = Date.now();
        this._borderRects = this._borders._layoutBorder({ outer: rect, inner: rect }, metrics);
        rect = this._borderRects.inner.removeInsets(this._getAttribute("marginInsets"));
        (_a = this._root) === null || _a === void 0 ? void 0 : _a.calcMinSize();
        this._root._layout(rect, metrics);
        // console.log("layout time: " + (Date.now() - start));
        return rect;
    }
    /** @internal */
    _findDropTargetNode(dragNode, x, y) {
        let node = this._root._findDropTargetNode(dragNode, x, y);
        if (node === undefined) {
            node = this._borders._findDropTargetNode(dragNode, x, y);
        }
        return node;
    }
    /** @internal */
    _tidy() {
        // console.log("before _tidy", this.toString());
        this._root._tidy();
        // console.log("after _tidy", this.toString());
    }
    /** @internal */
    _updateAttrs(json) {
        Model._attributeDefinitions.update(json, this._attributes);
    }
    /** @internal */
    _nextUniqueId() {
        return '#' + (0, Utils_1.randomUUID)();
    }
    /** @internal */
    _getAttribute(name) {
        return this._attributes[name];
    }
    /**
     * Sets a function to allow/deny dropping a node
     * @param onAllowDrop function that takes the drag node and DropInfo and returns true if the drop is allowed
     */
    setOnAllowDrop(onAllowDrop) {
        this._onAllowDrop = onAllowDrop;
    }
    /** @internal */
    _getOnAllowDrop() {
        return this._onAllowDrop;
    }
    /**
     * set callback called when a new TabSet is created.
     * The tabNode can be undefined if it's the auto created first tabset in the root row (when the last
     * tab is deleted, the root tabset can be recreated)
     * @param onCreateTabSet
     */
    setOnCreateTabSet(onCreateTabSet) {
        this._onCreateTabSet = onCreateTabSet;
    }
    /** @internal */
    _getOnCreateTabSet() {
        return this._onCreateTabSet;
    }
    static toTypescriptInterfaces() {
        console.log(Model._attributeDefinitions.toTypescriptInterface("Global", undefined));
        console.log(RowNode_1.RowNode.getAttributeDefinitions().toTypescriptInterface("Row", Model._attributeDefinitions));
        console.log(TabSetNode_1.TabSetNode.getAttributeDefinitions().toTypescriptInterface("TabSet", Model._attributeDefinitions));
        console.log(TabNode_1.TabNode.getAttributeDefinitions().toTypescriptInterface("Tab", Model._attributeDefinitions));
        console.log(BorderNode_1.BorderNode.getAttributeDefinitions().toTypescriptInterface("Border", Model._attributeDefinitions));
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
}
exports.Model = Model;
/** @internal */
Model._attributeDefinitions = Model._createAttributeDefinitions();
//# sourceMappingURL=Model.js.map