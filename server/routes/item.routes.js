import { Router } from 'express'
import {getAllItems,getItemByCodePat, getItemsQtyByWorker, 
    getItemsByWorker, getItemsQtyByDependece, 
    getItemsByDependece, searchItems} from '../controllers/item.controller.js';
const router = Router();

/* ROUTES FOR ITEMS AND SEARCH */

//GET ITEMS
// router.get('/items/:id',searchItems)
router.get('/items',getAllItems)
router.get('/items/search', searchItems); // Endpoint para la búsqueda en tiempo real
router.get('/items/worker', getItemsByWorker) //GET ITEMS BY WORKER
router.get('/items/dependency', getItemsByDependece) //GET ITEMS BY DEPENDENCY

//GET ITEM BY CODE PATRIMONIAL
router.get('/items/:id',getItemByCodePat)

//GET QTY ITEMS
router.get('/items/worker/qty', getItemsQtyByWorker)
router.get('/items/dependency/qty', getItemsQtyByDependece)


export default router