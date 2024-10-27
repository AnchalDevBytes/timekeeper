import React, { FormEvent } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HiPlus } from 'react-icons/hi';
import { LeftPanelInterface } from '@/interfaces/UiInterfaces';
import EventForm from '@/components/EventForm';
import { toast } from 'react-toastify';
import axiosClient from '@/lib/axiosClient';
import { CreateEventResponseData } from '@/interfaces/createEventResponseData';
import { AxiosResponse } from 'axios';
import SkeletonEvent from './SkeletonEvent';
import { UpdatedEventResponseData } from '@/interfaces/updatedEventResponseData';
import { AiTwotoneDelete } from 'react-icons/ai';

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
            setEvents([...events, data.event]);
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
                handleUpdateEvent={handleUpdateEvent}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                editingEvent={editingEvent}
            />
        )}
        <button onClick={() => setIsCreateEventOpen(!isCreateEventOpen)} className="w-full mb-4 p-2 bg-black text-white rounded flex items-center">
        <HiPlus className="mr-2 h-4 w-4" />
            Create Event
        </button>
        <div className="space-y-2">
            {
              isLoading ? (
                <SkeletonEvent/>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex  justify-between bg-white rounded shadow p-4">
                      <div className='flex flex-col gap-0'>
                        <h3 className="font-semibold text-black">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {event.eventDate} at {event.eventTime}
                        </p>
                      </div>
                      <button onClick={() => handleEventDeletion(event.id)}>
                        <AiTwotoneDelete className='text-lg text-red-400' />
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
