function getElement ($object, $selector) {
  return Array.prototype.slice.call($object.querySelectorAll($selector), 0);
}

function removeClass(obj, cls) {
  var classes = obj.className.split(' ');
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) {
      classes.splice(i, 1);
      i--;
    }
  }
  obj.className = classes.join(' ');
}

//IE checking

function hasBug () {
    var outer = document.createElement('div');
    var inner = document.createElement('div');
    outer.setAttribute('style', 'display:-ms-flexbox; display:flex; min-height:100vh;');
    outer.appendChild(inner);
    (document.body || document.documentElement).appendChild(outer);
    var bug = !inner.offsetHeight;
    outer.parentNode.removeChild(outer);
    return bug;
}


if(hasBug()) {
   fixtiles();
  window.addEventListener('resize', function () {
   fixtiles();
  });
}

//Prepary: remove children .tile elements and set heights - it's needs because IE it's not normally set offsetHeight for .tile elements

function removeTiles($currentTiles) {
	let $height =0;
	let $padding = parseInt(window.getComputedStyle($currentTiles[0].parentNode.parentNode.querySelector('*'),null).getPropertyValue('padding-top'))*2;
	$currentTiles.forEach(function($child){
		removeClass($child,'tile');
		$child.style.minHeight=$child.offsetHeight+'px';
		let $offset = parseInt(window.getComputedStyle($child,null).getPropertyValue('margin-bottom'));
		$height = $height + $child.offsetHeight + $offset;
   });
   return $height+$padding;
}




//Use strict heights for columns and child tiles

function fixcolumns($vertical) {
	let $verticalHeight =[];
		$verticalHeight.length=0;
	$vertical.forEach(function ($verticalChild) {
		$verticalHeight[$verticalHeight.length]=removeTiles(getElement($verticalChild,'.tile'));
	});
	$vertical.forEach(function ($verticalChild) {
		var $maxHeight = Math.max.apply(null, $verticalHeight);
		$verticalChild.style.height = $maxHeight + 'px';
		let $alone = Array.prototype.slice.call($verticalChild.querySelectorAll('.is-child'));
		var $allHeight=0;
		$alone.forEach(function($oneChild) {
			$allHeight=$allHeight + +$oneChild.offsetHeight;
			});
		var $addons = ($verticalChild.offsetHeight - $allHeight)/$alone.length;
		$alone.forEach(function($oneChild) {
			$oneChild.style.height = $oneChild.offsetHeight+ +$addons +'px';
		});
	});
}

//Main function

function fixtiles() {
	let $tiles = getElement(document,'.is-ancestor');
	$tiles.forEach(function ($ancestor) {
		var $vertical=getElement($ancestor,'.is-vertical');
		if ($vertical.length > 0) {
			fixcolumns($vertical);
		} else {
			fixcolumns(getElement($ancestor,'.is-parent'));
		}
	});
}


