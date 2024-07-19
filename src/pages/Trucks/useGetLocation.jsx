import { useEffect, useState } from 'react';

function useGetLocation() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    return { location, getLocation };
}

export default useGetLocation;
