import log from "../utils/log.js";

import Event from "../models/Event.js";

export default {
    getAll: (req, res) => {
        if (req.params.amount === "" || req.params.amount === null || req.params.amount === undefined) {
            log.err(" <= RES /event/all/:amount invalid or no req param amount.", req.params);
            res.sendStatus(400);
            return;
        }

        Event.find({}).sort('-time').limit(parseInt(req.params.amount)).exec(function (err, events) {
            if (err) {
                log.err(" <= RES /event/all/:amount ERROR db error.", err);
                res.sendStatus(500);
                return;
            }
            res.send(events);
        });
    },
    getBySectorId: (req, res) => {
        if (req.params.id === "" || req.params.id === null || req.params.id === undefined) {
            log.err(" <= RES /event/sector/:id invalid or no req param id.", req.params);
            res.sendStatus(400);
            return;
        }
        
        Event.find({ sector: req.params.id }, function (err, events) {
            if (err) {
                log.err(" <= RES /event/sector/:id ERROR db error.", err);
                res.sendStatus(500);
                return;
            }
            res.send(events);
        });
    }
};