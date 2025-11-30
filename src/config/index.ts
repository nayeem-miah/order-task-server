import dotenv from 'dotenv';
import path from 'path';
import { fr } from 'zod/v4/locales';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,

   
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,     
    },
    salt_round: process.env.SALT_ROUND,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    frontendUrl: process.env.CLIENT_URL,
    stripeWebHookSecret: process.env.STRIPE_WEBHOOK_SECRET || "whsec_6c192f86200897398b26dbe77ebd0ba7bcbd4d64d345652ff19027501b42631f",
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
   
}