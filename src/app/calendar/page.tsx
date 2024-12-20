"use client";
import { useEffect, useState } from 'react';
import { Event } from '@/interfaces/UiInterfaces';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';
import { Calendar, Header, LeftPanel } from "@/components";

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', eventDate: '', eventTime: '', description: '' });
    const [isLoading, setIsLoading] = useState({eventList : false, createEvent : false, updateEvent : false});
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                setIsLoading({eventList : true, createEvent: false, updateEvent : false});
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
              setIsLoading({eventList : false, createEvent: false, updateEvent : false});
            }
        }
        fetchAllEvents();
    }, []);
    
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 lg:p-8"
    >
      <div className="w-full lg:max-w-7xl lg:mx-auto bg-white lg:shadow-xl overflow-hidden lg:rounded-xl">
        <Header/>
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-blue-300 via-purple-300 to-blue-400">
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
            setIsLoading={setIsLoading}
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
}

export default CalendarPage;
