import { useEffect, useState } from 'react';

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { latitude: null, longitude: null },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError,{
            enableHighAccuracy:false,
            timeout:15000
        });
    }, []);

    return location;
};

export default useGeoLocation;
