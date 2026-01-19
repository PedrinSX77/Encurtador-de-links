exports.validate = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }

  req.body = result.data; // dados limpos
  next();
};


exports.validateParams = schema => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: 'Parâmetros inválidos'
    });
  }

  req.params = result.data;
  next();
};