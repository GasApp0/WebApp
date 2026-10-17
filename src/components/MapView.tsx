import React, { useEffect, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Crosshair, GasPump, MapPin } from '@phosphor-icons/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

export const DEFAULT_LAT = 5.6037;
export const DEFAULT_LNG = -0.187;
const DEFAULT_ZOOM = 16;

// Mock filling stations (no station-locator API wired up) — close to the default
// Accra/Legon area so there's always a plausible "nearest station" to route to.
const FILLING_STATIONS = [
  { id: 'gs1', name: 'Shell - Haatso', lat: 5.6485, lng: -0.1912 },
  { id: 'gs2', name: 'Goil - Atomic Junction', lat: 5.6554, lng: -0.1801 },
  { id: 'gs3', name: 'Total - Legon', lat: 5.6505, lng: -0.187 },
  { id: 'gs4', name: 'Goil - East Legon', lat: 5.6392, lng: -0.1527 },
];

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestStation(point: { lat: number; lng: number } | null) {
  if (!point) return null;
  return FILLING_STATIONS.reduce((closest, station) => {
    const dist = haversineKm(point.lat, point.lng, station.lat, station.lng);
    return !closest || dist < closest.dist ? { ...station, dist } : closest;
  }, null as ((typeof FILLING_STATIONS)[number] & { dist: number }) | null);
}

const destinationIcon = L.divIcon({
  className: 'map-pin-icon',
  html: renderToStaticMarkup(<MapPin size={32} weight="fill" color="#0088FF" />),
  iconSize: [32, 32],
  iconAnchor: [16, 30],
});

const stationIcon = L.divIcon({
  className: 'map-pin-icon',
  html: renderToStaticMarkup(
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: '50%',
        backgroundColor: '#0088FF',
        border: '2px solid white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GasPump size={14} weight="fill" color="white" />
    </div>
  ),
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: '<div class="pulse"></div><div class="dot"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function DestinationMarker({
  lat,
  lng,
  onChange,
}: {
  lat: number;
  lng: number;
  onChange?: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onChange?.(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      position={[lat, lng]}
      icon={destinationIcon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const pos = (e.target as L.Marker).getLatLng();
          onChange?.(pos.lat, pos.lng);
        },
      }}
    />
  );
}

function LocateControl({ onLocate }: { onLocate: (lat: number, lng: number) => void }) {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      onLocate(latitude, longitude);
      map.flyTo([latitude, longitude], DEFAULT_ZOOM, { animate: true, duration: 0.6 });
    });
  };

  return (
    <div
      className="map-locate-control"
      title="Use my location"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={handleLocate}
    >
      <Crosshair size={18} weight="bold" color="rgba(0,0,0,0.6)" />
    </div>
  );
}

interface MapViewProps {
  lat?: number;
  lng?: number;
  onLocationChange?: (lat: number, lng: number) => void;
  onNearestStationDistanceChange?: (distanceKm: number | null) => void;
}

const TILE_KEY = process.env.REACT_APP_MAP_TILE_KEY;
const TILE_URL = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${
  TILE_KEY ? `?key=${TILE_KEY}` : ''
}`;

export default function MapView({
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  onLocationChange,
  onNearestStationDistanceChange,
}: MapViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Best-effort: locate the user automatically so we can default to showing
  // the route to their nearest filling station. Silently does nothing if the
  // browser has no geolocation or the user denies the permission prompt.
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => {},
    );
  }, []);

  const nearestStation = useMemo(() => findNearestStation(userLocation), [userLocation]);

  // Pricing is based on distance from the delivery pin (not raw GPS), since
  // that's what "Your Location" on the order card actually represents.
  const nearestStationToDestination = useMemo(() => findNearestStation({ lat, lng }), [lat, lng]);
  useEffect(() => {
    onNearestStationDistanceChange?.(nearestStationToDestination?.dist ?? null);
  }, [nearestStationToDestination, onNearestStationDistanceChange]);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={DEFAULT_ZOOM}
      maxZoom={20}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={TILE_URL}
        subdomains="abcd"
        maxZoom={20}
      />

      <DestinationMarker lat={lat} lng={lng} onChange={onLocationChange} />

      {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon} />}

      {nearestStation && (
        <>
          <Marker position={[nearestStation.lat, nearestStation.lng]} icon={stationIcon}>
            <Popup>
              {nearestStation.name}
              <br />
              {nearestStation.dist.toFixed(1)} km away
            </Popup>
          </Marker>
          {userLocation && (
            <Polyline
              positions={[
                [userLocation.lat, userLocation.lng],
                [nearestStation.lat, nearestStation.lng],
              ]}
              pathOptions={{ color: '#0088FF', weight: 4, opacity: 0.75, dashArray: '1, 10', lineCap: 'round' }}
            />
          )}
        </>
      )}

      <LocateControl onLocate={(la, ln) => setUserLocation({ lat: la, lng: ln })} />
    </MapContainer>
  );
}
