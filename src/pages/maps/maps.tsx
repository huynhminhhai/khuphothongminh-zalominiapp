import React, { useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Page, Sheet } from "zmp-ui";
import { HeaderSub } from "components/header-sub";
import "leaflet.heat";
import { LegendNote } from "components/maps";
import { Icon } from "@iconify/react";


const generateResidents = (count: number) => {
    const statuses = ["Hộ nghèo", "Hộ cận nghèo", "Gia đình văn hóa", "Gia đình chưa văn hóa"];
    const randomOffset = () => (Math.random() - 0.5) * 0.016;

    return Array.from({ length: count }, (_, id) => ({
        id: id + 1,
        name: `Trần Văn ${String.fromCharCode(65 + (id % 26))}`,
        lat: 10.633 + randomOffset(),
        lng: 106.501 + randomOffset(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
};

const HeatmapLayer = ({ residents }) => {
    const map = useMap();

    React.useEffect(() => {
        const heatData = residents.map(res => [res.lat, res.lng, 0.5]);
        const heatLayer = (L as any).heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, residents]);

    return null;
};


const ResidentMapPage = () => {

    const [sheetVisible, setSheetVisible] = useState(false);
    const [filter, setFilter] = useState<"poor" | "culture" | "heatmap" | "heatmap2">("poor");

    const handleSetFilter = useCallback((value: "poor" | "culture" | "heatmap" | "heatmap2") => {
        setFilter(value);
    }, []);

    const residents = generateResidents(500);

    const filteredResidents = residents.filter((res) => {
        if (filter === "poor") return res.status === "Hộ nghèo" || res.status === "Hộ cận nghèo";
        if (filter === "culture") return res.status === "Gia đình văn hóa" || res.status === "Gia đình chưa văn hóa";
        return false;
    });

    const center: [number, number] = [10.633159564692495, 106.50086913625947];
    const zoom = 14;

    const getMarkerIcon = (status: string) => {
        const color = {
            "Hộ nghèo": "red",
            "Hộ cận nghèo": "orange",
            "Gia đình văn hóa": "green",
            "Gia đình chưa văn hóa": "blue",
        }[status] || "blue";

        return L.icon({
            iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        });
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Bản đồ" />

                <Box>
                    <Box className="relative">
                        <LegendNote />
                        <Box className="absolute top-[66px] right-3 z-[9999]">
                            <button onClick={() => setSheetVisible(true)} className="p-2 bg-white text-[#a8a8a8] rounded-[5px] opacity-95">
                                <Icon fontSize={26} icon='mdi:filter' />
                            </button>
                        </Box>
                        <MapContainer style={{ height: "calc(100vh - 58px)", width: "100%" }} center={center} zoom={zoom}>
                            <LayersControl position="topright">
                                <LayersControl.BaseLayer checked name="Bản đồ vệ tinh">
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution="Bản đồ dân cư | © VNPT Long An"
                                    />
                                </LayersControl.BaseLayer>

                                <LayersControl.BaseLayer name="Bản đồ đường">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="Bản đồ dân cư | © VNPT Long An"
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>

                            {filter === "heatmap" || filter === "heatmap2" ? <HeatmapLayer residents={residents} /> :
                                filteredResidents.map((res) => (
                                    <Marker key={res.id} position={[res.lat, res.lng]} icon={getMarkerIcon(res.status)}>
                                        <Popup>
                                            <div className="font-semibold">{res.status}</div>
                                            <div className="mt-2">
                                                <ul className="flex flex-col gap-1">
                                                    <li>Tên chủ hộ: {res.name}</li>
                                                    <li>Số thành viên: 5</li>
                                                    <li>Đc: 364, QL1A, KP9, BL, LA</li>
                                                </ul>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                        </MapContainer>
                    </Box>

                    <Sheet
                        visible={sheetVisible}
                        onClose={() => setSheetVisible(false)}
                        autoHeight
                        zIndex={9999}
                    >
                        <Box mt={6} p={4} mb={10}>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="cursor-pointer" onClick={() => handleSetFilter("poor")}>
                                    <input type="radio" className="peer sr-only" name="pricing" defaultChecked />
                                    <div className="w-full max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-color peer-checked:ring-primary-color peer-checked:ring-offset-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-end justify-center">
                                                <p className="text-[14px] text-center font-bold">Xem hộ nghèo & cận nghèo</p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label className="cursor-pointer" onClick={() => handleSetFilter("culture")}>
                                    <input type="radio" className="peer sr-only" name="pricing" />
                                    <div className="w-full max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-color peer-checked:ring-primary-color peer-checked:ring-offset-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-end justify-center">
                                                <p className="text-[14px] text-center font-bold">Xem gia đình văn hóa</p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label className="cursor-pointer" onClick={() => handleSetFilter("heatmap")}>
                                    <input type="radio" className="peer sr-only" name="pricing" />
                                    <div className="w-full max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-color peer-checked:ring-primary-color peer-checked:ring-offset-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-end justify-center">
                                                <p className="text-[14px] text-center font-bold">Mật độ dân cư</p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label className="cursor-pointer" onClick={() => handleSetFilter("heatmap2")}>
                                    <input type="radio" className="peer sr-only" name="pricing" />
                                    <div className="w-full max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-color peer-checked:ring-primary-color peer-checked:ring-offset-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-end justify-center">
                                                <p className="text-[14px] text-center font-bold">Mật độ hộ gia đình</p>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </Box>
                    </Sheet>
                </Box>
            </Box>
        </Page>
    );
};

export default ResidentMapPage;
