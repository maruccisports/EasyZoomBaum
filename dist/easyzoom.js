/*!
 * @name        easyzoom
 * @author      Matt Hinchliffe
 * @modified    Friday, October 18th, 2024
 * @version     2.6.1
 */
!function(t,e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(t){e(t)}):"object"==typeof module&&module.exports?module.exports=t.EasyZoom=e(require("jquery")):t.EasyZoom=e(t.jQuery)}(this,function(c){"use strict";var p,l,d,u,i,o,s={loadingNotice:"Loading image",errorNotice:"The image could not be loaded",errorDuration:2500,linkAttribute:"href",preventClicks:!0,beforeShow:c.noop,beforeHide:c.noop,onShow:c.noop,onHide:c.noop,onMove:c.noop};function h(t,e){this.$target=c(t),this.opts=c.extend({},s,e,this.$target.data()),void 0===this.isOpen&&this._init()}return h.prototype._init=function(){this.$link=this.$target.find("a"),this.$image=this.$link.find("img"),this.$flyout=c('<div class="easyzoom-flyout" />'),this.$notice=c('<div class="easyzoom-notice" />'),this.$target.on({"mousemove.easyzoom touchmove.easyzoom":c.proxy(this._onMove,this),"mouseleave.easyzoom touchend.easyzoom":c.proxy(this._onLeave,this),"mouseenter.easyzoom touchstart.easyzoom":c.proxy(this._onEnter,this)}),this.opts.preventClicks&&this.$target.on("click.easyzoom",function(t){t.preventDefault()})},h.prototype.show=function(t,e){var i=this;if(!1!==this.opts.beforeShow.call(this)){if(!this.isReady)return this._loadImage(this.$link.attr(this.opts.linkAttribute),function(){!i.isMouseOver&&e||i.show(t)});var o=new Image,s=c("#grip-image"),s=(this.$gripImage&&this.$gripImage.remove(),s.attr("src")&&(o.src=s.attr("src"),o.style.zIndex=9999,o.style.position="absolute",this.$gripImage=c(o),this.$flyout.append(o)),this.$target.append(this.$flyout),this.$target.outerWidth()),o=this.$target.outerHeight(),h=this.$flyout.width(),a=this.$flyout.height(),n=this.$zoom.width(),r=this.$zoom.height();p=Math.ceil(n-h),l=Math.ceil(r-a),d=(p=p<0?0:p)/s,u=(l=l<0?0:l)/o,this.isOpen=!0,this.opts.onShow.call(this),t&&this._move(t)}},h.prototype._onEnter=function(t){var e=t.originalEvent.touches;this.isMouseOver=!0,e&&1!=e.length||(t.preventDefault(),this.show(t,!0))},h.prototype._onMove=function(t){this.isOpen&&(t.preventDefault(),this._move(t))},h.prototype._onLeave=function(){this.isMouseOver=!1,this.isOpen&&this.hide()},h.prototype._onLoad=function(t){t.currentTarget.width&&(this.isReady=!0,this.$notice.detach(),this.$flyout.html(this.$zoom),this.$target.removeClass("is-loading").addClass("is-ready"),t.data.call&&t.data())},h.prototype._onError=function(){var t=this;this.$notice.text(this.opts.errorNotice),this.$target.removeClass("is-loading").addClass("is-error"),this.detachNotice=setTimeout(function(){t.$notice.detach(),t.detachNotice=null},this.opts.errorDuration)},h.prototype._loadImage=function(t,e){var i=new Image;this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)),this.$zoom=c(i).on("error",c.proxy(this._onError,this)).on("load",e,c.proxy(this._onLoad,this)),i.style.position="absolute",i.src=t},h.prototype._move=function(t){o=0===t.type.indexOf("touch")?(e=t.touches||t.originalEvent.touches,i=e[0].pageX,e[0].pageY):(i=t.pageX||i,t.pageY||o);var e=this.$target.offset(),t=i-e.left,e=o-e.top,t=Math.ceil(t*d),e=Math.ceil(e*u);t<0||e<0||p<t||l<e?this.hide():(e=-1*e,t=-1*t,"transform"in document.body.style?(this.$zoom.css({transform:"translate("+t+"px, "+e+"px)"}),this.$gripImage&&this.$gripImage.css({transform:"translate("+t+"px, "+e+"px)"})):(this.$zoom.css({top:e,left:t}),this.$gripImage&&this.$gripImage.css({top:e,left:t})),this.opts.onMove.call(this,e,t))},h.prototype.hide=function(){this.isOpen&&!1!==this.opts.beforeHide.call(this)&&(this.$flyout.detach(),this.isOpen=!1,this.opts.onHide.call(this))},h.prototype.swap=function(t,e,i){this.hide(),this.isReady=!1,this.detachNotice&&clearTimeout(this.detachNotice),this.$notice.parent().length&&this.$notice.detach(),this.$target.removeClass("is-loading is-ready is-error"),this.$image.attr({src:t,srcset:c.isArray(i)?i.join():i}),this.$link.attr(this.opts.linkAttribute,e)},h.prototype.teardown=function(){this.hide(),this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"),this.detachNotice&&clearTimeout(this.detachNotice),delete this.$link,delete this.$zoom,delete this.$image,delete this.$notice,delete this.$flyout,delete this.isOpen,delete this.isReady},c.fn.easyZoom=function(e){return this.each(function(){var t=c.data(this,"easyZoom");t?void 0===t.isOpen&&t._init():c.data(this,"easyZoom",new h(this,e))})},h});