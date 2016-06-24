window.app = {
	$: function(selector){
		var results = document.querySelectorAll(selector);
		return results.length > 1 ? results : results[0]
	}
};
window.onload = function(){

	var elBell = document.querySelector('#home .bell');
	var elBtn = document.querySelector('#home .btn-treat-me');
	var elHome = document.getElementById('home');
	var elChoice = document.getElementById('choice-cup');
	/*
	*page1 游戏首页
	*/
	elBtn.addEventListener("touchstart", addBellAnimationFunction);
	elBell.addEventListener("animationend", bellEndAnimationFunction);
	elBell.addEventListener("webkitAnimationEnd", bellEndAnimationFunction);

	function addBellAnimationFunction(event) {
		event.preventDefault();
		elBell.style.animation = 'bell-shake .3s .2s 3';
		elBell.style.webkitAnimation = 'bell-shake .3s .2s 3';
	}

	function bellEndAnimationFunction() {
		event.preventDefault();
		elBell.style.webkitAnimation = '';
		elBell.style.animation = '';
		elHome.style.display = 'none';
		elChoice.style.display = 'block';
	}

		/*
	*page2 选取杯子
	*/
	var elCup1 = document.querySelector('#choice-cup .cup1');
	var elCup1Face = document.querySelector('#choice-cup .cup1-face');
	var elCup2 = document.querySelector('#choice-cup .cup2');
	var elCup2Face = document.querySelector('#choice-cup .cup2-face');
	var elCup3 = document.querySelector('#choice-cup .cup3');
	var elCup3Face = document.querySelector('#choice-cup .cup3-face');
	var elCup4 = document.querySelector('#choice-cup .cup4');
	var elCup4Face = document.querySelector('#choice-cup .cup4-face');
	var faces = document.querySelectorAll('#choice-cup [class*=face]');
	var cups = document.querySelectorAll('#choice-cup .cups :not(.title):not([class$=face])');
	var elBtnGetDrink = document.querySelector('#choice-cup .btn-get-drink');
	var elGetDrink = document.getElementById('get-drink');

	elCup1.addEventListener("touchstart", switchBetweenCup1AndFace);
	elCup1Face.addEventListener("touchstart", switchBetweenCup1AndFace);
	elCup2.addEventListener("touchstart", switchBetweenCup2AndFace);
	elCup2Face.addEventListener("touchstart", switchBetweenCup2AndFace);
	elCup3.addEventListener("touchstart", switchBetweenCup3AndFace);
	elCup3Face.addEventListener("touchstart", switchBetweenCup3AndFace);
	elCup4.addEventListener("touchstart", switchBetweenCup4AndFace);
	elCup4Face.addEventListener("touchstart", switchBetweenCup4AndFace);

	function switchBetweenCup1AndFace(event) {
		event.preventDefault();
		var className = this.className;
		if (className.indexOf('face') > -1) {
			hideAllFace();
			elCup1.style.display = 'block';
		} else {
			hideAllFace();
			this.style.display = 'none';
			elCup1Face.style.display = 'block';
		}
	}

	function switchBetweenCup2AndFace(event) {
		event.preventDefault();
		var className = this.className;
		if (className.indexOf('face') > -1) {
			hideAllFace();
			elCup2.style.display = 'block';
		} else {
			hideAllFace();
			this.style.display = 'none';
			elCup2Face.style.display = 'block';
		}
	}

	function switchBetweenCup3AndFace(event) {
		event.preventDefault();
		var className = this.className;
		if (className.indexOf('face') > -1) {
			hideAllFace();
			elCup3.style.display = 'block';
		} else {
			hideAllFace();
			this.style.display = 'none';
			elCup3Face.style.display = 'block';
		}
	}

	function switchBetweenCup4AndFace(event) {
		event.preventDefault();
		var className = this.className;
		if (className.indexOf('face') > -1) {
			hideAllFace();
			elCup4.style.display = 'block';
		} else {
			hideAllFace();
			this.style.display = 'none';
			elCup4Face.style.display = 'block';
		}
	}

	function hideAllFace(currentElement) {
		[].forEach.call(faces, function(el) {
			el.style.display = 'none';
		});
		[].forEach.call(cups, function(el) {
			el.style.display = 'block';
		})
	}

	elBtnGetDrink.addEventListener("touchstart", toNextPageFunction);
	function toNextPageFunction() {
		event.preventDefault();
		if (isACupBeSelected()) {
			elChoice.style.display = 'none';
			elGetDrink.style.display = 'block';
		} else {
			return;
		}
	}

	function isACupBeSelected() {
		var selected = false;
		[].forEach.call(faces, function(el) {
			if (el.style.display == "block") {
				selected = true;
			}
		})
		return selected;
	}

	/*
	 *page3 接满饮料
	 */
	var btnGetDrink = app.$('#get-drink .switch');
	var drinkItems = app.$('#get-drink .drink-machine :not(.switch):not(.title)');
	var elSaveCoupon = app.$('#save-coupon');
	var drinkItemsAnimations = {
		"flow": "show-water-flow 2s forwards",
		"drop": "water-drop 3.5s .5s infinite",
		"water": "show-water 5s 1s forwards",
		"sound": "water-sound 3s .5s infinite"};
	btnGetDrink.addEventListener('touchstart', addGetDrinkAnimationFunction)
	app.$('#get-drink .water-water').addEventListener("animationend", getDrinkEndAnimationFunction);
	app.$('#get-drink .water-water').addEventListener("webkitAnimationEnd", getDrinkEndAnimationFunction);

	function addGetDrinkAnimationFunction() {
		[].forEach.call(drinkItems, function(el){
			var className = el.className.slice(6);
			el.style.animation = drinkItemsAnimations[className];
			el.style.webkitAnimation = drinkItemsAnimations[className];
		})
	}

	function getDrinkEndAnimationFunction() {
		elSaveCoupon.style.display = 'block';
	}

	/*
	 *page4 将续杯券保存到卡包
	 */

	var btnSaveCoupon = app.$('#save-coupon .btn-save');
	var elGetCouponSuccess = app.$('#get-coupon-success');

	btnSaveCoupon.addEventListener('touchstart', saveCouponFunction)

	function saveCouponFunction() {
		elGetDrink.style.display = 'none';
		elSaveCoupon.style.display = 'none';
		elGetCouponSuccess.style.display = 'block';
	}

	/*
	 *page5 成功领取券提示页面
	 */
	var btnShowOff = app.$('#get-coupon-success .btn-show-off');
	var elShare = app.$('#share');
    var elShowOffBell = app.$('#get-coupon-success .bell');

	btnShowOff.addEventListener('touchstart', showOffFunction)
	elShowOffBell.addEventListener("animationend", showOffBellEndAnimationFunction);
	elShowOffBell.addEventListener("webkitAnimationEnd", showOffBellEndAnimationFunction);

	function showOffFunction() {
		event.preventDefault();
		elShowOffBell.style.animation = 'bell-shake .3s .2s 3';
		elShowOffBell.style.webkitAnimation = 'bell-shake .3s .2s 3';
	}

	function showOffBellEndAnimationFunction() {
		event.preventDefault();
		elShowOffBell.style.webkitAnimation = '';
		elShowOffBell.style.animation = '';
		elShare.style.display = 'block';
	}

}

