"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderTabSet = void 0;
const React = require("react");
const DockLocation_1 = require("../DockLocation");
const BorderButton_1 = require("./BorderButton");
const PopupMenu_1 = require("../PopupMenu");
const Actions_1 = require("../model/Actions");
const I18nLabel_1 = require("../I18nLabel");
const TabOverflowHook_1 = require("./TabOverflowHook");
const Orientation_1 = require("../Orientation");
const Types_1 = require("../Types");
const Utils_1 = require("./Utils");
/** @internal */
const BorderTabSet = (props) => {
    const { border, layout, iconFactory, titleFactory, icons, path } = props;
    const toolbarRef = React.useRef(null);
    const overflowbuttonRef = React.useRef(null);
    const stickyButtonsRef = React.useRef(null);
    const { selfRef, position, userControlledLeft, hiddenTabs, onMouseWheel, tabsTruncated } = (0, TabOverflowHook_1.useTabOverflow)(border, Orientation_1.Orientation.flip(border.getOrientation()), toolbarRef, stickyButtonsRef);
    const onAuxMouseClick = (event) => {
        if ((0, Utils_1.isAuxMouseEvent)(event)) {
            layout.auxMouseClick(border, event);
        }
    };
    const onContextMenu = (event) => {
        layout.showContextMenu(border, event);
    };
    const onInterceptMouseDown = (event) => {
        event.stopPropagation();
    };
    const onOverflowClick = (event) => {
        const callback = layout.getShowOverflowMenu();
        if (callback !== undefined) {
            callback(border, event, hiddenTabs, onOverflowItemSelect);
        }
        else {
            const element = overflowbuttonRef.current;
            (0, PopupMenu_1.showPopup)(element, hiddenTabs, onOverflowItemSelect, layout, iconFactory, titleFactory);
        }
        event.stopPropagation();
    };
    const onOverflowItemSelect = (item) => {
        layout.doAction(Actions_1.Actions.selectTab(item.node.getId()));
        userControlledLeft.current = false;
    };
    const onFloatTab = (event) => {
        const selectedTabNode = border.getChildren()[border.getSelected()];
        if (selectedTabNode !== undefined) {
            layout.doAction(Actions_1.Actions.floatTab(selectedTabNode.getId()));
        }
        event.stopPropagation();
    };
    const cm = layout.getClassName;
    let style = border.getTabHeaderRect().styleWithPosition({});
    const tabs = [];
    const layoutTab = (i) => {
        let isSelected = border.getSelected() === i;
        let child = border.getChildren()[i];
        tabs.push(React.createElement(BorderButton_1.BorderButton, { layout: layout, border: border.getLocation().getName(), node: child, path: path + "/tb" + i, key: child.getId(), selected: isSelected, iconFactory: iconFactory, titleFactory: titleFactory, icons: icons }));
        if (i < border.getChildren().length - 1) {
            tabs.push(React.createElement("div", { key: "divider" + i, className: cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TAB_DIVIDER) }));
        }
    };
    for (let i = 0; i < border.getChildren().length; i++) {
        layoutTab(i);
    }
    let borderClasses = cm(Types_1.CLASSES.FLEXLAYOUT__BORDER) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_ + border.getLocation().getName());
    if (border.getClassName() !== undefined) {
        borderClasses += " " + border.getClassName();
    }
    // allow customization of tabset right/bottom buttons
    let buttons = [];
    let stickyButtons = [];
    const renderState = { headerContent: undefined, buttons, stickyButtons: stickyButtons, headerButtons: [], overflowPosition: undefined };
    layout.customizeTabSet(border, renderState);
    buttons = renderState.buttons;
    if (renderState.overflowPosition === undefined) {
        renderState.overflowPosition = stickyButtons.length;
    }
    if (stickyButtons.length > 0) {
        if (tabsTruncated) {
            buttons = [...stickyButtons, ...buttons];
        }
        else {
            tabs.push(React.createElement("div", { ref: stickyButtonsRef, key: "sticky_buttons_container", onMouseDown: onInterceptMouseDown, onTouchStart: onInterceptMouseDown, onDragStart: (e) => { e.preventDefault(); }, className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_TOOLBAR_STICKY_BUTTONS_CONTAINER) }, stickyButtons));
        }
    }
    if (hiddenTabs.length > 0) {
        const overflowTitle = layout.i18nName(I18nLabel_1.I18nLabel.Overflow_Menu_Tooltip);
        let overflowContent;
        if (typeof icons.more === "function") {
            overflowContent = icons.more(border, hiddenTabs);
        }
        else {
            overflowContent = (React.createElement(React.Fragment, null,
                icons.more,
                React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_BUTTON_OVERFLOW_COUNT) }, hiddenTabs.length)));
        }
        buttons.splice(Math.min(renderState.overflowPosition, buttons.length), 0, React.createElement("button", { key: "overflowbutton", ref: overflowbuttonRef, className: cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR_BUTTON) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR_BUTTON_OVERFLOW) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR_BUTTON_OVERFLOW_ + border.getLocation().getName()), title: overflowTitle, onClick: onOverflowClick, onMouseDown: onInterceptMouseDown, onTouchStart: onInterceptMouseDown }, overflowContent));
    }
    const selectedIndex = border.getSelected();
    if (selectedIndex !== -1) {
        const selectedTabNode = border.getChildren()[selectedIndex];
        if (selectedTabNode !== undefined && layout.isSupportsPopout() && selectedTabNode.isEnableFloat() && !selectedTabNode.isFloating()) {
            const floatTitle = layout.i18nName(I18nLabel_1.I18nLabel.Float_Tab);
            buttons.push(React.createElement("button", { key: "float", title: floatTitle, className: cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR_BUTTON) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR_BUTTON_FLOAT), onClick: onFloatTab, onMouseDown: onInterceptMouseDown, onTouchStart: onInterceptMouseDown }, (typeof icons.popout === "function") ? icons.popout(selectedTabNode) : icons.popout));
        }
    }
    const toolbar = (React.createElement("div", { key: "toolbar", ref: toolbarRef, className: cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_TOOLBAR_ + border.getLocation().getName()) }, buttons));
    style = layout.styleFont(style);
    let innerStyle = {};
    const borderHeight = border.getBorderBarSize() - 1;
    if (border.getLocation() === DockLocation_1.DockLocation.LEFT) {
        innerStyle = { right: borderHeight, height: borderHeight, top: position };
    }
    else if (border.getLocation() === DockLocation_1.DockLocation.RIGHT) {
        innerStyle = { left: borderHeight, height: borderHeight, top: position };
    }
    else {
        innerStyle = { height: borderHeight, left: position };
    }
    return (React.createElement("div", { ref: selfRef, dir: "ltr", style: style, className: borderClasses, "data-layout-path": path, onClick: onAuxMouseClick, onAuxClick: onAuxMouseClick, onContextMenu: onContextMenu, onWheel: onMouseWheel },
        React.createElement("div", { style: { height: borderHeight }, className: cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_INNER) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_INNER_ + border.getLocation().getName()) },
            React.createElement("div", { style: innerStyle, className: cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_INNER_TAB_CONTAINER) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__BORDER_INNER_TAB_CONTAINER_ + border.getLocation().getName()) }, tabs)),
        toolbar));
};
exports.BorderTabSet = BorderTabSet;
//# sourceMappingURL=BorderTabSet.js.map