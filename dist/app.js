"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = require("./routes/authRoutes");
const itemRoutes_1 = require("./routes/itemRoutes");
const eventRoutes_1 = require("./routes/eventRoutes");
const purchaseRoutes_1 = __importDefault(require("./routes/purchaseRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json()); // Middleware para parsear JSON
app.use((0, cors_1.default)());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use(authRoutes_1.authRoutes);
app.use('/api', itemRoutes_1.router);
app.use('/api', eventRoutes_1.eventRoutes);
app.use('/api/purchases', purchaseRoutes_1.default);
// Middleware de erro global
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({ message: 'Erro interno no servidor' });
});
