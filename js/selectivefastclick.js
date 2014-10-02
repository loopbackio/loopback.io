/*jshint laxbreak:true*/

/**
 * External dependencies
 */

var FastClick = require('fastclick').FastClick;
var FtDomDelegate = require('dom-delegate').Delegate;

/**
 * Selective FastClick
 */

function SelectiveFastClick(layer, selectors) {

  // Support:-
  // - new SelectiveFastClick(selector); (default FastClick behaviour on document.body)
  // - new SelectiveFastClick(document.body, selector); (as above)
  // - new SelectiveFastClick([selector, selector...]);
  // - new SelectiveFastClick(document.body, [selector, selector, ...]);
  if (!selectors) {
    selectors = layer;
    layer = document.body;
  }
  if (typeof selectors === 'string') selectors = [selectors];

  var delegate = this.delegate = new FtDomDelegate(layer);

  // HACKS: Trick FastClick into thinking dom-delegate is a document node
  // TODO: Find cleaner way of doing this.
  delegate.nodeType = true;
  delegate.style = { msTouchAction: layer.style.msTouchAction };

  // Hacks to ensure the dom delegate uses capture on clicks for Android 2.3
  delegate.captureForType = function(eventType) {
    return FtDomDelegate.prototype.captureForType(eventType)
      || ['mouseover', 'mousedown', 'mouseup', 'click'].indexOf(eventType) !== -1;
  };

  // Quick hacky forEach helper
  function forEach(array, fn) {
    for (var i = 0, l = array.length; i < l; i++) fn(array[i]);
  }

  delegate.addEventListener = function(eventType, handler, useCapture) {
    forEach(selectors, function(selector) {
      FtDomDelegate.prototype.on.call(delegate, eventType, selector, handler);
    });
  };

  delegate.removeEventListener = function(eventType, handler, useCapture) {
    forEach(selectors, function(selector) {
      FtDomDelegate.prototype.off.call(delegate, eventType, selector, handler);
    });
  };

  this.fastclick = new FastClick(delegate);

  // Copy the Android 2.3 hack
  if (typeof layer.onclick === 'function') {

    // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
    // - the old one won't work if passed to addEventListener directly.
    oldOnClick = layer.onclick;
    layer.addEventListener('click', function(event) {
        oldOnClick(event);
    }, false);
    layer.onclick = null;
  }
}

/**
 * Instance methods
 */

var proto = SelectiveFastClick.prototype;

proto.destroy = function() {
  this.delegate.destroy();
  this.fastclick.destroy();
};

/**
 * FastClick-style attach method
 */

SelectiveFastClick.attach = function(layer, selector) {
  return new SelectiveFastClick(layer, selector);
};

module.exports = SelectiveFastClick;
