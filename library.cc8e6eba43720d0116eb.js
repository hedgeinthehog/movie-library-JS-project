(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"/PAr":function(e,t,a){"use strict";var n=a("1j17"),r=n.a.toggle,i=n.a.body,o="light-theme",s="dark-theme";r.addEventListener("change",(function(){r.checked?(i.setAttribute("class",o),localStorage.setItem("theme",o)):(i.setAttribute("class",s),localStorage.setItem("theme",s))})),localStorage.theme===s?(r.checked=!1,i.setAttribute("class",s)):(r.checked=!0,i.setAttribute("class",o))},"0HMw":function(e,t,a){},"1j17":function(e,t,a){"use strict";t.a={body:document.querySelector("body"),toggle:document.querySelector(".theme-switch-toggle"),prevRef:document.querySelector(".prev"),nextRef:document.querySelector(".next"),errorInpRef:document.querySelector("#error"),searchInpRef:document.querySelector("#search-input"),loaderRef:document.querySelector(".loader"),moviesListRef:document.querySelector(".movies-list"),pageNumsRef:document.querySelector(".page-numbers"),watchedBtnRef:document.querySelector("#watched"),queueBtnRef:document.querySelector("#queue")}},"5t+V":function(e,t,a){e.exports=a.p+"images/team/team-igor.png"},"79l/":function(e,t,a){e.exports=a.p+"images/team/team-kiril.png"},Hvb0:function(e,t,a){e.exports=a.p+"images/error-card/error.jpg"},Ic8B:function(e,t,a){"use strict";a("WB5j"),a("3dw1"),a("FdtR"),a("JBxO"),a("WoWj"),a("/YXa"),a("U00V"),a("hi3g"),a("Xlt+"),a("IlJM"),a("D/wG"),a("8cZI"),a("fp7Y"),a("qoNQ");var n="https://api.themoviedb.org",r="e0864e234ad59915a65f6e683712555d",i="https://themoviedb.org/t/p/w220_and_h330_face",o=a("1j17"),s=o.a.moviesListRef,l=o.a.loaderRef;var c=function(){""!==s.innerHTML?l.classList.add("visually-hidden"):l.classList.remove("visually-hidden")},u=n,d=r,g={fetchPopularFilms:function(e){return void 0===e&&(e=""),c(),fetch(u+"/3/trending/movie/week?api_key="+d+"&page="+e).then((function(e){if(e.ok)return e.json()})).catch((function(){return console.error("no popular")}))},fetchFilmByQuery:function(e,t){return void 0===e&&(e=""),void 0===t&&(t=""),c(),fetch(u+"/3/search/movie?api_key="+d+"&query="+t+"&page="+e).then((function(e){if(e.ok)return e.json()})).catch((function(){return console.error("no search movie")}))},fetchGanres:function(){return c(),fetch(u+"/3/genre/movie/list?api_key="+d).then((function(e){if(e.ok)return e.json()})).catch((function(){return console.error("no ganres")}))},fetchFilmById:function(e){return void 0===e&&(e=""),c(),fetch(u+"/3/movie/"+e+"?api_key="+d).then((function(e){if(e.ok)return e.json()})).catch((function(){return console.error("current film is missing")}))}},h=a("oJiZ"),p=a.n(h),m=a("SPbx"),v=a.n(m),f=a("s9S4"),A=a.n(f),y=(a("Hvb0"),i),b=o.a.errorInpRef,C=o.a.loaderRef;function w(e){e&&(b.classList.add("visually-hidden"),C.classList.add("visually-hidden")),e||(b.classList.remove("visually-hidden"),C.classList.add("visually-hidden"))}var P=function(e){e.length?w(!0):w(!1)};var k=function(e){switch(e){case"watched":var t=localStorage.getItem("watched");return t=null===t?[]:JSON.parse(t);case"queue":var a=localStorage.getItem("queue");return a=null===a?[]:JSON.parse(a);default:console.log("Write correct type")}};function I(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function M(e,t){return function(e,t){if(t.get)return t.get.call(e);return t.value}(e,L(e,t,"get"))}function B(e,t,a){return function(e,t,a){if(t.set)t.set.call(e,a);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=a}}(e,L(e,t,"set"),a),a}function L(e,t,a){if(!t.has(e))throw new TypeError("attempted to "+a+" private field on non-instance");return t.get(e)}var H=new WeakMap,Q=function(){function e(e){H.set(this,{writable:!0,value:[]}),I(this,"searchKey",""),I(this,"byQueryFlag",!1),I(this,"forLibraryFlag",!1),I(this,"movieType",""),this.element=document.querySelector(e),B(this,H,[]),this.searchKey="",this.byQueryFlag=!1,this.movieType="",this.forLibraryFlag=!1,this.currentPage=1,this.totalPages=0,this.rowsPerLibraryPage=0,this.pageNumsRef=document.querySelector(".page-numbers"),this.totalGenres=[],this.goToPrevPage=this.goToPrevPage.bind(this),this.goToNextPage=this.goToNextPage.bind(this),this.goToPage=this.goToPage.bind(this),this.init=this.init.bind(this),this.pageReset=this.pageReset.bind(this),this.renderMovieCard=this.renderMovieCard.bind(this),this.findMovieForLocalStorage=this.findMovieForLocalStorage.bind(this),this.paginateLibrary=this.paginateLibrary.bind(this)}var t=e.prototype;return t.init=function(){this.getAllGenres(),this.forLibraryFlag?this.paginateLibrary():this.loadPage()},t.loadPage=function(){var e=this;return this.fetchMovies().then((function(t){e.prepareMovies(),e.render()}))},t.paginateLibrary=function(){var e=this;return window.screen.width>=1024?this.rowsPerLibraryPage=9:window.screen.width>=768?this.rowsPerLibraryPage=8:this.rowsPerLibraryPage=4,this.fetchMovies().then((function(t){e.prepareMovies(),e.renderlibraryPage()}))},t.renderlibraryPage=function(){var e=this.rowsPerLibraryPage;this.totalPages<this.currentPage&&(this.currentPage=this.totalPages);var t=e*(this.currentPage-1),a=t+e,n=M(this,H).slice(t,a);this.element.innerHTML=p()(n),this.setPageNumbers()},t.fetchMovies=function(){return this.forLibraryFlag?this.fetchMoviesFromLibrary():this.byQueryFlag||this.forLibraryFlag?this.byQueryFlag&&!this.forLibraryFlag?this.fetchMoviesByQuery():void 0:this.fetchMoviesPopular()},t.fetchMoviesByQuery=function(){var e=this;return g.fetchFilmByQuery(this.currentPage,this.searchKey).then((function(t){var a=t.results,n=t.total_pages;return P(a),e.totalPages=n,B(e,H,a),a}))},t.fetchMoviesPopular=function(){var e=this;return g.fetchPopularFilms(this.currentPage).then((function(t){var a=t.results,n=t.total_pages;return P(a),e.totalPages=n,B(e,H,a),a}))},t.fetchMoviesFromLibrary=function(){var e=this,t=k(this.movieType),a=[];return t.forEach((function(e){return a.push(g.fetchFilmById(e))})),Promise.all(a).then((function(t){return e.totalPages=Math.ceil(t.length/e.rowsPerLibraryPage),B(e,H,t),t}))},t.render=function(){this.element.innerHTML=p()(M(this,H)),this.setPageNumbers()},t.clear=function(){this.element.innerHTML=""},t.pageReset=function(){this.currentPage=1,B(this,H,[]),this.clear()},t.prepareMovies=function(){var e=this;M(this,H).forEach((function(t){t&&(e.getMovieGenres(t),e.getReleaseYear(t),e.getPosterImg(t),e.validateAvgVote(t),e.validateMovieDescription(t))}))},t.getAllGenres=function(){var e=this;g.fetchGanres().then((function(t){var a=t.genres;e.totalGenres=[].concat(a)}))},t.adaptMovieGenres=function(e){if(e.hasOwnProperty("genres")){for(var t=0;t<e.genres.length;t++)e.genres[t]=e.genres[t].id;return e.genres}if(e.hasOwnProperty("genre_ids"))return e.genre_ids},t.getMovieGenres=function(e){if(e.hasOwnProperty("genre_ids")&&0===e.genre_ids.length||e.hasOwnProperty("genres")&&0===e.genres.length)e.genres="Genres unknown";else{if(e.genres=this.adaptMovieGenres(e),e.genres.length>3)return e.genres=e.genres.slice(0,3),this.convertGenreIds(e),e.genres.splice(2,1,"Other"),void(e.genres=this.convertMovieGenresToString(e.genres));e.genres=e.genres.slice(0,3),this.convertGenreIds(e),e.genres=this.convertMovieGenresToString(e.genres)}},t.convertGenreIds=function(e){for(var t=this,a=function(a){var n=t.totalGenres.find((function(t){return t.id===e.genres[a]}));e.genres[a]=n.name},n=0;n<e.genres.length;n++)a(n)},t.convertMovieGenresToString=function(e){return e=e.join(", ")},t.getReleaseYear=function(e){if(e.release_date){var t=new Date(e.release_date).getFullYear();e.release_date=t}else e.release_date="unknown"},t.validateAvgVote=function(e){e.vote_average=e.vote_average||"-"},t.validateMovieDescription=function(e){e.overview=e.overview||"No description available"},t.getPosterImg=function(e){var t,a;e.poster_path=(t=e.backdrop_path,(a=e.poster_path)?""+y+a:!a&&t?""+y+t:a||t?void 0:"./images/error-card/error.jpg")},t.goToPrevPage=function(){var e=this;1!==this.currentPage&&(window.scrollTo({top:0,behavior:"smooth"}),this.currentPage-=1,this.forLibraryFlag?this.renderlibraryPage():this.fetchMovies().then((function(t){B(e,H,t),e.prepareMovies(),e.render()})))},t.goToNextPage=function(){var e=this;this.currentPage!==this.totalPages&&(window.scrollTo({top:0,behavior:"smooth"}),this.currentPage+=1,this.forLibraryFlag?this.renderlibraryPage():this.fetchMovies().then((function(t){B(e,H,t),e.prepareMovies(),e.render()})))},t.goToPage=function(e){var t=this,a=e.target;if(a.matches("button")){var n=Number(a.innerHTML);if(window.scrollTo({top:0,behavior:"smooth"}),this.currentPage===n)return;if(this.currentPage=n,this.forLibraryFlag)return void this.renderlibraryPage();this.fetchMovies().then((function(e){B(t,H,e),t.prepareMovies(),t.render()}))}},t.setPageNumbers=function(){this.pageNumsRef.innerHTML="";var e=this.totalPages,t=this.currentPage,a=this.totalPages;if(this.totalPages<=7)for(var n=1;n<this.totalPages+1;n++)this.pageNumsRef.append(this.createPageButton(n));else{if(this.pageNumsRef.innerHTML=v()({firstPage:1,lastPage:e}),1===t&&this.pageNumsRef.querySelector(".first-page").classList.add("active-page"),t===a&&this.pageNumsRef.querySelector(".last-page").classList.add("active-page"),this.middlePageNumsRef=document.querySelector(".middle-page-numbers"),window.screen.width<768){if(t<=3){for(var r=1;r<6;r++)this.middlePageNumsRef.append(this.createPageButton(r));return}if(t>a-3){for(var i=a-4;i<a;i++)this.middlePageNumsRef.append(this.createPageButton(i));return}}if(t<=4){this.pageNumsRef.querySelector(".pre-separator").classList.add("hidden");for(var o=2;o<7;o++)this.middlePageNumsRef.append(this.createPageButton(o))}if(t>a-4){this.pageNumsRef.querySelector(".post-separator").classList.add("hidden");for(var s=a-5;s<a;s++)this.middlePageNumsRef.append(this.createPageButton(s))}if(this.currentPage>4&&this.currentPage<=this.totalPages-4)for(var l=this.currentPage-2;l<this.currentPage+3;l++)this.middlePageNumsRef.append(this.createPageButton(l))}},t.createPageButton=function(e){var t=document.createElement("button");return t.classList.add("pagination-controls","pagination-elem"),this.currentPage===e&&t.classList.add("active-page"),t.innerText=e,t},t.renderMovieCard=function(e){var t=M(this,H).find((function(t){return t.title===e}));return A()(t)},t.findMovieForLocalStorage=function(e){return M(this,H).find((function(t){return t.title===e}))},t.libraryWatchedHelpersData=function(){this.currentPage=1,this.movieType="watched",this.forLibraryFlag=!0},t.libraryQueueHelpersData=function(){this.currentPage=1,this.movieType="queue",this.forLibraryFlag=!0},e}();t.a=Q},K1cC:function(e,t,a){e.exports=a.p+"images/team/team-max.jpg"},PzAx:function(e,t,a){"use strict";var n=a("dcBu"),r=a("zu/N"),i=a.n(r),o=a("79l/"),s=a.n(o),l=a("d7Ji"),c=a.n(l),u=a("K1cC"),d=a.n(u),g=a("5t+V"),h=a.n(g),p=a("pnRY"),m=a.n(p),v=a("dQDj"),f=a.n(v),A='<div class="team-wrapper">\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/hedgeinthehog" target="_blank" ><img src="'+i.a+'" alt="Eleonora" class="team-image"></a>\n    <p class="team-name">Eleonora</p>\n    <p class="team-role">Team Lead</p>\n</div>\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/Wh1ter" target="_blank""><img src="'+s.a+'" alt="Kiril" class="team-image"></a>\n    <p class="team-name">Kiril</p>\n    <p class="team-role">Scrum Master</p>\n</div>\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/RomanKeretsman" target="_blank" "><img src="'+c.a+'" alt="Roman" class="team-image"></a>\n    <p class="team-name">Roman</p>\n    <p class="team-role">Developer</p>\n</div>\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/MaksymKasianchuk" target="_blank" "><img src="'+d.a+'" alt="Max" class="team-image"></a>\n    <p class="team-name">Max</p>\n    <p class="team-role">Developer</p>\n</div>\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/Igor-Tomilo" target="_blank" "><img src="'+h.a+'" alt="Ihor" class="team-image"></a>\n    <p class="team-name">Ihor</p>\n    <p class="team-role">Developer</p>\n</div>\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/Natalia256" target="_blank" "><img src="'+m.a+'" alt="Nataliya" class="team-image"></a>\n    <p class="team-name">Nataliya</p>\n    <p class="team-role">Developer</p>\n</div>\n<div class="team-card">\n    <a class=\'team-card-image\' href="https://github.com/supert111" target="_blank" "><img src="'+f.a+'" alt="Mykola" class="team-image"></a>\n    <p class="team-name">Mykola</p>\n    <p class="team-role">Developer</p>\n</div>\n</div>';document.querySelector(".js-team-modal").addEventListener("click",(function(){y.show(),window.addEventListener("keydown",(function e(t){"Escape"===t.code&&(y.close(),window.removeEventListener("keydown",e))}))}));var y=n.create(A)},SPbx:function(e,t,a){var n=a("mp5j");e.exports=(n.default||n).template({compiler:[8,">= 4.3.0"],main:function(e,t,a,n,r){var i,o=null!=t?t:e.nullContext||{},s=e.hooks.helperMissing,l=e.escapeExpression,c=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<button type="button" class="pagination-elem pagination-controls first-page">'+l("function"==typeof(i=null!=(i=c(a,"firstPage")||(null!=t?c(t,"firstPage"):t))?i:s)?i.call(o,{name:"firstPage",hash:{},data:r,loc:{start:{line:1,column:77},end:{line:1,column:90}}}):i)+'</button>\r\n<p class="pagination-elem pre-separator">...</p>\r\n<div class="middle-page-numbers"></div>\r\n<p class="pagination-elem post-separator">...</p>\r\n<button type="button" class="pagination-elem pagination-controls last-page">'+l("function"==typeof(i=null!=(i=c(a,"lastPage")||(null!=t?c(t,"lastPage"):t))?i:s)?i.call(o,{name:"lastPage",hash:{},data:r,loc:{start:{line:5,column:76},end:{line:5,column:88}}}):i)+"</button>\r\n"},useData:!0})},d7Ji:function(e,t,a){e.exports=a.p+"images/team/team-roman.png"},dQDj:function(e,t,a){e.exports=a.p+"images/team/team-mykola.png"},k8rw:function(e,t,a){"use strict";var n=a("dcBu");a("PzF0"),a("IvQZ"),a("4NM0"),a("lYjL");function r(){var e=localStorage.getItem("watched"),t=localStorage.getItem("queue");return[e=null===e?[]:JSON.parse(e),t=null===t?[]:JSON.parse(t)]}function i(e,t){var a=r(),n=a[0],i=a[1];switch(t){case"watched":if(n.includes(e.id)){var o=n.filter((function(t){return t!==e.id}));localStorage.setItem("watched",JSON.stringify(o))}else{n.push(e.id);var s=i.filter((function(t){return t!==e.id}));localStorage.setItem("watched",JSON.stringify(n)),localStorage.setItem("queue",JSON.stringify(s))}break;case"queue":if(i.includes(e.id)){var l=i.filter((function(t){return t!==e.id}));localStorage.setItem("queue",JSON.stringify(l))}else{i.push(e.id);var c=n.filter((function(t){return t!==e.id}));localStorage.setItem("watched",JSON.stringify(c)),localStorage.setItem("queue",JSON.stringify(i))}break;default:console.log("Film type is not correct!")}}function o(e){var t=r(),a=t[0];t[1];return!!a.includes(e.id)}function s(e){var t=r();t[0];return!!t[1].includes(e.id)}t.a=function(e,t,a){void 0===a&&(a=!1),e.preventDefault(),document.body.style.overflow="hidden",document.body.style.top="-"+window.scrollY+"px";var r=e.target.alt;if(r){var l=t.renderMovieCard(r),c=n.create(l);c.show();var u=document.querySelector(".modal-close-btn"),d=t.findMovieForLocalStorage(r),g=document.querySelector("#add-to-queue-btn"),h=document.querySelector("#add-to-watched-btn"),p=document.querySelector(".basicLightbox");g.addEventListener("click",m),h.addEventListener("click",v),s(d)&&(g.textContent="remove from queue",h.textContent="add to watched"),o(d)&&(h.textContent="remove from watched",g.textContent="add to queue"),window.addEventListener("keydown",f),p.addEventListener("click",f),u.addEventListener("click",(function(){return c.close()}))}function m(){return s(d)||o(d)?s(d)&&!o(d)?(g.textContent="add to queue",h.textContent="add to watched",i(d,"queue"),void(a&&t.paginateLibrary())):!s(d)&&o(d)?(g.textContent="remove from queue",h.textContent="add to watched",i(d,"queue"),void(a&&t.paginateLibrary())):void 0:(g.textContent="remove from queue",h.textContent="add to watched",i(d,"queue"),void(a&&t.paginateLibrary()))}function v(){return s(d)||o(d)?o(d)&&!s(d)?(h.textContent="add to watched",g.textContent="add to queue",i(d,"watched"),void(a&&t.paginateLibrary())):!o(d)&&s(d)?(h.textContent="remove from watched",g.textContent="add to queue",i(d,"watched"),void(a&&t.paginateLibrary())):void 0:(h.textContent="remove from watched",g.textContent="add to queue",i(d,"watched"),void(a&&t.paginateLibrary()))}function f(e){if("Escape"===e.code||e.target===e.currentTarget||e.target.classList.contains("modal-close-btn")||e.target.classList.contains("modal-close-btn-line")){c.close();var t=document.body.style.top;window.scrollTo(0,-1*parseInt(t||"0")),document.body.style.overflow="auto",g.removeEventListener("keydown",m),h.removeEventListener("keydown",v),window.removeEventListener("keydown",f),p.removeEventListener("click",f)}}}},oJiZ:function(e,t,a){var n=a("mp5j");e.exports=(n.default||n).template({1:function(e,t,a,n,r){var i,o=null!=t?t:e.nullContext||{},s=e.hooks.helperMissing,l="function",c=e.escapeExpression,u=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'    <li class="list list-item" tabindex="0">\r\n        <img\r\n            src="'+c(typeof(i=null!=(i=u(a,"poster_path")||(null!=t?u(t,"poster_path"):t))?i:s)===l?i.call(o,{name:"poster_path",hash:{},data:r,loc:{start:{line:4,column:17},end:{line:4,column:32}}}):i)+'"\r\n            alt="'+c(typeof(i=null!=(i=u(a,"title")||(null!=t?u(t,"title"):t))?i:s)===l?i.call(o,{name:"title",hash:{},data:r,loc:{start:{line:5,column:17},end:{line:5,column:26}}}):i)+'"\r\n            class="poster-img"\r\n        />        \r\n        <div class="movie-card-short-info">\r\n            <h2 class="movie-card-title">'+c(typeof(i=null!=(i=u(a,"title")||(null!=t?u(t,"title"):t))?i:s)===l?i.call(o,{name:"title",hash:{},data:r,loc:{start:{line:9,column:41},end:{line:9,column:50}}}):i)+'</h2>\r\n            <p class="movie-card-text">'+c(typeof(i=null!=(i=u(a,"genres")||(null!=t?u(t,"genres"):t))?i:s)===l?i.call(o,{name:"genres",hash:{},data:r,loc:{start:{line:10,column:39},end:{line:10,column:49}}}):i)+" | "+c(typeof(i=null!=(i=u(a,"release_date")||(null!=t?u(t,"release_date"):t))?i:s)===l?i.call(o,{name:"release_date",hash:{},data:r,loc:{start:{line:10,column:52},end:{line:10,column:68}}}):i)+' <span class="avg-rating">'+c(typeof(i=null!=(i=u(a,"vote_average")||(null!=t?u(t,"vote_average"):t))?i:s)===l?i.call(o,{name:"vote_average",hash:{},data:r,loc:{start:{line:10,column:94},end:{line:10,column:110}}}):i)+"</span></p>\r\n        </div>\r\n    </li>\r\n"},compiler:[8,">= 4.3.0"],main:function(e,t,a,n,r){var i;return null!=(i=(e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]})(a,"each").call(null!=t?t:e.nullContext||{},t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r,loc:{start:{line:1,column:0},end:{line:13,column:9}}}))?i:""},useData:!0})},pnRY:function(e,t){e.exports="data:image/png;base64,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"},"s+qo":function(e,t,a){"use strict";a.r(t);a("0HMw"),a("PzAx"),a("/PAr");var n=a("Ic8B"),r=a("1j17"),i=a("k8rw"),o=r.a.watchedBtnRef,s=r.a.queueBtnRef,l=r.a.loaderRef,c=r.a.prevRef,u=r.a.nextRef,d=r.a.pageNumsRef,g=r.a.moviesListRef,h=new n.a(".movies-list");h.libraryWatchedHelpersData(),h.init(),l.classList.add("visually-hidden"),c.addEventListener("click",h.goToPrevPage),u.addEventListener("click",h.goToNextPage),d.addEventListener("click",h.goToPage),o.addEventListener("click",(function(){h.libraryWatchedHelpersData(),h.paginateLibrary(),o.classList.add("is-active"),s.classList.remove("is-active"),l.classList.add("visually-hidden")})),s.addEventListener("click",(function(){h.libraryQueueHelpersData(),h.paginateLibrary(),s.classList.add("is-active"),o.classList.remove("is-active"),l.classList.add("visually-hidden")})),g.addEventListener("click",(function(e){Object(i.a)(e,h,!0)}));var p=a("Ji62");Object(p.addBackToTop)()},s9S4:function(e,t,a){var n=a("mp5j");e.exports=(n.default||n).template({compiler:[8,">= 4.3.0"],main:function(e,t,a,n,r){var i,o=null!=t?t:e.nullContext||{},s=e.hooks.helperMissing,l="function",c=e.escapeExpression,u=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<div class="modal">\r\n  <button type="button" class="modal-close-btn">\r\n    <span class="line first modal-close-btn-line"></span>\r\n    <span class="line second modal-close-btn-line"></span>\r\n  </button>\r\n  <div>\r\n    <img class="modal-img" src="'+c(typeof(i=null!=(i=u(a,"poster_path")||(null!=t?u(t,"poster_path"):t))?i:s)===l?i.call(o,{name:"poster_path",hash:{},data:r,loc:{start:{line:7,column:32},end:{line:7,column:47}}}):i)+'" alt="'+c(typeof(i=null!=(i=u(a,"title")||(null!=t?u(t,"title"):t))?i:s)===l?i.call(o,{name:"title",hash:{},data:r,loc:{start:{line:7,column:54},end:{line:7,column:63}}}):i)+'" class="card__image"/>\r\n  </div>\r\n  <div class="modal-movie-details">\r\n    <h2 class="modal-movie-title">'+c(typeof(i=null!=(i=u(a,"title")||(null!=t?u(t,"title"):t))?i:s)===l?i.call(o,{name:"title",hash:{},data:r,loc:{start:{line:10,column:34},end:{line:10,column:43}}}):i)+'</h2>\r\n    <div class="movie-details-table">\r\n      <div class="movie-details-item">\r\n        <p class="movie-details-title">Vote / Votes</p>\r\n        <p class="details-item-info"><span class="modal-vote-avg">'+c(typeof(i=null!=(i=u(a,"vote_average")||(null!=t?u(t,"vote_average"):t))?i:s)===l?i.call(o,{name:"vote_average",hash:{},data:r,loc:{start:{line:14,column:66},end:{line:14,column:82}}}):i)+'</span> / <span\r\n            class="modal-vote-count">'+c(typeof(i=null!=(i=u(a,"vote_count")||(null!=t?u(t,"vote_count"):t))?i:s)===l?i.call(o,{name:"vote_count",hash:{},data:r,loc:{start:{line:15,column:37},end:{line:15,column:51}}}):i)+'</span></p>\r\n      </div>\r\n      <div class="movie-details-item">\r\n        <p class="movie-details-title">Popularity</p>\r\n        <p class="details-item-info">'+c(typeof(i=null!=(i=u(a,"popularity")||(null!=t?u(t,"popularity"):t))?i:s)===l?i.call(o,{name:"popularity",hash:{},data:r,loc:{start:{line:19,column:37},end:{line:19,column:51}}}):i)+'</p>\r\n      </div>\r\n      <div class="movie-details-item">\r\n        <p class="movie-details-title">Original Title</p>\r\n        <p class="details-item-info details-item-title">'+c(typeof(i=null!=(i=u(a,"original_title")||(null!=t?u(t,"original_title"):t))?i:s)===l?i.call(o,{name:"original_title",hash:{},data:r,loc:{start:{line:23,column:56},end:{line:23,column:74}}}):i)+'</p>\r\n      </div>\r\n      <div class="movie-details-item">\r\n        <p class="movie-details-title">Genre</p>\r\n        <p class="details-item-info">'+c(typeof(i=null!=(i=u(a,"genres")||(null!=t?u(t,"genres"):t))?i:s)===l?i.call(o,{name:"genres",hash:{},data:r,loc:{start:{line:27,column:37},end:{line:27,column:47}}}):i)+'</p>\r\n      </div>\r\n    </div>\r\n    <p class="about-movie-title">About</p>\r\n    <p class="about-movie-info">'+c(typeof(i=null!=(i=u(a,"overview")||(null!=t?u(t,"overview"):t))?i:s)===l?i.call(o,{name:"overview",hash:{},data:r,loc:{start:{line:31,column:32},end:{line:31,column:44}}}):i)+'</p>\r\n    <div class="modal-buttons">\r\n      <button class="add-to-watched-btn modal-btn light-theme-btn" id="add-to-watched-btn" type="button">add to\r\n        watched</button>\r\n      <button class="add-to-queue-btn modal-btn light-theme-btn" aria-expanded="true" id="add-to-queue-btn"\r\n        type="button">add to queue</button>\r\n    </div>\r\n  </div>\r\n</div>'},useData:!0})},"zu/N":function(e,t,a){e.exports=a.p+"images/team/team-eleonora.png"}},[["s+qo",0,1]]]);
//# sourceMappingURL=library.cc8e6eba43720d0116eb.js.map