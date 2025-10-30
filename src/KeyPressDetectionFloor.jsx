import React, { useCallback, useEffect, useState } from 'react'
import { useCanvasContext } from './hooks/useCanvasContext'

const KeyPressDetectionFloor = () => {
  const devicePixelRatio = window.devicePixelRatio || 1

  const updateScaling = useCallback(
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    (ctx) => {
      ctx.resetTransform() // Reset transform before scaling
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }, [devicePixelRatio])

  const { canvasRef, contextRef } = useCanvasContext(
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    (ctx) => {
      ctx.strokeStyle = '#aaa'
      ctx.lineWidth = '10'
      updateScaling(ctx)
    })

  const getDimensions = useCallback(() => {
    return {
      width: window.innerWidth * devicePixelRatio,
      height: window.innerHeight * devicePixelRatio
    }
  }, [devicePixelRatio])

  const [dimensions, setDimensions] = useState(getDimensions())

  // Handle window resize and orientation changes
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
      updateScaling(contextRef.current)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [contextRef, devicePixelRatio, getDimensions, updateScaling])

  const draw = useCallback(
    /**
     *
     * @param {Touch[]} points
     * @returns
     */
    (points) => {
      const context = contextRef.current
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      for (const touch of points) {
        // use fallback for touch devices that do not report either radii or rotationAngle correctly
        const rotationAngle = touch.rotationAngle || 0
        const radiusX = touch.radiusX || 40
        const radiusY = touch.radiusY || 40

        /* draw all ellipses */
        context.beginPath()
        context.ellipse(touch.clientX, touch.clientY, radiusX, radiusY, rotationAngle * Math.PI / 180, 0, Math.PI * 2, true)
        context.stroke()

        const clientCoordsProps = ['clientX: ' + touch.clientX + ' clientY: ' + touch.clientY]

        const radii = touch.radiusX && touch.radiusY
        const radiiProps = radii ? ['radiusX: ' + touch.radiusX + ' radiusY: ' + touch.radiusY] : []

        const rotationAngleProps = touch.rotationAngle ? ['rotationAngle: ' + touch.rotationAngle] : []

        const extra = [
          clientCoordsProps,
          radiiProps,
          rotationAngleProps
        ].flat()

        const touchString = 'touch'

        /* draw HUD */
        context.font = '30px Arial'
        context.fillStyle = '#fff'
        context.fillText(touchString, touch.clientX + radiusX + 20, touch.clientY)
        context.fillStyle = '#aaa'
        context.font = '10px Arial'

        extra.forEach((hudProp, hIndex) => {
          context.fillText(hudProp, touch.clientX + radiusX + 20, touch.clientY + (hIndex + 2) * 12)
        })
      }
    }, [canvasRef, contextRef])

  /**
   *
   * @param {TouchEvent} e
   */
  const positionHandler = useCallback((e) => {
    // stop scrolling etc
    e.preventDefault()

    window.requestAnimationFrame(() => draw(Array.from(e.targetTouches)))
  }, [draw])

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
        width: '100%',
        height: '100%',
        touchAction: 'none',
        msTouchAction: 'none'
      }}
      width={dimensions.width}
      height={dimensions.height}
    />
  )
}

export default KeyPressDetectionFloor
