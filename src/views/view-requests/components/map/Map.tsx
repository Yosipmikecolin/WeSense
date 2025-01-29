import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix para los íconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect }: MapProps) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function Map({ onLocationSelect }: MapProps) {
  const [mapKey, setMapKey] = useState(Date.now());  // Esto garantizará una clave única

  useEffect(() => {
    setMapKey(Date.now()); // Esto permite que el mapa se inicialice nuevamente si es necesario
  }, []);  // Solo se ejecuta al montar y desmontar

  return (
    <MapContainer
      key={mapKey}  // Utiliza una clave única que se cambiará cada vez que el mapa se necesite reiniciar
      center={[0, 0]}
      zoom={2}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
