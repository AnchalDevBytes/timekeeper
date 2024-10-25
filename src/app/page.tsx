'use client'
import { useState } from 'react';
import Header from '@/components/Header';
import LeftPanel from '@/components/LeftPanel';
import { Event } from '@/interfaces/UiInterfaces';
import Calendar from '@/components/Calendar';

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', date: '2023-05-15', time: '10:00', description: 'Weekly team sync' },
    { id: 2, title: 'Project Deadline', date: '2023-05-20', time: '18:00', description: 'Submit final project' },
  ]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 md:p-8">
      <div className="w-full md:max-w-7xl md:mx-auto bg-white md:rounded-xl md:shadow-xl overflow-hidden">
        <Header/>
        <div className="flex flex-col md:flex-row">
          <LeftPanel 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            events={events}
            setEvents={setEvents}
            isCreateEventOpen={isCreateEventOpen}
            setIsCreateEventOpen={setIsCreateEventOpen}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
          />
          <Calendar currentDate={currentDate} events={events}/>
        </div>
      </div>
    </div>
  )
};
