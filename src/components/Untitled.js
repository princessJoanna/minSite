me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
    var distance = current - start,
        speed = Math.abs(distance) / time,
        destination,
        duration;

    deceleration = deceleration === undefined ? 0.0006 : deceleration;

    destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
    duration = speed / deceleration;

    if ( destination < lowerMargin ) {
        destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
    } else if ( destination > 0 ) {
        destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
    }

    return {
        destination: Math.round(destination),
        duration: duration
    };
};


touchDir() {
    //http://www.jb51.net/article/86360.htm 惯性滚动bug解决方案  最好还是引入iscroll
    var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI;
    }

    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;

      //如果滑动距离太短
      if (Math.abs(angx) < 5 && Math.abs(angy) < 5) {
        return result;
      }

      var angle = getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
        result = 1;
      } else if (angle > 45 && angle < 135) {
        result = 2;
      } else if (
        (angle >= 135 && angle <= 180) ||
        (angle >= -180 && angle < -135)
      ) {
        result = 3;
      } else if (angle >= -45 && angle <= 45) {
        result = 4;
      }

      return result;
    }
    //手指接触屏幕
    document.addEventListener(
      "touchstart",
      function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
      },
      false
    );
    //手指离开屏幕
    document.addEventListener(
      "touchend",
      function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
          case 1:
            topNav.style.display = "none";
            break;
          case 2:
            topNav.style.display = "block";
            break;
          default:
        }
      },
      false
    );
  },