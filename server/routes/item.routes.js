import { Router } from 'express'
import {getAllItems,getItemByCodePat, getItemsQtyByWorker, 
    getItemsByWorker, getItemsQtyByDependece, 
    getItemsByDependece, searchItems, searchItemsByWorkerAndDescription,
    getItemByCodePatAndUpdate, updateDisposition} from '../controllers/item.controller.js';
const router = Router();

/* ROUTES FOR ITEMS AND SEARCH */

//GET ITEMS
// router.get('/items/:id',searchItems)
router.get('/items',getAllItems)
router.get('/items/search', searchItems); // Endpoint para la búsqueda en tiempo real
router.get('/items/worker', getItemsByWorker) //GET ITEMS BY WORKER
router.get('/items/dependency', getItemsByDependece) //GET ITEMS BY DEPENDENCY
router.get('/items/filter', searchItemsByWorkerAndDescription) // GET ITEMS BY WORKER AND DESCRIPTION

//GET ITEM BY CODE PATRIMONIAL
router.put('/items/:id', updateDisposition);
router.get('/items/:id',getItemByCodePatAndUpdate)
router.get('/items/status/:id', getItemByCodePat) // GET ITEMS BY PATRIMONIAL CODE 
// router.get('/items/:id',getItemByCodePat)

//GET QTY ITEMS
router.get('/items/worker/qty', getItemsQtyByWorker)
router.get('/items/dependency/qty', getItemsQtyByDependece)


export default router