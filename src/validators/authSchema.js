const { z } = require('zod');

const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username muito curto, minimo 3 caracteres')
    .max(20, 'Username muito longo, máximo 20 caracteres')
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e _ são permitidos'),

  email: z.string({ required_error: 'E-mail é obrigatório' })
    .email('Email inválido'),

  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
});

const loginSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('E-mail inválido'),

  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(6, 'Senha muito curta')
    .max(100, 'Senha muito longa')
});

module.exports = {
  registerSchema, loginSchema
};