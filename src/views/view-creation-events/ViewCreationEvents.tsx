import EventForm from "./components/EventForm";
import EventTable from "./components/EventTable";
import Statistics from "./components/Statistics";

const ViewCreationEvents = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Sistema de gestión de incidencias
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8">
        <div className="space-y-8">
          <EventForm />
          <Statistics />
        </div>
        <EventTable />
      </div>
    </div>
  );
};

export default ViewCreationEvents;
