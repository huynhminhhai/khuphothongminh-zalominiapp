import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Page, Sheet, Input } from "zmp-ui";
import { HeaderSub } from "components/header-sub";
import "leaflet.heat";
import { LegendNote } from "components/maps";
import { Icon } from "@iconify/react";
import { useGetBanDoSo, useGetRanhGioiHuyen } from "apiRequest/app";
import { useStoreApp } from "store/store";

function FitBounds({ residents }) {
    const map = useMap();

    useEffect(() => {
        const latlngs = residents
            .filter(res => res.noiThuongTru?.latitude && res.noiThuongTru?.longitude)
            .map(res => [res.noiThuongTru.latitude, res.noiThuongTru.longitude]);

        if (latlngs.length > 0) {
            const bounds = L.latLngBounds(latlngs);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [residents, map]);

    return null;
}

function MapController({ selectedResident, markerRefs, zoom }) {
    const map = useMap();

    useEffect(() => {
        if (selectedResident) {
            const { latitude, longitude } = selectedResident.noiThuongTru;
            map.setView([latitude, longitude], 19);
            const marker = markerRefs.current[selectedResident.danCuId];
            if (marker) {
                marker.openPopup();
            }
        }
    }, [selectedResident, map, markerRefs]);

    return null;
}

const ResidentMapPage = () => {
    const { account, tinhTrangHoGiaDinhs } = useStoreApp();
    const [sheetVisible, setSheetVisible] = useState(false);
    const [filter, setFilter] = useState<"poor" | "culture">("poor");
    const [listFilter, setListFilter] = useState<"all" | "poor" | "nearPoor" | "culture">("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResident, setSelectedResident] = useState(null);
    const markerRefs = useRef({}); // Store marker refs to trigger Popups

    const handleSetFilter = useCallback((value: "poor" | "culture") => {
        setFilter(value);
        setSearchTerm(""); // Reset search term when filter changes
        setSelectedResident(null); // Reset selected resident when filter changes
    }, []);

    const handleSetListFilter = useCallback((value: "all" | "poor" | "nearPoor" | "culture") => {
        setListFilter(value);
    }, []);

    const { data: hoGiaDinh, isLoading: isLoadingHoGiaDinh } = useGetBanDoSo();
    const { data: ranhGioiHuyen, isLoading: isLoadingRanhGioiHuyen } = useGetRanhGioiHuyen(account?.maHuyen || '');

    // Filter residents with valid coordinates
    const residents = useMemo(() => {
        if (!hoGiaDinh) return [];
        return hoGiaDinh.filter(
            res => res.noiThuongTru?.latitude && res.noiThuongTru?.longitude
        );
    }, [hoGiaDinh]);

    const toaDoHuyen = useMemo(() => {
        if (!ranhGioiHuyen || !ranhGioiHuyen.toaDoVung) return [];

        try {
            const parsed = typeof ranhGioiHuyen.toaDoVung === 'string'
                ? JSON.parse(ranhGioiHuyen.toaDoVung)
                : ranhGioiHuyen.toaDoVung;

            return parsed;
        } catch (error) {
            console.error("Lỗi parse toaDoVung:", error);
            return [];
        }
    }, [ranhGioiHuyen]);

    // Filter residents based on selected filter
    const filteredResidents = useMemo(() => {
        return residents.filter(res => {
            if (filter === "poor") {
                return res.thongTinHoGiaDinh != null;
            }
            if (filter === "culture") {
                return typeof res.thongTinHoGiaDinh?.giaDinhVanHoa === "boolean";
            }
            return false;
        });
    }, [residents, filter]);

    // Filter residents by search term
    const searchedResidents = useMemo(() => {
        let filtered = filteredResidents;
        if (listFilter === "poor") {
            filtered = filteredResidents.filter(res => res.thongTinHoGiaDinh?.hoNgheo);
        } else if (listFilter === "nearPoor") {
            filtered = filteredResidents.filter(res => res.thongTinHoGiaDinh?.hoCanNgheo);
        } else if (listFilter === "culture") {
            filtered = filteredResidents.filter(res => typeof res.thongTinHoGiaDinh?.giaDinhVanHoa === "boolean" && res.thongTinHoGiaDinh.giaDinhVanHoa);
        }
        // Apply search term
        if (!searchTerm) return filtered;
        const lowerSearch = searchTerm.toLowerCase();
        return filtered.filter(res => {
            const address = [
                res.noiThuongTru?.diaChi,
                res.noiThuongTru?.tenAp,
                res.noiThuongTru?.tenXa,
                res.noiThuongTru?.tenHuyen,
                res.noiThuongTru?.tenTinh,
            ]
                .filter(Boolean)
                .join(", ")
                .toLowerCase();
            return (
                res.hoTen.toLowerCase().includes(lowerSearch) ||
                address.includes(lowerSearch)
            );
        });
    }, [filteredResidents, listFilter, searchTerm]);

    const counts = useMemo(() => {
        const all = residents.length;
        const poor = residents.filter(res => res.thongTinHoGiaDinh?.hoNgheo).length;
        const nearPoor = residents.filter(res => res.thongTinHoGiaDinh?.hoCanNgheo).length;
        const culture = residents.filter(res => typeof res.thongTinHoGiaDinh?.giaDinhVanHoa === "boolean" && res.thongTinHoGiaDinh.giaDinhVanHoa).length;
        return { all, poor, nearPoor, culture };
    }, [residents]);

    const center: [number, number] = useMemo(() => {
        // B1: Lọc dân cư có tọa độ hợp lệ
        const validResidents = residents.filter(
            res => res.noiThuongTru?.latitude && res.noiThuongTru?.longitude
        );

        if (validResidents.length > 0) {
            const avgLat =
                validResidents.reduce((sum, res) => sum + res.noiThuongTru.latitude, 0) /
                validResidents.length;
            const avgLng =
                validResidents.reduce((sum, res) => sum + res.noiThuongTru.longitude, 0) /
                validResidents.length;

            return [avgLat, avgLng];
        }

        // B2: Nếu không có dân cư, tính trung tâm từ ranh giới huyện
        if (toaDoHuyen.length > 0) {
        
            const avgLat = toaDoHuyen.reduce((sum, item) => sum + item.lat, 0) / toaDoHuyen.length;
            const avgLng = toaDoHuyen.reduce((sum, item) => sum + item.lng, 0) / toaDoHuyen.length;
        
            return [avgLat, avgLng];
        }

        // B3: Fallback mặc định
        return [10.520740944310496, 106.47778872238479];
    }, [residents, toaDoHuyen]);

    const zoom = 15;

    const getMarkerIcon = useCallback((resident: any) => {
        const binthuong = tinhTrangHoGiaDinhs[0]?.value; // Normal
        const hoCanNgheo = tinhTrangHoGiaDinhs[1]?.value; // Near poor
        const hoNgheo = tinhTrangHoGiaDinhs[2]?.value; // Poor

        let status;
        if (filter === "poor") {
            if (resident.thongTinHoGiaDinh?.hoNgheo) {
                status = hoNgheo;
            } else if (resident.thongTinHoGiaDinh?.hoCanNgheo) {
                status = hoCanNgheo;
            } else {
                status = binthuong;
            }
        } else {
            status = resident.thongTinHoGiaDinh?.giaDinhVanHoa;
        }

        const color = {
            [binthuong]: "#018abe",
            [hoCanNgheo]: "#ff6d00",
            [hoNgheo]: "#c1121f",
            true: "#008000",
            false: "#e66f5c",
        }[status] || "gray";

        return L.divIcon({
            html: `
                <div style="
                box-sizing: border-box;
                box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
                border: 2px solid #ffffff;
                width: 12px;
                height: 12px;
                background-color: ${color};
                border-radius: 50%;
            "></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
        });
    }, [tinhTrangHoGiaDinhs, filter]);

    // Handle clicking a household to move map and open Popup
    const handleHouseholdClick = useCallback(
        (resident) => {
            setSelectedResident(resident);
            setSheetVisible(false); // Close sheet after selection
        },
        []
    );

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Bản đồ hộ dân" />

                {isLoadingHoGiaDinh ? (
                    <div className="relative w-full h-[calc(100vh-56px)] bg-gray-300 rounded">
                        <Icon
                            fontSize={48}
                            color="white"
                            icon="eos-icons:bubble-loading"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                ) : (
                    <Box>
                        <Box className="relative">
                            <LegendNote tinhTrang={tinhTrangHoGiaDinhs} filter={filter} handleSetFilter={handleSetFilter} />

                            <Box className="absolute top-[72px] right-3 z-[9999] border-[2px] rounded-md border-[#00000033]">
                                <button
                                    onClick={() => setSheetVisible(true)}
                                    className="p-2 bg-white text-[#a8a8a8] rounded-[5px] opacity-95"
                                >
                                    <Icon fontSize={26} icon="line-md:filter-twotone" />
                                </button>
                            </Box>
                            <MapContainer
                                style={{ height: "calc(100vh - 58px)", width: "100%" }}
                                center={center}
                                zoom={zoom}
                            >
                                <LayersControl position="topright">
                                    <LayersControl.BaseLayer name="Bản đồ đường">
                                        <TileLayer
                                            url="https://mt1.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}"
                                            attribution=""
                                            maxZoom={22}
                                        />
                                    </LayersControl.BaseLayer>
                                    <LayersControl.BaseLayer checked name="Bản đồ vệ tinh">
                                        <TileLayer
                                            url="https://mt0.google.com/vt/lyrs=s&hl=vi&x={x}&y={y}&z={z}"
                                            attribution=""
                                            maxZoom={22}
                                        />
                                    </LayersControl.BaseLayer>
                                </LayersControl>

                                {toaDoHuyen && toaDoHuyen.length > 0 && (
                                    <Polygon
                                        positions={toaDoHuyen}
                                        pathOptions={{
                                            color: 'blue',
                                            weight: 2,
                                            fillOpacity: 0
                                        }}
                                    />
                                )}

                                {
                                    filteredResidents.length > 0 &&
                                    filteredResidents.map((res, index) => (
                                        <Marker
                                            key={index}
                                            position={[res.noiThuongTru.latitude, res.noiThuongTru.longitude]}
                                            icon={getMarkerIcon(res)}
                                            ref={(ref) => {
                                                markerRefs.current[res.danCuId] = ref;
                                            }}
                                        >
                                            <Popup>
                                                <div className="mt-2">
                                                    <ul className="py-2 flex flex-col gap-1 rounded-xl text-sm text-gray-700 w-full max-w-xs">
                                                        <li className="flex gap-1">
                                                            <span className="font-medium text-gray-500">Chủ hộ:</span>
                                                            <span className="font-semibold text-gray-800 truncate">
                                                                {res.hoTen}
                                                            </span>
                                                        </li>
                                                        <li className="flex gap-1">
                                                            <span className="font-medium text-gray-500">Số thành viên:</span>
                                                            <span className="font-semibold text-gray-800">
                                                                {res.soLuongThanhVien + 1}
                                                            </span>
                                                        </li>
                                                        <li className="flex gap-1">
                                                            <span className="font-medium text-gray-500 flex-1 whitespace-nowrap">Địa chỉ:</span>
                                                            <span className="text-[13px] font-semibold text-gray-800">
                                                                {[
                                                                    res?.noiThuongTru?.diaChi,
                                                                    res?.noiThuongTru?.tenAp,
                                                                    res?.noiThuongTru?.tenXa,
                                                                    res?.noiThuongTru?.tenHuyen,
                                                                    res?.noiThuongTru?.tenTinh,
                                                                ]
                                                                    .filter(Boolean)
                                                                    .join(", ")}
                                                            </span>
                                                        </li>
                                                        <li className="flex gap-1">
                                                            <span className="font-medium text-gray-500">Tình trạng:</span>
                                                            <span className="font-semibold text-gray-800 flex flex-col">
                                                                <span
                                                                    style={{
                                                                        color: res.thongTinHoGiaDinh?.hoNgheo
                                                                            ? "#c1121f"
                                                                            : res.thongTinHoGiaDinh?.hoCanNgheo
                                                                                ? "#ff6d00"
                                                                                : "#018abe",
                                                                    }}
                                                                >
                                                                    {res.thongTinHoGiaDinh?.hoNgheo
                                                                        ? tinhTrangHoGiaDinhs.find(i => i.value === tinhTrangHoGiaDinhs[2]?.value)?.label || "Hộ nghèo"
                                                                        : res.thongTinHoGiaDinh?.hoCanNgheo
                                                                            ? tinhTrangHoGiaDinhs.find(i => i.value === tinhTrangHoGiaDinhs[1]?.value)?.label || "Hộ cận nghèo"
                                                                            : tinhTrangHoGiaDinhs.find(i => i.value === tinhTrangHoGiaDinhs[0]?.value)?.label || "Hộ bình thường"}
                                                                </span>
                                                                {typeof res.thongTinHoGiaDinh?.giaDinhVanHoa === "boolean" && (
                                                                    <span
                                                                        style={{
                                                                            color: res.thongTinHoGiaDinh.giaDinhVanHoa ? "#008000" : "#e66f5c",
                                                                        }}
                                                                    >
                                                                        {res.thongTinHoGiaDinh.giaDinhVanHoa ? "Gia đình văn hóa" : "Chưa đạt văn hóa"}
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))
                                }
                                <FitBounds residents={residents} />
                                <MapController
                                    selectedResident={selectedResident}
                                    markerRefs={markerRefs}
                                    zoom={zoom}
                                />
                            </MapContainer>
                        </Box>

                        <Sheet
                            visible={sheetVisible}
                            onClose={() => setSheetVisible(false)}
                            autoHeight
                            zIndex={9999}
                        >
                            <Box p={4}>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            name="listFilter"
                                            value="all"
                                            checked={listFilter === "all"}
                                            onChange={() => handleSetListFilter("all")}
                                        />
                                        <p className="text-[13px] font-bold text-gray-600">
                                            Tất cả ({counts.all})
                                        </p>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            name="listFilter"
                                            value="poor"
                                            checked={listFilter === "poor"}
                                            onChange={() => handleSetListFilter("poor")}
                                        />
                                        <p className="text-[13px] font-bold text-gray-600">
                                            Hộ nghèo ({counts.poor})
                                        </p>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            name="listFilter"
                                            value="nearPoor"
                                            checked={listFilter === "nearPoor"}
                                            onChange={() => handleSetListFilter("nearPoor")}
                                        />
                                        <p className="text-[13px] font-bold text-gray-600">
                                            Hộ cận nghèo ({counts.nearPoor})
                                        </p>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="mr-2"
                                            name="listFilter"
                                            value="culture"
                                            checked={listFilter === "culture"}
                                            onChange={() => handleSetListFilter("culture")}
                                        />
                                        <p className="text-[13px] font-bold text-gray-600">
                                            Gia đình văn hóa ({counts.culture})
                                        </p>
                                    </label>
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mb-4"
                                />
                                <div className="mt-2 h-[500px] overflow-y-auto">
                                    {searchedResidents.length > 0 ? (
                                        searchedResidents.map((res) => (
                                            <div
                                                key={res.danCuId}
                                                className="p-3 mb-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleHouseholdClick(res)}
                                            >
                                                <p className="text-[16px] font-semibold text-primary-color mb-1">{res.hoTen}</p>
                                                <p className="text-[13px] leading-[16px] font-medium text-gray-600">
                                                    {[
                                                        res.noiThuongTru?.diaChi,
                                                        res.noiThuongTru?.tenAp,
                                                        res.noiThuongTru?.tenXa,
                                                        res.noiThuongTru?.tenHuyen,
                                                        res.noiThuongTru?.tenTinh,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(", ")}
                                                </p>
                                                <p className="text-[13px] leading-[16px] font-medium mt-1">
                                                    <span
                                                        style={{
                                                            color: res.thongTinHoGiaDinh?.hoNgheo
                                                                ? "#c1121f"
                                                                : res.thongTinHoGiaDinh?.hoCanNgheo
                                                                    ? "#ff6d00"
                                                                    : "#018abe",
                                                        }}
                                                    >
                                                        {res.thongTinHoGiaDinh?.hoNgheo
                                                            ? tinhTrangHoGiaDinhs.find(i => i.value === tinhTrangHoGiaDinhs[2]?.value)?.label || "Hộ nghèo"
                                                            : res.thongTinHoGiaDinh?.hoCanNgheo
                                                                ? tinhTrangHoGiaDinhs.find(i => i.value === tinhTrangHoGiaDinhs[1]?.value)?.label || "Hộ cận nghèo"
                                                                : tinhTrangHoGiaDinhs.find(i => i.value === tinhTrangHoGiaDinhs[0]?.value)?.label || "Hộ bình thường"}
                                                    </span>
                                                    {typeof res.thongTinHoGiaDinh?.giaDinhVanHoa === "boolean" && (
                                                        <span
                                                            style={{
                                                                color: res.thongTinHoGiaDinh.giaDinhVanHoa ? "#008000" : "#e66f5c",
                                                            }}
                                                        >
                                                            {`, ${res.thongTinHoGiaDinh.giaDinhVanHoa ? "Gia đình văn hóa" : "Chưa đạt văn hóa"}`}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">Không tìm thấy hộ gia đình</p>
                                    )}
                                </div>
                            </Box>
                        </Sheet>
                    </Box>
                )}
            </Box>
        </Page>
    );
};

export default ResidentMapPage;