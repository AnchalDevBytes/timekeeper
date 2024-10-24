import { Dispatch, FormEvent, SetStateAction } from "react";

export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    description: string;
}

export interface NewEvent {
    title: string;
    date: string;
    time: string;
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
}

export interface EventFormInterface {
    newEvent : {
        title: string;
        date: string;
        time: string;
        description: string;
    }
    setNewEvent : Dispatch<SetStateAction<{
        title: string;
        date: string;
        time: string;
        description: string;
    }>>
    handleCreateEvent : (e : FormEvent) => void;
}

export interface CalendarInterface {
    currentDate : Date;
    events : Event[]
}
