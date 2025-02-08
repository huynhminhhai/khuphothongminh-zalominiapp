import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Page } from "zmp-ui";
import { HeaderSub } from "components/header-sub";

const generateResidents = (count: number) => {
    const statuses = ["Hộ nghèo", "Hộ cận nghèo", "Gia đình văn hóa", "Gia đình chưa văn hóa"];
    const randomOffset = () => (Math.random() - 0.5) * 0.016; // Lệch vị trí ngẫu nhiên

    return Array.from({ length: count }, (_, id) => ({
        id: id + 1,
        name: `Trần Văn ${String.fromCharCode(65 + (id % 26))}`, // Tạo tên từ A-Z
        lat: 10.633 + randomOffset(), // Tạo vị trí gần khu vực gốc
        lng: 106.501 + randomOffset(),
        status: statuses[Math.floor(Math.random() * statuses.length)], // Random trạng thái
    }));
};

const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const ResidentMapPage = () => {

    const [mapType, setMapType] = useState("satellite");
    const [filter, setFilter] = useState<"all" | "poor" | "culture">("all");

    const tileLayers: { [key: string]: string } = {
        streets: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    };

    const residents = generateResidents(500);

    const filteredResidents = residents.filter((res) => {
        if (filter === "all") return true;
        if (filter === "poor") return res.status === "Hộ nghèo" || res.status === "Hộ cận nghèo";
        if (filter === "culture") return res.status === "Gia đình văn hóa" || res.status === "Gia đình chưa văn hóa";
        return false;
    });

    const center: [number, number] = [10.633159564692495, 106.50086913625947];
    const zoom = 16;

    // Hàm chọn màu marker theo trạng thái hộ dân
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
            iconAnchor: [16, 32], // Giữ điểm đánh dấu đúng vị trí
        });
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Bản đồ" />

                <Box>
                    <MapContainer style={{ height: "600px", width: "100%" }}>
                        <ChangeView center={center} zoom={zoom} />

                        <TileLayer url={tileLayers[mapType]} attribution="Bản đồ dân cư | © VNPT Long An" />

                        {filteredResidents.map((res) => (
                            <Marker key={res.id} position={[res.lat, res.lng]} icon={getMarkerIcon(res.status)}>
                                <Popup>
                                    <div className="font-semibold">{res.status}</div>
                                    <div className="mt-2">
                                        <ul className="flex flex-col gap-1">
                                            <li>Tên chủ hộ: {res.name}</li>
                                            <li>Số thành viên: 5</li>
                                        </ul>

                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    <div style={{ marginTop: 10 }}>
                        <button onClick={() => setMapType("streets")}>Bản đồ đường</button>
                        <button onClick={() => setMapType("satellite")}>Bản đồ vệ tinh</button>
                    </div>
                    <div>
                        <button onClick={() => setFilter("all")}>Xem tất cả</button>
                        <button onClick={() => setFilter("poor")}>Xem hộ nghèo & cận nghèo</button>
                        <button onClick={() => setFilter("culture")}>Xem gia đình văn hóa</button>
                    </div>
                </Box>
            </Box>
        </Page>
    );
};

export default ResidentMapPage;
