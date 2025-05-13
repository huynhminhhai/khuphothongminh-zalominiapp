import React, { useEffect, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    LayersControl,
    useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from '@iconify/react';
import { useStoreApp } from 'store/store';

// Component để xử lý click trên bản đồ
const LocationMarker = ({
    onSelect,
    position,
}: {
    onSelect: (lat: number, lng: number) => void;
    position: L.LatLng | null;
}) => {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position ? <Marker position={position} /> : null;
};

// Component để di chuyển đến vị trí mới
const FlyToLocation = ({ position }: { position: L.LatLng | null }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 17);
        }
    }, [position, map]);
    return null;
};

// Hàm chung để fetch vị trí từ Nominatim API
const fetchLocationByKeyword = async (keyword: string): Promise<L.LatLng | null> => {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                keyword
            )}`
        );
        const data = await res.json();
        if (data && data[0]) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            return L.latLng(lat, lon);
        }
        return null;
    } catch (err) {
        return null;
    }
};

const MapPicker = ({
    onClose,
    onPick,
}: {
    onClose: () => void;
    onPick: (lat: number, lng: number) => void;
}) => {
    const { account } = useStoreApp();
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const DEFAULT_POSITION = L.latLng(10.535, 106.415);

    useEffect(() => {
        const initLocation = async () => {
            if (account?.tenXa || account?.tenHuyen) {
                const keyword = [account.tenXa, account.tenHuyen].filter(Boolean).join(', ');
                setSearch(keyword);
                const pos = await fetchLocationByKeyword(keyword);
                if (pos) {
                    setPosition(pos);
                    onPick(pos.lat, pos.lng);
                    return;
                }
            }

            // fallback nếu không có dữ liệu hoặc tìm không ra
            setPosition(DEFAULT_POSITION);
            onPick(DEFAULT_POSITION.lat, DEFAULT_POSITION.lng);
        };

        initLocation();
    }, [account?.tenXa, account?.tenHuyen]);

    const handleSearch = async () => {
        setError('');
        if (!search.trim()) {
            setError('Vui lòng nhập địa chỉ.');
            return;
        }

        const pos = await fetchLocationByKeyword(search);
        if (pos) {
            setPosition(pos);
            onPick(pos.lat, pos.lng);
        } else {
            setError('Không tìm thấy địa chỉ.');
        }
    };

    return (
        <div className="bg-gray-100 w-full h-[350px] relative z-0 flex flex-col gap-1 p-[6px] rounded-lg">
            {/* Thanh tìm kiếm */}
            <div className="flex flex-col gap-0 z-[1] mb-1">
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder="VD: tên xã/thị trấn, tên quận/huyện"
                        className="border border-[#b9bdc1] px-2 py-1 flex-1 text-sm rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-primary-color text-white px-3 py-1 rounded text-sm"
                    >
                        <Icon fontSize={18} icon="mingcute:search-3-line" />
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
            </div>

            {/* Bản đồ */}
            <div className="flex-1">
                <MapContainer
                    center={position ?? DEFAULT_POSITION}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                >
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="Bản đồ đường">
                            <TileLayer
                                url="https://mt1.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}"
                                attribution=""
                                maxZoom={22}
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Bản đồ vệ tinh">
                            <TileLayer
                                url="https://mt0.google.com/vt/lyrs=s&hl=vi&x={x}&y={y}&z={z}"
                                attribution=""
                                maxZoom={22}
                            />
                        </LayersControl.BaseLayer>
                    </LayersControl>

                    <LocationMarker
                        position={position}
                        onSelect={(lat, lng) => {
                            const newPos = L.latLng(lat, lng);
                            setPosition(newPos);
                            onPick(lat, lng);
                        }}
                    />
                    <FlyToLocation position={position} />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPicker;
