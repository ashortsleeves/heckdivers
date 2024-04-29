import { useControls } from 'react-zoom-pan-pinch';
export default function DefaultZoomTools() {
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
      <div className="tools">
        <button id="zIn" onClick={() => zoomIn()}>+</button>
        <button id="zOut" onClick={() => zoomOut()}>-</button>
        <button id="zReset" onClick={() => resetTransform()}>x</button>
      </div>
    );    
}