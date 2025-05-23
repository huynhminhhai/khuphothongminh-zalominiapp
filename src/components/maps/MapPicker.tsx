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
import { useGetLocationWithZalo } from 'services/getLocationWithZalo';
import { Loading } from 'components/data';

interface ZaloLocationResponse {
    error: boolean;
    statusCode: number;
    message: string;
    type: string;
    data: {
        provider: string;
        latitude: string;
        longitude: string;
        timestamp: string;
    };
}

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
            const currentZoom = map.getZoom(); // Lấy zoom hiện tại
            map.flyTo(position, currentZoom);  // Dùng zoom hiện tại thay vì zoom 17
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
    onPick,
    lat,
    lng,
}: {
    onPick: (lat: number, lng: number) => void;
    lat?: number;
    lng?: number;
}) => {
    const DEFAULT_POSITION = L.latLng(10.535, 106.415);

    const { account } = useStoreApp();
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mapCenter, setMapCenter] = useState<L.LatLng>(DEFAULT_POSITION);

    const { getLocationWithZalo } = useGetLocationWithZalo();




    const handleGetLocation = async () => {
        setIsLoading(true);
        const res = await getLocationWithZalo() as ZaloLocationResponse;

        setIsLoading(false);

        if (res && res?.data?.latitude && res?.data?.longitude) {
            const lat = parseFloat(res.data.latitude);
            const lng = parseFloat(res.data.longitude);
            const newPos = L.latLng(lat, lng);

            setPosition(newPos);
            onPick(lat, lng);
        }
    };

    useEffect(() => {
        const initLocation = async () => {
            // Check if lat and lng are provided and valid
            if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
                const newPos = L.latLng(lat, lng);
                setMapCenter(newPos);
                setPosition(newPos); // Set marker at provided coordinates
                // onPick(lat, lng); // Uncomment if you want to immediately trigger onPick
                return;
            }

            // Fallback to existing logic
            if (account?.tenXa || account?.tenHuyen) {
                const keyword = [account.tenXa, account.tenHuyen].filter(Boolean).join(', ');
                setSearch(keyword);
                const pos = await fetchLocationByKeyword(keyword);
                if (pos) {
                    setMapCenter(pos);
                    setPosition(null);
                    return;
                }
            }

            // Fallback to default position
            setMapCenter(DEFAULT_POSITION);
            setPosition(null);
        };

        initLocation();
    }, [account?.tenXa, account?.tenHuyen, lat, lng]);

    const handleSearch = async () => {
        setError('');
        if (!search.trim()) {
            setError('Vui lòng nhập địa chỉ.');
            return;
        }

        const pos = await fetchLocationByKeyword(search);
        if (pos) {
            setMapCenter(pos);
            setPosition(null);
            // onPick(pos.lat, pos.lng);
        } else {
            setError('Không tìm thấy địa chỉ.');
        }
    };

    return (
        <div className="col-span-12">
            <div className="mb-2 flex items-center justify-center gap-x-1 text-[14px] font-medium p-2 border-[1px] border-[#b9bdc1] rounded-lg w-full" onClick={() => setShowMap(!showMap)}>
                Chọn vị trí
                <Icon fontSize={16} icon={"mdi:map-marker-outline"} />
            </div>
            {showMap && (
                <div
                    className='fixed top-[56px] left-0 z-[999] w-screen h-screen'
                >
                    <div
                        className="bg-gray-50 w-full h-full z-0 flex flex-col gap-1 rounded-lg"
                    >
                        {/* Thanh tìm kiếm */}
                        <div className="absolute top-[10px] left-[8px] flex flex-col z-[999]">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="VD: tên xã/thị trấn, tên quận/huyện"
                                    className="h-[48px] w-[260px] border-[#b9bdc1] pr-2 py-1 flex-1 text-[12px] rounded-e-none border-[2px] border-r-0 pl-4"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="rounded-l-none bg-white text-gray-500 rounded border-[2px] border-l-[2px] border-[#b9bdc1] w-[48px] flex items-center justify-center"
                                >
                                    <Icon fontSize={26} icon="lets-icons:search-duotone" />
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                        </div>

                        <div className="absolute bottom-[65px] left-[0px] px-2 flex flex-col z-[99999] w-full">
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='col-span-8'>
                                    <button onClick={() => handleGetLocation()} className="bg-blue-100 text-blue-700 font-semibold rounded text-sm flex items-center justify-center gap-2 h-[48px] w-full !border-[2px] !border-blue-400">Vị trí hiện tại <Icon fontSize={18} icon="mingcute:map-pin-line" /> </button>
                                </div>
                                <div className='col-span-4'>
                                    <button onClick={() => setShowMap(false)} className="bg-gray-100 text-gray-600 font-semibold rounded text-sm flex items-center justify-center gap-2 h-[48px] w-full !border-[2px] !border-[#b9bdc1]">Đóng</button>
                                </div>
                            </div>
                        </div>

                        {/* Bản đồ */}

                        <div className="flex-1 relative">
                            {
                                isLoading &&
                                <div className='absolute top-0 left-0 w-full h-full bg-[#ffffff99] flex items-center justify-center z-[99999]'>
                                    <Loading />
                                </div>
                            }
                            <MapContainer
                                center={mapCenter}
                                zoom={15}
                                style={{ height: '100%', width: '100%' }}
                                zoomControl={false}
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
                                <FlyToLocation position={position || mapCenter} />
                            </MapContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapPicker;
