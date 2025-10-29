import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

/**
 * @type {HTMLCanvasElement}
 */
const initialCanvasRef = null

/**
 * @type {CanvasRenderingContext2D}
 */
const initialContext = null

const KeyPressDetectionFloor = () => {
  const canvasRef = useRef(initialCanvasRef)
  const [context, setContext] = useState(initialContext)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.strokeStyle = "#aaa"
      ctx.lineWidth = "10"
      setContext(ctx)
    }
    // The empty dependency array ensures this effect runs only once after the component mounts.
  }, [])

  /**
   *
   * @param {Touch[]} points
   * @returns
   */
  const draw = (points) => () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    for (const touch of points) {
      const rotationAngle = touch.rotationAngle || 0
      // add some pixels for better visibility
      const radiusX = touch.radiusX || 40
      const radiusY = touch.radiusY || 40

      /* draw all ellipses */
      context.beginPath()
      context.ellipse(touch.clientX, touch.clientY, radiusX, radiusY, rotationAngle * Math.PI / 180, 0, Math.PI * 2, true)
      context.stroke()

      const clientCoords_props = ['clientX: '+touch.clientX+' clientY: ' + touch.clientY]

      const radii = touch.radiusX && touch.radiusY
      let radii_props
      if (radii)
        radii_props = ['radiusX: ' + touch.radiusX + ' radiusY: ' + touch.radiusY]
      else
        radii_props = []

      let rotationAngle_props
      if (touch.rotationAngle)
        rotationAngle_props = ['rotationAngle: ' + touch.rotationAngle]
      else
        rotationAngle_props = []

      const extra = [
        clientCoords_props,
        radii_props,
        rotationAngle_props
      ].flat()

      const touch_string = 'touch'

      /* draw HUD */
      context.font = "30px Arial"
      context.fillStyle = "#fff"
      context.fillText(touch_string, touch.clientX + radiusX + 20, touch.clientY)
      context.fillStyle = "#aaa"
      context.font = "10px Arial"

      extra.forEach((hud_prop, h_i) => {
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
    <canvas
      onTouchStart={positionHandler}
      onTouchMove={positionHandler}
      onTouchEnd={positionHandler}
      onTouchCancel={positionHandler}

      onContextMenu={(e) => { e.preventDefault() }}
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px',
        touchAction: 'none',
        msTouchAction: 'none'
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    >
    </canvas>
  )
}

KeyPressDetectionFloor.propTypes = {
}

export default KeyPressDetectionFloor
