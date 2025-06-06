'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPlants, createSchedule, Plant } from '@/lib/api';

export default function NewSchedulePage() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    plant_id: '',
    task: 'Water',
    due_date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  useEffect(() => {
    async function loadPlants() {
      try {
        const data = await getPlants();
        setPlants(data);
        if (data.length > 0) {
          setFormData(prev => ({
            ...prev,
            plant_id: data[0].id
          }));
        }
      } catch (err) {
        console.error('Error loading plants:', err);
        setError('Failed to load plants');
      } finally {
        setLoading(false);
      }
    }

    loadPlants();
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
    setSaving(true);
    setError(null);

    try {
      await createSchedule({
        plant_id: formData.plant_id,
        task: formData.task,
        due_date: formData.due_date,
        status: formData.status
      });
      
      router.push('/schedule');
    } catch (err) {
      console.error('Error creating schedule:', err);
      setError(`Failed to create schedule: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New Task</h1>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <p className="text-center text-gray-500">You need to add plants before creating tasks.</p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => router.push('/plants/new')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add a Plant
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Task</h1>
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
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="plant_id" className="block text-sm font-medium text-gray-700">
                    Plant
                  </label>
                  <select
                    id="plant_id"
                    name="plant_id"
                    value={formData.plant_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>
                        {plant.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="task" className="block text-sm font-medium text-gray-700">
                    Task
                  </label>
                  <select
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    <option value="Water">Water</option>
                    <option value="Fertilize">Fertilize</option>
                    <option value="Prune">Prune</option>
                    <option value="Repot">Repot</option>
                    <option value="Mist">Mist</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    required
                    value={formData.due_date}
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
                  disabled={saving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}