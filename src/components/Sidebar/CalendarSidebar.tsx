import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import type { CalendarEvent } from '../../services/dataService';

interface CalendarSidebarProps {
  onEventClick?: (event: CalendarEvent) => void;
  onDateSelect?: (date: Date) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ onEventClick, onDateSelect }) => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;
    
    try {
      const eventsData = await dataService.getCalendarEvents(user.id);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'call': return 'bg-green-500';
      case 'deadline': return 'bg-red-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const todayEvents = getEventsForDate(new Date());
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Calendar</h2>
        <button className="p-1 text-gray-400 hover:text-white">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Calendar */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-gray-800 rounded"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <h3 className="text-sm font-medium text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-gray-800 rounded"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs text-gray-400 p-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-1 h-8"></div>;
            }
            
            const dayEvents = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`p-1 h-8 text-xs rounded hover:bg-gray-700 transition-colors relative ${
                  isToday ? 'bg-blue-600 text-white' : 
                  isSelected ? 'bg-gray-600 text-white' : 'text-gray-300'
                }`}
              >
                {day.getDate()}
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Events */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white mb-3">Today's Events</h3>
        {todayEvents.length === 0 ? (
          <p className="text-xs text-gray-400">No events today</p>
        ) : (
          <div className="space-y-2">
            {todayEvents.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className="p-2 bg-gray-900 rounded border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors"
              >
                <div className="flex items-start space-x-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${getEventTypeColor(event.event_type)}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{event.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {event.all_day ? 'All day' : formatTime(event.start_date)}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Date Events */}
      {selectedDate && selectedDate.toDateString() !== new Date().toDateString() && (
        <div>
          <h3 className="text-sm font-medium text-white mb-3">
            {selectedDate.toLocaleDateString()} Events
          </h3>
          {selectedDateEvents.length === 0 ? (
            <p className="text-xs text-gray-400">No events on this date</p>
          ) : (
            <div className="space-y-2">
              {selectedDateEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="p-2 bg-gray-900 rounded border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getEventTypeColor(event.event_type)}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{event.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {event.all_day ? 'All day' : formatTime(event.start_date)}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upcoming Events */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-white mb-3">Upcoming Events</h3>
        {(() => {
          const upcomingEvents = events
            .filter(event => new Date(event.start_date) > new Date())
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
            .slice(0, 5);

          return upcomingEvents.length === 0 ? (
            <p className="text-xs text-gray-400">No upcoming events</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="p-2 bg-gray-900 rounded border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getEventTypeColor(event.event_type)}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{event.title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(event.start_date).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {event.all_day ? 'All day' : formatTime(event.start_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default CalendarSidebar;