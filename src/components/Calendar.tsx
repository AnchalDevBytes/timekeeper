import { CalendarInterface } from '@/interfaces/UiInterfaces';

const Calendar : React.FC<CalendarInterface> = ({ currentDate, events, setEditingEvent, setIsCreateEventOpen, setNewEvent }) => {

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const today = new Date();

  return (
    <div className="flex-1 p-4">
        <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-purple-500">
                    {day}
                </div>
            ))}
            { Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="h-16 md:h-24 bg-gray-100 rounded-lg"></div>
            ))}
            { Array.from({ length: daysInMonth }, (_, i : number) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
                const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                const dayEvents = events.filter((event) => event.eventDate === dateString)

                // Determining wheteher the day is weekends or weekdays
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const isToday = date.getDate() === today.getDate() &&
                                date.getMonth() === today.getMonth() &&
                                date.getFullYear() === today.getFullYear();

                return (
                    <div 
                        key={i} 
                        className={`h-16 md:h-24 rounded-lg shadow p-2 overflow-y-auto ${isToday ? "bg-green-200 border-2 border-green-500" : isWeekend ? "bg-red-200" : "bg-white"}`}
                    >
                        <div className="font-semibold text-blue-600">{i + 1}</div>
                        {dayEvents.map((event) => (
                            <div 
                                key={event.id} 
                                className="text-xs bg-purple-100 rounded p-1 mb-1 cursor-pointer text-black truncate"
                                onClick={() => {
                                    setNewEvent({
                                        title : event.title,
                                        description: event.description,
                                        eventDate: event.eventDate,
                                        eventTime: event.eventTime
                                    });
                                    setEditingEvent(event);
                                    setIsCreateEventOpen(true);
                                }}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                );
            })};
        </div>
    </div>
  )
}

export default Calendar;
