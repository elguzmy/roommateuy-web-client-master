import currentPositionMarker from '../../statics/img/spotlight-poi2.png';

let map;
let ui;

export const createMap = ({ state, mapEvents }) => {
    if (state.center) {
        const platform = new window.H.service.Platform(state);

        var layer = platform.createDefaultLayers();
        var mapContainer = document.getElementById('here-map');


        map = new window.H.Map(mapContainer, layer.normal.traffic, {
            center: {
                lat: state.center.lat,
                lng: state.center.lng,
            },
            zoom: state.zoom,
        });

        window.H.util.animation.ease.LINEAR(0.9);

        const events = new window.H.mapevents.MapEvents(map);
        const behavior = new window.H.mapevents.Behavior(events);

        ui = new window.H.ui.UI.createDefault(map, layer);

        // Create an icon, an object holding the latitude and longitude, and a marker:

        var icon = new window.H.map.Icon(currentPositionMarker),
            coords = {
                lat: state.center.lat,
                lng: state.center.lng,
            },
            marker = new window.H.map.Marker(coords, { icon: icon });

        if (events) {
            for (let eventName in mapEvents) {
                if (mapEvents.hasOwnProperty(eventName)) {
                    try {
                        map.addEventListener(eventName, (e) => {
                            mapEvents[eventName](e, map);
                        });
                    } catch (e) {
                        console.log('Unknown event');
                    }
                }
            }
        }

        behavior.disable(window.H.mapevents.Behavior.WHEELZOOM);
        behavior.disable(window.H.mapevents.Behavior.DBLTAPZOOM);

        // Add the marker to the map and center the map at the location of the marker:
        map.addObject(marker);
        map.setCenter(coords);
    }
};

let markersGroup;

export const addToMarkersGroup = markers => {
    if (!markersGroup) {
        markersGroup = new window.H.map.Group();

        markersGroup.addEventListener('tap', function (evt) {
            const bubble =  new window.H.ui.InfoBubble(evt.target.getPosition(), {
                content: evt.target.getData()
            });

            ui.addBubble(bubble);
        }, false);
    } else {
        markersGroup.removeAll();
    }

    const { lat, lng } = map.getCenter();

    markers.forEach(marker => {
        const { markerObject, html } = marker;
        const markerPosition = markerObject.getPosition();
        const distanceFromCenter = getDistanceFromLatLonInKm(lat, lng, markerPosition.lat, markerPosition.lng);

        if (distanceFromCenter <= 2) {
            markerObject.setData(html);
            markersGroup.addObject(markerObject);
        }
    });

    map.addObject(markersGroup);
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt( 1 - a ));

    return R * c;
};

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export const moveMap = (lat, lng, zoom) => {
    if (lat && lng && zoom && map) {
        map.setCenter({ lat: lat, lng: lng }, true);
        map.setZoom(zoom, true);
    }
};