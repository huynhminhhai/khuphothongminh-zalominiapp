import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Page, Sheet } from "zmp-ui";
import { HeaderSub } from "components/header-sub";
import "leaflet.heat";
import { LegendNote } from "components/maps";
import { Icon } from "@iconify/react";
import { useGetResidentListNormal } from "apiRequest/resident";
import { useStoreApp } from "store/store";
import { EmptyData } from "components/data";

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

const ResidentMapPage = () => {

    const { account, tinhTrangHoGiaDinhs } = useStoreApp();

    const [sheetVisible, setSheetVisible] = useState(false);
    const [filter, setFilter] = useState<"poor" | "culture">("poor");

    const handleSetFilter = useCallback((value: "poor" | "culture") => {
        setFilter(value);
    }, []);

    const [param, setParam] = useState({
        page: 1,
        pageSize: 9999999,
        ApId: account ? account?.apId : 0,
        keyword: '',
        HoTen: '',
        HoTenChuHo: '',
        SoGiayTo: '',
        LaChuHo: false
    })

    const { data, isLoading } = useGetResidentListNormal(param);

    function locChuHoCoToaDo(data: any[]) {
        // Lọc ra chủ hộ có tọa độ
        const chuHos = data.filter(danCu => {
            const laChuHo = danCu.laChuHo === true;
            const thuongTru = danCu.noiThuongTru;
            const coToaDo = thuongTru?.latitude != null && thuongTru?.longitude != null;
            return laChuHo && coToaDo;
        });

        // Đếm số thành viên của mỗi hộ (giả sử cùng maHoKhau)
        return chuHos.map(chuHo => {
            const soThanhVien = data.filter(dc => dc.hoTenChuHo === chuHo.hoTenChuHo).length;
            return {
                ...chuHo,
                soThanhVien,
            };
        });
    }

    const residents = locChuHoCoToaDo(data?.data || []);

    const filteredResidents = residents.filter((res) => {
        if (filter === "poor") return !!res.tinhTrangHoGiaDinhId;
        if (filter === "culture") return typeof res.giaDinhVanHoa === "boolean";
        return false;
    });

    const center: [number, number] = useMemo(() => {
        if (residents.length > 0) {
            const { latitude, longitude } = residents[0].noiThuongTru;
            return [latitude, longitude];
        }
        return [10.520740944310496, 106.47778872238479];
    }, [residents]);
    const zoom = 15;

    const getMarkerIcon = useCallback((status: any) => {

        const binthuong = tinhTrangHoGiaDinhs[0]?.value;
        const hoCanNgheo = tinhTrangHoGiaDinhs[1]?.value;
        const hoNgheo = tinhTrangHoGiaDinhs[2]?.value;

        const color = {
            [binthuong]: "blue",
            [hoCanNgheo]: "orange",
            [hoNgheo]: "red",
            true: "green",
            false: "orange",
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
    }, [tinhTrangHoGiaDinhs]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Bản đồ" />

                {
                    isLoading ?
                        <div className="relative w-full h-[calc(100vh-56px)] bg-gray-300 rounded">
                            <Icon fontSize={48} color="white" icon='eos-icons:bubble-loading' className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        :
                        filteredResidents.length > 0 ?
                            <Box>
                                <Box className="relative">
                                    <LegendNote tinhTrang={tinhTrangHoGiaDinhs} filter={filter} />
                                    <Box className="absolute top-[72px] right-3 z-[9999] border-[2px] rounded-md border-[#00000033]">
                                        <button onClick={() => setSheetVisible(true)} className="p-2 bg-white text-[#a8a8a8] rounded-[5px] opacity-95">
                                            <Icon fontSize={26} icon='line-md:filter-twotone' />
                                        </button>
                                    </Box>
                                    <MapContainer style={{ height: "calc(100vh - 58px)", width: "100%" }} center={center} zoom={zoom}>
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
                                        {
                                            filteredResidents.map((res, index) => (
                                                <Marker key={index} position={[res.noiThuongTru.latitude, res.noiThuongTru.longitude]} icon={filter === "poor" ? getMarkerIcon(res.tinhTrangHoGiaDinhId) : getMarkerIcon(res.giaDinhVanHoa)}>
                                                    <Popup>
                                                        <div className="mt-2">
                                                            <ul className="flex flex-col gap-1 p-3 rounded-xl bg-gray-50 shadow-sm text-sm text-gray-700 w-full max-w-xs">
                                                                
                                                                <li className="flex gap-1">
                                                                    <span className="font-medium text-gray-500">Chủ hộ:</span>
                                                                    <span className="font-semibold text-gray-800 truncate">{res.hoTen}</span>
                                                                </li>
                                                                <li className="flex gap-1">
                                                                    <span className="font-medium text-gray-500">Số thành viên:</span>
                                                                    <span className="font-semibold text-gray-800">{res.soThanhVien}</span>
                                                                </li>
                                                                <li className="flex gap-1">
                                                                    <span className="font-medium text-gray-500">Tình trạng:</span>
                                                                    <span className="font-semibold text-gray-800">
                                                                        {
                                                                            filter === "poor"
                                                                                ? tinhTrangHoGiaDinhs.find(i => i.value === res.tinhTrangHoGiaDinhId)?.label || "Không rõ"
                                                                                : res.giaDinhVanHoa ? "Gia đình văn hóa" : "Chưa đạt văn hóa"
                                                                        }
                                                                    </span>
                                                                </li>
                                                                <li className="flex flex-col">
                                                                    <span className="text-[13px] font-semibold text-gray-800">
                                                                        {[res?.noiThuongTru?.diaChi, res?.noiThuongTru?.tenAp, res?.noiThuongTru?.tenXa, res?.noiThuongTru?.tenHuyen, res?.noiThuongTru?.tenTinh]
                                                                            .filter(Boolean)
                                                                            .join(", ")}
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            ))
                                        }

                                        <FitBounds residents={residents} />
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
                                                            <p className="text-[13px] text-center font-bold">Hộ nghèo & cận nghèo</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer" onClick={() => handleSetFilter("culture")}>
                                                <input type="radio" className="peer sr-only" name="pricing" />
                                                <div className="w-full max-w-xl rounded-md bg-white p-2 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary-color peer-checked:ring-primary-color peer-checked:ring-offset-2">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-end justify-center">
                                                            <p className="text-[13px] text-center font-bold">Gia đình văn hóa</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </Box>
                                </Sheet>
                            </Box>

                            : <EmptyData title="Không có dữ liệu" />
                }


            </Box>
        </Page>
    );
};

export default ResidentMapPage;
