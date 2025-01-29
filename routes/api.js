
import { Router } from 'express';
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/apiController.js';

const router = Router();
