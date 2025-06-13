const fastify = require('fastify')({ logger: true })
const Joi = require('joi');

fastify.setValidatorCompiler(({ schema }) => {
  return (data) => {
    const { error, value } = schema.validate(data);
    if (error) {
      throw error
    }

    Object.assign(data, value)
  }
})


fastify.setErrorHandler((error, request, reply) => {
  console.log('setErrorHandler', error)
  reply.send({ custom: error })
})

fastify.post('/', {
  // Error is caught if you comment the line below out OR replace with
  // prevalidation: (request, reply, done) => { done() },
  preValidation: async (request, reply) => {},
  schema: {
    body: Joi.object({
      id: Joi.string()
    })
  },
  handler: () => { return {} }
})

fastify.inject({ method: 'POST', url: '/', payload: { id: true } }).then(res => {
  console.log(res.statusCode)
})
