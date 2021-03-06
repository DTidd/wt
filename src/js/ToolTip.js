/*
 * Copyright (C) 2011 Emweb bvba, Kessel-Lo, Belgium.
 *
 * See the LICENSE file for terms of use.
 */

/* Note: this is at the same time valid JavaScript and C++. */

WT_DECLARE_WT_MEMBER
(10, JavaScriptFunction, "toolTip",
 function(APP, id, text, deferred, ToolTipInnerStyle, ToolTipOuterStyle) {


     var $el = $("#" + id), el = $el.get(0);
     var WT = APP.WT;

     var obj = el.toolTip;

     if (!obj) {
         el.toolTip = new function() {
             var showTimer = null, checkInt = null, coords = null, toolTipEl = null;
             /* const */ var MouseDistance = 10;
             /* const */ var Delay = 500;
             var waitingForText = false, toolTipText = text;

             function checkIsOver() {
                 if (!$('#' + id + ':hover').length)
                     hideToolTip();
             }

             function loadToolTipText() {
                 waitingForText = true;
                 APP.emit(el, "Wt-loadToolTip");
             }

             this.setToolTipText = function(text) {
                 toolTipText = text;
                 if (waitingForText) {
                     this.showToolTip();
                     waitingforText = false;
                 }
             }

             this.showToolTip = function() {
                 if (deferred && !toolTipText && !waitingForText)
                     loadToolTipText();

                 if (toolTipText){
                     toolTipEl = document.createElement('div');
                     toolTipEl.className = ToolTipInnerStyle;
                     toolTipEl.innerHTML = toolTipText;

                     outerDiv = document.createElement('div');
                     outerDiv.className = ToolTipOuterStyle;

                     document.body.appendChild(outerDiv);
                     outerDiv.appendChild(toolTipEl);

                     var x = coords.x, y = coords.y;
                     WT.fitToWindow(outerDiv, x + MouseDistance, y + MouseDistance,
                                    x - MouseDistance, y - MouseDistance);
                 }

                 checkInt = setInterval(function() { checkIsOver(); }, 200);
             }

             function hideToolTip() {
                 clearTimeout(showTimer);
                 if (toolTipEl) {
                     $(toolTipEl).remove();
                     toolTipEl = null;
                     clearInterval(checkInt);
                     checkInt = null;
                 }
             }

             function resetTimer(e) {
                 clearTimeout(showTimer);
                 coords = WT.pageCoordinates(e);

                 if (!toolTipEl)
                     showTimer = setTimeout(function() { el.toolTip.showToolTip(); }, Delay);
             }

             $el.mouseenter(resetTimer);
             $el.mousemove(resetTimer);
             $el.mouseleave(hideToolTip);
         };
     }

     if (obj)
         obj.setToolTipText(text);
 });
