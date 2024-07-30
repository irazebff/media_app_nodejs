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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const client_1 = require("@prisma/client");
const authService = new AuthService_1.AuthService();
class AuthController {
    register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = request.body;
                const user = yield authService.register(email, password, role);
                return response.status(201).json(user);
            }
            catch (error) {
                console.error('Registration error:', error);
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        return response.status(400).json({ message: 'Email already exists' });
                    }
                }
                return response.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = request.body;
                const token = yield authService.login(email, password);
                return response.status(200).json({ token });
            }
            catch (error) {
                console.error('Login error:', error);
                if (error instanceof Error && error.message === 'Invalid email or password') {
                    return response.status(400).json({ message: 'Invalid email or password' });
                }
                return response.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
    }
    getAllUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield authService.getAllUsers();
                return response.status(200).json(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.AuthController = AuthController;
