import {Request, Response} from 'express';

import Power from '../entity/Power';
import SuperHero from '../entity/SuperHero';
import {connection} from '../connection/Connection';

class Controller {
    constructor() {}

    public getAllSuperHero(req: Request, res: Response) {
        connection
            .then(async db => {
                const superHeroes: SuperHero[] = await db.manager.find(SuperHero);
                res.json(superHeroes);
            })
            .catch(error => {
                // console.error("Error ", error);
                res.json(error);
            });            
    }

    public addSuperHero(req: Request, res: Response) {
        connection
            .then(async db => {
                let requestSuperHero = req.body;
                let requestPower = requestSuperHero.power;
                let superHero = new SuperHero();
                superHero.name = requestSuperHero.name;
                superHero.power = [];
                if (requestPower) {
                    requestPower.forEach(requestPowerItem => {
                        let power: Power = new Power();
                        power.ability = requestPowerItem;
                        superHero.power.push(power);
                    });
                }

                await db.manager.save(superHero);
                res.json({message: "Successfully Saved."})
            })
            .catch(error => {
                // console.error("Error ", error);
                res.json(error);
            });
    }

    public updateSuperHero(req: Request, res: Response) {
        connection
            .then(async db => {
                let superHero = await db.manager.findOne(SuperHero, req.params.superHeroId);
                let requestSuperHero = req.body;
                let requestPower = requestSuperHero.power;
                superHero.name = requestSuperHero.name;
                superHero.power = [];
                if (requestPower) {
                    requestPower.forEach(requestPowerItem => {
                        let power: Power = new Power();
                        power.ability = requestPowerItem;
                        superHero.power.push(power);
                    });
                }

                await db.manager.save(superHero);
                res.json({message: "Successfully Updated."});
            })
            .catch(error => {
                // console.error("Error ", error);
                res.json(error);
            });
    }

    public getSuperHeroById(req: Request, res: Response) {
        connection
            .then(async db => {
                let superHero = await db.manager.findOne(SuperHero, req.params.superHeroId);
                res.json(superHero);
            })
            .catch(error => {
                // console.error("Error ", error);
                res.json(error);
            });
    }

    public deleteSuperHero(req: Request, res: Response) {
        connection
            .then(async db => {
                let superHero = await db.manager.findOne(SuperHero, req.params.superHeroId);
                // delete all power first
                if (superHero) {
                    superHero.power.forEach(async powerItem => {
                        await db.manager.delete(Power, {id : powerItem.id});
                    });   
                }
                // delete our super-hero
                await db.manager.delete(SuperHero, {id: req.params.superHeroId});
                res.json({message: "Successfully Removed."});
            })
            .catch(error => {
                // console.error("Error ", error);
                res.json(error);
            });
    }
}

export {Controller}
