(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/echarts/lib/action/createDataSelectAction.js":
/*!*******************************************************************!*\
  !*** ./node_modules/echarts/lib/action/createDataSelectAction.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType, actionInfos) {
  zrUtil.each(actionInfos, function (actionInfo) {
    actionInfo.update = 'updateView';
    /**
     * @payload
     * @property {string} seriesName
     * @property {string} name
     */

    echarts.registerAction(actionInfo, function (payload, ecModel) {
      var selected = {};
      ecModel.eachComponent({
        mainType: 'series',
        subType: seriesType,
        query: payload
      }, function (seriesModel) {
        if (seriesModel[actionInfo.method]) {
          seriesModel[actionInfo.method](payload.name, payload.dataIndex);
        }

        var data = seriesModel.getData(); // Create selected map

        data.each(function (idx) {
          var name = data.getName(idx);
          selected[name] = seriesModel.isSelected(name) || false;
        });
      });
      return {
        name: payload.name,
        selected: selected
      };
    });
  });
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/helper/Symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/helper/Symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var _symbol = __webpack_require__(/*! ../../util/symbol */ "./node_modules/echarts/lib/util/symbol.js");

var createSymbol = _symbol.createSymbol;

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var _number = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

var parsePercent = _number.parsePercent;

var _labelHelper = __webpack_require__(/*! ./labelHelper */ "./node_modules/echarts/lib/chart/helper/labelHelper.js");

var getDefaultLabel = _labelHelper.getDefaultLabel;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @module echarts/chart/helper/Symbol
 */

/**
 * @constructor
 * @alias {module:echarts/chart/helper/Symbol}
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @extends {module:zrender/graphic/Group}
 */
function SymbolClz(data, idx, seriesScope) {
  graphic.Group.call(this);
  this.updateData(data, idx, seriesScope);
}

var symbolProto = SymbolClz.prototype;
/**
 * @public
 * @static
 * @param {module:echarts/data/List} data
 * @param {number} dataIndex
 * @return {Array.<number>} [width, height]
 */

var getSymbolSize = SymbolClz.getSymbolSize = function (data, idx) {
  var symbolSize = data.getItemVisual(idx, 'symbolSize');
  return symbolSize instanceof Array ? symbolSize.slice() : [+symbolSize, +symbolSize];
};

function getScale(symbolSize) {
  return [symbolSize[0] / 2, symbolSize[1] / 2];
}

function driftSymbol(dx, dy) {
  this.parent.drift(dx, dy);
}

symbolProto._createSymbol = function (symbolType, data, idx, symbolSize, keepAspect) {
  // Remove paths created before
  this.removeAll();
  var color = data.getItemVisual(idx, 'color'); // var symbolPath = createSymbol(
  //     symbolType, -0.5, -0.5, 1, 1, color
  // );
  // If width/height are set too small (e.g., set to 1) on ios10
  // and macOS Sierra, a circle stroke become a rect, no matter what
  // the scale is set. So we set width/height as 2. See #4150.

  var symbolPath = createSymbol(symbolType, -1, -1, 2, 2, color, keepAspect);
  symbolPath.attr({
    z2: 100,
    culling: true,
    scale: getScale(symbolSize)
  }); // Rewrite drift method

  symbolPath.drift = driftSymbol;
  this._symbolType = symbolType;
  this.add(symbolPath);
};
/**
 * Stop animation
 * @param {boolean} toLastFrame
 */


symbolProto.stopSymbolAnimation = function (toLastFrame) {
  this.childAt(0).stopAnimation(toLastFrame);
};
/**
 * FIXME:
 * Caution: This method breaks the encapsulation of this module,
 * but it indeed brings convenience. So do not use the method
 * unless you detailedly know all the implements of `Symbol`,
 * especially animation.
 *
 * Get symbol path element.
 */


symbolProto.getSymbolPath = function () {
  return this.childAt(0);
};
/**
 * Get scale(aka, current symbol size).
 * Including the change caused by animation
 */


symbolProto.getScale = function () {
  return this.childAt(0).scale;
};
/**
 * Highlight symbol
 */


symbolProto.highlight = function () {
  this.childAt(0).trigger('emphasis');
};
/**
 * Downplay symbol
 */


symbolProto.downplay = function () {
  this.childAt(0).trigger('normal');
};
/**
 * @param {number} zlevel
 * @param {number} z
 */


symbolProto.setZ = function (zlevel, z) {
  var symbolPath = this.childAt(0);
  symbolPath.zlevel = zlevel;
  symbolPath.z = z;
};

symbolProto.setDraggable = function (draggable) {
  var symbolPath = this.childAt(0);
  symbolPath.draggable = draggable;
  symbolPath.cursor = draggable ? 'move' : 'pointer';
};
/**
 * Update symbol properties
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @param {Object} [seriesScope]
 * @param {Object} [seriesScope.itemStyle]
 * @param {Object} [seriesScope.hoverItemStyle]
 * @param {Object} [seriesScope.symbolRotate]
 * @param {Object} [seriesScope.symbolOffset]
 * @param {module:echarts/model/Model} [seriesScope.labelModel]
 * @param {module:echarts/model/Model} [seriesScope.hoverLabelModel]
 * @param {boolean} [seriesScope.hoverAnimation]
 * @param {Object} [seriesScope.cursorStyle]
 * @param {module:echarts/model/Model} [seriesScope.itemModel]
 * @param {string} [seriesScope.symbolInnerColor]
 * @param {Object} [seriesScope.fadeIn=false]
 */


symbolProto.updateData = function (data, idx, seriesScope) {
  this.silent = false;
  var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
  var seriesModel = data.hostModel;
  var symbolSize = getSymbolSize(data, idx);
  var isInit = symbolType !== this._symbolType;

  if (isInit) {
    var keepAspect = data.getItemVisual(idx, 'symbolKeepAspect');

    this._createSymbol(symbolType, data, idx, symbolSize, keepAspect);
  } else {
    var symbolPath = this.childAt(0);
    symbolPath.silent = false;
    graphic.updateProps(symbolPath, {
      scale: getScale(symbolSize)
    }, seriesModel, idx);
  }

  this._updateCommon(data, idx, symbolSize, seriesScope);

  if (isInit) {
    var symbolPath = this.childAt(0);
    var fadeIn = seriesScope && seriesScope.fadeIn;
    var target = {
      scale: symbolPath.scale.slice()
    };
    fadeIn && (target.style = {
      opacity: symbolPath.style.opacity
    });
    symbolPath.scale = [0, 0];
    fadeIn && (symbolPath.style.opacity = 0);
    graphic.initProps(symbolPath, target, seriesModel, idx);
  }

  this._seriesModel = seriesModel;
}; // Update common properties


var normalStyleAccessPath = ['itemStyle'];
var emphasisStyleAccessPath = ['emphasis', 'itemStyle'];
var normalLabelAccessPath = ['label'];
var emphasisLabelAccessPath = ['emphasis', 'label'];
/**
 * @param {module:echarts/data/List} data
 * @param {number} idx
 * @param {Array.<number>} symbolSize
 * @param {Object} [seriesScope]
 */

symbolProto._updateCommon = function (data, idx, symbolSize, seriesScope) {
  var symbolPath = this.childAt(0);
  var seriesModel = data.hostModel;
  var color = data.getItemVisual(idx, 'color'); // Reset style

  if (symbolPath.type !== 'image') {
    symbolPath.useStyle({
      strokeNoScale: true
    });
  }

  var itemStyle = seriesScope && seriesScope.itemStyle;
  var hoverItemStyle = seriesScope && seriesScope.hoverItemStyle;
  var symbolRotate = seriesScope && seriesScope.symbolRotate;
  var symbolOffset = seriesScope && seriesScope.symbolOffset;
  var labelModel = seriesScope && seriesScope.labelModel;
  var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
  var hoverAnimation = seriesScope && seriesScope.hoverAnimation;
  var cursorStyle = seriesScope && seriesScope.cursorStyle;

  if (!seriesScope || data.hasItemOption) {
    var itemModel = seriesScope && seriesScope.itemModel ? seriesScope.itemModel : data.getItemModel(idx); // Color must be excluded.
    // Because symbol provide setColor individually to set fill and stroke

    itemStyle = itemModel.getModel(normalStyleAccessPath).getItemStyle(['color']);
    hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();
    symbolRotate = itemModel.getShallow('symbolRotate');
    symbolOffset = itemModel.getShallow('symbolOffset');
    labelModel = itemModel.getModel(normalLabelAccessPath);
    hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);
    hoverAnimation = itemModel.getShallow('hoverAnimation');
    cursorStyle = itemModel.getShallow('cursor');
  } else {
    hoverItemStyle = zrUtil.extend({}, hoverItemStyle);
  }

  var elStyle = symbolPath.style;
  symbolPath.attr('rotation', (symbolRotate || 0) * Math.PI / 180 || 0);

  if (symbolOffset) {
    symbolPath.attr('position', [parsePercent(symbolOffset[0], symbolSize[0]), parsePercent(symbolOffset[1], symbolSize[1])]);
  }

  cursorStyle && symbolPath.attr('cursor', cursorStyle); // PENDING setColor before setStyle!!!

  symbolPath.setColor(color, seriesScope && seriesScope.symbolInnerColor);
  symbolPath.setStyle(itemStyle);
  var opacity = data.getItemVisual(idx, 'opacity');

  if (opacity != null) {
    elStyle.opacity = opacity;
  }

  var liftZ = data.getItemVisual(idx, 'liftZ');
  var z2Origin = symbolPath.__z2Origin;

  if (liftZ != null) {
    if (z2Origin == null) {
      symbolPath.__z2Origin = symbolPath.z2;
      symbolPath.z2 += liftZ;
    }
  } else if (z2Origin != null) {
    symbolPath.z2 = z2Origin;
    symbolPath.__z2Origin = null;
  }

  var useNameLabel = seriesScope && seriesScope.useNameLabel;
  graphic.setLabelStyle(elStyle, hoverItemStyle, labelModel, hoverLabelModel, {
    labelFetcher: seriesModel,
    labelDataIndex: idx,
    defaultText: getLabelDefaultText,
    isRectText: true,
    autoColor: color
  }); // Do not execute util needed.

  function getLabelDefaultText(idx, opt) {
    return useNameLabel ? data.getName(idx) : getDefaultLabel(data, idx);
  }

  symbolPath.off('mouseover').off('mouseout').off('emphasis').off('normal');
  symbolPath.hoverStyle = hoverItemStyle; // FIXME
  // Do not use symbol.trigger('emphasis'), but use symbol.highlight() instead.

  graphic.setHoverStyle(symbolPath);
  symbolPath.__symbolOriginalScale = getScale(symbolSize);

  if (hoverAnimation && seriesModel.isAnimationEnabled()) {
    // Note: consider `off`, should use static function here.
    symbolPath.on('mouseover', onMouseOver).on('mouseout', onMouseOut).on('emphasis', onEmphasis).on('normal', onNormal);
  }
};

function onMouseOver() {
  // see comment in `graphic.isInEmphasis`
  !graphic.isInEmphasis(this) && onEmphasis.call(this);
}

function onMouseOut() {
  // see comment in `graphic.isInEmphasis`
  !graphic.isInEmphasis(this) && onNormal.call(this);
}

function onEmphasis() {
  // Do not support this hover animation util some scenario required.
  // Animation can only be supported in hover layer when using `el.incremetal`.
  if (this.incremental || this.useHoverLayer) {
    return;
  }

  var scale = this.__symbolOriginalScale;
  var ratio = scale[1] / scale[0];
  this.animateTo({
    scale: [Math.max(scale[0] * 1.1, scale[0] + 3), Math.max(scale[1] * 1.1, scale[1] + 3 * ratio)]
  }, 400, 'elasticOut');
}

function onNormal() {
  if (this.incremental || this.useHoverLayer) {
    return;
  }

  this.animateTo({
    scale: this.__symbolOriginalScale
  }, 400, 'elasticOut');
}
/**
 * @param {Function} cb
 * @param {Object} [opt]
 * @param {Object} [opt.keepLabel=true]
 */


symbolProto.fadeOut = function (cb, opt) {
  var symbolPath = this.childAt(0); // Avoid mistaken hover when fading out

  this.silent = symbolPath.silent = true; // Not show text when animating

  !(opt && opt.keepLabel) && (symbolPath.style.text = null);
  graphic.updateProps(symbolPath, {
    style: {
      opacity: 0
    },
    scale: [0, 0]
  }, this._seriesModel, this.dataIndex, cb);
};

zrUtil.inherits(SymbolClz, graphic.Group);
var _default = SymbolClz;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/helper/SymbolDraw.js":
/*!*************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/helper/SymbolDraw.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var SymbolClz = __webpack_require__(/*! ./Symbol */ "./node_modules/echarts/lib/chart/helper/Symbol.js");

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var isObject = _util.isObject;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @module echarts/chart/helper/SymbolDraw
 */

/**
 * @constructor
 * @alias module:echarts/chart/helper/SymbolDraw
 * @param {module:zrender/graphic/Group} [symbolCtor]
 */
function SymbolDraw(symbolCtor) {
  this.group = new graphic.Group();
  this._symbolCtor = symbolCtor || SymbolClz;
}

var symbolDrawProto = SymbolDraw.prototype;

function symbolNeedsDraw(data, point, idx, opt) {
  return point && !isNaN(point[0]) && !isNaN(point[1]) && !(opt.isIgnore && opt.isIgnore(idx)) // We do not set clipShape on group, because it will cut part of
  // the symbol element shape. We use the same clip shape here as
  // the line clip.
  && !(opt.clipShape && !opt.clipShape.contain(point[0], point[1])) && data.getItemVisual(idx, 'symbol') !== 'none';
}
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} [opt] Or isIgnore
 * @param {Function} [opt.isIgnore]
 * @param {Object} [opt.clipShape]
 */


symbolDrawProto.updateData = function (data, opt) {
  opt = normalizeUpdateOpt(opt);
  var group = this.group;
  var seriesModel = data.hostModel;
  var oldData = this._data;
  var SymbolCtor = this._symbolCtor;
  var seriesScope = makeSeriesScope(data); // There is no oldLineData only when first rendering or switching from
  // stream mode to normal mode, where previous elements should be removed.

  if (!oldData) {
    group.removeAll();
  }

  data.diff(oldData).add(function (newIdx) {
    var point = data.getItemLayout(newIdx);

    if (symbolNeedsDraw(data, point, newIdx, opt)) {
      var symbolEl = new SymbolCtor(data, newIdx, seriesScope);
      symbolEl.attr('position', point);
      data.setItemGraphicEl(newIdx, symbolEl);
      group.add(symbolEl);
    }
  }).update(function (newIdx, oldIdx) {
    var symbolEl = oldData.getItemGraphicEl(oldIdx);
    var point = data.getItemLayout(newIdx);

    if (!symbolNeedsDraw(data, point, newIdx, opt)) {
      group.remove(symbolEl);
      return;
    }

    if (!symbolEl) {
      symbolEl = new SymbolCtor(data, newIdx);
      symbolEl.attr('position', point);
    } else {
      symbolEl.updateData(data, newIdx, seriesScope);
      graphic.updateProps(symbolEl, {
        position: point
      }, seriesModel);
    } // Add back


    group.add(symbolEl);
    data.setItemGraphicEl(newIdx, symbolEl);
  }).remove(function (oldIdx) {
    var el = oldData.getItemGraphicEl(oldIdx);
    el && el.fadeOut(function () {
      group.remove(el);
    });
  }).execute();
  this._data = data;
};

symbolDrawProto.isPersistent = function () {
  return true;
};

symbolDrawProto.updateLayout = function () {
  var data = this._data;

  if (data) {
    // Not use animation
    data.eachItemGraphicEl(function (el, idx) {
      var point = data.getItemLayout(idx);
      el.attr('position', point);
    });
  }
};

symbolDrawProto.incrementalPrepareUpdate = function (data) {
  this._seriesScope = makeSeriesScope(data);
  this._data = null;
  this.group.removeAll();
};
/**
 * Update symbols draw by new data
 * @param {module:echarts/data/List} data
 * @param {Object} [opt] Or isIgnore
 * @param {Function} [opt.isIgnore]
 * @param {Object} [opt.clipShape]
 */


symbolDrawProto.incrementalUpdate = function (taskParams, data, opt) {
  opt = normalizeUpdateOpt(opt);

  function updateIncrementalAndHover(el) {
    if (!el.isGroup) {
      el.incremental = el.useHoverLayer = true;
    }
  }

  for (var idx = taskParams.start; idx < taskParams.end; idx++) {
    var point = data.getItemLayout(idx);

    if (symbolNeedsDraw(data, point, idx, opt)) {
      var el = new this._symbolCtor(data, idx, this._seriesScope);
      el.traverse(updateIncrementalAndHover);
      el.attr('position', point);
      this.group.add(el);
      data.setItemGraphicEl(idx, el);
    }
  }
};

function normalizeUpdateOpt(opt) {
  if (opt != null && !isObject(opt)) {
    opt = {
      isIgnore: opt
    };
  }

  return opt || {};
}

symbolDrawProto.remove = function (enableAnimation) {
  var group = this.group;
  var data = this._data; // Incremental model do not have this._data.

  if (data && enableAnimation) {
    data.eachItemGraphicEl(function (el) {
      el.fadeOut(function () {
        group.remove(el);
      });
    });
  } else {
    group.removeAll();
  }
};

function makeSeriesScope(data) {
  var seriesModel = data.hostModel;
  return {
    itemStyle: seriesModel.getModel('itemStyle').getItemStyle(['color']),
    hoverItemStyle: seriesModel.getModel('emphasis.itemStyle').getItemStyle(),
    symbolRotate: seriesModel.get('symbolRotate'),
    symbolOffset: seriesModel.get('symbolOffset'),
    hoverAnimation: seriesModel.get('hoverAnimation'),
    labelModel: seriesModel.getModel('label'),
    hoverLabelModel: seriesModel.getModel('emphasis.label'),
    cursorStyle: seriesModel.get('cursor')
  };
}

var _default = SymbolDraw;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/helper/createListSimply.js":
/*!*******************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/helper/createListSimply.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var createDimensions = __webpack_require__(/*! ../../data/helper/createDimensions */ "./node_modules/echarts/lib/data/helper/createDimensions.js");

var List = __webpack_require__(/*! ../../data/List */ "./node_modules/echarts/lib/data/List.js");

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var extend = _util.extend;
var isArray = _util.isArray;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * [Usage]:
 * (1)
 * createListSimply(seriesModel, ['value']);
 * (2)
 * createListSimply(seriesModel, {
 *     coordDimensions: ['value'],
 *     dimensionsCount: 5
 * });
 *
 * @param {module:echarts/model/Series} seriesModel
 * @param {Object|Array.<string|Object>} opt opt or coordDimensions
 *        The options in opt, see `echarts/data/helper/createDimensions`
 * @param {Array.<string>} [nameList]
 * @return {module:echarts/data/List}
 */
function _default(seriesModel, opt, nameList) {
  opt = isArray(opt) && {
    coordDimensions: opt
  } || extend({}, opt);
  var source = seriesModel.getSource();
  var dimensionsInfo = createDimensions(source, opt);
  var list = new List(dimensionsInfo, seriesModel);
  list.initData(source, nameList);
  return list;
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line.js":
/*!************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../echarts */ "./node_modules/echarts/lib/echarts.js");

__webpack_require__(/*! ./line/LineSeries */ "./node_modules/echarts/lib/chart/line/LineSeries.js");

__webpack_require__(/*! ./line/LineView */ "./node_modules/echarts/lib/chart/line/LineView.js");

var visualSymbol = __webpack_require__(/*! ../visual/symbol */ "./node_modules/echarts/lib/visual/symbol.js");

var layoutPoints = __webpack_require__(/*! ../layout/points */ "./node_modules/echarts/lib/layout/points.js");

var dataSample = __webpack_require__(/*! ../processor/dataSample */ "./node_modules/echarts/lib/processor/dataSample.js");

__webpack_require__(/*! ../component/gridSimple */ "./node_modules/echarts/lib/component/gridSimple.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// In case developer forget to include grid component
echarts.registerVisual(visualSymbol('line', 'circle', 'line'));
echarts.registerLayout(layoutPoints('line')); // Down sample after filter

echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, dataSample('line'));

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/LineSeries.js":
/*!***********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/LineSeries.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__(/*! ../../config */ "./node_modules/echarts/lib/config.js");

var __DEV__ = _config.__DEV__;

var createListFromArray = __webpack_require__(/*! ../helper/createListFromArray */ "./node_modules/echarts/lib/chart/helper/createListFromArray.js");

var SeriesModel = __webpack_require__(/*! ../../model/Series */ "./node_modules/echarts/lib/model/Series.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var _default = SeriesModel.extend({
  type: 'series.line',
  dependencies: ['grid', 'polar'],
  getInitialData: function (option, ecModel) {
    return createListFromArray(this.getSource(), this);
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    hoverAnimation: true,
    // stack: null
    // xAxisIndex: 0,
    // yAxisIndex: 0,
    // polarIndex: 0,
    // If clip the overflow value
    clipOverflow: true,
    // cursor: null,
    label: {
      position: 'top'
    },
    // itemStyle: {
    // },
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    // areaStyle: {
    // origin of areaStyle. Valid values:
    // `'auto'/null/undefined`: from axisLine to data
    // `'start'`: from min to data
    // `'end'`: from data to max
    // origin: 'auto'
    // },
    // false, 'start', 'end', 'middle'
    step: false,
    // Disabled if step is true
    smooth: false,
    smoothMonotone: null,
    symbol: 'emptyCircle',
    symbolSize: 4,
    symbolRotate: null,
    showSymbol: true,
    // `false`: follow the label interval strategy.
    // `true`: show all symbols.
    // `'auto'`: If possible, show all symbols, otherwise
    //           follow the label interval strategy.
    showAllSymbol: 'auto',
    // Whether to connect break point.
    connectNulls: false,
    // Sampling for large data. Can be: 'average', 'max', 'min', 'sum'.
    sampling: 'none',
    animationEasing: 'linear',
    // Disable progressive
    progressive: 0,
    hoverLayerThreshold: Infinity
  }
});

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/LineView.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/LineView.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__(/*! ../../config */ "./node_modules/echarts/lib/config.js");

var __DEV__ = _config.__DEV__;

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var SymbolDraw = __webpack_require__(/*! ../helper/SymbolDraw */ "./node_modules/echarts/lib/chart/helper/SymbolDraw.js");

var SymbolClz = __webpack_require__(/*! ../helper/Symbol */ "./node_modules/echarts/lib/chart/helper/Symbol.js");

var lineAnimationDiff = __webpack_require__(/*! ./lineAnimationDiff */ "./node_modules/echarts/lib/chart/line/lineAnimationDiff.js");

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var modelUtil = __webpack_require__(/*! ../../util/model */ "./node_modules/echarts/lib/util/model.js");

var _poly = __webpack_require__(/*! ./poly */ "./node_modules/echarts/lib/chart/line/poly.js");

var Polyline = _poly.Polyline;
var Polygon = _poly.Polygon;

var ChartView = __webpack_require__(/*! ../../view/Chart */ "./node_modules/echarts/lib/view/Chart.js");

var _number = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

var round = _number.round;

var _helper = __webpack_require__(/*! ./helper */ "./node_modules/echarts/lib/chart/line/helper.js");

var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
var getStackedOnPoint = _helper.getStackedOnPoint;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME step not support polar
function isPointsSame(points1, points2) {
  if (points1.length !== points2.length) {
    return;
  }

  for (var i = 0; i < points1.length; i++) {
    var p1 = points1[i];
    var p2 = points2[i];

    if (p1[0] !== p2[0] || p1[1] !== p2[1]) {
      return;
    }
  }

  return true;
}

function getSmooth(smooth) {
  return typeof smooth === 'number' ? smooth : smooth ? 0.5 : 0;
}

function getAxisExtentWithGap(axis) {
  var extent = axis.getGlobalExtent();

  if (axis.onBand) {
    // Remove extra 1px to avoid line miter in clipped edge
    var halfBandWidth = axis.getBandWidth() / 2 - 1;
    var dir = extent[1] > extent[0] ? 1 : -1;
    extent[0] += dir * halfBandWidth;
    extent[1] -= dir * halfBandWidth;
  }

  return extent;
}
/**
 * @param {module:echarts/coord/cartesian/Cartesian2D|module:echarts/coord/polar/Polar} coordSys
 * @param {module:echarts/data/List} data
 * @param {Object} dataCoordInfo
 * @param {Array.<Array.<number>>} points
 */


function getStackedOnPoints(coordSys, data, dataCoordInfo) {
  if (!dataCoordInfo.valueDim) {
    return [];
  }

  var points = [];

  for (var idx = 0, len = data.count(); idx < len; idx++) {
    points.push(getStackedOnPoint(dataCoordInfo, coordSys, data, idx));
  }

  return points;
}

function createGridClipShape(cartesian, hasAnimation, forSymbol, seriesModel) {
  var xExtent = getAxisExtentWithGap(cartesian.getAxis('x'));
  var yExtent = getAxisExtentWithGap(cartesian.getAxis('y'));
  var isHorizontal = cartesian.getBaseAxis().isHorizontal();
  var x = Math.min(xExtent[0], xExtent[1]);
  var y = Math.min(yExtent[0], yExtent[1]);
  var width = Math.max(xExtent[0], xExtent[1]) - x;
  var height = Math.max(yExtent[0], yExtent[1]) - y; // Avoid float number rounding error for symbol on the edge of axis extent.
  // See #7913 and `test/dataZoom-clip.html`.

  if (forSymbol) {
    x -= 0.5;
    width += 0.5;
    y -= 0.5;
    height += 0.5;
  } else {
    var lineWidth = seriesModel.get('lineStyle.width') || 2; // Expand clip shape to avoid clipping when line value exceeds axis

    var expandSize = seriesModel.get('clipOverflow') ? lineWidth / 2 : Math.max(width, height);

    if (isHorizontal) {
      y -= expandSize;
      height += expandSize * 2;
    } else {
      x -= expandSize;
      width += expandSize * 2;
    }
  }

  var clipPath = new graphic.Rect({
    shape: {
      x: x,
      y: y,
      width: width,
      height: height
    }
  });

  if (hasAnimation) {
    clipPath.shape[isHorizontal ? 'width' : 'height'] = 0;
    graphic.initProps(clipPath, {
      shape: {
        width: width,
        height: height
      }
    }, seriesModel);
  }

  return clipPath;
}

function createPolarClipShape(polar, hasAnimation, forSymbol, seriesModel) {
  var angleAxis = polar.getAngleAxis();
  var radiusAxis = polar.getRadiusAxis();
  var radiusExtent = radiusAxis.getExtent().slice();
  radiusExtent[0] > radiusExtent[1] && radiusExtent.reverse();
  var angleExtent = angleAxis.getExtent();
  var RADIAN = Math.PI / 180; // Avoid float number rounding error for symbol on the edge of axis extent.

  if (forSymbol) {
    radiusExtent[0] -= 0.5;
    radiusExtent[1] += 0.5;
  }

  var clipPath = new graphic.Sector({
    shape: {
      cx: round(polar.cx, 1),
      cy: round(polar.cy, 1),
      r0: round(radiusExtent[0], 1),
      r: round(radiusExtent[1], 1),
      startAngle: -angleExtent[0] * RADIAN,
      endAngle: -angleExtent[1] * RADIAN,
      clockwise: angleAxis.inverse
    }
  });

  if (hasAnimation) {
    clipPath.shape.endAngle = -angleExtent[0] * RADIAN;
    graphic.initProps(clipPath, {
      shape: {
        endAngle: -angleExtent[1] * RADIAN
      }
    }, seriesModel);
  }

  return clipPath;
}

function createClipShape(coordSys, hasAnimation, forSymbol, seriesModel) {
  return coordSys.type === 'polar' ? createPolarClipShape(coordSys, hasAnimation, forSymbol, seriesModel) : createGridClipShape(coordSys, hasAnimation, forSymbol, seriesModel);
}

function turnPointsIntoStep(points, coordSys, stepTurnAt) {
  var baseAxis = coordSys.getBaseAxis();
  var baseIndex = baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1;
  var stepPoints = [];

  for (var i = 0; i < points.length - 1; i++) {
    var nextPt = points[i + 1];
    var pt = points[i];
    stepPoints.push(pt);
    var stepPt = [];

    switch (stepTurnAt) {
      case 'end':
        stepPt[baseIndex] = nextPt[baseIndex];
        stepPt[1 - baseIndex] = pt[1 - baseIndex]; // default is start

        stepPoints.push(stepPt);
        break;

      case 'middle':
        // default is start
        var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
        var stepPt2 = [];
        stepPt[baseIndex] = stepPt2[baseIndex] = middle;
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt);
        stepPoints.push(stepPt2);
        break;

      default:
        stepPt[baseIndex] = pt[baseIndex];
        stepPt[1 - baseIndex] = nextPt[1 - baseIndex]; // default is start

        stepPoints.push(stepPt);
    }
  } // Last points


  points[i] && stepPoints.push(points[i]);
  return stepPoints;
}

function getVisualGradient(data, coordSys) {
  var visualMetaList = data.getVisual('visualMeta');

  if (!visualMetaList || !visualMetaList.length || !data.count()) {
    // When data.count() is 0, gradient range can not be calculated.
    return;
  }

  if (coordSys.type !== 'cartesian2d') {
    return;
  }

  var coordDim;
  var visualMeta;

  for (var i = visualMetaList.length - 1; i >= 0; i--) {
    var dimIndex = visualMetaList[i].dimension;
    var dimName = data.dimensions[dimIndex];
    var dimInfo = data.getDimensionInfo(dimName);
    coordDim = dimInfo && dimInfo.coordDim; // Can only be x or y

    if (coordDim === 'x' || coordDim === 'y') {
      visualMeta = visualMetaList[i];
      break;
    }
  }

  if (!visualMeta) {
    return;
  } // If the area to be rendered is bigger than area defined by LinearGradient,
  // the canvas spec prescribes that the color of the first stop and the last
  // stop should be used. But if two stops are added at offset 0, in effect
  // browsers use the color of the second stop to render area outside
  // LinearGradient. So we can only infinitesimally extend area defined in
  // LinearGradient to render `outerColors`.


  var axis = coordSys.getAxis(coordDim); // dataToCoor mapping may not be linear, but must be monotonic.

  var colorStops = zrUtil.map(visualMeta.stops, function (stop) {
    return {
      coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
      color: stop.color
    };
  });
  var stopLen = colorStops.length;
  var outerColors = visualMeta.outerColors.slice();

  if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
    colorStops.reverse();
    outerColors.reverse();
  }

  var tinyExtent = 10; // Arbitrary value: 10px

  var minCoord = colorStops[0].coord - tinyExtent;
  var maxCoord = colorStops[stopLen - 1].coord + tinyExtent;
  var coordSpan = maxCoord - minCoord;

  if (coordSpan < 1e-3) {
    return 'transparent';
  }

  zrUtil.each(colorStops, function (stop) {
    stop.offset = (stop.coord - minCoord) / coordSpan;
  });
  colorStops.push({
    offset: stopLen ? colorStops[stopLen - 1].offset : 0.5,
    color: outerColors[1] || 'transparent'
  });
  colorStops.unshift({
    // notice colorStops.length have been changed.
    offset: stopLen ? colorStops[0].offset : 0.5,
    color: outerColors[0] || 'transparent'
  }); // zrUtil.each(colorStops, function (colorStop) {
  //     // Make sure each offset has rounded px to avoid not sharp edge
  //     colorStop.offset = (Math.round(colorStop.offset * (end - start) + start) - start) / (end - start);
  // });

  var gradient = new graphic.LinearGradient(0, 0, 0, 0, colorStops, true);
  gradient[coordDim] = minCoord;
  gradient[coordDim + '2'] = maxCoord;
  return gradient;
}

function getIsIgnoreFunc(seriesModel, data, coordSys) {
  var showAllSymbol = seriesModel.get('showAllSymbol');
  var isAuto = showAllSymbol === 'auto';

  if (showAllSymbol && !isAuto) {
    return;
  }

  var categoryAxis = coordSys.getAxesByScale('ordinal')[0];

  if (!categoryAxis) {
    return;
  } // Note that category label interval strategy might bring some weird effect
  // in some scenario: users may wonder why some of the symbols are not
  // displayed. So we show all symbols as possible as we can.


  if (isAuto // Simplify the logic, do not determine label overlap here.
  && canShowAllSymbolForCategory(categoryAxis, data)) {
    return;
  } // Otherwise follow the label interval strategy on category axis.


  var categoryDataDim = data.mapDimension(categoryAxis.dim);
  var labelMap = {};
  zrUtil.each(categoryAxis.getViewLabels(), function (labelItem) {
    labelMap[labelItem.tickValue] = 1;
  });
  return function (dataIndex) {
    return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
  };
}

function canShowAllSymbolForCategory(categoryAxis, data) {
  // In mose cases, line is monotonous on category axis, and the label size
  // is close with each other. So we check the symbol size and some of the
  // label size alone with the category axis to estimate whether all symbol
  // can be shown without overlap.
  var axisExtent = categoryAxis.getExtent();
  var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
  isNaN(availSize) && (availSize = 0); // 0/0 is NaN.
  // Sampling some points, max 5.

  var dataLen = data.count();
  var step = Math.max(1, Math.round(dataLen / 5));

  for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
    if (SymbolClz.getSymbolSize(data, dataIndex // Only for cartesian, where `isHorizontal` exists.
    )[categoryAxis.isHorizontal() ? 1 : 0] // Empirical number
    * 1.5 > availSize) {
      return false;
    }
  }

  return true;
}

var _default = ChartView.extend({
  type: 'line',
  init: function () {
    var lineGroup = new graphic.Group();
    var symbolDraw = new SymbolDraw();
    this.group.add(symbolDraw.group);
    this._symbolDraw = symbolDraw;
    this._lineGroup = lineGroup;
  },
  render: function (seriesModel, ecModel, api) {
    var coordSys = seriesModel.coordinateSystem;
    var group = this.group;
    var data = seriesModel.getData();
    var lineStyleModel = seriesModel.getModel('lineStyle');
    var areaStyleModel = seriesModel.getModel('areaStyle');
    var points = data.mapArray(data.getItemLayout);
    var isCoordSysPolar = coordSys.type === 'polar';
    var prevCoordSys = this._coordSys;
    var symbolDraw = this._symbolDraw;
    var polyline = this._polyline;
    var polygon = this._polygon;
    var lineGroup = this._lineGroup;
    var hasAnimation = seriesModel.get('animation');
    var isAreaChart = !areaStyleModel.isEmpty();
    var valueOrigin = areaStyleModel.get('origin');
    var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
    var stackedOnPoints = getStackedOnPoints(coordSys, data, dataCoordInfo);
    var showSymbol = seriesModel.get('showSymbol');
    var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys); // Remove temporary symbols

    var oldData = this._data;
    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    }); // Remove previous created symbols if showSymbol changed to false

    if (!showSymbol) {
      symbolDraw.remove();
    }

    group.add(lineGroup); // FIXME step not support polar

    var step = !isCoordSysPolar && seriesModel.get('step'); // Initialization animation or coordinate system changed

    if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: createClipShape(coordSys, false, true, seriesModel)
      });

      if (step) {
        // TODO If stacked series is not step
        points = turnPointsIntoStep(points, coordSys, step);
        stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
      }

      polyline = this._newPolyline(points, coordSys, hasAnimation);

      if (isAreaChart) {
        polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation);
      }

      lineGroup.setClipPath(createClipShape(coordSys, true, false, seriesModel));
    } else {
      if (isAreaChart && !polygon) {
        // If areaStyle is added
        polygon = this._newPolygon(points, stackedOnPoints, coordSys, hasAnimation);
      } else if (polygon && !isAreaChart) {
        // If areaStyle is removed
        lineGroup.remove(polygon);
        polygon = this._polygon = null;
      } // Update clipPath


      lineGroup.setClipPath(createClipShape(coordSys, false, false, seriesModel)); // Always update, or it is wrong in the case turning on legend
      // because points are not changed

      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: createClipShape(coordSys, false, true, seriesModel)
      }); // Stop symbol animation and sync with line points
      // FIXME performance?

      data.eachItemGraphicEl(function (el) {
        el.stopAnimation(true);
      }); // In the case data zoom triggerred refreshing frequently
      // Data may not change if line has a category axis. So it should animate nothing

      if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points)) {
        if (hasAnimation) {
          this._updateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin);
        } else {
          // Not do it in update with animation
          if (step) {
            // TODO If stacked series is not step
            points = turnPointsIntoStep(points, coordSys, step);
            stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
          }

          polyline.setShape({
            points: points
          });
          polygon && polygon.setShape({
            points: points,
            stackedOnPoints: stackedOnPoints
          });
        }
      }
    }

    var visualColor = getVisualGradient(data, coordSys) || data.getVisual('color');
    polyline.useStyle(zrUtil.defaults( // Use color in lineStyle first
    lineStyleModel.getLineStyle(), {
      fill: 'none',
      stroke: visualColor,
      lineJoin: 'bevel'
    }));
    var smooth = seriesModel.get('smooth');
    smooth = getSmooth(seriesModel.get('smooth'));
    polyline.setShape({
      smooth: smooth,
      smoothMonotone: seriesModel.get('smoothMonotone'),
      connectNulls: seriesModel.get('connectNulls')
    });

    if (polygon) {
      var stackedOnSeries = data.getCalculationInfo('stackedOnSeries');
      var stackedOnSmooth = 0;
      polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
        fill: visualColor,
        opacity: 0.7,
        lineJoin: 'bevel'
      }));

      if (stackedOnSeries) {
        stackedOnSmooth = getSmooth(stackedOnSeries.get('smooth'));
      }

      polygon.setShape({
        smooth: smooth,
        stackedOnSmooth: stackedOnSmooth,
        smoothMonotone: seriesModel.get('smoothMonotone'),
        connectNulls: seriesModel.get('connectNulls')
      });
    }

    this._data = data; // Save the coordinate system for transition animation when data changed

    this._coordSys = coordSys;
    this._stackedOnPoints = stackedOnPoints;
    this._points = points;
    this._step = step;
    this._valueOrigin = valueOrigin;
  },
  dispose: function () {},
  highlight: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (!symbol) {
        // Create a temporary symbol if it is not exists
        var pt = data.getItemLayout(dataIndex);

        if (!pt) {
          // Null data
          return;
        }

        symbol = new SymbolClz(data, dataIndex);
        symbol.position = pt;
        symbol.setZ(seriesModel.get('zlevel'), seriesModel.get('z'));
        symbol.ignore = isNaN(pt[0]) || isNaN(pt[1]);
        symbol.__temp = true;
        data.setItemGraphicEl(dataIndex, symbol); // Stop scale animation

        symbol.stopSymbolAnimation(true);
        this.group.add(symbol);
      }

      symbol.highlight();
    } else {
      // Highlight whole series
      ChartView.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
    }
  },
  downplay: function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    if (dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (symbol) {
        if (symbol.__temp) {
          data.setItemGraphicEl(dataIndex, null);
          this.group.remove(symbol);
        } else {
          symbol.downplay();
        }
      }
    } else {
      // FIXME
      // can not downplay completely.
      // Downplay whole series
      ChartView.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
    }
  },

  /**
   * @param {module:zrender/container/Group} group
   * @param {Array.<Array.<number>>} points
   * @private
   */
  _newPolyline: function (points) {
    var polyline = this._polyline; // Remove previous created polyline

    if (polyline) {
      this._lineGroup.remove(polyline);
    }

    polyline = new Polyline({
      shape: {
        points: points
      },
      silent: true,
      z2: 10
    });

    this._lineGroup.add(polyline);

    this._polyline = polyline;
    return polyline;
  },

  /**
   * @param {module:zrender/container/Group} group
   * @param {Array.<Array.<number>>} stackedOnPoints
   * @param {Array.<Array.<number>>} points
   * @private
   */
  _newPolygon: function (points, stackedOnPoints) {
    var polygon = this._polygon; // Remove previous created polygon

    if (polygon) {
      this._lineGroup.remove(polygon);
    }

    polygon = new Polygon({
      shape: {
        points: points,
        stackedOnPoints: stackedOnPoints
      },
      silent: true
    });

    this._lineGroup.add(polygon);

    this._polygon = polygon;
    return polygon;
  },

  /**
   * @private
   */
  // FIXME Two value axis
  _updateAnimation: function (data, stackedOnPoints, coordSys, api, step, valueOrigin) {
    var polyline = this._polyline;
    var polygon = this._polygon;
    var seriesModel = data.hostModel;
    var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
    var current = diff.current;
    var stackedOnCurrent = diff.stackedOnCurrent;
    var next = diff.next;
    var stackedOnNext = diff.stackedOnNext;

    if (step) {
      // TODO If stacked series is not step
      current = turnPointsIntoStep(diff.current, coordSys, step);
      stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step);
      next = turnPointsIntoStep(diff.next, coordSys, step);
      stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step);
    } // `diff.current` is subset of `current` (which should be ensured by
    // turnPointsIntoStep), so points in `__points` can be updated when
    // points in `current` are update during animation.


    polyline.shape.__points = diff.current;
    polyline.shape.points = current;
    graphic.updateProps(polyline, {
      shape: {
        points: next
      }
    }, seriesModel);

    if (polygon) {
      polygon.setShape({
        points: current,
        stackedOnPoints: stackedOnCurrent
      });
      graphic.updateProps(polygon, {
        shape: {
          points: next,
          stackedOnPoints: stackedOnNext
        }
      }, seriesModel);
    }

    var updatedDataInfo = [];
    var diffStatus = diff.status;

    for (var i = 0; i < diffStatus.length; i++) {
      var cmd = diffStatus[i].cmd;

      if (cmd === '=') {
        var el = data.getItemGraphicEl(diffStatus[i].idx1);

        if (el) {
          updatedDataInfo.push({
            el: el,
            ptIdx: i // Index of points

          });
        }
      }
    }

    if (polyline.animators && polyline.animators.length) {
      polyline.animators[0].during(function () {
        for (var i = 0; i < updatedDataInfo.length; i++) {
          var el = updatedDataInfo[i].el;
          el.attr('position', polyline.shape.__points[updatedDataInfo[i].ptIdx]);
        }
      });
    }
  },
  remove: function (ecModel) {
    var group = this.group;
    var oldData = this._data;

    this._lineGroup.removeAll();

    this._symbolDraw.remove(true); // Remove temporary created elements when highlighting


    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    });
    this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null;
  }
});

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/helper.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/helper.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _dataStackHelper = __webpack_require__(/*! ../../data/helper/dataStackHelper */ "./node_modules/echarts/lib/data/helper/dataStackHelper.js");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var map = _util.map;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @param {Object} coordSys
 * @param {module:echarts/data/List} data
 * @param {string} valueOrigin lineSeries.option.areaStyle.origin
 */
function prepareDataCoordInfo(coordSys, data, valueOrigin) {
  var baseAxis = coordSys.getBaseAxis();
  var valueAxis = coordSys.getOtherAxis(baseAxis);
  var valueStart = getValueStart(valueAxis, valueOrigin);
  var baseAxisDim = baseAxis.dim;
  var valueAxisDim = valueAxis.dim;
  var valueDim = data.mapDimension(valueAxisDim);
  var baseDim = data.mapDimension(baseAxisDim);
  var baseDataOffset = valueAxisDim === 'x' || valueAxisDim === 'radius' ? 1 : 0;
  var dims = map(coordSys.dimensions, function (coordDim) {
    return data.mapDimension(coordDim);
  });
  var stacked;
  var stackResultDim = data.getCalculationInfo('stackResultDimension');

  if (stacked |= isDimensionStacked(data, dims[0]
  /*, dims[1]*/
  )) {
    // jshint ignore:line
    dims[0] = stackResultDim;
  }

  if (stacked |= isDimensionStacked(data, dims[1]
  /*, dims[0]*/
  )) {
    // jshint ignore:line
    dims[1] = stackResultDim;
  }

  return {
    dataDimsForPoint: dims,
    valueStart: valueStart,
    valueAxisDim: valueAxisDim,
    baseAxisDim: baseAxisDim,
    stacked: !!stacked,
    valueDim: valueDim,
    baseDim: baseDim,
    baseDataOffset: baseDataOffset,
    stackedOverDimension: data.getCalculationInfo('stackedOverDimension')
  };
}

function getValueStart(valueAxis, valueOrigin) {
  var valueStart = 0;
  var extent = valueAxis.scale.getExtent();

  if (valueOrigin === 'start') {
    valueStart = extent[0];
  } else if (valueOrigin === 'end') {
    valueStart = extent[1];
  } // auto
  else {
      // Both positive
      if (extent[0] > 0) {
        valueStart = extent[0];
      } // Both negative
      else if (extent[1] < 0) {
          valueStart = extent[1];
        } // If is one positive, and one negative, onZero shall be true

    }

  return valueStart;
}

function getStackedOnPoint(dataCoordInfo, coordSys, data, idx) {
  var value = NaN;

  if (dataCoordInfo.stacked) {
    value = data.get(data.getCalculationInfo('stackedOverDimension'), idx);
  }

  if (isNaN(value)) {
    value = dataCoordInfo.valueStart;
  }

  var baseDataOffset = dataCoordInfo.baseDataOffset;
  var stackedData = [];
  stackedData[baseDataOffset] = data.get(dataCoordInfo.baseDim, idx);
  stackedData[1 - baseDataOffset] = value;
  return coordSys.dataToPoint(stackedData);
}

exports.prepareDataCoordInfo = prepareDataCoordInfo;
exports.getStackedOnPoint = getStackedOnPoint;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/lineAnimationDiff.js":
/*!******************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/lineAnimationDiff.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _helper = __webpack_require__(/*! ./helper */ "./node_modules/echarts/lib/chart/line/helper.js");

var prepareDataCoordInfo = _helper.prepareDataCoordInfo;
var getStackedOnPoint = _helper.getStackedOnPoint;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// var arrayDiff = require('zrender/src/core/arrayDiff');
// 'zrender/src/core/arrayDiff' has been used before, but it did
// not do well in performance when roam with fixed dataZoom window.
// function convertToIntId(newIdList, oldIdList) {
//     // Generate int id instead of string id.
//     // Compare string maybe slow in score function of arrDiff
//     // Assume id in idList are all unique
//     var idIndicesMap = {};
//     var idx = 0;
//     for (var i = 0; i < newIdList.length; i++) {
//         idIndicesMap[newIdList[i]] = idx;
//         newIdList[i] = idx++;
//     }
//     for (var i = 0; i < oldIdList.length; i++) {
//         var oldId = oldIdList[i];
//         // Same with newIdList
//         if (idIndicesMap[oldId]) {
//             oldIdList[i] = idIndicesMap[oldId];
//         }
//         else {
//             oldIdList[i] = idx++;
//         }
//     }
// }
function diffData(oldData, newData) {
  var diffResult = [];
  newData.diff(oldData).add(function (idx) {
    diffResult.push({
      cmd: '+',
      idx: idx
    });
  }).update(function (newIdx, oldIdx) {
    diffResult.push({
      cmd: '=',
      idx: oldIdx,
      idx1: newIdx
    });
  }).remove(function (idx) {
    diffResult.push({
      cmd: '-',
      idx: idx
    });
  }).execute();
  return diffResult;
}

function _default(oldData, newData, oldStackedOnPoints, newStackedOnPoints, oldCoordSys, newCoordSys, oldValueOrigin, newValueOrigin) {
  var diff = diffData(oldData, newData); // var newIdList = newData.mapArray(newData.getId);
  // var oldIdList = oldData.mapArray(oldData.getId);
  // convertToIntId(newIdList, oldIdList);
  // // FIXME One data ?
  // diff = arrayDiff(oldIdList, newIdList);

  var currPoints = [];
  var nextPoints = []; // Points for stacking base line

  var currStackedPoints = [];
  var nextStackedPoints = [];
  var status = [];
  var sortedIndices = [];
  var rawIndices = [];
  var newDataOldCoordInfo = prepareDataCoordInfo(oldCoordSys, newData, oldValueOrigin);
  var oldDataNewCoordInfo = prepareDataCoordInfo(newCoordSys, oldData, newValueOrigin);

  for (var i = 0; i < diff.length; i++) {
    var diffItem = diff[i];
    var pointAdded = true; // FIXME, animation is not so perfect when dataZoom window moves fast
    // Which is in case remvoing or add more than one data in the tail or head

    switch (diffItem.cmd) {
      case '=':
        var currentPt = oldData.getItemLayout(diffItem.idx);
        var nextPt = newData.getItemLayout(diffItem.idx1); // If previous data is NaN, use next point directly

        if (isNaN(currentPt[0]) || isNaN(currentPt[1])) {
          currentPt = nextPt.slice();
        }

        currPoints.push(currentPt);
        nextPoints.push(nextPt);
        currStackedPoints.push(oldStackedOnPoints[diffItem.idx]);
        nextStackedPoints.push(newStackedOnPoints[diffItem.idx1]);
        rawIndices.push(newData.getRawIndex(diffItem.idx1));
        break;

      case '+':
        var idx = diffItem.idx;
        currPoints.push(oldCoordSys.dataToPoint([newData.get(newDataOldCoordInfo.dataDimsForPoint[0], idx), newData.get(newDataOldCoordInfo.dataDimsForPoint[1], idx)]));
        nextPoints.push(newData.getItemLayout(idx).slice());
        currStackedPoints.push(getStackedOnPoint(newDataOldCoordInfo, oldCoordSys, newData, idx));
        nextStackedPoints.push(newStackedOnPoints[idx]);
        rawIndices.push(newData.getRawIndex(idx));
        break;

      case '-':
        var idx = diffItem.idx;
        var rawIndex = oldData.getRawIndex(idx); // Data is replaced. In the case of dynamic data queue
        // FIXME FIXME FIXME

        if (rawIndex !== idx) {
          currPoints.push(oldData.getItemLayout(idx));
          nextPoints.push(newCoordSys.dataToPoint([oldData.get(oldDataNewCoordInfo.dataDimsForPoint[0], idx), oldData.get(oldDataNewCoordInfo.dataDimsForPoint[1], idx)]));
          currStackedPoints.push(oldStackedOnPoints[idx]);
          nextStackedPoints.push(getStackedOnPoint(oldDataNewCoordInfo, newCoordSys, oldData, idx));
          rawIndices.push(rawIndex);
        } else {
          pointAdded = false;
        }

    } // Original indices


    if (pointAdded) {
      status.push(diffItem);
      sortedIndices.push(sortedIndices.length);
    }
  } // Diff result may be crossed if all items are changed
  // Sort by data index


  sortedIndices.sort(function (a, b) {
    return rawIndices[a] - rawIndices[b];
  });
  var sortedCurrPoints = [];
  var sortedNextPoints = [];
  var sortedCurrStackedPoints = [];
  var sortedNextStackedPoints = [];
  var sortedStatus = [];

  for (var i = 0; i < sortedIndices.length; i++) {
    var idx = sortedIndices[i];
    sortedCurrPoints[i] = currPoints[idx];
    sortedNextPoints[i] = nextPoints[idx];
    sortedCurrStackedPoints[i] = currStackedPoints[idx];
    sortedNextStackedPoints[i] = nextStackedPoints[idx];
    sortedStatus[i] = status[idx];
  }

  return {
    current: sortedCurrPoints,
    next: sortedNextPoints,
    stackedOnCurrent: sortedCurrStackedPoints,
    stackedOnNext: sortedNextStackedPoints,
    status: sortedStatus
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/line/poly.js":
/*!*****************************************************!*\
  !*** ./node_modules/echarts/lib/chart/line/poly.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var Path = __webpack_require__(/*! zrender/lib/graphic/Path */ "./node_modules/zrender/lib/graphic/Path.js");

var vec2 = __webpack_require__(/*! zrender/lib/core/vector */ "./node_modules/zrender/lib/core/vector.js");

var fixClipWithShadow = __webpack_require__(/*! zrender/lib/graphic/helper/fixClipWithShadow */ "./node_modules/zrender/lib/graphic/helper/fixClipWithShadow.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Poly path support NaN point
var vec2Min = vec2.min;
var vec2Max = vec2.max;
var scaleAndAdd = vec2.scaleAndAdd;
var v2Copy = vec2.copy; // Temporary variable

var v = [];
var cp0 = [];
var cp1 = [];

function isPointNull(p) {
  return isNaN(p[0]) || isNaN(p[1]);
}

function drawSegment(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  // if (smoothMonotone == null) {
  //     if (isMono(points, 'x')) {
  //         return drawMono(ctx, points, start, segLen, allLen,
  //             dir, smoothMin, smoothMax, smooth, 'x', connectNulls);
  //     }
  //     else if (isMono(points, 'y')) {
  //         return drawMono(ctx, points, start, segLen, allLen,
  //             dir, smoothMin, smoothMax, smooth, 'y', connectNulls);
  //     }
  //     else {
  //         return drawNonMono.apply(this, arguments);
  //     }
  // }
  // else if (smoothMonotone !== 'none' && isMono(points, smoothMonotone)) {
  //     return drawMono.apply(this, arguments);
  // }
  // else {
  //     return drawNonMono.apply(this, arguments);
  // }
  if (smoothMonotone === 'none' || !smoothMonotone) {
    return drawNonMono.apply(this, arguments);
  } else {
    return drawMono.apply(this, arguments);
  }
}
/**
 * Check if points is in monotone.
 *
 * @param {number[][]} points         Array of points which is in [x, y] form
 * @param {string}     smoothMonotone 'x', 'y', or 'none', stating for which
 *                                    dimension that is checking.
 *                                    If is 'none', `drawNonMono` should be
 *                                    called.
 *                                    If is undefined, either being monotone
 *                                    in 'x' or 'y' will call `drawMono`.
 */
// function isMono(points, smoothMonotone) {
//     if (points.length <= 1) {
//         return true;
//     }
//     var dim = smoothMonotone === 'x' ? 0 : 1;
//     var last = points[0][dim];
//     var lastDiff = 0;
//     for (var i = 1; i < points.length; ++i) {
//         var diff = points[i][dim] - last;
//         if (!isNaN(diff) && !isNaN(lastDiff)
//             && diff !== 0 && lastDiff !== 0
//             && ((diff >= 0) !== (lastDiff >= 0))
//         ) {
//             return false;
//         }
//         if (!isNaN(diff) && diff !== 0) {
//             lastDiff = diff;
//             last = points[i][dim];
//         }
//     }
//     return true;
// }

/**
 * Draw smoothed line in monotone, in which only vertical or horizontal bezier
 * control points will be used. This should be used when points are monotone
 * either in x or y dimension.
 */


function drawMono(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  var prevIdx = 0;
  var idx = start;

  for (var k = 0; k < segLen; k++) {
    var p = points[idx];

    if (idx >= allLen || idx < 0) {
      break;
    }

    if (isPointNull(p)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }

      break;
    }

    if (idx === start) {
      ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
    } else {
      if (smooth > 0) {
        var prevP = points[prevIdx];
        var dim = smoothMonotone === 'y' ? 1 : 0; // Length of control point to p, either in x or y, but not both

        var ctrlLen = (p[dim] - prevP[dim]) * smooth;
        v2Copy(cp0, prevP);
        cp0[dim] = prevP[dim] + ctrlLen;
        v2Copy(cp1, p);
        cp1[dim] = p[dim] - ctrlLen;
        ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    }

    prevIdx = idx;
    idx += dir;
  }

  return k;
}
/**
 * Draw smoothed line in non-monotone, in may cause undesired curve in extreme
 * situations. This should be used when points are non-monotone neither in x or
 * y dimension.
 */


function drawNonMono(ctx, points, start, segLen, allLen, dir, smoothMin, smoothMax, smooth, smoothMonotone, connectNulls) {
  var prevIdx = 0;
  var idx = start;

  for (var k = 0; k < segLen; k++) {
    var p = points[idx];

    if (idx >= allLen || idx < 0) {
      break;
    }

    if (isPointNull(p)) {
      if (connectNulls) {
        idx += dir;
        continue;
      }

      break;
    }

    if (idx === start) {
      ctx[dir > 0 ? 'moveTo' : 'lineTo'](p[0], p[1]);
      v2Copy(cp0, p);
    } else {
      if (smooth > 0) {
        var nextIdx = idx + dir;
        var nextP = points[nextIdx];

        if (connectNulls) {
          // Find next point not null
          while (nextP && isPointNull(points[nextIdx])) {
            nextIdx += dir;
            nextP = points[nextIdx];
          }
        }

        var ratioNextSeg = 0.5;
        var prevP = points[prevIdx];
        var nextP = points[nextIdx]; // Last point

        if (!nextP || isPointNull(nextP)) {
          v2Copy(cp1, p);
        } else {
          // If next data is null in not connect case
          if (isPointNull(nextP) && !connectNulls) {
            nextP = p;
          }

          vec2.sub(v, nextP, prevP);
          var lenPrevSeg;
          var lenNextSeg;

          if (smoothMonotone === 'x' || smoothMonotone === 'y') {
            var dim = smoothMonotone === 'x' ? 0 : 1;
            lenPrevSeg = Math.abs(p[dim] - prevP[dim]);
            lenNextSeg = Math.abs(p[dim] - nextP[dim]);
          } else {
            lenPrevSeg = vec2.dist(p, prevP);
            lenNextSeg = vec2.dist(p, nextP);
          } // Use ratio of seg length


          ratioNextSeg = lenNextSeg / (lenNextSeg + lenPrevSeg);
          scaleAndAdd(cp1, p, v, -smooth * (1 - ratioNextSeg));
        } // Smooth constraint


        vec2Min(cp0, cp0, smoothMax);
        vec2Max(cp0, cp0, smoothMin);
        vec2Min(cp1, cp1, smoothMax);
        vec2Max(cp1, cp1, smoothMin);
        ctx.bezierCurveTo(cp0[0], cp0[1], cp1[0], cp1[1], p[0], p[1]); // cp0 of next segment

        scaleAndAdd(cp0, p, v, smooth * ratioNextSeg);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    }

    prevIdx = idx;
    idx += dir;
  }

  return k;
}

function getBoundingBox(points, smoothConstraint) {
  var ptMin = [Infinity, Infinity];
  var ptMax = [-Infinity, -Infinity];

  if (smoothConstraint) {
    for (var i = 0; i < points.length; i++) {
      var pt = points[i];

      if (pt[0] < ptMin[0]) {
        ptMin[0] = pt[0];
      }

      if (pt[1] < ptMin[1]) {
        ptMin[1] = pt[1];
      }

      if (pt[0] > ptMax[0]) {
        ptMax[0] = pt[0];
      }

      if (pt[1] > ptMax[1]) {
        ptMax[1] = pt[1];
      }
    }
  }

  return {
    min: smoothConstraint ? ptMin : ptMax,
    max: smoothConstraint ? ptMax : ptMin
  };
}

var Polyline = Path.extend({
  type: 'ec-polyline',
  shape: {
    points: [],
    smooth: 0,
    smoothConstraint: true,
    smoothMonotone: null,
    connectNulls: false
  },
  style: {
    fill: null,
    stroke: '#000'
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var points = shape.points;
    var i = 0;
    var len = points.length;
    var result = getBoundingBox(points, shape.smoothConstraint);

    if (shape.connectNulls) {
      // Must remove first and last null values avoid draw error in polygon
      for (; len > 0; len--) {
        if (!isPointNull(points[len - 1])) {
          break;
        }
      }

      for (; i < len; i++) {
        if (!isPointNull(points[i])) {
          break;
        }
      }
    }

    while (i < len) {
      i += drawSegment(ctx, points, i, len, len, 1, result.min, result.max, shape.smooth, shape.smoothMonotone, shape.connectNulls) + 1;
    }
  }
});
var Polygon = Path.extend({
  type: 'ec-polygon',
  shape: {
    points: [],
    // Offset between stacked base points and points
    stackedOnPoints: [],
    smooth: 0,
    stackedOnSmooth: 0,
    smoothConstraint: true,
    smoothMonotone: null,
    connectNulls: false
  },
  brush: fixClipWithShadow(Path.prototype.brush),
  buildPath: function (ctx, shape) {
    var points = shape.points;
    var stackedOnPoints = shape.stackedOnPoints;
    var i = 0;
    var len = points.length;
    var smoothMonotone = shape.smoothMonotone;
    var bbox = getBoundingBox(points, shape.smoothConstraint);
    var stackedOnBBox = getBoundingBox(stackedOnPoints, shape.smoothConstraint);

    if (shape.connectNulls) {
      // Must remove first and last null values avoid draw error in polygon
      for (; len > 0; len--) {
        if (!isPointNull(points[len - 1])) {
          break;
        }
      }

      for (; i < len; i++) {
        if (!isPointNull(points[i])) {
          break;
        }
      }
    }

    while (i < len) {
      var k = drawSegment(ctx, points, i, len, len, 1, bbox.min, bbox.max, shape.smooth, smoothMonotone, shape.connectNulls);
      drawSegment(ctx, stackedOnPoints, i + k - 1, k, len, -1, stackedOnBBox.min, stackedOnBBox.max, shape.stackedOnSmooth, smoothMonotone, shape.connectNulls);
      i += k + 1;
      ctx.closePath();
    }
  }
});
exports.Polyline = Polyline;
exports.Polygon = Polygon;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/pie.js":
/*!***********************************************!*\
  !*** ./node_modules/echarts/lib/chart/pie.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

__webpack_require__(/*! ./pie/PieSeries */ "./node_modules/echarts/lib/chart/pie/PieSeries.js");

__webpack_require__(/*! ./pie/PieView */ "./node_modules/echarts/lib/chart/pie/PieView.js");

var createDataSelectAction = __webpack_require__(/*! ../action/createDataSelectAction */ "./node_modules/echarts/lib/action/createDataSelectAction.js");

var dataColor = __webpack_require__(/*! ../visual/dataColor */ "./node_modules/echarts/lib/visual/dataColor.js");

var pieLayout = __webpack_require__(/*! ./pie/pieLayout */ "./node_modules/echarts/lib/chart/pie/pieLayout.js");

var dataFilter = __webpack_require__(/*! ../processor/dataFilter */ "./node_modules/echarts/lib/processor/dataFilter.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
createDataSelectAction('pie', [{
  type: 'pieToggleSelect',
  event: 'pieselectchanged',
  method: 'toggleSelected'
}, {
  type: 'pieSelect',
  event: 'pieselected',
  method: 'select'
}, {
  type: 'pieUnSelect',
  event: 'pieunselected',
  method: 'unSelect'
}]);
echarts.registerVisual(dataColor('pie'));
echarts.registerLayout(zrUtil.curry(pieLayout, 'pie'));
echarts.registerProcessor(dataFilter('pie'));

/***/ }),

/***/ "./node_modules/echarts/lib/chart/pie/PieSeries.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/pie/PieSeries.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../../echarts */ "./node_modules/echarts/lib/echarts.js");

var createListSimply = __webpack_require__(/*! ../helper/createListSimply */ "./node_modules/echarts/lib/chart/helper/createListSimply.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var modelUtil = __webpack_require__(/*! ../../util/model */ "./node_modules/echarts/lib/util/model.js");

var _number = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

var getPercentWithPrecision = _number.getPercentWithPrecision;

var dataSelectableMixin = __webpack_require__(/*! ../../component/helper/selectableMixin */ "./node_modules/echarts/lib/component/helper/selectableMixin.js");

var _dataProvider = __webpack_require__(/*! ../../data/helper/dataProvider */ "./node_modules/echarts/lib/data/helper/dataProvider.js");

var retrieveRawAttr = _dataProvider.retrieveRawAttr;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PieSeries = echarts.extendSeriesModel({
  type: 'series.pie',
  // Overwrite
  init: function (option) {
    PieSeries.superApply(this, 'init', arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed

    this.legendDataProvider = function () {
      return this.getRawData();
    };

    this.updateSelectedMap(this._createSelectableList());

    this._defaultLabelLine(option);
  },
  // Overwrite
  mergeOption: function (newOption) {
    PieSeries.superCall(this, 'mergeOption', newOption);
    this.updateSelectedMap(this._createSelectableList());
  },
  getInitialData: function (option, ecModel) {
    return createListSimply(this, ['value']);
  },
  _createSelectableList: function () {
    var data = this.getRawData();
    var valueDim = data.mapDimension('value');
    var targetList = [];

    for (var i = 0, len = data.count(); i < len; i++) {
      targetList.push({
        name: data.getName(i),
        value: data.get(valueDim, i),
        selected: retrieveRawAttr(data, i, 'selected')
      });
    }

    return targetList;
  },
  // Overwrite
  getDataParams: function (dataIndex) {
    var data = this.getData();
    var params = PieSeries.superCall(this, 'getDataParams', dataIndex); // FIXME toFixed?

    var valueList = [];
    data.each(data.mapDimension('value'), function (value) {
      valueList.push(value);
    });
    params.percent = getPercentWithPrecision(valueList, dataIndex, data.hostModel.get('percentPrecision'));
    params.$vars.push('percent');
    return params;
  },
  _defaultLabelLine: function (option) {
    // Extend labelLine emphasis
    modelUtil.defaultEmphasis(option, 'labelLine', ['show']);
    var labelLineNormalOpt = option.labelLine;
    var labelLineEmphasisOpt = option.emphasis.labelLine; // Not show label line if `label.normal.show = false`

    labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
    labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
  },
  defaultOption: {
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    hoverAnimation: true,
    // 默认全局居中
    center: ['50%', '50%'],
    radius: [0, '75%'],
    // 默认顺时针
    clockwise: true,
    startAngle: 90,
    // 最小角度改为0
    minAngle: 0,
    // 选中时扇区偏移量
    selectedOffset: 10,
    // 高亮扇区偏移量
    hoverOffset: 10,
    // If use strategy to avoid label overlapping
    avoidLabelOverlap: true,
    // 选择模式，默认关闭，可选single，multiple
    // selectedMode: false,
    // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
    // roseType: null,
    percentPrecision: 2,
    // If still show when all data zero.
    stillShowZeroSum: true,
    // cursor: null,
    label: {
      // If rotate around circle
      rotate: false,
      show: true,
      // 'outer', 'inside', 'center'
      position: 'outer' // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
      // 默认使用全局文本样式，详见TEXTSTYLE
      // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数

    },
    // Enabled when label.normal.position is 'outer'
    labelLine: {
      show: true,
      // 引导线两段中的第一段长度
      length: 15,
      // 引导线两段中的第二段长度
      length2: 15,
      smooth: false,
      lineStyle: {
        // color: 各异,
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      borderWidth: 1
    },
    // Animation type canbe expansion, scale
    animationType: 'expansion',
    animationEasing: 'cubicOut'
  }
});
zrUtil.mixin(PieSeries, dataSelectableMixin);
var _default = PieSeries;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/pie/PieView.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/chart/pie/PieView.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var ChartView = __webpack_require__(/*! ../../view/Chart */ "./node_modules/echarts/lib/view/Chart.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @param {module:echarts/model/Series} seriesModel
 * @param {boolean} hasAnimation
 * @inner
 */
function updateDataSelected(uid, seriesModel, hasAnimation, api) {
  var data = seriesModel.getData();
  var dataIndex = this.dataIndex;
  var name = data.getName(dataIndex);
  var selectedOffset = seriesModel.get('selectedOffset');
  api.dispatchAction({
    type: 'pieToggleSelect',
    from: uid,
    name: name,
    seriesId: seriesModel.id
  });
  data.each(function (idx) {
    toggleItemSelected(data.getItemGraphicEl(idx), data.getItemLayout(idx), seriesModel.isSelected(data.getName(idx)), selectedOffset, hasAnimation);
  });
}
/**
 * @param {module:zrender/graphic/Sector} el
 * @param {Object} layout
 * @param {boolean} isSelected
 * @param {number} selectedOffset
 * @param {boolean} hasAnimation
 * @inner
 */


function toggleItemSelected(el, layout, isSelected, selectedOffset, hasAnimation) {
  var midAngle = (layout.startAngle + layout.endAngle) / 2;
  var dx = Math.cos(midAngle);
  var dy = Math.sin(midAngle);
  var offset = isSelected ? selectedOffset : 0;
  var position = [dx * offset, dy * offset];
  hasAnimation // animateTo will stop revious animation like update transition
  ? el.animate().when(200, {
    position: position
  }).start('bounceOut') : el.attr('position', position);
}
/**
 * Piece of pie including Sector, Label, LabelLine
 * @constructor
 * @extends {module:zrender/graphic/Group}
 */


function PiePiece(data, idx) {
  graphic.Group.call(this);
  var sector = new graphic.Sector({
    z2: 2
  });
  var polyline = new graphic.Polyline();
  var text = new graphic.Text();
  this.add(sector);
  this.add(polyline);
  this.add(text);
  this.updateData(data, idx, true); // Hover to change label and labelLine

  function onEmphasis() {
    polyline.ignore = polyline.hoverIgnore;
    text.ignore = text.hoverIgnore;
  }

  function onNormal() {
    polyline.ignore = polyline.normalIgnore;
    text.ignore = text.normalIgnore;
  }

  this.on('emphasis', onEmphasis).on('normal', onNormal).on('mouseover', onEmphasis).on('mouseout', onNormal);
}

var piePieceProto = PiePiece.prototype;

piePieceProto.updateData = function (data, idx, firstCreate) {
  var sector = this.childAt(0);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var sectorShape = zrUtil.extend({}, layout);
  sectorShape.label = null;

  if (firstCreate) {
    sector.setShape(sectorShape);
    var animationType = seriesModel.getShallow('animationType');

    if (animationType === 'scale') {
      sector.shape.r = layout.r0;
      graphic.initProps(sector, {
        shape: {
          r: layout.r
        }
      }, seriesModel, idx);
    } // Expansion
    else {
        sector.shape.endAngle = layout.startAngle;
        graphic.updateProps(sector, {
          shape: {
            endAngle: layout.endAngle
          }
        }, seriesModel, idx);
      }
  } else {
    graphic.updateProps(sector, {
      shape: sectorShape
    }, seriesModel, idx);
  } // Update common style


  var visualColor = data.getItemVisual(idx, 'color');
  sector.useStyle(zrUtil.defaults({
    lineJoin: 'bevel',
    fill: visualColor
  }, itemModel.getModel('itemStyle').getItemStyle()));
  sector.hoverStyle = itemModel.getModel('emphasis.itemStyle').getItemStyle();
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && sector.attr('cursor', cursorStyle); // Toggle selected

  toggleItemSelected(this, data.getItemLayout(idx), seriesModel.isSelected(null, idx), seriesModel.get('selectedOffset'), seriesModel.get('animation'));

  function onEmphasis() {
    // Sector may has animation of updating data. Force to move to the last frame
    // Or it may stopped on the wrong shape
    sector.stopAnimation(true);
    sector.animateTo({
      shape: {
        r: layout.r + seriesModel.get('hoverOffset')
      }
    }, 300, 'elasticOut');
  }

  function onNormal() {
    sector.stopAnimation(true);
    sector.animateTo({
      shape: {
        r: layout.r
      }
    }, 300, 'elasticOut');
  }

  sector.off('mouseover').off('mouseout').off('emphasis').off('normal');

  if (itemModel.get('hoverAnimation') && seriesModel.isAnimationEnabled()) {
    sector.on('mouseover', onEmphasis).on('mouseout', onNormal).on('emphasis', onEmphasis).on('normal', onNormal);
  }

  this._updateLabel(data, idx);

  graphic.setHoverStyle(this);
};

piePieceProto._updateLabel = function (data, idx) {
  var labelLine = this.childAt(1);
  var labelText = this.childAt(2);
  var seriesModel = data.hostModel;
  var itemModel = data.getItemModel(idx);
  var layout = data.getItemLayout(idx);
  var labelLayout = layout.label;
  var visualColor = data.getItemVisual(idx, 'color');
  graphic.updateProps(labelLine, {
    shape: {
      points: labelLayout.linePoints || [[labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y], [labelLayout.x, labelLayout.y]]
    }
  }, seriesModel, idx);
  graphic.updateProps(labelText, {
    style: {
      x: labelLayout.x,
      y: labelLayout.y
    }
  }, seriesModel, idx);
  labelText.attr({
    rotation: labelLayout.rotation,
    origin: [labelLayout.x, labelLayout.y],
    z2: 10
  });
  var labelModel = itemModel.getModel('label');
  var labelHoverModel = itemModel.getModel('emphasis.label');
  var labelLineModel = itemModel.getModel('labelLine');
  var labelLineHoverModel = itemModel.getModel('emphasis.labelLine');
  var visualColor = data.getItemVisual(idx, 'color');
  graphic.setLabelStyle(labelText.style, labelText.hoverStyle = {}, labelModel, labelHoverModel, {
    labelFetcher: data.hostModel,
    labelDataIndex: idx,
    defaultText: data.getName(idx),
    autoColor: visualColor,
    useInsideStyle: !!labelLayout.inside
  }, {
    textAlign: labelLayout.textAlign,
    textVerticalAlign: labelLayout.verticalAlign,
    opacity: data.getItemVisual(idx, 'opacity')
  });
  labelText.ignore = labelText.normalIgnore = !labelModel.get('show');
  labelText.hoverIgnore = !labelHoverModel.get('show');
  labelLine.ignore = labelLine.normalIgnore = !labelLineModel.get('show');
  labelLine.hoverIgnore = !labelLineHoverModel.get('show'); // Default use item visual color

  labelLine.setStyle({
    stroke: visualColor,
    opacity: data.getItemVisual(idx, 'opacity')
  });
  labelLine.setStyle(labelLineModel.getModel('lineStyle').getLineStyle());
  labelLine.hoverStyle = labelLineHoverModel.getModel('lineStyle').getLineStyle();
  var smooth = labelLineModel.get('smooth');

  if (smooth && smooth === true) {
    smooth = 0.4;
  }

  labelLine.setShape({
    smooth: smooth
  });
};

zrUtil.inherits(PiePiece, graphic.Group); // Pie view

var PieView = ChartView.extend({
  type: 'pie',
  init: function () {
    var sectorGroup = new graphic.Group();
    this._sectorGroup = sectorGroup;
  },
  render: function (seriesModel, ecModel, api, payload) {
    if (payload && payload.from === this.uid) {
      return;
    }

    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var hasAnimation = ecModel.get('animation');
    var isFirstRender = !oldData;
    var animationType = seriesModel.get('animationType');
    var onSectorClick = zrUtil.curry(updateDataSelected, this.uid, seriesModel, hasAnimation, api);
    var selectedMode = seriesModel.get('selectedMode');
    data.diff(oldData).add(function (idx) {
      var piePiece = new PiePiece(data, idx); // Default expansion animation

      if (isFirstRender && animationType !== 'scale') {
        piePiece.eachChild(function (child) {
          child.stopAnimation(true);
        });
      }

      selectedMode && piePiece.on('click', onSectorClick);
      data.setItemGraphicEl(idx, piePiece);
      group.add(piePiece);
    }).update(function (newIdx, oldIdx) {
      var piePiece = oldData.getItemGraphicEl(oldIdx);
      piePiece.updateData(data, newIdx);
      piePiece.off('click');
      selectedMode && piePiece.on('click', onSectorClick);
      group.add(piePiece);
      data.setItemGraphicEl(newIdx, piePiece);
    }).remove(function (idx) {
      var piePiece = oldData.getItemGraphicEl(idx);
      group.remove(piePiece);
    }).execute();

    if (hasAnimation && isFirstRender && data.count() > 0 // Default expansion animation
    && animationType !== 'scale') {
      var shape = data.getItemLayout(0);
      var r = Math.max(api.getWidth(), api.getHeight()) / 2;
      var removeClipPath = zrUtil.bind(group.removeClipPath, group);
      group.setClipPath(this._createClipPath(shape.cx, shape.cy, r, shape.startAngle, shape.clockwise, removeClipPath, seriesModel));
    } else {
      // clipPath is used in first-time animation, so remove it when otherwise. See: #8994
      group.removeClipPath();
    }

    this._data = data;
  },
  dispose: function () {},
  _createClipPath: function (cx, cy, r, startAngle, clockwise, cb, seriesModel) {
    var clipPath = new graphic.Sector({
      shape: {
        cx: cx,
        cy: cy,
        r0: 0,
        r: r,
        startAngle: startAngle,
        endAngle: startAngle,
        clockwise: clockwise
      }
    });
    graphic.initProps(clipPath, {
      shape: {
        endAngle: startAngle + (clockwise ? 1 : -1) * Math.PI * 2
      }
    }, seriesModel, cb);
    return clipPath;
  },

  /**
   * @implement
   */
  containPoint: function (point, seriesModel) {
    var data = seriesModel.getData();
    var itemLayout = data.getItemLayout(0);

    if (itemLayout) {
      var dx = point[0] - itemLayout.cx;
      var dy = point[1] - itemLayout.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      return radius <= itemLayout.r && radius >= itemLayout.r0;
    }
  }
});
var _default = PieView;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/pie/labelLayout.js":
/*!***********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/pie/labelLayout.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var textContain = __webpack_require__(/*! zrender/lib/contain/text */ "./node_modules/zrender/lib/contain/text.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// FIXME emphasis label position is not same with normal label position
function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight) {
  list.sort(function (a, b) {
    return a.y - b.y;
  });

  function shiftDown(start, end, delta, dir) {
    for (var j = start; j < end; j++) {
      list[j].y += delta;

      if (j > start && j + 1 < end && list[j + 1].y > list[j].y + list[j].height) {
        shiftUp(j, delta / 2);
        return;
      }
    }

    shiftUp(end - 1, delta / 2);
  }

  function shiftUp(end, delta) {
    for (var j = end; j >= 0; j--) {
      list[j].y -= delta;

      if (j > 0 && list[j].y > list[j - 1].y + list[j - 1].height) {
        break;
      }
    }
  }

  function changeX(list, isDownList, cx, cy, r, dir) {
    var lastDeltaX = dir > 0 ? isDownList // right-side
    ? Number.MAX_VALUE // down
    : 0 // up
    : isDownList // left-side
    ? Number.MAX_VALUE // down
    : 0; // up

    for (var i = 0, l = list.length; i < l; i++) {
      var deltaY = Math.abs(list[i].y - cy);
      var length = list[i].len;
      var length2 = list[i].len2;
      var deltaX = deltaY < r + length ? Math.sqrt((r + length + length2) * (r + length + length2) - deltaY * deltaY) : Math.abs(list[i].x - cx);

      if (isDownList && deltaX >= lastDeltaX) {
        // right-down, left-down
        deltaX = lastDeltaX - 10;
      }

      if (!isDownList && deltaX <= lastDeltaX) {
        // right-up, left-up
        deltaX = lastDeltaX + 10;
      }

      list[i].x = cx + deltaX * dir;
      lastDeltaX = deltaX;
    }
  }

  var lastY = 0;
  var delta;
  var len = list.length;
  var upList = [];
  var downList = [];

  for (var i = 0; i < len; i++) {
    delta = list[i].y - lastY;

    if (delta < 0) {
      shiftDown(i, len, -delta, dir);
    }

    lastY = list[i].y + list[i].height;
  }

  if (viewHeight - lastY < 0) {
    shiftUp(len - 1, lastY - viewHeight);
  }

  for (var i = 0; i < len; i++) {
    if (list[i].y >= cy) {
      downList.push(list[i]);
    } else {
      upList.push(list[i]);
    }
  }

  changeX(upList, false, cx, cy, r, dir);
  changeX(downList, true, cx, cy, r, dir);
}

function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight) {
  var leftList = [];
  var rightList = [];

  for (var i = 0; i < labelLayoutList.length; i++) {
    if (isPositionCenter(labelLayoutList[i])) {
      continue;
    }

    if (labelLayoutList[i].x < cx) {
      leftList.push(labelLayoutList[i]);
    } else {
      rightList.push(labelLayoutList[i]);
    }
  }

  adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight);
  adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight);

  for (var i = 0; i < labelLayoutList.length; i++) {
    if (isPositionCenter(labelLayoutList[i])) {
      continue;
    }

    var linePoints = labelLayoutList[i].linePoints;

    if (linePoints) {
      var dist = linePoints[1][0] - linePoints[2][0];

      if (labelLayoutList[i].x < cx) {
        linePoints[2][0] = labelLayoutList[i].x + 3;
      } else {
        linePoints[2][0] = labelLayoutList[i].x - 3;
      }

      linePoints[1][1] = linePoints[2][1] = labelLayoutList[i].y;
      linePoints[1][0] = linePoints[2][0] + dist;
    }
  }
}

function isPositionCenter(layout) {
  // Not change x for center label
  return layout.position === 'center';
}

function _default(seriesModel, r, viewWidth, viewHeight) {
  var data = seriesModel.getData();
  var labelLayoutList = [];
  var cx;
  var cy;
  var hasLabelRotate = false;
  data.each(function (idx) {
    var layout = data.getItemLayout(idx);
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel('label'); // Use position in normal or emphasis

    var labelPosition = labelModel.get('position') || itemModel.get('emphasis.label.position');
    var labelLineModel = itemModel.getModel('labelLine');
    var labelLineLen = labelLineModel.get('length');
    var labelLineLen2 = labelLineModel.get('length2');
    var midAngle = (layout.startAngle + layout.endAngle) / 2;
    var dx = Math.cos(midAngle);
    var dy = Math.sin(midAngle);
    var textX;
    var textY;
    var linePoints;
    var textAlign;
    cx = layout.cx;
    cy = layout.cy;
    var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';

    if (labelPosition === 'center') {
      textX = layout.cx;
      textY = layout.cy;
      textAlign = 'center';
    } else {
      var x1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dx : layout.r * dx) + cx;
      var y1 = (isLabelInside ? (layout.r + layout.r0) / 2 * dy : layout.r * dy) + cy;
      textX = x1 + dx * 3;
      textY = y1 + dy * 3;

      if (!isLabelInside) {
        // For roseType
        var x2 = x1 + dx * (labelLineLen + r - layout.r);
        var y2 = y1 + dy * (labelLineLen + r - layout.r);
        var x3 = x2 + (dx < 0 ? -1 : 1) * labelLineLen2;
        var y3 = y2;
        textX = x3 + (dx < 0 ? -5 : 5);
        textY = y3;
        linePoints = [[x1, y1], [x2, y2], [x3, y3]];
      }

      textAlign = isLabelInside ? 'center' : dx > 0 ? 'left' : 'right';
    }

    var font = labelModel.getFont();
    var labelRotate = labelModel.get('rotate') ? dx < 0 ? -midAngle + Math.PI : -midAngle : 0;
    var text = seriesModel.getFormattedLabel(idx, 'normal') || data.getName(idx);
    var textRect = textContain.getBoundingRect(text, font, textAlign, 'top');
    hasLabelRotate = !!labelRotate;
    layout.label = {
      x: textX,
      y: textY,
      position: labelPosition,
      height: textRect.height,
      len: labelLineLen,
      len2: labelLineLen2,
      linePoints: linePoints,
      textAlign: textAlign,
      verticalAlign: 'middle',
      rotation: labelRotate,
      inside: isLabelInside
    }; // Not layout the inside label

    if (!isLabelInside) {
      labelLayoutList.push(layout.label);
    }
  });

  if (!hasLabelRotate && seriesModel.get('avoidLabelOverlap')) {
    avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight);
  }
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/chart/pie/pieLayout.js":
/*!*********************************************************!*\
  !*** ./node_modules/echarts/lib/chart/pie/pieLayout.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _number = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

var parsePercent = _number.parsePercent;
var linearMap = _number.linearMap;

var labelLayout = __webpack_require__(/*! ./labelLayout */ "./node_modules/echarts/lib/chart/pie/labelLayout.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var PI2 = Math.PI * 2;
var RADIAN = Math.PI / 180;

function _default(seriesType, ecModel, api, payload) {
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    var center = seriesModel.get('center');
    var radius = seriesModel.get('radius');

    if (!zrUtil.isArray(radius)) {
      radius = [0, radius];
    }

    if (!zrUtil.isArray(center)) {
      center = [center, center];
    }

    var width = api.getWidth();
    var height = api.getHeight();
    var size = Math.min(width, height);
    var cx = parsePercent(center[0], width);
    var cy = parsePercent(center[1], height);
    var r0 = parsePercent(radius[0], size / 2);
    var r = parsePercent(radius[1], size / 2);
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    var minAngle = seriesModel.get('minAngle') * RADIAN;
    var validDataCount = 0;
    data.each(valueDim, function (value) {
      !isNaN(value) && validDataCount++;
    });
    var sum = data.getSum(valueDim); // Sum may be 0

    var unitRadian = Math.PI / (sum || validDataCount) * 2;
    var clockwise = seriesModel.get('clockwise');
    var roseType = seriesModel.get('roseType');
    var stillShowZeroSum = seriesModel.get('stillShowZeroSum'); // [0...max]

    var extent = data.getDataExtent(valueDim);
    extent[0] = 0; // In the case some sector angle is smaller than minAngle

    var restAngle = PI2;
    var valueSumLargerThanMinAngle = 0;
    var currentAngle = startAngle;
    var dir = clockwise ? 1 : -1;
    data.each(valueDim, function (value, idx) {
      var angle;

      if (isNaN(value)) {
        data.setItemLayout(idx, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise: clockwise,
          cx: cx,
          cy: cy,
          r0: r0,
          r: roseType ? NaN : r
        });
        return;
      } // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？


      if (roseType !== 'area') {
        angle = sum === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;
      } else {
        angle = PI2 / validDataCount;
      }

      if (angle < minAngle) {
        angle = minAngle;
        restAngle -= minAngle;
      } else {
        valueSumLargerThanMinAngle += value;
      }

      var endAngle = currentAngle + dir * angle;
      data.setItemLayout(idx, {
        angle: angle,
        startAngle: currentAngle,
        endAngle: endAngle,
        clockwise: clockwise,
        cx: cx,
        cy: cy,
        r0: r0,
        r: roseType ? linearMap(value, extent, [r0, r]) : r
      });
      currentAngle = endAngle;
    }); // Some sector is constrained by minAngle
    // Rest sectors needs recalculate angle

    if (restAngle < PI2 && validDataCount) {
      // Average the angle if rest angle is not enough after all angles is
      // Constrained by minAngle
      if (restAngle <= 1e-3) {
        var angle = PI2 / validDataCount;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout = data.getItemLayout(idx);
            layout.angle = angle;
            layout.startAngle = startAngle + dir * idx * angle;
            layout.endAngle = startAngle + dir * (idx + 1) * angle;
          }
        });
      } else {
        unitRadian = restAngle / valueSumLargerThanMinAngle;
        currentAngle = startAngle;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout = data.getItemLayout(idx);
            var angle = layout.angle === minAngle ? minAngle : value * unitRadian;
            layout.startAngle = currentAngle;
            layout.endAngle = currentAngle + dir * angle;
            currentAngle += dir * angle;
          }
        });
      }
    }

    labelLayout(seriesModel, r, width, height);
  });
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/helper/listComponent.js":
/*!********************************************************************!*\
  !*** ./node_modules/echarts/lib/component/helper/listComponent.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _layout = __webpack_require__(/*! ../../util/layout */ "./node_modules/echarts/lib/util/layout.js");

var getLayoutRect = _layout.getLayoutRect;
var layoutBox = _layout.box;
var positionElement = _layout.positionElement;

var formatUtil = __webpack_require__(/*! ../../util/format */ "./node_modules/echarts/lib/util/format.js");

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Layout list like component.
 * It will box layout each items in group of component and then position the whole group in the viewport
 * @param {module:zrender/group/Group} group
 * @param {module:echarts/model/Component} componentModel
 * @param {module:echarts/ExtensionAPI}
 */
function layout(group, componentModel, api) {
  var boxLayoutParams = componentModel.getBoxLayoutParams();
  var padding = componentModel.get('padding');
  var viewportSize = {
    width: api.getWidth(),
    height: api.getHeight()
  };
  var rect = getLayoutRect(boxLayoutParams, viewportSize, padding);
  layoutBox(componentModel.get('orient'), group, componentModel.get('itemGap'), rect.width, rect.height);
  positionElement(group, boxLayoutParams, viewportSize, padding);
}

function makeBackground(rect, componentModel) {
  var padding = formatUtil.normalizeCssArray(componentModel.get('padding'));
  var style = componentModel.getItemStyle(['color', 'opacity']);
  style.fill = componentModel.get('backgroundColor');
  var rect = new graphic.Rect({
    shape: {
      x: rect.x - padding[3],
      y: rect.y - padding[0],
      width: rect.width + padding[1] + padding[3],
      height: rect.height + padding[0] + padding[2],
      r: componentModel.get('borderRadius')
    },
    style: style,
    silent: true,
    z2: -1
  }); // FIXME
  // `subPixelOptimizeRect` may bring some gap between edge of viewpart
  // and background rect when setting like `left: 0`, `top: 0`.
  // graphic.subPixelOptimizeRect(rect);

  return rect;
}

exports.layout = layout;
exports.makeBackground = makeBackground;

/***/ }),

/***/ "./node_modules/echarts/lib/component/helper/selectableMixin.js":
/*!**********************************************************************!*\
  !*** ./node_modules/echarts/lib/component/helper/selectableMixin.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Data selectable mixin for chart series.
 * To eanble data select, option of series must have `selectedMode`.
 * And each data item will use `selected` to toggle itself selected status
 */
var _default = {
  /**
   * @param {Array.<Object>} targetList [{name, value, selected}, ...]
   *        If targetList is an array, it should like [{name: ..., value: ...}, ...].
   *        If targetList is a "List", it must have coordDim: 'value' dimension and name.
   */
  updateSelectedMap: function (targetList) {
    this._targetList = zrUtil.isArray(targetList) ? targetList.slice() : [];
    this._selectTargetMap = zrUtil.reduce(targetList || [], function (targetMap, target) {
      targetMap.set(target.name, target);
      return targetMap;
    }, zrUtil.createHashMap());
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  // PENGING If selectedMode is null ?
  select: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);
    var selectedMode = this.get('selectedMode');

    if (selectedMode === 'single') {
      this._selectTargetMap.each(function (target) {
        target.selected = false;
      });
    }

    target && (target.selected = true);
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  unSelect: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name); // var selectedMode = this.get('selectedMode');
    // selectedMode !== 'single' && target && (target.selected = false);

    target && (target.selected = false);
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  toggleSelected: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);

    if (target != null) {
      this[target.selected ? 'unSelect' : 'select'](name, id);
      return target.selected;
    }
  },

  /**
   * Either name or id should be passed as input here.
   * If both of them are defined, id is used.
   *
   * @param {string|undefined} name name of data
   * @param {number|undefined} id dataIndex of data
   */
  isSelected: function (name, id) {
    var target = id != null ? this._targetList[id] : this._selectTargetMap.get(name);
    return target && target.selected;
  }
};
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend.js":
/*!******************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../echarts */ "./node_modules/echarts/lib/echarts.js");

__webpack_require__(/*! ./legend/LegendModel */ "./node_modules/echarts/lib/component/legend/LegendModel.js");

__webpack_require__(/*! ./legend/legendAction */ "./node_modules/echarts/lib/component/legend/legendAction.js");

__webpack_require__(/*! ./legend/LegendView */ "./node_modules/echarts/lib/component/legend/LegendView.js");

var legendFilter = __webpack_require__(/*! ./legend/legendFilter */ "./node_modules/echarts/lib/component/legend/legendFilter.js");

var Component = __webpack_require__(/*! ../model/Component */ "./node_modules/echarts/lib/model/Component.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Do not contain scrollable legend, for sake of file size.
// Series Filter
echarts.registerProcessor(legendFilter);
Component.registerSubTypeDefaulter('legend', function () {
  // Default 'plain' when no type specified.
  return 'plain';
});

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/LegendModel.js":
/*!******************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/LegendModel.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var Model = __webpack_require__(/*! ../../model/Model */ "./node_modules/echarts/lib/model/Model.js");

var _model = __webpack_require__(/*! ../../util/model */ "./node_modules/echarts/lib/util/model.js");

var isNameSpecified = _model.isNameSpecified;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var LegendModel = echarts.extendComponentModel({
  type: 'legend.plain',
  dependencies: ['series'],
  layoutMode: {
    type: 'box',
    // legend.width/height are maxWidth/maxHeight actually,
    // whereas realy width/height is calculated by its content.
    // (Setting {left: 10, right: 10} does not make sense).
    // So consider the case:
    // `setOption({legend: {left: 10});`
    // then `setOption({legend: {right: 10});`
    // The previous `left` should be cleared by setting `ignoreSize`.
    ignoreSize: true
  },
  init: function (option, parentModel, ecModel) {
    this.mergeDefaultAndTheme(option, ecModel);
    option.selected = option.selected || {};
  },
  mergeOption: function (option) {
    LegendModel.superCall(this, 'mergeOption', option);
  },
  optionUpdated: function () {
    this._updateData(this.ecModel);

    var legendData = this._data; // If selectedMode is single, try to select one

    if (legendData[0] && this.get('selectedMode') === 'single') {
      var hasSelected = false; // If has any selected in option.selected

      for (var i = 0; i < legendData.length; i++) {
        var name = legendData[i].get('name');

        if (this.isSelected(name)) {
          // Force to unselect others
          this.select(name);
          hasSelected = true;
          break;
        }
      } // Try select the first if selectedMode is single


      !hasSelected && this.select(legendData[0].get('name'));
    }
  },
  _updateData: function (ecModel) {
    var potentialData = [];
    var availableNames = [];
    ecModel.eachRawSeries(function (seriesModel) {
      var seriesName = seriesModel.name;
      availableNames.push(seriesName);
      var isPotential;

      if (seriesModel.legendDataProvider) {
        var data = seriesModel.legendDataProvider();
        var names = data.mapArray(data.getName);

        if (!ecModel.isSeriesFiltered(seriesModel)) {
          availableNames = availableNames.concat(names);
        }

        if (names.length) {
          potentialData = potentialData.concat(names);
        } else {
          isPotential = true;
        }
      } else {
        isPotential = true;
      }

      if (isPotential && isNameSpecified(seriesModel)) {
        potentialData.push(seriesModel.name);
      }
    });
    /**
     * @type {Array.<string>}
     * @private
     */

    this._availableNames = availableNames; // If legend.data not specified in option, use availableNames as data,
    // which is convinient for user preparing option.

    var rawData = this.get('data') || potentialData;
    var legendData = zrUtil.map(rawData, function (dataItem) {
      // Can be string or number
      if (typeof dataItem === 'string' || typeof dataItem === 'number') {
        dataItem = {
          name: dataItem
        };
      }

      return new Model(dataItem, this, this.ecModel);
    }, this);
    /**
     * @type {Array.<module:echarts/model/Model>}
     * @private
     */

    this._data = legendData;
  },

  /**
   * @return {Array.<module:echarts/model/Model>}
   */
  getData: function () {
    return this._data;
  },

  /**
   * @param {string} name
   */
  select: function (name) {
    var selected = this.option.selected;
    var selectedMode = this.get('selectedMode');

    if (selectedMode === 'single') {
      var data = this._data;
      zrUtil.each(data, function (dataItem) {
        selected[dataItem.get('name')] = false;
      });
    }

    selected[name] = true;
  },

  /**
   * @param {string} name
   */
  unSelect: function (name) {
    if (this.get('selectedMode') !== 'single') {
      this.option.selected[name] = false;
    }
  },

  /**
   * @param {string} name
   */
  toggleSelected: function (name) {
    var selected = this.option.selected; // Default is true

    if (!selected.hasOwnProperty(name)) {
      selected[name] = true;
    }

    this[selected[name] ? 'unSelect' : 'select'](name);
  },

  /**
   * @param {string} name
   */
  isSelected: function (name) {
    var selected = this.option.selected;
    return !(selected.hasOwnProperty(name) && !selected[name]) && zrUtil.indexOf(this._availableNames, name) >= 0;
  },
  defaultOption: {
    // 一级层叠
    zlevel: 0,
    // 二级层叠
    z: 4,
    show: true,
    // 布局方式，默认为水平布局，可选为：
    // 'horizontal' | 'vertical'
    orient: 'horizontal',
    left: 'center',
    // right: 'center',
    top: 0,
    // bottom: null,
    // 水平对齐
    // 'auto' | 'left' | 'right'
    // 默认为 'auto', 根据 x 的位置判断是左对齐还是右对齐
    align: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    // 图例边框颜色
    borderColor: '#ccc',
    borderRadius: 0,
    // 图例边框线宽，单位px，默认为0（无边框）
    borderWidth: 0,
    // 图例内边距，单位px，默认各方向内边距为5，
    // 接受数组分别设定上右下左边距，同css
    padding: 5,
    // 各个item之间的间隔，单位px，默认为10，
    // 横向布局时为水平间隔，纵向布局时为纵向间隔
    itemGap: 10,
    // 图例图形宽度
    itemWidth: 25,
    // 图例图形高度
    itemHeight: 14,
    // 图例关闭时候的颜色
    inactiveColor: '#ccc',
    textStyle: {
      // 图例文字颜色
      color: '#333'
    },
    // formatter: '',
    // 选择模式，默认开启图例开关
    selectedMode: true,
    // 配置默认选中状态，可配合LEGEND.SELECTED事件做动态数据载入
    // selected: null,
    // 图例内容（详见legend.data，数组中每一项代表一个item
    // data: [],
    // Tooltip 相关配置
    tooltip: {
      show: false
    }
  }
});
var _default = LegendModel;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/LegendView.js":
/*!*****************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/LegendView.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _config = __webpack_require__(/*! ../../config */ "./node_modules/echarts/lib/config.js");

var __DEV__ = _config.__DEV__;

var echarts = __webpack_require__(/*! ../../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var _symbol = __webpack_require__(/*! ../../util/symbol */ "./node_modules/echarts/lib/util/symbol.js");

var createSymbol = _symbol.createSymbol;

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var _listComponent = __webpack_require__(/*! ../helper/listComponent */ "./node_modules/echarts/lib/component/helper/listComponent.js");

var makeBackground = _listComponent.makeBackground;

var layoutUtil = __webpack_require__(/*! ../../util/layout */ "./node_modules/echarts/lib/util/layout.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var curry = zrUtil.curry;
var each = zrUtil.each;
var Group = graphic.Group;

var _default = echarts.extendComponentView({
  type: 'legend.plain',
  newlineDisabled: false,

  /**
   * @override
   */
  init: function () {
    /**
     * @private
     * @type {module:zrender/container/Group}
     */
    this.group.add(this._contentGroup = new Group());
    /**
     * @private
     * @type {module:zrender/Element}
     */

    this._backgroundEl;
    /**
     * If first rendering, `contentGroup.position` is [0, 0], which
     * does not make sense and may cause unexepcted animation if adopted.
     * @private
     * @type {boolean}
     */

    this._isFirstRender = true;
  },

  /**
   * @protected
   */
  getContentGroup: function () {
    return this._contentGroup;
  },

  /**
   * @override
   */
  render: function (legendModel, ecModel, api) {
    var isFirstRender = this._isFirstRender;
    this._isFirstRender = false;
    this.resetInner();

    if (!legendModel.get('show', true)) {
      return;
    }

    var itemAlign = legendModel.get('align');

    if (!itemAlign || itemAlign === 'auto') {
      itemAlign = legendModel.get('left') === 'right' && legendModel.get('orient') === 'vertical' ? 'right' : 'left';
    }

    this.renderInner(itemAlign, legendModel, ecModel, api); // Perform layout.

    var positionInfo = legendModel.getBoxLayoutParams();
    var viewportSize = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var padding = legendModel.get('padding');
    var maxSize = layoutUtil.getLayoutRect(positionInfo, viewportSize, padding);
    var mainRect = this.layoutInner(legendModel, itemAlign, maxSize, isFirstRender); // Place mainGroup, based on the calculated `mainRect`.

    var layoutRect = layoutUtil.getLayoutRect(zrUtil.defaults({
      width: mainRect.width,
      height: mainRect.height
    }, positionInfo), viewportSize, padding);
    this.group.attr('position', [layoutRect.x - mainRect.x, layoutRect.y - mainRect.y]); // Render background after group is layout.

    this.group.add(this._backgroundEl = makeBackground(mainRect, legendModel));
  },

  /**
   * @protected
   */
  resetInner: function () {
    this.getContentGroup().removeAll();
    this._backgroundEl && this.group.remove(this._backgroundEl);
  },

  /**
   * @protected
   */
  renderInner: function (itemAlign, legendModel, ecModel, api) {
    var contentGroup = this.getContentGroup();
    var legendDrawnMap = zrUtil.createHashMap();
    var selectMode = legendModel.get('selectedMode');
    var excludeSeriesId = [];
    ecModel.eachRawSeries(function (seriesModel) {
      !seriesModel.get('legendHoverLink') && excludeSeriesId.push(seriesModel.id);
    });
    each(legendModel.getData(), function (itemModel, dataIndex) {
      var name = itemModel.get('name'); // Use empty string or \n as a newline string

      if (!this.newlineDisabled && (name === '' || name === '\n')) {
        contentGroup.add(new Group({
          newline: true
        }));
        return;
      } // Representitive series.


      var seriesModel = ecModel.getSeriesByName(name)[0];

      if (legendDrawnMap.get(name)) {
        // Have been drawed
        return;
      } // Series legend


      if (seriesModel) {
        var data = seriesModel.getData();
        var color = data.getVisual('color'); // If color is a callback function

        if (typeof color === 'function') {
          // Use the first data
          color = color(seriesModel.getDataParams(0));
        } // Using rect symbol defaultly


        var legendSymbolType = data.getVisual('legendSymbol') || 'roundRect';
        var symbolType = data.getVisual('symbol');

        var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, selectMode);

        itemGroup.on('click', curry(dispatchSelectAction, name, api)).on('mouseover', curry(dispatchHighlightAction, seriesModel.name, null, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, seriesModel.name, null, api, excludeSeriesId));
        legendDrawnMap.set(name, true);
      } else {
        // Data legend of pie, funnel
        ecModel.eachRawSeries(function (seriesModel) {
          // In case multiple series has same data name
          if (legendDrawnMap.get(name)) {
            return;
          }

          if (seriesModel.legendDataProvider) {
            var data = seriesModel.legendDataProvider();
            var idx = data.indexOfName(name);

            if (idx < 0) {
              return;
            }

            var color = data.getItemVisual(idx, 'color');
            var legendSymbolType = 'roundRect';

            var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, null, itemAlign, color, selectMode); // FIXME: consider different series has items with the same name.


            itemGroup.on('click', curry(dispatchSelectAction, name, api)) // Should not specify the series name, consider legend controls
            // more than one pie series.
            .on('mouseover', curry(dispatchHighlightAction, null, name, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, null, name, api, excludeSeriesId));
            legendDrawnMap.set(name, true);
          }
        }, this);
      }
    }, this);
  },
  _createItem: function (name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, selectMode) {
    var itemWidth = legendModel.get('itemWidth');
    var itemHeight = legendModel.get('itemHeight');
    var inactiveColor = legendModel.get('inactiveColor');
    var symbolKeepAspect = legendModel.get('symbolKeepAspect');
    var isSelected = legendModel.isSelected(name);
    var itemGroup = new Group();
    var textStyleModel = itemModel.getModel('textStyle');
    var itemIcon = itemModel.get('icon');
    var tooltipModel = itemModel.getModel('tooltip');
    var legendGlobalTooltipModel = tooltipModel.parentModel; // Use user given icon first

    legendSymbolType = itemIcon || legendSymbolType;
    itemGroup.add(createSymbol(legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color : inactiveColor, // symbolKeepAspect default true for legend
    symbolKeepAspect == null ? true : symbolKeepAspect)); // Compose symbols
    // PENDING

    if (!itemIcon && symbolType // At least show one symbol, can't be all none
    && (symbolType !== legendSymbolType || symbolType === 'none')) {
      var size = itemHeight * 0.8;

      if (symbolType === 'none') {
        symbolType = 'circle';
      } // Put symbol in the center


      itemGroup.add(createSymbol(symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size, isSelected ? color : inactiveColor, // symbolKeepAspect default true for legend
      symbolKeepAspect == null ? true : symbolKeepAspect));
    }

    var textX = itemAlign === 'left' ? itemWidth + 5 : -5;
    var textAlign = itemAlign;
    var formatter = legendModel.get('formatter');
    var content = name;

    if (typeof formatter === 'string' && formatter) {
      content = formatter.replace('{name}', name != null ? name : '');
    } else if (typeof formatter === 'function') {
      content = formatter(name);
    }

    itemGroup.add(new graphic.Text({
      style: graphic.setTextStyle({}, textStyleModel, {
        text: content,
        x: textX,
        y: itemHeight / 2,
        textFill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
        textAlign: textAlign,
        textVerticalAlign: 'middle'
      })
    })); // Add a invisible rect to increase the area of mouse hover

    var hitRect = new graphic.Rect({
      shape: itemGroup.getBoundingRect(),
      invisible: true,
      tooltip: tooltipModel.get('show') ? zrUtil.extend({
        content: name,
        // Defaul formatter
        formatter: legendGlobalTooltipModel.get('formatter', true) || function () {
          return name;
        },
        formatterParams: {
          componentType: 'legend',
          legendIndex: legendModel.componentIndex,
          name: name,
          $vars: ['name']
        }
      }, tooltipModel.option) : null
    });
    itemGroup.add(hitRect);
    itemGroup.eachChild(function (child) {
      child.silent = true;
    });
    hitRect.silent = !selectMode;
    this.getContentGroup().add(itemGroup);
    graphic.setHoverStyle(itemGroup);
    itemGroup.__legendDataIndex = dataIndex;
    return itemGroup;
  },

  /**
   * @protected
   */
  layoutInner: function (legendModel, itemAlign, maxSize) {
    var contentGroup = this.getContentGroup(); // Place items in contentGroup.

    layoutUtil.box(legendModel.get('orient'), contentGroup, legendModel.get('itemGap'), maxSize.width, maxSize.height);
    var contentRect = contentGroup.getBoundingRect();
    contentGroup.attr('position', [-contentRect.x, -contentRect.y]);
    return this.group.getBoundingRect();
  },

  /**
   * @protected
   */
  remove: function () {
    this.getContentGroup().removeAll();
    this._isFirstRender = true;
  }
});

function dispatchSelectAction(name, api) {
  api.dispatchAction({
    type: 'legendToggleSelect',
    name: name
  });
}

function dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId) {
  // If element hover will move to a hoverLayer.
  var el = api.getZr().storage.getDisplayList()[0];

  if (!(el && el.useHoverLayer)) {
    api.dispatchAction({
      type: 'highlight',
      seriesName: seriesName,
      name: dataName,
      excludeSeriesId: excludeSeriesId
    });
  }
}

function dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId) {
  // If element hover will move to a hoverLayer.
  var el = api.getZr().storage.getDisplayList()[0];

  if (!(el && el.useHoverLayer)) {
    api.dispatchAction({
      type: 'downplay',
      seriesName: seriesName,
      name: dataName,
      excludeSeriesId: excludeSeriesId
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/ScrollableLegendModel.js":
/*!****************************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/ScrollableLegendModel.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var LegendModel = __webpack_require__(/*! ./LegendModel */ "./node_modules/echarts/lib/component/legend/LegendModel.js");

var _layout = __webpack_require__(/*! ../../util/layout */ "./node_modules/echarts/lib/util/layout.js");

var mergeLayoutParam = _layout.mergeLayoutParam;
var getLayoutParams = _layout.getLayoutParams;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var ScrollableLegendModel = LegendModel.extend({
  type: 'legend.scroll',

  /**
   * @param {number} scrollDataIndex
   */
  setScrollDataIndex: function (scrollDataIndex) {
    this.option.scrollDataIndex = scrollDataIndex;
  },
  defaultOption: {
    scrollDataIndex: 0,
    pageButtonItemGap: 5,
    pageButtonGap: null,
    pageButtonPosition: 'end',
    // 'start' or 'end'
    pageFormatter: '{current}/{total}',
    // If null/undefined, do not show page.
    pageIcons: {
      horizontal: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
      vertical: ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z']
    },
    pageIconColor: '#2f4554',
    pageIconInactiveColor: '#aaa',
    pageIconSize: 15,
    // Can be [10, 3], which represents [width, height]
    pageTextStyle: {
      color: '#333'
    },
    animationDurationUpdate: 800
  },

  /**
   * @override
   */
  init: function (option, parentModel, ecModel, extraOpt) {
    var inputPositionParams = getLayoutParams(option);
    ScrollableLegendModel.superCall(this, 'init', option, parentModel, ecModel, extraOpt);
    mergeAndNormalizeLayoutParams(this, option, inputPositionParams);
  },

  /**
   * @override
   */
  mergeOption: function (option, extraOpt) {
    ScrollableLegendModel.superCall(this, 'mergeOption', option, extraOpt);
    mergeAndNormalizeLayoutParams(this, this.option, option);
  },
  getOrient: function () {
    return this.get('orient') === 'vertical' ? {
      index: 1,
      name: 'vertical'
    } : {
      index: 0,
      name: 'horizontal'
    };
  }
}); // Do not `ignoreSize` to enable setting {left: 10, right: 10}.

function mergeAndNormalizeLayoutParams(legendModel, target, raw) {
  var orient = legendModel.getOrient();
  var ignoreSize = [1, 1];
  ignoreSize[orient.index] = 0;
  mergeLayoutParam(target, raw, {
    type: 'box',
    ignoreSize: ignoreSize
  });
}

var _default = ScrollableLegendModel;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/ScrollableLegendView.js":
/*!***************************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/ScrollableLegendView.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var graphic = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");

var layoutUtil = __webpack_require__(/*! ../../util/layout */ "./node_modules/echarts/lib/util/layout.js");

var LegendView = __webpack_require__(/*! ./LegendView */ "./node_modules/echarts/lib/component/legend/LegendView.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Separate legend and scrollable legend to reduce package size.
 */
var Group = graphic.Group;
var WH = ['width', 'height'];
var XY = ['x', 'y'];
var ScrollableLegendView = LegendView.extend({
  type: 'legend.scroll',
  newlineDisabled: true,
  init: function () {
    ScrollableLegendView.superCall(this, 'init');
    /**
     * @private
     * @type {number} For `scroll`.
     */

    this._currentIndex = 0;
    /**
     * @private
     * @type {module:zrender/container/Group}
     */

    this.group.add(this._containerGroup = new Group());

    this._containerGroup.add(this.getContentGroup());
    /**
     * @private
     * @type {module:zrender/container/Group}
     */


    this.group.add(this._controllerGroup = new Group());
    /**
     *
     * @private
     */

    this._showController;
  },

  /**
   * @override
   */
  resetInner: function () {
    ScrollableLegendView.superCall(this, 'resetInner');

    this._controllerGroup.removeAll();

    this._containerGroup.removeClipPath();

    this._containerGroup.__rectSize = null;
  },

  /**
   * @override
   */
  renderInner: function (itemAlign, legendModel, ecModel, api) {
    var me = this; // Render content items.

    ScrollableLegendView.superCall(this, 'renderInner', itemAlign, legendModel, ecModel, api);
    var controllerGroup = this._controllerGroup; // FIXME: support be 'auto' adapt to size number text length,
    // e.g., '3/12345' should not overlap with the control arrow button.

    var pageIconSize = legendModel.get('pageIconSize', true);

    if (!zrUtil.isArray(pageIconSize)) {
      pageIconSize = [pageIconSize, pageIconSize];
    }

    createPageButton('pagePrev', 0);
    var pageTextStyleModel = legendModel.getModel('pageTextStyle');
    controllerGroup.add(new graphic.Text({
      name: 'pageText',
      style: {
        textFill: pageTextStyleModel.getTextColor(),
        font: pageTextStyleModel.getFont(),
        textVerticalAlign: 'middle',
        textAlign: 'center'
      },
      silent: true
    }));
    createPageButton('pageNext', 1);

    function createPageButton(name, iconIdx) {
      var pageDataIndexName = name + 'DataIndex';
      var icon = graphic.createIcon(legendModel.get('pageIcons', true)[legendModel.getOrient().name][iconIdx], {
        // Buttons will be created in each render, so we do not need
        // to worry about avoiding using legendModel kept in scope.
        onclick: zrUtil.bind(me._pageGo, me, pageDataIndexName, legendModel, api)
      }, {
        x: -pageIconSize[0] / 2,
        y: -pageIconSize[1] / 2,
        width: pageIconSize[0],
        height: pageIconSize[1]
      });
      icon.name = name;
      controllerGroup.add(icon);
    }
  },

  /**
   * @override
   */
  layoutInner: function (legendModel, itemAlign, maxSize, isFirstRender) {
    var contentGroup = this.getContentGroup();
    var containerGroup = this._containerGroup;
    var controllerGroup = this._controllerGroup;
    var orientIdx = legendModel.getOrient().index;
    var wh = WH[orientIdx];
    var hw = WH[1 - orientIdx];
    var yx = XY[1 - orientIdx]; // Place items in contentGroup.

    layoutUtil.box(legendModel.get('orient'), contentGroup, legendModel.get('itemGap'), !orientIdx ? null : maxSize.width, orientIdx ? null : maxSize.height);
    layoutUtil.box( // Buttons in controller are layout always horizontally.
    'horizontal', controllerGroup, legendModel.get('pageButtonItemGap', true));
    var contentRect = contentGroup.getBoundingRect();
    var controllerRect = controllerGroup.getBoundingRect();
    var showController = this._showController = contentRect[wh] > maxSize[wh];
    var contentPos = [-contentRect.x, -contentRect.y]; // Remain contentPos when scroll animation perfroming.
    // If first rendering, `contentGroup.position` is [0, 0], which
    // does not make sense and may cause unexepcted animation if adopted.

    if (!isFirstRender) {
      contentPos[orientIdx] = contentGroup.position[orientIdx];
    } // Layout container group based on 0.


    var containerPos = [0, 0];
    var controllerPos = [-controllerRect.x, -controllerRect.y];
    var pageButtonGap = zrUtil.retrieve2(legendModel.get('pageButtonGap', true), legendModel.get('itemGap', true)); // Place containerGroup and controllerGroup and contentGroup.

    if (showController) {
      var pageButtonPosition = legendModel.get('pageButtonPosition', true); // controller is on the right / bottom.

      if (pageButtonPosition === 'end') {
        controllerPos[orientIdx] += maxSize[wh] - controllerRect[wh];
      } // controller is on the left / top.
      else {
          containerPos[orientIdx] += controllerRect[wh] + pageButtonGap;
        }
    } // Always align controller to content as 'middle'.


    controllerPos[1 - orientIdx] += contentRect[hw] / 2 - controllerRect[hw] / 2;
    contentGroup.attr('position', contentPos);
    containerGroup.attr('position', containerPos);
    controllerGroup.attr('position', controllerPos); // Calculate `mainRect` and set `clipPath`.
    // mainRect should not be calculated by `this.group.getBoundingRect()`
    // for sake of the overflow.

    var mainRect = this.group.getBoundingRect();
    var mainRect = {
      x: 0,
      y: 0
    }; // Consider content may be overflow (should be clipped).

    mainRect[wh] = showController ? maxSize[wh] : contentRect[wh];
    mainRect[hw] = Math.max(contentRect[hw], controllerRect[hw]); // `containerRect[yx] + containerPos[1 - orientIdx]` is 0.

    mainRect[yx] = Math.min(0, controllerRect[yx] + controllerPos[1 - orientIdx]);
    containerGroup.__rectSize = maxSize[wh];

    if (showController) {
      var clipShape = {
        x: 0,
        y: 0
      };
      clipShape[wh] = Math.max(maxSize[wh] - controllerRect[wh] - pageButtonGap, 0);
      clipShape[hw] = mainRect[hw];
      containerGroup.setClipPath(new graphic.Rect({
        shape: clipShape
      })); // Consider content may be larger than container, container rect
      // can not be obtained from `containerGroup.getBoundingRect()`.

      containerGroup.__rectSize = clipShape[wh];
    } else {
      // Do not remove or ignore controller. Keep them set as place holders.
      controllerGroup.eachChild(function (child) {
        child.attr({
          invisible: true,
          silent: true
        });
      });
    } // Content translate animation.


    var pageInfo = this._getPageInfo(legendModel);

    pageInfo.pageIndex != null && graphic.updateProps(contentGroup, {
      position: pageInfo.contentPosition
    }, // When switch from "show controller" to "not show controller", view should be
    // updated immediately without animation, otherwise causes weird efffect.
    showController ? legendModel : false);

    this._updatePageInfoView(legendModel, pageInfo);

    return mainRect;
  },
  _pageGo: function (to, legendModel, api) {
    var scrollDataIndex = this._getPageInfo(legendModel)[to];

    scrollDataIndex != null && api.dispatchAction({
      type: 'legendScroll',
      scrollDataIndex: scrollDataIndex,
      legendId: legendModel.id
    });
  },
  _updatePageInfoView: function (legendModel, pageInfo) {
    var controllerGroup = this._controllerGroup;
    zrUtil.each(['pagePrev', 'pageNext'], function (name) {
      var canJump = pageInfo[name + 'DataIndex'] != null;
      var icon = controllerGroup.childOfName(name);

      if (icon) {
        icon.setStyle('fill', canJump ? legendModel.get('pageIconColor', true) : legendModel.get('pageIconInactiveColor', true));
        icon.cursor = canJump ? 'pointer' : 'default';
      }
    });
    var pageText = controllerGroup.childOfName('pageText');
    var pageFormatter = legendModel.get('pageFormatter');
    var pageIndex = pageInfo.pageIndex;
    var current = pageIndex != null ? pageIndex + 1 : 0;
    var total = pageInfo.pageCount;
    pageText && pageFormatter && pageText.setStyle('text', zrUtil.isString(pageFormatter) ? pageFormatter.replace('{current}', current).replace('{total}', total) : pageFormatter({
      current: current,
      total: total
    }));
  },

  /**
   * @param {module:echarts/model/Model} legendModel
   * @return {Object} {
   *  contentPosition: Array.<number>, null when data item not found.
   *  pageIndex: number, null when data item not found.
   *  pageCount: number, always be a number, can be 0.
   *  pagePrevDataIndex: number, null when no next page.
   *  pageNextDataIndex: number, null when no previous page.
   * }
   */
  _getPageInfo: function (legendModel) {
    var scrollDataIndex = legendModel.get('scrollDataIndex', true);
    var contentGroup = this.getContentGroup();
    var containerRectSize = this._containerGroup.__rectSize;
    var orientIdx = legendModel.getOrient().index;
    var wh = WH[orientIdx];
    var xy = XY[orientIdx];

    var targetItemIndex = this._findTargetItemIndex(scrollDataIndex);

    var children = contentGroup.children();
    var targetItem = children[targetItemIndex];
    var itemCount = children.length;
    var pCount = !itemCount ? 0 : 1;
    var result = {
      contentPosition: contentGroup.position.slice(),
      pageCount: pCount,
      pageIndex: pCount - 1,
      pagePrevDataIndex: null,
      pageNextDataIndex: null
    };

    if (!targetItem) {
      return result;
    }

    var targetItemInfo = getItemInfo(targetItem);
    result.contentPosition[orientIdx] = -targetItemInfo.s; // Strategy:
    // (1) Always align based on the left/top most item.
    // (2) It is user-friendly that the last item shown in the
    // current window is shown at the begining of next window.
    // Otherwise if half of the last item is cut by the window,
    // it will have no chance to display entirely.
    // (3) Consider that item size probably be different, we
    // have calculate pageIndex by size rather than item index,
    // and we can not get page index directly by division.
    // (4) The window is to narrow to contain more than
    // one item, we should make sure that the page can be fliped.

    for (var i = targetItemIndex + 1, winStartItemInfo = targetItemInfo, winEndItemInfo = targetItemInfo, currItemInfo = null; i <= itemCount; ++i) {
      currItemInfo = getItemInfo(children[i]);

      if ( // Half of the last item is out of the window.
      !currItemInfo && winEndItemInfo.e > winStartItemInfo.s + containerRectSize || // If the current item does not intersect with the window, the new page
      // can be started at the current item or the last item.
      currItemInfo && !intersect(currItemInfo, winStartItemInfo.s)) {
        if (winEndItemInfo.i > winStartItemInfo.i) {
          winStartItemInfo = winEndItemInfo;
        } else {
          // e.g., when page size is smaller than item size.
          winStartItemInfo = currItemInfo;
        }

        if (winStartItemInfo) {
          if (result.pageNextDataIndex == null) {
            result.pageNextDataIndex = winStartItemInfo.i;
          }

          ++result.pageCount;
        }
      }

      winEndItemInfo = currItemInfo;
    }

    for (var i = targetItemIndex - 1, winStartItemInfo = targetItemInfo, winEndItemInfo = targetItemInfo, currItemInfo = null; i >= -1; --i) {
      currItemInfo = getItemInfo(children[i]);

      if ( // If the the end item does not intersect with the window started
      // from the current item, a page can be settled.
      (!currItemInfo || !intersect(winEndItemInfo, currItemInfo.s)) && // e.g., when page size is smaller than item size.
      winStartItemInfo.i < winEndItemInfo.i) {
        winEndItemInfo = winStartItemInfo;

        if (result.pagePrevDataIndex == null) {
          result.pagePrevDataIndex = winStartItemInfo.i;
        }

        ++result.pageCount;
        ++result.pageIndex;
      }

      winStartItemInfo = currItemInfo;
    }

    return result;

    function getItemInfo(el) {
      if (el) {
        var itemRect = el.getBoundingRect();
        var start = itemRect[xy] + el.position[orientIdx];
        return {
          s: start,
          e: start + itemRect[wh],
          i: el.__legendDataIndex
        };
      }
    }

    function intersect(itemInfo, winStart) {
      return itemInfo.e >= winStart && itemInfo.s <= winStart + containerRectSize;
    }
  },
  _findTargetItemIndex: function (targetDataIndex) {
    var index;
    var contentGroup = this.getContentGroup();

    if (this._showController) {
      contentGroup.eachChild(function (child, idx) {
        if (child.__legendDataIndex === targetDataIndex) {
          index = idx;
        }
      });
    } else {
      index = 0;
    }

    return index;
  }
});
var _default = ScrollableLegendView;
module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/legendAction.js":
/*!*******************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/legendAction.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../../echarts */ "./node_modules/echarts/lib/echarts.js");

var zrUtil = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function legendSelectActionHandler(methodName, payload, ecModel) {
  var selectedMap = {};
  var isToggleSelect = methodName === 'toggleSelected';
  var isSelected; // Update all legend components

  ecModel.eachComponent('legend', function (legendModel) {
    if (isToggleSelect && isSelected != null) {
      // Force other legend has same selected status
      // Or the first is toggled to true and other are toggled to false
      // In the case one legend has some item unSelected in option. And if other legend
      // doesn't has the item, they will assume it is selected.
      legendModel[isSelected ? 'select' : 'unSelect'](payload.name);
    } else {
      legendModel[methodName](payload.name);
      isSelected = legendModel.isSelected(payload.name);
    }

    var legendData = legendModel.getData();
    zrUtil.each(legendData, function (model) {
      var name = model.get('name'); // Wrap element

      if (name === '\n' || name === '') {
        return;
      }

      var isItemSelected = legendModel.isSelected(name);

      if (selectedMap.hasOwnProperty(name)) {
        // Unselected if any legend is unselected
        selectedMap[name] = selectedMap[name] && isItemSelected;
      } else {
        selectedMap[name] = isItemSelected;
      }
    });
  }); // Return the event explicitly

  return {
    name: payload.name,
    selected: selectedMap
  };
}
/**
 * @event legendToggleSelect
 * @type {Object}
 * @property {string} type 'legendToggleSelect'
 * @property {string} [from]
 * @property {string} name Series name or data item name
 */


echarts.registerAction('legendToggleSelect', 'legendselectchanged', zrUtil.curry(legendSelectActionHandler, 'toggleSelected'));
/**
 * @event legendSelect
 * @type {Object}
 * @property {string} type 'legendSelect'
 * @property {string} name Series name or data item name
 */

echarts.registerAction('legendSelect', 'legendselected', zrUtil.curry(legendSelectActionHandler, 'select'));
/**
 * @event legendUnSelect
 * @type {Object}
 * @property {string} type 'legendUnSelect'
 * @property {string} name Series name or data item name
 */

echarts.registerAction('legendUnSelect', 'legendunselected', zrUtil.curry(legendSelectActionHandler, 'unSelect'));

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/legendFilter.js":
/*!*******************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/legendFilter.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(ecModel) {
  var legendModels = ecModel.findComponents({
    mainType: 'legend'
  });

  if (legendModels && legendModels.length) {
    ecModel.filterSeries(function (series) {
      // If in any legend component the status is not selected.
      // Because in legend series is assumed selected when it is not in the legend data.
      for (var i = 0; i < legendModels.length; i++) {
        if (!legendModels[i].isSelected(series.name)) {
          return false;
        }
      }

      return true;
    });
  }
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/component/legend/scrollableLegendAction.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legend/scrollableLegendAction.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var echarts = __webpack_require__(/*! ../../echarts */ "./node_modules/echarts/lib/echarts.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @event legendScroll
 * @type {Object}
 * @property {string} type 'legendScroll'
 * @property {string} scrollDataIndex
 */
echarts.registerAction('legendScroll', 'legendscroll', function (payload, ecModel) {
  var scrollDataIndex = payload.scrollDataIndex;
  scrollDataIndex != null && ecModel.eachComponent({
    mainType: 'legend',
    subType: 'scroll',
    query: payload
  }, function (legendModel) {
    legendModel.setScrollDataIndex(scrollDataIndex);
  });
});

/***/ }),

/***/ "./node_modules/echarts/lib/component/legendScroll.js":
/*!************************************************************!*\
  !*** ./node_modules/echarts/lib/component/legendScroll.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

__webpack_require__(/*! ./legend */ "./node_modules/echarts/lib/component/legend.js");

__webpack_require__(/*! ./legend/ScrollableLegendModel */ "./node_modules/echarts/lib/component/legend/ScrollableLegendModel.js");

__webpack_require__(/*! ./legend/ScrollableLegendView */ "./node_modules/echarts/lib/component/legend/ScrollableLegendView.js");

__webpack_require__(/*! ./legend/scrollableLegendAction */ "./node_modules/echarts/lib/component/legend/scrollableLegendAction.js");

/***/ }),

/***/ "./node_modules/echarts/lib/layout/points.js":
/*!***************************************************!*\
  !*** ./node_modules/echarts/lib/layout/points.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var map = _util.map;

var createRenderPlanner = __webpack_require__(/*! ../chart/helper/createRenderPlanner */ "./node_modules/echarts/lib/chart/helper/createRenderPlanner.js");

var _dataStackHelper = __webpack_require__(/*! ../data/helper/dataStackHelper */ "./node_modules/echarts/lib/data/helper/dataStackHelper.js");

var isDimensionStacked = _dataStackHelper.isDimensionStacked;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/* global Float32Array */
function _default(seriesType) {
  return {
    seriesType: seriesType,
    plan: createRenderPlanner(),
    reset: function (seriesModel) {
      var data = seriesModel.getData();
      var coordSys = seriesModel.coordinateSystem;
      var pipelineContext = seriesModel.pipelineContext;
      var isLargeRender = pipelineContext.large;

      if (!coordSys) {
        return;
      }

      var dims = map(coordSys.dimensions, function (dim) {
        return data.mapDimension(dim);
      }).slice(0, 2);
      var dimLen = dims.length;
      var stackResultDim = data.getCalculationInfo('stackResultDimension');

      if (isDimensionStacked(data, dims[0]
      /*, dims[1]*/
      )) {
        dims[0] = stackResultDim;
      }

      if (isDimensionStacked(data, dims[1]
      /*, dims[0]*/
      )) {
        dims[1] = stackResultDim;
      }

      function progress(params, data) {
        var segCount = params.end - params.start;
        var points = isLargeRender && new Float32Array(segCount * dimLen);

        for (var i = params.start, offset = 0, tmpIn = [], tmpOut = []; i < params.end; i++) {
          var point;

          if (dimLen === 1) {
            var x = data.get(dims[0], i);
            point = !isNaN(x) && coordSys.dataToPoint(x, null, tmpOut);
          } else {
            var x = tmpIn[0] = data.get(dims[0], i);
            var y = tmpIn[1] = data.get(dims[1], i); // Also {Array.<number>}, not undefined to avoid if...else... statement

            point = !isNaN(x) && !isNaN(y) && coordSys.dataToPoint(tmpIn, null, tmpOut);
          }

          if (isLargeRender) {
            points[offset++] = point ? point[0] : NaN;
            points[offset++] = point ? point[1] : NaN;
          } else {
            data.setItemLayout(i, point && point.slice() || [NaN, NaN]);
          }
        }

        isLargeRender && data.setLayout('symbolPoints', points);
      }

      return dimLen && {
        progress: progress
      };
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/processor/dataFilter.js":
/*!**********************************************************!*\
  !*** ./node_modules/echarts/lib/processor/dataFilter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType) {
  return {
    seriesType: seriesType,
    reset: function (seriesModel, ecModel) {
      var legendModels = ecModel.findComponents({
        mainType: 'legend'
      });

      if (!legendModels || !legendModels.length) {
        return;
      }

      var data = seriesModel.getData();
      data.filterSelf(function (idx) {
        var name = data.getName(idx); // If in any legend component the status is not selected.

        for (var i = 0; i < legendModels.length; i++) {
          if (!legendModels[i].isSelected(name)) {
            return false;
          }
        }

        return true;
      });
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/processor/dataSample.js":
/*!**********************************************************!*\
  !*** ./node_modules/echarts/lib/processor/dataSample.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var samplers = {
  average: function (frame) {
    var sum = 0;
    var count = 0;

    for (var i = 0; i < frame.length; i++) {
      if (!isNaN(frame[i])) {
        sum += frame[i];
        count++;
      }
    } // Return NaN if count is 0


    return count === 0 ? NaN : sum / count;
  },
  sum: function (frame) {
    var sum = 0;

    for (var i = 0; i < frame.length; i++) {
      // Ignore NaN
      sum += frame[i] || 0;
    }

    return sum;
  },
  max: function (frame) {
    var max = -Infinity;

    for (var i = 0; i < frame.length; i++) {
      frame[i] > max && (max = frame[i]);
    } // NaN will cause illegal axis extent.


    return isFinite(max) ? max : NaN;
  },
  min: function (frame) {
    var min = Infinity;

    for (var i = 0; i < frame.length; i++) {
      frame[i] < min && (min = frame[i]);
    } // NaN will cause illegal axis extent.


    return isFinite(min) ? min : NaN;
  },
  // TODO
  // Median
  nearest: function (frame) {
    return frame[0];
  }
};

var indexSampler = function (frame, value) {
  return Math.round(frame.length / 2);
};

function _default(seriesType) {
  return {
    seriesType: seriesType,
    modifyOutputEnd: true,
    reset: function (seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var sampling = seriesModel.get('sampling');
      var coordSys = seriesModel.coordinateSystem; // Only cartesian2d support down sampling

      if (coordSys.type === 'cartesian2d' && sampling) {
        var baseAxis = coordSys.getBaseAxis();
        var valueAxis = coordSys.getOtherAxis(baseAxis);
        var extent = baseAxis.getExtent(); // Coordinste system has been resized

        var size = extent[1] - extent[0];
        var rate = Math.round(data.count() / size);

        if (rate > 1) {
          var sampler;

          if (typeof sampling === 'string') {
            sampler = samplers[sampling];
          } else if (typeof sampling === 'function') {
            sampler = sampling;
          }

          if (sampler) {
            // Only support sample the first dim mapped from value axis.
            seriesModel.setData(data.downSample(data.mapDimension(valueAxis.dim), 1 / rate, sampler, indexSampler));
          }
        }
      }
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/visual/dataColor.js":
/*!******************************************************!*\
  !*** ./node_modules/echarts/lib/visual/dataColor.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var _util = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

var createHashMap = _util.createHashMap;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
// Pick color from palette for each data item.
// Applicable for charts that require applying color palette
// in data level (like pie, funnel, chord).
function _default(seriesType) {
  return {
    getTargetSeries: function (ecModel) {
      // Pie and funnel may use diferrent scope
      var paletteScope = {};
      var seiresModelMap = createHashMap();
      ecModel.eachSeriesByType(seriesType, function (seriesModel) {
        seriesModel.__paletteScope = paletteScope;
        seiresModelMap.set(seriesModel.uid, seriesModel);
      });
      return seiresModelMap;
    },
    reset: function (seriesModel, ecModel) {
      var dataAll = seriesModel.getRawData();
      var idxMap = {};
      var data = seriesModel.getData();
      data.each(function (idx) {
        var rawIdx = data.getRawIndex(idx);
        idxMap[rawIdx] = idx;
      });
      dataAll.each(function (rawIdx) {
        var filteredIdx = idxMap[rawIdx]; // If series.itemStyle.normal.color is a function. itemVisual may be encoded

        var singleDataColor = filteredIdx != null && data.getItemVisual(filteredIdx, 'color', true);

        if (!singleDataColor) {
          // FIXME Performance
          var itemModel = dataAll.getItemModel(rawIdx);
          var color = itemModel.get('itemStyle.color') || seriesModel.getColorFromPalette(dataAll.getName(rawIdx) || rawIdx + '', seriesModel.__paletteScope, dataAll.count()); // Legend may use the visual info in data before processed

          dataAll.setItemVisual(rawIdx, 'color', color); // Data is not filtered

          if (filteredIdx != null) {
            data.setItemVisual(filteredIdx, 'color', color);
          }
        } else {
          // Set data all color for legend
          dataAll.setItemVisual(rawIdx, 'color', singleDataColor);
        }
      });
    }
  };
}

module.exports = _default;

/***/ }),

/***/ "./node_modules/echarts/lib/visual/symbol.js":
/*!***************************************************!*\
  !*** ./node_modules/echarts/lib/visual/symbol.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function _default(seriesType, defaultSymbolType, legendSymbol) {
  // Encoding visual for all series include which is filtered for legend drawing
  return {
    seriesType: seriesType,
    // For legend.
    performRawSeries: true,
    reset: function (seriesModel, ecModel, api) {
      var data = seriesModel.getData();
      var symbolType = seriesModel.get('symbol') || defaultSymbolType;
      var symbolSize = seriesModel.get('symbolSize');
      var keepAspect = seriesModel.get('symbolKeepAspect');
      data.setVisual({
        legendSymbol: legendSymbol || symbolType,
        symbol: symbolType,
        symbolSize: symbolSize,
        symbolKeepAspect: keepAspect
      }); // Only visible series has each data be visual encoded

      if (ecModel.isSeriesFiltered(seriesModel)) {
        return;
      }

      var hasCallback = typeof symbolSize === 'function';

      function dataEach(data, idx) {
        if (typeof symbolSize === 'function') {
          var rawValue = seriesModel.getRawValue(idx); // FIXME

          var params = seriesModel.getDataParams(idx);
          data.setItemVisual(idx, 'symbolSize', symbolSize(rawValue, params));
        }

        if (data.hasItemOption) {
          var itemModel = data.getItemModel(idx);
          var itemSymbolType = itemModel.getShallow('symbol', true);
          var itemSymbolSize = itemModel.getShallow('symbolSize', true);
          var itemSymbolKeepAspect = itemModel.getShallow('symbolKeepAspect', true); // If has item symbol

          if (itemSymbolType != null) {
            data.setItemVisual(idx, 'symbol', itemSymbolType);
          }

          if (itemSymbolSize != null) {
            // PENDING Transform symbolSize ?
            data.setItemVisual(idx, 'symbolSize', itemSymbolSize);
          }

          if (itemSymbolKeepAspect != null) {
            data.setItemVisual(idx, 'symbolKeepAspect', itemSymbolKeepAspect);
          }
        }
      }

      return {
        dataEach: data.hasItemOption || hasCallback ? dataEach : null
      };
    }
  };
}

module.exports = _default;

/***/ })

}]);