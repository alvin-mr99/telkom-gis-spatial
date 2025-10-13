export interface MVTTilesetConfig {
    url: string;
    metadata: any;
    bounds?: [number, number, number, number];
    center?: [number, number];
    zoom?: number;
}

export const JAKARTA_MVT_CONFIG: MVTTilesetConfig = {
    url: 'http://localhost:8080/data/jakarta-population/{z}/{x}/{y}.pbf',
    metadata: {
        name: 'Jakarta Population',
        description: 'Population data for Jakarta administrative areas',
        version: '1.0.0',
        format: 'pbf',
        scheme: 'xyz',
        tiles: ['http://localhost:8080/data/jakarta-population/{z}/{x}/{y}.pbf'],
        minzoom: 0,
        maxzoom: 14
    },
    bounds: [106.6900, -6.3700, 107.1500, -5.9000], // Jakarta bounds
    center: [106.845599, -6.208763], // Jakarta center
    zoom: 10
};

export const createMVTDataset = (config: MVTTilesetConfig, id: string, label: string) => {
    return {
        info: {
            label: label,
            id: id
        },
        data: {
            type: 'mvt',
            url: config.url,
            metadata: config.metadata
        }
    };
};

export const createJakartaConfig = (bounds: [number, number, number, number]) => {
    return {
        version: 'v1',
        config: {
            mapState: {
                bearing: 0,
                pitch: 0,
                longitude: (bounds[0] + bounds[2]) / 2,
                latitude: (bounds[1] + bounds[3]) / 2,
                zoom: 10
            },
            mapStyle: {
                styleType: 'voyager',
                topLayerGroups: {},
                visibleLayerGroups: {
                    'label': true,
                    'road': true,
                    'water': true,
                    'building': false
                }
            },
            visState: {
                filters: [],
                layers: [
                    {
                        id: 'jakarta_population_layer',
                        type: 'mvt',
                        config: {
                            dataId: 'jakarta_population_mvt',
                            label: 'Jakarta Population',
                            color: [255, 153, 31],
                            isVisible: true,
                            visConfig: {
                                opacity: 0.8,
                                strokeOpacity: 0.8,
                                thickness: 1,
                                strokeColor: [255, 255, 255],
                                filled: true,
                                colorRange: {
                                    name: 'Global Warming',
                                    type: 'sequential',
                                    category: 'Uber',
                                    colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300']
                                }
                            }
                        }
                    }
                ],
                interactionConfig: {
                    tooltip: {
                        fieldsToShow: {
                            'jakarta_population_mvt': [
                                { name: 'name', format: null },
                                { name: 'population', format: null },
                                { name: 'area', format: null }
                            ]
                        },
                        enabled: true
                    }
                }
            }
        }
    };
};