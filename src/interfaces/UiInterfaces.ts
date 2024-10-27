import { Dispatch, FormEvent, SetStateAction } from "react";
import { ChangeEventHandler } from "react";

export interface Event {
    id: number;
    title: string;
    eventDate: string;
    eventTime: string;
    description: string;
}

export interface NewEvent {
    title: string;
    eventDate: string;
    eventTime: string;
    description: string;
}

export interface LeftPanelInterface {
    currentDate : Date;
    setCurrentDate : Dispatch<SetStateAction<Date>>;
    events : Event[]
    setEvents : Dispatch<SetStateAction<Event[]>>
    isCreateEventOpen : boolean;
    setIsCreateEventOpen : Dispatch<SetStateAction<boolean>>
    newEvent : NewEvent
    setNewEvent : Dispatch<SetStateAction<NewEvent>>
    isLoading : boolean
    editingEvent : Event | null
    setEditingEvent : Dispatch<SetStateAction<Event | null>>

}

export interface EventFormInterface {
    newEvent : NewEvent
    setNewEvent : Dispatch<SetStateAction<NewEvent>>
    handleCreateEvent : (e : FormEvent) => void;
    handleUpdateEvent : (e : FormEvent) => void;
    editingEvent : Event | null
}

export interface CalendarInterface {
    currentDate : Date;
    events : Event[]
    setNewEvent : Dispatch<SetStateAction<NewEvent>>
    setEditingEvent : Dispatch<SetStateAction<Event | null>>
    setIsCreateEventOpen : Dispatch<SetStateAction<boolean>>
}

export interface labelledInputType {
    label : string,
    id: string,
    type?: "text" | "password" | "email",
    placeholder: string,
    changeHandler: ChangeEventHandler
}
