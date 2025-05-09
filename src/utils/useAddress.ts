import { useState, useEffect, useRef } from 'react';
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import http from "services/http";
import { OptionsType } from './options';

interface AddressField {
  tinh: string;
  huyen: string;
  xa: string;
  diaChi: string;
  latitude: number | null;
  longitute: number | null;
  loaiCuTruId?: number;
  tuNgay?: string | null;
  denNgay?: string | null;
}

interface UseAddressSelectorProps {
  prefix: string; // Tiền tố trường (ví dụ: "noiThuongTru", "noiTamTru")
  tinhOptions: { value: string; label: string }[]; // Danh sách tỉnh
  watch: UseFormWatch<any>; // Hàm watch từ react-hook-form
  setValue: UseFormSetValue<any>; // Hàm setValue từ react-hook-form
}

interface AddressSelectorReturn {
  huyenOptions: { value: string; label: string }[];
  xaOptions: { value: string; label: string }[];
  apOptions: { value: number; label: string }[];
  watchedTinh: string;
  watchedHuyen: string;
  watchedXa: string;
}

// export const useAddressSelector = ({
//   prefix,
//   tinhOptions,
//   watch,
//   setValue,
// }: UseAddressSelectorProps): AddressSelectorReturn => {
//   const [huyenOptions, setHuyenOptions] = useState<{ value: string; label: string }[]>([]);
//   const [xaOptions, setXaOptions] = useState<{ value: string; label: string }[]>([]);
//   const [apOptions, setApOptions] = useState<{ value: number; label: string }[]>([]);

//   const watchedTinh = watch(`${prefix}.tinh`);
//   const watchedHuyen = watch(`${prefix}.huyen`);
//   const watchedXa = watch(`${prefix}.xa`);

//   // Gọi API lấy danh sách huyện khi tỉnh thay đổi
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       if (watchedTinh) {
//         try {
//           const response = await http.get<any>(`/huyen/tinh/${watchedTinh}`);
//           const districts = response.data.map((item: any) => ({
//             value: item.maHuyen,
//             label: item.tenHuyen,
//           }));
//           setHuyenOptions(districts);
//           setValue(`${prefix}.huyen`, "");
//           setValue(`${prefix}.xa`, "");
//           setValue(`${prefix}.apId`, "");
//           setXaOptions([]);
//         } catch (error) {
//           console.error(`Lỗi khi lấy danh sách huyện (${prefix}):`, error);
//         }
//       }
//     };
//     fetchDistricts();
//   }, [watchedTinh, setValue, prefix]);

//   // Gọi API lấy danh sách xã khi huyện thay đổi
//   useEffect(() => {
//     const fetchWards = async () => {
//       if (watchedHuyen) {
//         try {
//           const response = await http.get<any>(`/xa/huyen/${watchedHuyen}`);
//           const wards = response.data.map((item: any) => ({
//             value: item.maXa,
//             label: item.tenXa,
//           }));
//           setXaOptions(wards);
//           setValue(`${prefix}.xa`, "");
//           setValue(`${prefix}.apId`, "");
//         } catch (error) {
//           console.error(`Lỗi khi lấy danh sách xã (${prefix}):`, error);
//         }
//       }
//     };
//     fetchWards();
//   }, [watchedHuyen, setValue, prefix]);

//   // Gọi API lấy danh sách ấp khi xã thay đổi
//   useEffect(() => {
//     const fetchAps = async () => {
//       if (watchedXa) {
//         try {
//           const response = await http.get<any>(`/ap/xa/${watchedXa}`);
//           const aps = response.data.map((item: any) => ({
//             value: item.apId,
//             label: item.tenAp,
//           }));
//           setApOptions(aps);
//           setValue(`${prefix}.apId`, "");
//         } catch (error) {
//           console.error(`Lỗi khi lấy danh sách ấp (${prefix}):`, error);
//         }
//       }
//     };
//     fetchAps();
//   }, [watchedXa, setValue]);

//   return {
//     huyenOptions,
//     xaOptions,
//     apOptions,
//     watchedTinh,
//     watchedHuyen,
//     watchedXa
//   };
// };

export const setAddressStepByStep = async (
  prefix: "noiThuongTru" | "noiTamTru",
  data: {
    tinh?: string;
    huyen?: string;
    xa?: string;
    apId?: number;
  },
  setValue: UseFormSetValue<any>, // từ react-hook-form
  delay = 100 // delay mặc định giữa các bước
) => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  if (data.tinh) {
    await sleep(delay);
    setValue(`${prefix}.tinh`, data.tinh);
  }

  if (data.huyen) {
    await sleep(delay);
    setValue(`${prefix}.huyen`, data.huyen);
  }

  if (data.xa) {
    await sleep(delay);
    setValue(`${prefix}.xa`, data.xa);
  }

  if (data.apId) {
    await sleep(delay);
    setValue(`${prefix}.apId`, data.apId);
  }
};

export const useAddressSelector = ({
  prefix,
  tinhOptions,
  watch,
  setValue,
}: UseAddressSelectorProps): AddressSelectorReturn => {
  const [huyenOptions, setHuyenOptions] = useState<{ value: string; label: string }[]>([]);
  const [xaOptions, setXaOptions] = useState<{ value: string; label: string }[]>([]);
  const [apOptions, setApOptions] = useState<{ value: number; label: string }[]>([]);

  const watchedTinh = watch(`${prefix}.tinh`);
  const watchedHuyen = watch(`${prefix}.huyen`);
  const watchedXa = watch(`${prefix}.xa`);

  const prevTinh = useRef<string | null>(null);
  const prevHuyen = useRef<string | null>(null);
  const prevXa = useRef<string | null>(null);

  const isInitialMount = useRef(true);

  // Fetch huyện
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await http.get<any>(`/huyen/tinh/${watchedTinh}`);
        const districts = response.data.map((item: any) => ({
          value: item.maHuyen,
          label: item.tenHuyen,
        }));
        setHuyenOptions(districts);
      } catch (error) {
        console.error(`Lỗi khi lấy danh sách huyện (${prefix}):`, error);
      }
    };

    if (!watchedTinh) return;

    prevTinh.current = watchedTinh;
    fetchDistricts();

    if (!isInitialMount.current) {
      setValue(`${prefix}.huyen`, "");
      setValue(`${prefix}.xa`, "");
      setValue(`${prefix}.apId`, "");
      setXaOptions([]);
      setApOptions([]);
    }
  }, [watchedTinh, setValue, prefix]);

  // Fetch xã
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await http.get<any>(`/xa/huyen/${watchedHuyen}`);
        const wards = response.data.map((item: any) => ({
          value: item.maXa,
          label: item.tenXa,
        }));
        setXaOptions(wards);
      } catch (error) {
        console.error(`Lỗi khi lấy danh sách xã (${prefix}):`, error);
      }
    };

    if (!watchedHuyen) return;

    prevHuyen.current = watchedHuyen;
    fetchWards();

    if (!isInitialMount.current) {
      setValue(`${prefix}.xa`, "");
      setValue(`${prefix}.apId`, "");
      setApOptions([]);
    }
  }, [watchedHuyen, setValue, prefix]);

  // Fetch ấp
  useEffect(() => {
    const fetchAps = async () => {
      try {
        const response = await http.get<any>(`/ap/xa/${watchedXa}`);
        const aps = response.data.map((item: any) => ({
          value: item.apId,
          label: item.tenAp,
        }));
        setApOptions(aps);
      } catch (error) {
        console.error(`Lỗi khi lấy danh sách ấp (${prefix}):`, error);
      }
    };

    if (!watchedXa) return;

    prevXa.current = watchedXa;
    fetchAps();

    if (!isInitialMount.current) {
      setValue(`${prefix}.apId`, "");
    }
  }, [watchedXa, setValue, prefix]);

  // Chỉ chạy lần đầu để tránh reset dữ liệu khi load detail
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return {
    huyenOptions,
    xaOptions,
    apOptions,
    watchedTinh,
    watchedHuyen,
    watchedXa,
  };
};

interface AddressSelectorWithoutPrefixReturn {
  huyenOptions: { value: string; label: string }[];
  xaOptions: { value: string; label: string }[];
  apOptions: { value: number; label: string }[];
  watchedTinh: string;
  watchedHuyen: string;
  watchedXa: string;
}

interface UseAddressSelectorWithoutPrefixProps {
  tinhOptions: { value: string; label: string }[];
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export const useAddressSelectorWithoutPrefix = ({
  tinhOptions,
  watch,
  setValue,
}: UseAddressSelectorWithoutPrefixProps): AddressSelectorWithoutPrefixReturn => {
  const [huyenOptions, setHuyenOptions] = useState<{ value: string; label: string }[]>([]);
  const [xaOptions, setXaOptions] = useState<{ value: string; label: string }[]>([]);
  const [apOptions, setApOptions] = useState<{ value: number; label: string }[]>([]);

  const watchedTinh = watch("maTinh");
  const watchedHuyen = watch("maHuyen");
  const watchedXa = watch("maXa");

  // Gọi API lấy danh sách huyện khi tỉnh thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (watchedTinh) {
        try {
          const response = await http.get<any>(`/huyen/tinh/${watchedTinh}`);
          const districts = response.data.map((item: any) => ({
            value: item.maHuyen,
            label: item.tenHuyen,
          }));
          setHuyenOptions(districts);
          setValue("maHuyen", ""); // Reset huyện khi tỉnh thay đổi
          setValue("maXa", ""); // Reset xã khi tỉnh thay đổi
          setXaOptions([]); // Reset danh sách xã
        } catch (error) {
          console.error("Lỗi khi lấy danh sách huyện:", error);
        }
      }
    };
    fetchDistricts();
  }, [watchedTinh, setValue]);

  // Gọi API lấy danh sách xã khi huyện thay đổi
  useEffect(() => {
    const fetchWards = async () => {
      if (watchedHuyen) {
        try {
          const response = await http.get<any>(`/xa/huyen/${watchedHuyen}`);
          const wards = response.data.map((item: any) => ({
            value: item.maXa,
            label: item.tenXa,
          }));
          setXaOptions(wards);
          setValue("maXa", ""); // Reset xã khi huyện thay đổi
        } catch (error) {
          console.error("Lỗi khi lấy danh sách xã:", error);
        }
      }
    };
    fetchWards();
  }, [watchedHuyen, setValue]);

  // Gọi API lấy danh sách xã khi xã thay đổi
  useEffect(() => {
    const fetchAps = async () => {
      if (watchedXa) {
        try {
          const response = await http.get<any>(`/ap/xa/${watchedXa}`);
          const aps = response.data.map((item: any) => ({
            value: item.apId,
            label: item.tenAp,
          }));
          setApOptions(aps);
          setValue("apId", ""); // reset ấp khi xã thay đổi
        } catch (error) {
          console.error("Lỗi khi lấy danh sách ấp:", error);
        }
      }
    };
    fetchAps();
  }, [watchedXa, setValue]);

  return {
    huyenOptions,
    xaOptions,
    apOptions,
    watchedTinh,
    watchedHuyen,
    watchedXa
  };
};

export const useResidentAddress = (prefix: string, tinhs: OptionsType[], watch: any, setValue: any) => {
  const {
    huyenOptions,
    xaOptions,
    apOptions,
    watchedTinh,
    watchedHuyen,
    watchedXa
  } = useAddressSelector({
    prefix,
    tinhOptions: tinhs,
    watch,
    setValue,
  });

  return {
    huyenOptions,
    xaOptions,
    apOptions,
    watchedTinh,
    watchedHuyen,
    watchedXa
  };
};

export const formatAddress = (data?: any) => {
  if (!data) return "";
  return [
    data.diaChi,
    data.tenAp,
    data.tenXa,
    data.tenHuyen,
    data.tenTinh
  ].filter(Boolean).join(", ");
};