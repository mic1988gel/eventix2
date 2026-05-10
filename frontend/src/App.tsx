import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header'; import BottomNav from './components/common/BottomNav'; import Home from './pages/Home'; import Events from './pages/Events'; import Map from './pages/Map'; import Profile from './pages/Profile'; import CreateEvent from './pages/CreateEvent'; import EventDetails from './pages/EventDetails';


function App() { return ( <BrowserRouter> <div className="flex flex-col min-h-screen bg-gray-50">


<main className="flex-1 pb-16"> <Routes> <Route path="/" element={<Home />} /> <Route path="/events" element={<Events />} /> <Route path="/map" element={<Map />} /> <Route path="/profile" element={<Profile />} /> <Route path="/create" element={<CreateEvent />} /> <Route path="/events/:id" element={<EventDetails />} /> </Routes> </main> <BottomNav /> </div> </BrowserRouter> ); }


export default App;

