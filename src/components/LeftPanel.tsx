import React, { FormEvent } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiPlus } from 'react-icons/hi';
import { LeftPanelInterface } from '@/interfaces/UiInterfaces';
import { toast } from 'react-toastify';
import axiosClient from '@/lib/axiosClient';
import { CreateEventResponseData } from '@/interfaces/createEventResponseData';
import { AxiosResponse } from 'axios';
import { UpdatedEventResponseData } from '@/interfaces/updatedEventResponseData';
import { AiTwotoneDelete } from 'react-icons/ai';
import { EventForm, SkeletonEvent } from "@/components";

const LeftPanel : React.FC<LeftPanelInterface> = ({ 
    currentDate,
    setCurrentDate,
    events,
    setEvents,
    isCreateEventOpen,
    newEvent,
    setIsCreateEventOpen,
    setNewEvent,
    isLoading,
    editingEvent,
    setEditingEvent,
}) => {

      const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
      };
    
      const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
      };

      const handleCreateEvent = async (e : FormEvent) => {
        e.preventDefault();
        try {
          const { data } : AxiosResponse<CreateEventResponseData> = await axiosClient.post("/api/create-event", newEvent);
          if(data.success !== true) {
            toast.error(data.message);
          } else {
            setEvents([data.event, ...events]);
            setNewEvent({ title: '', eventDate: '', eventTime: '', description: '' });
            setIsCreateEventOpen(false);
            toast.success(data.message);
          }
        } catch (error) {
          if(error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Unknown error while creating event...");
          }
        }
      };

      const handleUpdateEvent = async (e : FormEvent) => {
        e.preventDefault();
        if(!editingEvent) return;
        try {
          const { data } : AxiosResponse<UpdatedEventResponseData> = await axiosClient.post(`/api/updateEvent/?id=${editingEvent?.id}`, newEvent);
          if(data.success !== true) {
            toast.error(data.message);
          } else {
            setEvents(events.map((event) => event.id  === editingEvent.id ? data.updatedEvent : event));
            setNewEvent({ title: '', eventDate: '', eventTime: '', description: '' });
            setIsCreateEventOpen(false);
            setEditingEvent(null);
            toast.success(data.message);
          }
        } catch (error) {
          if(error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Unknown error while updating event...");
          }
        }
      }

      const handleEventDeletion = async (eventId : number) => {
        try {
          const { data } : AxiosResponse = await axiosClient.post(`/api/deleteEvent/?id=${eventId}`);
          if(data.success !== true) {
            toast.error(data.message);
          } else {
            setEvents(events.filter((event) => event.id !== eventId));
            toast.success(data.message);
          }
        } catch (error) {
          if(error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Unknown error occured while deleting the event...");
          }
        }
      }

  return (
    <aside className="w-full lg:w-96 bg-white p-4 border-b lg:border-r border-gray-200">
        <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors duration-200">
            <IoIosArrowBack className="h-6 w-6" />
            </button>
            <span className="font-bold text-xl text-purple-600">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="pp-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors duration-200">
            <IoIosArrowForward className="h-6 w-6" />
            </button>
        </div>
        {isCreateEventOpen && (
            <EventForm 
                handleCreateEvent={handleCreateEvent}
                handleUpdateEvent={handleUpdateEvent}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                editingEvent={editingEvent}
            />
        )}
        <button onClick={() => setIsCreateEventOpen(!isCreateEventOpen)} className="w-full mb-6 p-3 bg-gradient-to-r from-blue-500 to bg-purple-600 text-white rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:translate-y-1">
        <HiPlus className="mr-2 h-5 w-5" />
            Create Event
        </button>
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
            {
              isLoading ? (
                <SkeletonEvent/>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex  justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 transform hover:translate-y-1 border-l-4 border-purple-500">
                      <div className='flex flex-col gap-0'>
                        <h3 className="font-semibold text-purple-600">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {event.eventDate} at {event.eventTime}
                        </p>
                      </div>
                      <button onClick={() => handleEventDeletion(event.id)}>
                        <AiTwotoneDelete className='text-lg text-red-400 hover:text-red-500 transition-colors duration-200' />
                      </button>
                  </div>
                ))
              )
            }
        </div>
    </aside>
  )
}

export default LeftPanel;
