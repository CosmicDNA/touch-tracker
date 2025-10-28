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
      ctx.scale(devicePixelRatio, devicePixelRatio)
      setContext(ctx)
    }
    // The empty dependency array ensures this effect runs only once after the component mounts.
  }, [devicePixelRatio])

  /**
   *
   * @param {Touch[]} points
   * @returns
   */
  const draw = (points) => () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    context.strokeStyle = "#eee"
    context.lineWidth = "10"

    for (const touch of points) {
      const rotationAngle = touch.rotationAngle || 0
      // add some pixels for better visibility
      const radiusX = touch.radiusX || 40 + 20
      const radiusY = touch.radiusY || 40 + 20

      /* draw all ellipses */
      context.beginPath()
      context.ellipse(touch.clientX, touch.clientY, radiusX, radiusY, rotationAngle * Math.PI / 180, 0, Math.PI * 2, true)
      context.stroke()

      /* draw HUD */
      const hud_props = [
        'touch', 'clientX: ' + touch.clientX + ' clientY: ' + touch.clientY,
        'radiusX: ' + touch?.radiusX + ' radiusY: ' + touch?.radiusY,
        'rotationAngle: ' + touch?.rotationAngle,
        'force: ' + touch?.force
      ]

      context.font = "30px Arial"
      context.fillStyle = "#fff"
      context.fillText(hud_props[0], touch.clientX + radiusX + 20, touch.clientY)
      context.fillStyle = "#aaa"
      context.font = "10px Arial"
      hud_props.slice(1).forEach((hud_prop, h_i) => {
        context.fillText(hud_prop, touch.clientX + radiusX + 20, touch.clientY + (h_i + 2) * 12)
      })
    }
  }

  /**
   *
   * @param {TouchEvent} e
   */
  const positionHandler = (e) => {
    // stop scrolling etc
    e.preventDefault()

    window.requestAnimationFrame(draw(Array.from(e.targetTouches)))
  }

  return (
    <div className='container'>
      <canvas
        onTouchStart={positionHandler}
        onTouchMove={positionHandler}
        onTouchEnd={positionHandler}
        onTouchCancel={positionHandler}

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
