import { EventFormInterface } from '@/interfaces/UiInterfaces';
import { FaClock, FaRegCalendarAlt } from 'react-icons/fa';
import { MdDescription, MdTitle } from 'react-icons/md';

const EventForm : React.FC<EventFormInterface> = ({ 
    newEvent,
    setNewEvent,
    handleCreateEvent,
    handleUpdateEvent,
    editingEvent
}) => {
    
  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-purple-200">
      <h3 className="font-bold mb-4 text-xl text-purple-800">
        { editingEvent ? "Update Event" : "Create New Event" }
      </h3>
      <form onSubmit={ editingEvent ? handleUpdateEvent : handleCreateEvent } className="space-y-4">
        <div className="relative">
          <MdTitle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            className="w-full border border-purple-300 rounded-lg p-3 pl-10 text-purple-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
        </div>
        <div className="relative">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            className="w-full border border-purple-300 rounded-lg p-3 pl-10 text-purple-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type="date"
            value={newEvent.eventDate}
            onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
            required
          />
        </div>
        <div className="relative">
          <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            className="w-full border border-purple-300 rounded-lg p-3 pl-10 text-purple-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            type="time"
            value={newEvent.eventTime}
            onChange={(e) => setNewEvent({ ...newEvent, eventTime: e.target.value })}
            required
          />
        </div>
        <div className="relative">
          <MdDescription className="absolute left-3 top-3 text-purple-500" />
          <textarea
            className="w-full border border-purple-300 rounded-lg p-3 pl-10  text-purple-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            rows={3}
          />
        </div>
        <button 
          type="submit" 
          className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          { editingEvent ? "Update Event" : "Create New Event" }
        </button>
      </form>
    </div>
  )
}

export default EventForm;
