import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

/**
 * @type {React.RefObject<HTMLCanvasElement>}
 */
const initialCanvasRef = null

/**
 * @type {CanvasRenderingContext2D}
 */
const initialContext = null

const KeyPressDetectionFloor = () => {
  const canvasRef = useRef(initialCanvasRef)
  const [context, setContext] = useState(initialContext)

  const devicePixelRatio = window.devicePixelRatio || 1

  useEffect(() => {
    if (canvasRef.current) {
      /**
       * @type {CanvasRenderingContext2D}
       */
      const ctx = canvasRef.current.getContext('2d')
      ctx.scale(devicePixelRatio, devicePixelRatio);
      setContext(ctx)
    }
    // The empty dependency array ensures this effect runs only once after the component mounts.
  }, [devicePixelRatio])

  const draw = (points) => () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    context.strokeStyle = "#eee";
    context.lineWidth = "10";

    for (const touch of points) {
      const rotationAngle = touch.rotationAngle || 0;
      // add some pixels for better visibility
      const radiusX = touch.radiusX || 40 + 20;
      const radiusY = touch.radiusY || 40 + 20;

      /* draw all circles */
      context.beginPath();
      context.ellipse(touch.clientX, touch.clientY, radiusX, radiusY, rotationAngle * Math.PI / 180, 0, Math.PI * 2, true);
      context.stroke();

      // HUD (hacky)
      var hud_props = ['touch', 'clientX: ' + touch.clientX + ' clientY: ' + touch.clientY];
      if (touch.radiusX && touch.radiusY) {
        hud_props.push('radiusX: ' + touch.radiusX + ' radiusY: ' + touch.radiusY);
      }
      if (touch.rotationAngle) {
        hud_props.push('rotationAngle: ' + touch.rotationAngle);
      }
      if (touch.force) {
        hud_props.push('force: ' + touch.force);
      }

      context.font = "30px Arial";
      context.fillStyle = "#fff";
      context.fillText(hud_props[0], touch.clientX + radiusX + 20, touch.clientY);
      context.fillStyle = "#aaa";
      context.font = "10px Arial";
      hud_props.slice(1).forEach((hud_prop, h_i) => {
        context.fillText(hud_prop, touch.clientX + radiusX + 20, touch.clientY + (h_i + 2) * 12);
      })
    }
  }

  /**
   *
   * @param {TouchEvent} e
   */
  const positionHandler = (e) => {
    // stop scrolling etc
    e.preventDefault();

    window.requestAnimationFrame(draw(Array.from(e.targetTouches)));
  }

  return (
    <div className='container'>
      <canvas

        onTouchStart={e => positionHandler(e)}
        onTouchMove={e => positionHandler(e)}
        onTouchEnd={e => positionHandler(e)}
        onTouchCancel={e => positionHandler(e)}

        onContextMenu={(e) => { e.preventDefault() }}
        ref={canvasRef}
        style={{
          width: window.innerWidth + 'px',
          height: window.innerHeight + 'px',
          touchAction: 'none',
          msTouchAction: 'none'
        }}
        width={innerWidth}
        height={innerHeight}
      >
      </canvas>
    </div>
  )
}

KeyPressDetectionFloor.propTypes = {
}

export default KeyPressDetectionFloor
