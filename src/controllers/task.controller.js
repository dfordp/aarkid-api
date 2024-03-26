import { getTasks, getTaskById, getTasksByUserId, getTasksByPlantId, createTask, deleteTaskById, updateTaskById } from '../mongodb/models/task.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasks();

    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id  } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'No id provided' });
    }

    const task = await getTaskById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getTasksByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'No user_id provided' });
    }

    const tasks = await getTasksByUserId(id);

    if (!tasks) {
      return res.status(404).json({ message: 'Tasks not found' });
    }

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getTasksByPlantId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'No plant_id provided' });
    }

    const tasks = await getTasksByPlantId(id);

    if (!tasks) {
      return res.status(404).json({ message: 'Tasks not found' });
    }

    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewTask = async (req, res) => {
  try {
    const { user_id, plant_id, name, dateOfPlanting, isCompleted } = req.body;

    if (!user_id || !plant_id || !name || !dateOfPlanting) {
      return res.status(400).json({ message: 'User ID, Plant ID, name and date of planting are required' });
    }

    const task = await createTask({ user_id, plant_id, name, dateOfPlanting, isCompleted });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await deleteTaskById(id);

    return res.json(deletedTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, plant_id, name, dateOfPlanting, isCompleted } = req.body;

    if (!user_id || !plant_id || !name || !dateOfPlanting){
      return res.sendStatus(400);
    }

    const updatedTask = await updateTaskById(id, { user_id, plant_id, name, dateOfPlanting, isCompleted });

    return res.status(200).json(updatedTask).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};