"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/caseRoutes.ts
const express_1 = __importDefault(require("express"));
const TimelineEvent_1 = require("../controllers/TimelineEvent");
const router = express_1.default.Router();
router.put('/:id', TimelineEvent_1.updateCase);
router.post('/:id/close', TimelineEvent_1.closeCase);
router.delete('/:id', TimelineEvent_1.deleteCase);
router.get('/:id/timeline', TimelineEvent_1.getCaseTimeline);
exports.default = router;
