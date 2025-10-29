import { useEffect, useRef } from 'react'

/**
 * @type {HTMLCanvasElement}
 */
const initialCanvasRef = null

/**
 * @type {CanvasRenderingContext2D}
 */
const initialContext = null

/**
 * Custom hook to manage a canvas element and its 2D rendering context.
 * @param {function(CanvasRenderingContext2D): void} handler A callback function to initialize the context with styles.
 * @returns {{canvasRef: React.MutableRefObject<HTMLCanvasElement>, contextRef: React.MutableRefObject<CanvasRenderingContext2D>}}
 */
export const useCanvasContext = (handler) => {
  const canvasRef = useRef(initialCanvasRef)
  const contextRef = useRef(initialContext)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      // Apply initial styles to the context
      handler(ctx)
      contextRef.current = ctx
    }
    // The empty dependency array ensures this effect runs only once after the component mounts.
  }, [handler])

  return { canvasRef, contextRef }
}
