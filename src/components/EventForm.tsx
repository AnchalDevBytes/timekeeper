import { EventFormInterface } from '@/interfaces/UiInterfaces';

const EventForm : React.FC<EventFormInterface> = ({ 
    newEvent,
    setNewEvent,
    handleCreateEvent,
    handleUpdateEvent,
    editingEvent
}) => {
    
  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2 text-black">
            { editingEvent ? "Update Event" : "Create New Event" }
        </h3>
        <form onSubmit={ editingEvent ? handleUpdateEvent : handleCreateEvent } className="space-y-4">
            <input
            className="w-full border rounded p-2 text-black"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
            />
            <input
            className="w-full border rounded p-2 text-black"
            type="date"
            value={newEvent.eventDate}
            onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
            required
            />
            <input
            className="w-full border rounded p-2 text-black"
            type="time"
            value={newEvent.eventTime}
            onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
            required
            />
            <textarea
            className="w-full border rounded p-2 text-black"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
              { editingEvent ? "Update Event" : "Create New Event" }
            </button>
        </form>
    </div>
  )
}

export default EventForm;
