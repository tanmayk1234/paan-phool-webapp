'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPlant, updatePlant, Plant } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function EditPlantPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    health: 'Good',
    last_watered: '',
    watering_frequency: 7
  });

  useEffect(() => {
    async function loadPlant() {
      try {
        const data = await getPlant(id);
        setPlant(data);
        setFormData({
          name: data.name,
          type: data.type || '',
          health: data.health || 'Good',
          last_watered: data.last_watered || '',
          watering_frequency: data.watering_frequency || 7
        });
      } catch (err) {
        console.error('Error loading plant:', err);
        setError('Failed to load plant');
      } finally {
        setLoading(false);
      }
    }

    loadPlant();
  }, [id]);

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
      await updatePlant(id, {
        name: formData.name,
        type: formData.type || null,
        health: formData.health,
        last_watered: formData.last_watered || null,
        watering_frequency: parseInt(formData.watering_frequency.toString())
      });
      
      router.push('/plants');
    } catch (err) {
      console.error('Error updating plant:', err);
      setError('Failed to update plant');
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

  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-red-500">Plant not found</p>
          <button
            onClick={() => router.push('/plants')}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Plants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Plant</h1>
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
                  <label htmlFor="last_watered" className="block text-sm font-medium text-gray-700">
                    Last Watered
                  </label>
                  <input
                    type="date"
                    name="last_watered"
                    id="last_watered"
                    value={formData.last_watered}
                    onChange={handleChange}
                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
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