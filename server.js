import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Middlewares
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';

// Rotas (conforme sua imagem: auth, products, orders)
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
// Caso tenha criado o categorias.js, descomente a linha abaixo:
// import categoriaRoutes from './routes/categorias.js';

dotenv.config();

const app = express();

// --- Configurações Iniciais ---
app.use(cors());
app.use(express.json());
app.use(logger);

// --- Rotas da API ---

// Rota base de boas-vindas
app.get('/', (req, res) => {
    res.json({ mensagem: 'Bem-vindo à API da B7! ' });
});

// Registro das rotas usando o padrão /api
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// --- Tratamento de Erros e 404 ---

// Middleware para rotas inexistentes (do segundo código)
app.use((req, res, next) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `Rota '${req.url}' não encontrada na API da B7!.`
    });
});

// Middleware de Erro Global (Sempre o último)
app.use(errorHandler);

// --- Exportação e Inicialização ---

// IMPORTANTE PARA VERCEL
export default app;

// Rodar localmente com os logs detalhados do segundo código
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('');
        console.log('🚀 ================================');
        console.log(`🚀 Servidor LOJA B7 Rodando!`);
        console.log(`🚀 URL: http://localhost:${PORT}`);
        console.log('🚀 ================================');
        console.log('');
        console.log('📋 Rotas ativas conforme diretório:');
        console.log(`   /api/auth`);
        console.log(`   /api/products`);
        console.log(`   /api/orders`);
        console.log('');
    });
}