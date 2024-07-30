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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt")); // Usando bcrypt, não bcryptjs
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
class AuthService {
    // Registra um novo usuário com verificação de existência e hash de senha
    register(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Converte a string role para o enum Role
            const roleEnum = client_1.Role[role.toUpperCase()];
            const user = yield prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: roleEnum,
                },
            });
            return user;
        });
    }
    // Autentica um usuário e retorna um token JWT
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new Error('Invalid email or password');
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            return token;
        });
    }
    // Retorna todos os usuários registrados no sistema
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    // Não incluir 'password' para segurança
                }
            });
        });
    }
}
exports.AuthService = AuthService;
