import { EventFormInterface } from '@/interfaces/UiInterfaces';

const EventForm : React.FC<EventFormInterface> = ({ 
    newEvent,
    setNewEvent,
    handleCreateEvent
}) => {
    
  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2 text-black">Create New Event</h3>
        <form onSubmit={handleCreateEvent} className="space-y-4">
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
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
            />
            <input
            className="w-full border rounded p-2 text-black"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            required
            />
            <textarea
            className="w-full border rounded p-2 text-black"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Event</button>
        </form>
    </div>
  )
}

export default EventForm;
