import t from"fecha";function e(t){var e=t.split(":").map(Number);return 3600*e[0]+60*e[1]+e[2]}var n=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric"})}:function(e){return t.format(e,"mediumDate")},a=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(e){return t.format(e,"haDateTime")},r=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e,{hour:"numeric",minute:"2-digit"})}:function(e){return t.format(e,"shortTime")},i=[60,60,24,7],o=["second","minute","hour","day"];function s(t,e,n){void 0===n&&(n={});var a,r=((n.compareTime||new Date).getTime()-t.getTime())/1e3,s=r>=0?"past":"future";r=Math.abs(r);for(var c=0;c<i.length;c++){if(r<i[c]){r=Math.floor(r),a=e("ui.components.relative_time.duration."+o[c],"count",r);break}r/=i[c]}return void 0===a&&(a=e("ui.components.relative_time.duration.week","count",r=Math.floor(r))),!1===n.includeTense?a:e("ui.components.relative_time."+s,"time",a)}var c=function(t){return t<10?"0"+t:t};function u(t){var e=Math.floor(t/3600),n=Math.floor(t%3600/60),a=Math.floor(t%3600%60);return e>0?e+":"+c(n)+":"+c(a):n>0?n+":"+c(a):a>0?""+a:null}function l(t){var n=e(t.attributes.remaining);if("active"===t.state){var a=(new Date).getTime(),r=new Date(t.last_changed).getTime();n=Math.max(n-(a-r)/1e3,0)}return n}var h=function(t,e,n,a){void 0===a&&(a=!1),t._themes||(t._themes={});var r=e.default_theme;("default"===n||n&&e.themes[n])&&(r=n);var i=Object.assign({},t._themes);if("default"!==r){var o=e.themes[r];Object.keys(o).forEach(function(e){var n="--"+e;t._themes[n]="",i[n]=o[e]})}if(t.updateStyles?t.updateStyles(i):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,i),a){var s=document.querySelector("meta[name=theme-color]");if(s){s.hasAttribute("default-content")||s.setAttribute("default-content",s.getAttribute("content"));var c=i["--primary-color"]||s.getAttribute("default-content");s.setAttribute("content",c)}}};function d(t){return t.substr(0,t.indexOf("."))}function m(t){return t.substr(t.indexOf(".")+1)}function p(t){var e=t.language||"en";return t.translationMetadata.translations[e]&&t.translationMetadata.translations[e].isRTL||!1}function f(t){return p(t)?"rtl":"ltr"}function v(t){return d(t.entity_id)}function g(t,e,i){var o,s=v(e);if("binary_sensor"===s)e.attributes.device_class&&(o=t("state."+s+"."+e.attributes.device_class+"."+e.state)),o||(o=t("state."+s+".default."+e.state));else if(e.attributes.unit_of_measurement&&!["unknown","unavailable"].includes(e.state))o=e.state+" "+e.attributes.unit_of_measurement;else if("input_datetime"===s){var c;if(e.attributes.has_time)if(e.attributes.has_date)c=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),o=a(c,i);else{var u=new Date;c=new Date(u.getFullYear(),u.getMonth(),u.getDay(),e.attributes.hour,e.attributes.minute),o=r(c,i)}else c=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),o=n(c,i)}else o="zwave"===s?["initializing","dead"].includes(e.state)?t("state.zwave.query_stage."+e.state,"query_stage",e.attributes.query_stage):t("state.zwave.default."+e.state):t("state."+s+"."+e.state);return o||(o=t("state.default."+e.state)||t("component."+s+".state."+e.state)||e.state),o}var b="hass:bookmark",w="lovelace",y=["climate","cover","configurator","input_select","input_number","input_text","lock","media_player","scene","script","timer","vacuum","water_heater","weblink"],_=["alarm_control_panel","automation","camera","climate","configurator","cover","fan","group","history_graph","input_datetime","light","lock","media_player","script","sun","updater","vacuum","water_heater","weather"],k=["input_number","input_select","input_text","scene","weblink"],E=["camera","configurator","history_graph","scene"],S=["closed","locked","off"],x=new Set(["fan","input_boolean","light","switch","group","automation"]),T="°C",D="°F",L="group.default_view",M=function(t,e,n,a){a=a||{},n=null==n?{}:n;var r=new Event(e,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return r.detail=n,t.dispatchEvent(r),r},A=function(t){var e=function(t,e){return n("hui-error-card",{type:"error",error:t,config:e})},n=function(t,n){var a=window.document.createElement(t);try{a.setConfig(n)}catch(a){return console.error(t,a),e(a.message,n)}return a};if(!t||"object"!=typeof t||!t.type||!t.type.startsWith("custom:"))return e("No type configured",t);var a=t.type.substr("custom:".length);if(customElements.get(a))return n(a,t);var r=e("Custom element doesn't exist: "+t.type+".",t);r.style.display="None";var i=setTimeout(function(){r.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(i),M(r,"ll-rebuild",{},r)}),r},C={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function O(t,e){if(t in C)return C[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return e&&"off"===e?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===e?"hass:window-closed":"hass:window-open";case"lock":return e&&"unlocked"===e?"hass:lock-open":"hass:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"hass:cast-connected":"hass:cast";case"zwave":switch(e){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),b}}var j=function(t,e){M(t,"haptic",e)},z=function(t,e,n){void 0===n&&(n=!1),n?history.replaceState(null,"",e):history.pushState(null,"",e),M(window,"location-changed",{replace:n})},q=function(t,e,n){void 0===n&&(n=!0);var a,r=d(e),i="group"===r?"homeassistant":r;switch(r){case"lock":a=n?"unlock":"lock";break;case"cover":a=n?"open_cover":"close_cover";break;default:a=n?"turn_on":"turn_off"}return t.callService(i,a,{entity_id:e})},P=function(t,e){var n=S.includes(t.states[e].state);return q(t,e,n)},R=function(t,e,n,a,r){var i;switch(r&&n.dbltap_action?i=n.dbltap_action:a&&n.hold_action?i=n.hold_action:!a&&n.tap_action&&(i=n.tap_action),i||(i={action:"more-info"}),i.action){case"more-info":(n.entity||n.camera_image)&&(M(t,"hass-more-info",{entityId:i.entity?i.entity:n.entity?n.entity:n.camera_image}),i.haptic&&j(t,i.haptic));break;case"navigate":i.navigation_path&&(z(0,i.navigation_path),i.haptic&&j(t,i.haptic));break;case"url":i.url&&window.open(i.url),i.haptic&&j(t,i.haptic);break;case"toggle":n.entity&&(P(e,n.entity),i.haptic&&j(t,i.haptic));break;case"call-service":if(!i.service)return;var o=i.service.split(".",2);e.callService(o[0],o[1],i.service_data),i.haptic&&j(t,i.haptic)}};function H(t,e,n){if(e.has("config")||n)return!0;if(t.config.entity){var a=e.get("hass");return!a||a.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}const N=new WeakMap;String(Math.random()).slice(2);try{const t={get capture(){return!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");var V="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,Y=function(t){function e(){t.call(this),this.holdTime=500,this.ripple=document.createElement("paper-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.connectedCallback=function(){var t=this;Object.assign(this.style,{borderRadius:"50%",position:"absolute",width:V?"100px":"50px",height:V?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.style.color="#03a9f4",this.ripple.style.color="var(--primary-color)",["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(function(e){document.addEventListener(e,function(){clearTimeout(t.timer),t.stopAnimation(),t.timer=void 0},{passive:!0})})},e.prototype.bind=function(t){var e=this;if(!t.longPress){t.longPress=!0,t.addEventListener("contextmenu",function(t){var e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});var n=function(t){var n,a;e.cooldownStart||(e.held=!1,t.touches?(n=t.touches[0].pageX,a=t.touches[0].pageY):(n=t.pageX,a=t.pageY),e.timer=window.setTimeout(function(){e.startAnimation(n,a),e.held=!0},e.holdTime),e.cooldownStart=!0,window.setTimeout(function(){return e.cooldownStart=!1},100))},a=function(n){e.cooldownEnd||["touchend","touchcancel"].includes(n.type)&&void 0===e.timer||(clearTimeout(e.timer),e.stopAnimation(),e.timer=void 0,t.dispatchEvent(e.held?new Event("ha-hold"):new Event("ha-click")),e.cooldownEnd=!0,window.setTimeout(function(){return e.cooldownEnd=!1},100))};t.addEventListener("touchstart",n,{passive:!0}),t.addEventListener("touchend",a),t.addEventListener("touchcancel",a),t.addEventListener("mousedown",n,{passive:!0}),t.addEventListener("click",a)}},e.prototype.startAnimation=function(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.holdDown=!0,this.ripple.simulatedRipple()},e.prototype.stopAnimation=function(){this.ripple.holdDown=!1,this.style.display="none"},e}(HTMLElement);customElements.get("long-press")||customElements.define("long-press",Y);var B=function(t){var e=function(){var t=document.body;if(t.querySelector("long-press"))return t.querySelector("long-press");var e=document.createElement("long-press");return t.appendChild(e),e}();e&&e.bind(t)},F=(t=>(...t)=>{const e=function(){return function(t){B(t.committer.element)}}(...t);return N.set(e,!0),e})(),W=function(t,e,n){void 0===n&&(n=!0);var a={};e.forEach(function(e){if(S.includes(t.states[e].state)===n){var r=d(e),i=["cover","lock"].includes(r)?r:"homeassistant";i in a||(a[i]=[]),a[i].push(e)}}),Object.keys(a).forEach(function(e){var r;switch(e){case"lock":r=n?"unlock":"lock";break;case"cover":r=n?"open_cover":"close_cover";break;default:r=n?"turn_on":"turn_off"}t.callService(e,r,{entity_id:a[e]})})};export{e as durationToSeconds,n as formatDate,a as formatDateTime,r as formatTime,s as relativeTime,u as secondsToDuration,l as timerTimeRemaining,h as applyThemesOnElement,d as computeDomain,m as computeEntity,p as computeRTL,f as computeRTLDirection,g as computeStateDisplay,v as computeStateDomain,b as DEFAULT_DOMAIN_ICON,w as DEFAULT_PANEL,y as DOMAINS_WITH_CARD,_ as DOMAINS_WITH_MORE_INFO,k as DOMAINS_HIDE_MORE_INFO,E as DOMAINS_MORE_INFO_NO_HISTORY,S as STATES_OFF,x as DOMAINS_TOGGLE,T as UNIT_C,D as UNIT_F,L as DEFAULT_VIEW_ENTITY_ID,A as createThing,C as fixedIcons,O as domainIcon,M as fireEvent,R as handleClick,j as forwardHaptic,H as hasConfigOrEntityChanged,B as longPressBind,F as longPress,z as navigate,P as toggleEntity,W as turnOnOffEntities,q as turnOnOffEntity};
//# sourceMappingURL=index.m.js.map