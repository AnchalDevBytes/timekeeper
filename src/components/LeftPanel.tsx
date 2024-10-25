import React, { FormEvent } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiPlus } from 'react-icons/hi';
import { LeftPanelInterface } from '@/interfaces/UiInterfaces';
import EventForm from './EventForm';

const LeftPanel : React.FC<LeftPanelInterface> = ({ 
    currentDate,
    setCurrentDate,
    events,
    setEvents,
    isCreateEventOpen,
    newEvent,
    setIsCreateEventOpen,
    setNewEvent
}) => {

      const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
      };
    
      const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
      };

      const handleCreateEvent = (e : FormEvent) => {
        e.preventDefault()
        setEvents([...events, { id: events.length + 1, ...newEvent }])
        setNewEvent({ title: '', date: '', time: '', description: '' })
        setIsCreateEventOpen(false)
      };

  return (
    <aside className="w-full md:w-64 bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 text-gray-600 hover:bg-gray-200 rounded">
            <IoIosArrowBack className="h-4 w-4" />
            </button>
            <span className="font-semibold text-black">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="p-2 text-gray-600 hover:bg-gray-200 rounded">
            <IoIosArrowForward className="h-4 w-4" />
            </button>
        </div>
        {isCreateEventOpen && (
            <EventForm 
                handleCreateEvent={handleCreateEvent}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
            />
        )}
        <button onClick={() => setIsCreateEventOpen(!isCreateEventOpen)} className="w-full mb-4 p-2 bg-black text-white rounded flex items-center">
        <HiPlus className="mr-2 h-4 w-4" />
            Create Event
        </button>
        <div className="space-y-2">
            {events.map((event) => (
            <div key={event.id} className="bg-white rounded shadow p-4">
                <h3 className="font-semibold text-black">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
            </div>
            ))}
        </div>
    </aside>
  )
}

export default LeftPanel;
