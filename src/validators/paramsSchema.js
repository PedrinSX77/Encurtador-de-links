const { z } = require('zod');

exports.idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});