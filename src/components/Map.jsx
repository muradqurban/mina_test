import { useEffect } from "react"
import 'ol/ol.css'
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import OSM from "ol/source/OSM"
import Feature from "ol/Feature"
import { LineString } from "ol/geom"
import { fromLonLat } from "ol/proj"
import { Style, Stroke} from "ol/style"
import { useSelectedData } from "../utils"

export default function MapComponent() {
    const coordinate = useSelectedData()

    useEffect(()=>{
        const lineString = new LineString([
            fromLonLat([coordinate[0].split(' ')[0], coordinate[0].split(' ')[1]]),
            fromLonLat([coordinate[1].split(' ')[0], coordinate[0].split(' ')[1]])
        ]);

        const vectorSource = new VectorSource({
            features: [new Feature(lineString)]
        })

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 2,
                })
            })
        })

        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([coordinate[0].split(' ')[0], coordinate[0].split(' ')[1]]),
                zoom: 17,
            })
        })

        return () => {
            map.setTarget(null)
        }
    },[coordinate])
    return(
        <div id="map" className="w-[500px] h-[500px]"></div>
    )
}