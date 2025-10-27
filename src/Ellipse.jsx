const Ellipse = ({ clientX, clientY, radiusX, radiusY, rotationAngle, force }) => {
  // Use default values and add an offset for better visibility, like the original template
  const rX = (radiusX || 40) + 20
  const rY = (radiusY || 40) + 20

  const style = {
    position: 'absolute',
    // Position the div from its center
    left: `${clientX - rX}px`,
    top: `${clientY - rY}px`,
    // Set width and height based on radii
    width: `${rX * 2}px`,
    height: `${rY * 2}px`,
    // Style it to look like an ellipse
    borderRadius: '50%',
    border: '5px solid #eee',
    // Apply rotation
    transform: `rotate(${rotationAngle || 0}deg)`,
    // Use force for opacity, with a fallback
    opacity: force || 0.7,
  }

  return (
    <div
      style={style}
    />
  )
}

export default Ellipse
