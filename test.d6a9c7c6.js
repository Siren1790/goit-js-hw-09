!function(){function t(t){return t&&t.__esModule?t.default:t}var e={};Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};var n={};function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(t,e,n){e&&a(t.prototype,e);n&&a(t,n);return t};var i={startBtn:document.querySelector("button[data-action-start]"),stopBtn:document.querySelector("button[data-action-stop]"),clockface:document.querySelector(".clockface")},o=new(function(){"use strict";function a(n){var i=n.onTick;t(e)(this,a),this.intervalId=null,this.isActive=!1,this.onTick=i,this.init()}return t(n)(a,[{key:"init",value:function(){var t=this.convertMs(0);this.onTick(t)}},{key:"start",value:function(){var t=this;if(!this.isActive){var e=Date.now();this.isActive=!0,this.intervalId=setInterval((function(){var n=Date.now()-e,a=t.convertMs(n);t.onTick(a)}),1e3)}}},{key:"stop",value:function(){clearInterval(this.intervalId),this.isActive=!1;var t=this.convertMs(0);this.onTick(t)}},{key:"pad",value:function(t){return String(t).padStart(2,"0")}},{key:"padDays",value:function(t){return String(t).padStart(3,"0")}},{key:"convertMs",value:function(t){var e=6e4,n=36e5,a=24*n;return{days:this.padDays(Math.floor(t/a)),hours:this.pad(Math.floor(t%a/n)),minutes:this.pad(Math.floor(t%a%n/e)),seconds:this.pad(Math.floor(t%a%n%e/1e3))}}}]),a}())({onTick:function(t){var e=t.days,n=t.hours,a=t.minutes,o=t.seconds;i.clockface.textContent="".concat(e,":").concat(n,":").concat(a,":").concat(o)}});i.startBtn.addEventListener("click",o.start.bind(o)),i.stopBtn.addEventListener("click",o.stop.bind(o))}();
//# sourceMappingURL=test.d6a9c7c6.js.map
