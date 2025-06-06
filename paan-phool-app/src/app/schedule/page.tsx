'use client';

import React, { useState, useEffect } from 'react';
import { getSchedules, updateSchedule, deleteSchedule } from '@/lib/api';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (err) {
        console.error('Error loading schedules:', err);
        setError('Failed to load schedules');
      } finally {
        setLoading(false);
      }
    }

    loadSchedules();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await updateSchedule(id, { status: 'completed' });
      setSchedules(schedules.map(item => 
        item.id === id ? { ...item, status: 'completed' } : item
      ));
    } catch (err) {
      console.error('Error updating schedule:', err);
      setError('Failed to update schedule');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteSchedule(id);
        setSchedules(schedules.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting schedule:', err);
        setError('Failed to delete schedule');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Group tasks by date for the calendar view
  const tasksByDate: Record<string, number> = {};
  schedules.forEach(item => {
    const date = item.due_date.split('T')[0];
    tasksByDate[date] = (tasksByDate[date] || 0) + 1;
  });

  // Get current month days
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Watering Schedule</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Calendar View */}
          <div className="bg-white p-6 shadow rounded-lg mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
            </h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="font-semibold text-gray-600">{day}</div>
              ))}
              
              {/* Empty cells for days before the first day of month */}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="text-gray-400 py-2"></div>
              ))}
              
              {/* Days of current month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isToday = day === today.getDate();
                const hasTasks = tasksByDate[dateStr] > 0;
                
                return (
                  <div 
                    key={day} 
                    className={`py-2 ${
                      isToday ? 'bg-blue-100 rounded-full font-semibold text-blue-800' : 
                      hasTasks ? 'bg-green-100 rounded-full font-semibold text-green-800' : 
                      ''
                    }`}
                  >
                    {day}
                    {hasTasks && (
                      <div className="text-xs mt-1">{tasksByDate[dateStr]} tasks</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Task Button */}
          <div className="mb-6">
            <a 
              href="/schedule/new" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add New Task
            </a>
          </div>

          {/* Tasks Table */}
          {schedules.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500 text-center">No tasks scheduled yet.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plant
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {schedules.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {item.plants?.name || 'Unknown Plant'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{item.task}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(item.due_date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.status || 'pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {item.status !== 'completed' && (
                                <button
                                  onClick={() => handleComplete(item.id)}
                                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-xs mr-2"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-900 text-xs"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}