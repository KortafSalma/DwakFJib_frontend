import { Polyline } from 'react-leaflet';

const RoutePolyline = ({ positions, color = '#10B981', weight = 4, dashArray = null }) => {
  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color,
        weight,
        opacity: 0.8,
        dashArray,
        lineCap: 'round',
        lineJoin: 'round',
      }}
    />
  );
};

export default RoutePolyline;
