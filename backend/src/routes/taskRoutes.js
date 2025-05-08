import express from "express";
import {
    createTask,
    updateTitle,
    updateDesc,
    updateStatus,
    deleteTask,
    getAll
} from "../controllers/taskController.js";
import {authentificateUser} from "../middlewares/authentificateUser.js";

const router = express.Router();
router.post('/create', authentificateUser, createTask);
router.patch('/update/title', authentificateUser, updateTitle);
router.patch('/update/desc', authentificateUser, updateDesc);
router.patch('/update/status', authentificateUser, updateStatus);
router.delete('/delete', authentificateUser, deleteTask);
router.get('/get-all', authentificateUser, getAll);
export default router