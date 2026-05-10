import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


interface EventMapProps { events: { id: number; title: string; latitude: number; longitude: number }[]; }


export default function EventMap({ events }: EventMapProps) { return ( <MapContainer center={[55.7558, 37.6173]} zoom={11} className="h-full w-full"> <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> {events.map(event => ( <Marker key={event.id} position={[event.latitude, event.longitude]}> <Popup>{event.title}</Popup> </Marker> ))} </MapContainer> ); }

