import { supabase } from './supabase';

// Types
export type Plant = {
  id: string;
  name: string;
  type: string | null;
  health: string | null;
  last_watered: string | null;
  watering_frequency: number | null;
  created_at: string;
};

export type Schedule = {
  id: string;
  plant_id: string;
  task: string;
  due_date: string;
  status: string | null;
  created_at: string;
};

// Plant functions
export async function getPlants() {
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Plant[];
}

export async function getPlant(id: string) {
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Plant;
}

export async function createPlant(plant: Omit<Plant, 'id' | 'created_at'>) {
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error("Auth error:", userError);
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    if (!user) {
      throw new Error('User not authenticated. Please log in again.');
    }
    
    console.log("Creating plant for user:", user.id);
    console.log("Plant data:", plant);
    
    // Create a plant object with user_id
    const plantWithUserId = {
      ...plant,
      user_id: user.id
    };
    
    console.log("Full plant data to insert:", plantWithUserId);
    
    // Insert the plant with user_id
    const { data, error } = await supabase
      .from('plants')
      .insert([plantWithUserId]);
    
    if (error) {
      console.error("Insert error:", error);
      throw new Error(`Database error: ${error.message || JSON.stringify(error)}`);
    }
    
    // Get the inserted plant
    const { data: insertedPlant, error: selectError } = await supabase
      .from('plants')
      .select()
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (selectError) {
      console.error("Select error:", selectError);
      throw new Error(`Error retrieving created plant: ${selectError.message}`);
    }
    
    return insertedPlant as Plant;
  } catch (err) {
    console.error("createPlant error:", err);
    throw err;
  }
}

export async function updatePlant(id: string, plant: Partial<Omit<Plant, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('plants')
    .update(plant)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as Plant;
}

export async function deletePlant(id: string) {
  const { error } = await supabase
    .from('plants')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Schedule functions
export async function getSchedules() {
  const { data, error } = await supabase
    .from('schedules')
    .select(`
      *,
      plants:plant_id (name)
    `)
    .order('due_date', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function getPlantSchedules(plantId: string) {
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('plant_id', plantId)
    .order('due_date', { ascending: true });
  
  if (error) throw error;
  return data as Schedule[];
}

export async function createSchedule(schedule: Omit<Schedule, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('schedules')
    .insert([schedule])
    .select();
  
  if (error) throw error;
  return data[0] as Schedule;
}

export async function updateSchedule(id: string, schedule: Partial<Omit<Schedule, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('schedules')
    .update(schedule)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as Schedule;
}

export async function deleteSchedule(id: string) {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}