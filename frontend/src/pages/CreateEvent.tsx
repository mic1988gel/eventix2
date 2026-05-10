import { CreateEventForm } from "../components/Events/CreateEvent";
import { Header } from "../components/common/Header";

export default function CreateEventPage() {
  return (
    <main>
      <Header title="Создание события" />
      <CreateEventForm />
    </main>
  );
}
