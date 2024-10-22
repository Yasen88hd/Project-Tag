import {StyleSheet, TouchableOpacity, useColorScheme, View} from 'react-native';
import React, {RefObject, useEffect, useLayoutEffect, useRef} from "react";
import {container} from "ansi-fragments";
import {Helmet} from "react-native-helmet-async";

export function MapView() {
    const insertScript = `
            <script type="module">
                import("https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js").then(
                    () => {
                        var map = new maplibregl.Map({
                            container: 'map', // container ID
                            style: 'https://demotiles.maplibre.org/style.json', // style URL
                            center: [-74.0060, 40.7128], // starting position [lng, lat] (New York City)
                            zoom: 9, // starting zoom
                        });
                    }
                );
            </script>`;
    const elRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (elRef.current != null) {
            const range = document.createRange();
            range.selectNode(elRef.current);
            const documentFragment = range.createContextualFragment(insertScript);

            // Inject the markup, triggering a re-run!
            // elRef.current.innerHTML = '';
            elRef.current.append(documentFragment);
        }
    }, []);
    return (
        <div style={styles.container} ref={elRef}>
            <div id="map" style={styles.map}></div>
            <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css"/>
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: '100%',
    },
    map: {
        height: '100%',
    },
});
