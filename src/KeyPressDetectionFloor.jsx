import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import useMultiTouchDrag from './hooks/use-multi-touch-drag'
import JSONPretty from 'react-json-pretty'
import Ellipse from './Ellipse'


const KeyPressDetectionFloor = ({ ...props }) => {
  const groupRef = useRef()
  const [data, setData] = useState(new Map())

  /**
   * @param {{type: String, touch: TouchEvent}} ev
   */
  const handleDrag = ({ touch, type }) => {
    const { identifier } = touch

    const processDrag = () => {
      setData(data => {
        const newData = new Map(data)
        newData.set(identifier, {
          clientX: touch.clientX,
          clientY: touch.clientY,
          radiusX: touch.radiusX,
          radiusY: touch.radiusY,
          rotationAngle: touch.rotationAngle,
          force: touch.force
        })
        return newData
      })
    }

    const processEnd = () => {
      setData(data => {
        const newData = new Map(data)
        newData.delete(identifier)
        return newData
      })
    }

    switch (type) {
      case 'touchend':
      case 'touchcancel':
        processEnd()
        break
      case 'touchstart':
      case 'touchmove':
        processDrag()
        break
    }
  }
  useMultiTouchDrag(handleDrag)

  return (
    <div
      ref={groupRef}
      {...props}
    >
      {Array.from(data.values()).map(touch => (
        <Ellipse
          {...touch}
        />
      ))}
      {/* <JSONPretty data={Array.from(data.values())} /> */}
    </div>
  )
}

KeyPressDetectionFloor.propTypes = {
  pressedKeys: PropTypes.instanceOf(Map),
  updatePressedKeys: PropTypes.func
}

export default KeyPressDetectionFloor
