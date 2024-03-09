"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.login = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserModel_1.default.findOne({ email });
        if (!user)
            return res.status(201).json({ msg: "Invalid Email or Password!!!" });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(202).json({ msg: "Invalid Email or Password!!!" });
        return res.status(200).json({ msg: "Login Successful", user });
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.login = login;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        const usernameCheck = yield UserModel_1.default.findOne({ username });
        if (usernameCheck)
            return res.status(201).json({ msg: "The username already exist!!" });
        const emailCheck = yield UserModel_1.default.findOne({ email });
        if (emailCheck)
            return res.status(202).json({ msg: "Email Already Exist!!" });
        const hashedPass = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield UserModel_1.default.create({
            username: username,
            email: email,
            password: hashedPass
        });
        return res.status(200).json({ msg: "user created successfully", newUser });
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
