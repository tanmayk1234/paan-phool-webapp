'use client';

import React, { useState, useEffect } from 'react';
import { getPlants, getSchedules } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [plantsData, schedulesData] = await Promise.all([
          getPlants(),
          getSchedules()
        ]);
        
        setPlants(plantsData);
        setSchedules(schedulesData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Count plants by health status
  const healthCounts = plants.reduce((acc, plant) => {
    const health = plant.health || 'Unknown';
    acc[health] = (acc[health] || 0) + 1;
    return acc;
  }, {});

  // Count tasks that need attention today
  const today = new Date().toISOString().split('T')[0];
  const tasksToday = schedules.filter(task => 
    task.due_date.split('T')[0] === today && task.status !== 'completed'
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-pattern">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-brand-dark">Your Garden Dashboard</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-brand-accent-red/10 border border-brand-accent-red/20 text-brand-accent-red px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="card bg-gradient-to-br from-brand-green-50 to-white">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-brand-green-100 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-brand-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-brand-dark">Plants Overview</h3>
              </div>
              <div className="mt-3 text-3xl font-semibold text-brand-green-600">{plants.length}</div>
              <p className="mt-1 text-sm text-brand-gray">Total plants in your space</p>
              <div className="mt-4">
                <Link 
                  href="/plants" 
                  className="text-sm font-medium text-brand-green-600 hover:text-brand-green-500 flex items-center"
                >
                  View all plants
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="card bg-gradient-to-br from-brand-accent-blue/5 to-white">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-brand-accent-blue/10 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-brand-accent-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-brand-dark">Watering Schedule</h3>
              </div>
              <div className="mt-3 text-3xl font-semibold text-brand-accent-blue">{tasksToday}</div>
              <p className="mt-1 text-sm text-brand-gray">Plants need attention today</p>
              <div className="mt-4">
                <Link 
                  href="/schedule" 
                  className="text-sm font-medium text-brand-accent-blue hover:text-brand-accent-blue/80 flex items-center"
                >
                  View schedule
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="card bg-gradient-to-br from-brand-accent-purple/5 to-white">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-brand-accent-purple/10 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-brand-accent-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V6H16V4Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.5 6H5.5C4.67157 6 4 6.67157 4 7.5V19.5C4 20.3284 4.67157 21 5.5 21H18.5C19.3284 21 20 20.3284 20 19.5V7.5C20 6.67157 19.3284 6 18.5 6Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 11L11 13L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-brand-dark">Health Status</h3>
              </div>
              <div className="mt-3 space-y-2">
                {Object.entries(healthCounts).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      status === 'Excellent' ? 'bg-brand-green-100 text-brand-green-700' : 
                      status === 'Good' ? 'bg-brand-accent-blue/10 text-brand-accent-blue' : 
                      status === 'Fair' ? 'bg-brand-accent-orange/10 text-brand-accent-orange' :
                      status === 'Poor' ? 'bg-brand-accent-red/10 text-brand-accent-red' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {status}
                    </span>
                    <span className="text-sm font-medium text-brand-gray">{count} plants</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link 
                  href="/plants/new" 
                  className="text-sm font-medium text-brand-accent-purple hover:text-brand-accent-purple/80 flex items-center"
                >
                  Add new plant
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="mt-10">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-brand-dark">Recent Activity</h2>
              <div className="ml-auto">
                <Link 
                  href="/schedule/new" 
                  className="btn-secondary text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Task
                </Link>
              </div>
            </div>
            
            <div className="card">
              {schedules.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="bg-brand-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-brand-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <p className="text-brand-gray mb-6">No scheduled tasks yet.</p>
                  <Link 
                    href="/schedule/new" 
                    className="btn-primary inline-flex items-center"
                  >
                    Add Your First Task
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {schedules.slice(0, 5).map((item) => (
                    <li key={item.id} className="py-4 hover:bg-brand-green-50/30 transition-colors rounded-lg px-2">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-4 ${
                          item.status === 'completed' ? 'bg-brand-green-100' : 'bg-brand-accent-blue/10'
                        }`}>
                          <svg className={`w-5 h-5 ${
                            item.status === 'completed' ? 'text-brand-green-600' : 'text-brand-accent-blue'
                          }`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {item.status === 'completed' ? (
                              <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : (
                              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            )}
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-brand-dark truncate">
                            {item.task} - {item.plants?.name || 'Unknown Plant'}
                          </p>
                          <p className="text-xs text-brand-gray mt-1">
                            Due: {new Date(item.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="ml-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.status === 'completed' ? 'bg-brand-green-100 text-brand-green-700' : 
                            'bg-brand-accent-orange/10 text-brand-accent-orange'
                          }`}>
                            {item.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                  
                  {schedules.length > 5 && (
                    <li className="py-3 text-center">
                      <Link href="/schedule" className="text-sm text-brand-accent-blue hover:text-brand-accent-blue/80">
                        View all tasks
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}