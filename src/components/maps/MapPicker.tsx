import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

const LocationMarker = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<L.LatLng | null>(L.latLng(10.535, 106.415)); // Tọa độ Long An

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : <Marker position={position} />;
};

const MapPicker = ({ onClose, onPick }: { onClose: () => void, onPick: (lat: number, lng: number) => void }) => {
    return (
        <div className="bg-white w-full h-[250px]">
            <button className="absolute top-2 right-4 z-10" onClick={onClose}>Đóng</button>
            <MapContainer center={[10.535, 106.415]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://mt1.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}" />
                <LocationMarker onSelect={(lat, lng) => {
                    onPick(lat, lng);
                    // onClose(); // tự đóng lại sau khi chọn
                }} />
            </MapContainer>
        </div>
    );
};

export default MapPicker;