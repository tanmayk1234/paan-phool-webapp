'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPlant } from '@/lib/api';
import { supabase } from '@/lib/supabase';

export default function NewPlantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    health: 'Good',
    watering_frequency: 7
  });

  // Check if user is logged in
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (!data.user) {
        setError('You must be logged in to add plants. Please log in first.');
      }
    }
    checkUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to add plants');
      setLoading(false);
      return;
    }

    try {
      console.log('Creating plant with user:', user.id);
      
      await createPlant({
        name: formData.name,
        type: formData.type || null,
        health: formData.health,
        last_watered: new Date().toISOString().split('T')[0],
        watering_frequency: parseInt(formData.watering_frequency.toString())
      });
      
      router.push('/plants');
    } catch (err) {
      console.error('Error creating plant:', err);
      // Show more detailed error message
      setError(`Failed to create plant: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Plant</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {!user ? (
              <div className="text-center py-4">
                <p className="mb-4">You need to be logged in to add plants.</p>
                <a 
                  href="/auth/login"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Go to Login
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Plant Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Plant Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      id="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Indoor, Outdoor, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="health" className="block text-sm font-medium text-gray-700">
                      Health Status
                    </label>
                    <select
                      id="health"
                      name="health"
                      value={formData.health}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="watering_frequency" className="block text-sm font-medium text-gray-700">
                      Watering Frequency (days)
                    </label>
                    <input
                      type="number"
                      name="watering_frequency"
                      id="watering_frequency"
                      min="1"
                      value={formData.watering_frequency}
                      onChange={handleChange}
                      className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}