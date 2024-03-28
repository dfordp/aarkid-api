import { getHealthLogs, getHealthLogById, getHealthLogsByUserId, getHealthLogsByPlantId, createHealthLog, deleteHealthLogById, updateHealthLogById } from '../mongodb/models/healthLog.js';

export const getAllHealthLogs = async (req, res) => {
  try {
    const healthLogs = await getHealthLogs();

    return res.status(200).json(healthLogs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getHealthLog = async (req, res) => {
  try {
    const { id  } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'No id provided' });
    }

    const healthLog = await getHealthLogById(id);

    if (!healthLog) {
      return res.status(404).json({ message: 'HealthLog not found' });
    }

    return res.json(healthLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getHealthLogsByuserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'No user_id provided' });
    }

    const healthLogs = await getHealthLogsByUserId(id);

    if (!healthLogs) {
      return res.status(404).json({ message: 'HealthLogs not found' });
    }

    return res.json(healthLogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getHealthLogsByplantId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'No plant_id provided' });
    }

    const healthLogs = await getHealthLogsByPlantId(id);

    if (!healthLogs) {
      return res.status(404).json({ message: 'HealthLogs not found' });
    }

    return res.json(healthLogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createNewHealthLog = async (req, res) => {
  try {
    const { user_id, plant_id, attachment, comment, dateOfDiagnosis, diagnosisByModel } = req.body;

    if (!user_id || !plant_id || !dateOfDiagnosis) {
      return res.status(400).json({ message: 'User ID, Plant ID and date of diagnosis are required' });
    }

    const healthLog = await createHealthLog({ user_id, plant_id, attachment, comment, dateOfDiagnosis, diagnosisByModel });

    return res.status(201).json(healthLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteHealthLog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHealthLog = await deleteHealthLogById(id);

    return res.json(deletedHealthLog);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateHealthLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, plant_id, attachment, comment, dateOfDiagnosis, diagnosisByModel } = req.body;

    if (!user_id || !plant_id || !dateOfDiagnosis){
      return res.sendStatus(400);
    }

    const updatedHealthLog = await updateHealthLogById(id, { user_id, plant_id, attachment, comment, dateOfDiagnosis, diagnosisByModel });

    return res.status(200).json(updatedHealthLog).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};