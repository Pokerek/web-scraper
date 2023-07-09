import Joi from 'joi';

const schema = Joi.object({
    platform: Joi.array().items(Joi.string().valid('netflix', 'hbo_max', 'canal_plus_manual', 'disney')).required(),
    limit: Joi.number().integer().min(0),
    year: Joi.number().integer().min(1888).max(2023),
    orderByRate: Joi.boolean(),
});

const validateForm = (data: any) => {
    return schema.validate(data);
}

export default validateForm;