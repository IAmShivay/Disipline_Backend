"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCase = exports.updateCase = exports.getCaseById = exports.getCasesByEmployeeAndRole = exports.getAllCasesByCompany = exports.getCases = exports.addResponse = exports.createCase = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Case_1 = require("../models/Case");
const caseValidator_1 = require("../validators/caseValidator");
const fileUpload_1 = require("../utils/fileUpload");
const Timeline_1 = __importDefault(require("../models/Timeline"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create a new Case
const addTimelineEvent = async (caseId, event, description, userId) => {
    const timelineEvent = new Timeline_1.default({
        caseId,
        event,
        description,
        userId: new mongoose_1.default.Types.ObjectId(userId),
    });
    await timelineEvent.save();
};
exports.createCase = (0, express_async_handler_1.default)(async (req, res) => {
    const validatedData = caseValidator_1.createCaseSchema.parse(req.body);
    const files = req.files;
    const { userId } = req.user;
    const attachments = await Promise.all(files.map(async (file) => ({
        url: await (0, fileUpload_1.uploadFile)(file),
        uploadedBy: userId,
        uploadedAt: new Date(),
    })));
    console.log(validatedData);
    const caseData = {
        ...validatedData,
        createdBy: userId,
        attachments,
        status: "open",
        responses: [],
    };
    const newCase = await Case_1.Case.create(caseData);
    await newCase.populate("employeeId");
    await newCase.populate("createdBy");
    const caseId = newCase._id.toString();
    await addTimelineEvent(caseId, "Case Created", "New case was created", userId);
    res.status(201).json(newCase);
});
// Add a response to a case
exports.addResponse = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const validatedData = caseValidator_1.addResponseSchema.parse(req.body);
    const files = req.files;
    const attachments = await Promise.all(files.map((file) => (0, fileUpload_1.uploadFile)(file)));
    const updatedCase = await Case_1.Case.findByIdAndUpdate(id, {
        $push: {
            responses: {
                ...validatedData,
                // respondedBy: req.user.id,
                attachments,
                createdAt: new Date(),
            },
        },
    }, { new: true });
    if (!updatedCase) {
        res.status(404);
        throw new Error("Case not found");
    }
    res.json(updatedCase);
});
// Get all cases
exports.getCases = (0, express_async_handler_1.default)(async (req, res) => {
    const { employeeId, status, type } = req.query;
    const filter = {};
    if (employeeId)
        filter.employeeId = employeeId;
    if (status)
        filter.status = status;
    if (type)
        filter.type = type;
    const cases = await Case_1.Case.find(filter)
        .populate("employeeId")
        .populate("createdBy")
        .sort({ createdAt: -1 });
    res.json(cases);
});
const getAllCasesByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const cases = await Case_1.Case.find({ companyId });
        res.status(200).json({ success: true, data: cases });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching cases", error });
    }
};
exports.getAllCasesByCompany = getAllCasesByCompany;
const getCasesByEmployeeAndRole = async (req, res) => {
    try {
        const { employeeId, role } = req.params;
        const cases = await Case_1.Case.find({ employeeId, role });
        res.status(200).json({ success: true, data: cases });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching cases", error });
    }
};
exports.getCasesByEmployeeAndRole = getCasesByEmployeeAndRole;
const getCaseById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const caseItem = await Case_1.Case.findById(id);
        if (!caseItem) {
            res.status(404).json({ success: false, message: "Case not found" });
            return;
        }
        res.status(200).json({ success: true, data: caseItem });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching case", error });
    }
};
exports.getCaseById = getCaseById;
exports.updateCase = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const files = req.files;
    const attachments = await Promise.all(files.map(async (file) => ({
        url: await (0, fileUpload_1.uploadFile)(file),
        uploadedBy: userId,
        uploadedAt: new Date(),
    })));
    const updateData = {
        ...req.body,
        createdBy: userId,
        attachments,
    };
    const updatedCase = await Case_1.Case.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    await addTimelineEvent(updatedCase._id.toString(), "Case Updated", "The case was updated", userId);
    if (!updatedCase) {
        res.status(404).json({ success: false, message: "Case not found" });
        return;
    }
    res.status(200).json({ success: true, data: updatedCase });
});
const deleteCase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCase = await Case_1.Case.findByIdAndDelete(id);
        const { userId } = req.user;
        await addTimelineEvent(id, "Case Deleted", "The case was deleted", userId);
        if (!deletedCase) {
            res.status(404).json({ success: false, message: "Case not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Case deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error deleting case", error });
    }
};
exports.deleteCase = deleteCase;
