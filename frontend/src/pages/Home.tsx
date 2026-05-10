import { useEffect, useState } from 'react';
import EventCard from '../components/Events/EventCard'; import { useApi } from '../hooks/useApi';


export default function Home() { const [events, setEvents] = useState([]); const { get } = useApi();


useEffect(() => { get('/events?limit=3').then(data => setEvents(data)); }, []);


return ( <div className="p-4"> <h1 className="text-2xl font-bold mb-4">👋 Привет, пользователь!</h1> <div className="grid gap-3"> {events.map((event: any) => ( <EventCard key={event.id} event={event} /> ))} </div> <div className="flex gap-4 mt-6"> <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">🔍 Найти событие</button> <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">✨ Создать встречу</button> </div> <div className="flex gap-2 mt-4"> <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Сегодня</span> <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">На выходных</span> <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Бесплатные</span> </div> </div> ); }

