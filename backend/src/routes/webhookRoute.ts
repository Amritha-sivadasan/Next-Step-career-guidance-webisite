import express, { Router } from "express";
import webhookController from "../contollers/webhookController";


const webhookrouter=Router()

webhookrouter.post('/',webhookController)


export default webhookrouter