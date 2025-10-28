import { useRef, useMemo } from 'react'

/**
 * A hook to handle multi-touch drag gestures on the R3F canvas.
 * @param {Function} handler - The function to call on drag events.
 *   It receives an object with { type: 'onDragStart' | 'onDragMove' | 'onDragEnd', nativeType: string, touch: Touch }.
 * @returns {object} An object with event handlers to spread onto a component.
 */
const useMultiTouchDrag = (handler) => {
  // Ref to store currently tracked touches. Maps touch.identifier to the Touch object.
  const trackedTouches = useRef(new Map())

  const handlers = useMemo(() => {
    if (!handler) return {}
    /**
     * @param {React.TouchEvent<Element>} evt
     */
    const onTouchStart = (evt) => {
      evt.preventDefault()
      const touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        trackedTouches.current.set(touch.identifier, touch)
      }
      handler({ type: evt.type, touches })
    }

    /**
     * @param {React.TouchEvent<Element>} evt
     */
    const onTouchMove = (evt) => {
      evt.preventDefault()
      const touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        if (trackedTouches.current.has(touch.identifier)) {
          trackedTouches.current.set(touch.identifier, touch) // Update touch data
        }
      }
      handler({ type: evt.type, touches })
    }

    /**
     * @param {boolean} isEnd
     * @returns {(evt: React.TouchEvent<Element>) => void}
     */
    const createDeleteHandler = (isEnd) => (evt) => {
      evt.preventDefault()
      const touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        if (trackedTouches.current.has(touch.identifier)) {
          trackedTouches.current.delete(touch.identifier) // Remove from tracking
        } else {
          if (isEnd) console.log("can't figure out which touch to end")
        }
      }
      handler({ type: evt.type, touches })
    }

    const bind = () => {
      return {
        onTouchStart,
        onTouchMove,
        onTouchEnd: createDeleteHandler(true),
        onTouchCancel: createDeleteHandler(false)
      }
    }

    return bind
  }, [handler])

  return handlers
}

export default useMultiTouchDrag
