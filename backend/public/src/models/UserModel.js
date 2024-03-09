"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        unique: true,
        max: 20,
        type: String,
        required: true
    },
    email: {
        unique: true,
        max: 50,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        required: false,
        default: false
    },
    avatarImage: {
        type: String,
        required: false,
        default: ""
    }
}, {
    timestamps: true
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
