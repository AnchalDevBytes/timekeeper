'use client'
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import LeftPanel from '@/components/LeftPanel';
import { Event } from '@/interfaces/UiInterfaces';
import Calendar from '@/components/Calendar';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', eventDate: '', eventTime: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
        try {
            setIsLoading(true);
            const { data } = await axiosClient.get("/api/getAllEvent");
            if(data.success !== true) {
                toast.error(data.message);
            } else {
                setEvents(data.events);
            }
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message);
            } else {
            toast.error("Unknown error while creating event...");
            }
        } finally {
            setIsLoading(false);
        }
    }
    fetchAllEvents();
}, []);

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
            isLoading={isLoading}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
          />
          <Calendar 
            currentDate={currentDate} 
            events={events}
            setNewEvent={setNewEvent}
            setEditingEvent={setEditingEvent}
            setIsCreateEventOpen={setIsCreateEventOpen}
          />
        </div>
      </div>
    </div>
  )
};
