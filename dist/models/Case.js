"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const caseSchema = new mongoose_1.Schema({
    incidentDate: { type: Date, required: true },
    employeeName: { type: String, required: true },
    employeeId: { type: String, required: true },
    createdBy: { type: String, required: true },
    type: {
        type: String,
        enum: ["performance", "policy_violation", "review"],
        required: true,
    },
    status: {
        type: String,
        enum: ["open", "closed", "in_progress"],
        default: "open",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    attachments: [
        {
            url: String,
            uploadedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Employee" },
            uploadedAt: { type: Date, default: Date.now },
        },
    ],
    responses: [
        {
            message: String,
            respondedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Employee" },
            attachments: [String],
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
exports.Case = mongoose_1.default.model("Case", caseSchema);