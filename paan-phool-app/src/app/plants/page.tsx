'use client';

import React, { useState, useEffect } from 'react';
import { getPlants, deletePlant, Plant } from '@/lib/api';
import Link from 'next/link';

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlants() {
      try {
        const data = await getPlants();
        setPlants(data);
      } catch (err) {
        console.error('Error loading plants:', err);
        setError('Failed to load plants');
      } finally {
        setLoading(false);
      }
    }

    loadPlants();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this plant?')) {
      try {
        await deletePlant(id);
        setPlants(plants.filter(plant => plant.id !== id));
      } catch (err) {
        console.error('Error deleting plant:', err);
        setError('Failed to delete plant');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-pattern">
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-brand-dark">My Plants</h1>
            <Link 
              href="/plants/new" 
              className="btn-primary flex items-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Plant
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-brand-accent-red/10 border border-brand-accent-red/20 text-brand-accent-red px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {plants.length === 0 ? (
            <div className="card text-center py-12">
              <div className="bg-brand-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-brand-gray mb-6">No plants added yet.</p>
              <Link 
                href="/plants/new" 
                className="btn-primary inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Your First Plant
              </Link>
            </div>
          ) : (
            /* Plants Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <div key={plant.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-brand-green-100 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-brand-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-brand-dark">{plant.name}</h3>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      plant.health === 'Excellent' ? 'bg-brand-green-100 text-brand-green-700' : 
                      plant.health === 'Good' ? 'bg-brand-accent-blue/10 text-brand-accent-blue' : 
                      plant.health === 'Fair' ? 'bg-brand-accent-orange/10 text-brand-accent-orange' :
                      plant.health === 'Poor' ? 'bg-brand-accent-red/10 text-brand-accent-red' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {plant.health || 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-gray">Type:</span>
                      <span className="text-sm font-medium">{plant.type || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-brand-gray">Last Watered:</span>
                      <span className="text-sm font-medium">
                        {plant.last_watered ? new Date(plant.last_watered).toLocaleDateString() : '-'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <Link 
                      href={`/plants/${plant.id}`} 
                      className="text-sm font-medium text-brand-green-600 hover:text-brand-green-500 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(plant.id)} 
                      className="text-sm font-medium text-brand-accent-red hover:text-brand-accent-red/80 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}