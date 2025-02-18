import { districtOptions, provinceOptions, wardOptions } from 'constants/mock';
import { useState, useEffect } from 'react';

const useAddress = (selectedProvince: number, selectedDistrict: number) => {
    const [provinces, setProvinces] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);

    useEffect(() => {

        const fetchProvinces = () => {
            try {
                console.log('call API to fetch provinces...');
                setProvinces(provinceOptions);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {

            const fetchDistricts = () => {
                try {
                    console.log('call API to fetch districts...');
                    const filteredDistricts = districtOptions.filter((d) => d.province.id === selectedProvince);
                    setDistricts(filteredDistricts.map(({ id, name }) => ({ value: id, label: name })));
                    setWards([]);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            };
            fetchDistricts();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            
            const fetchWards = () => {
                try {
                    console.log('call API to fetch wards...');
                    const filteredWards = wardOptions.filter((w) => w.district.id === selectedDistrict);
                    setWards(filteredWards.map(({ id, name }) => ({ value: id, label: name })));
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            };
            fetchWards();
        }
    }, [selectedDistrict]);

    return {
        provinces,
        districts,
        wards,
    };
};

export default useAddress;
