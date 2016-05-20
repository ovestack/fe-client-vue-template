var app = require('koa')(),
	koaBody = require('koa-body'),
	router = require('koa-router')(),
	Mock = require('mockjs'),
	cors = require('koa-cors'),
	port = require('../config/').dev.mockPort

app.use(koaBody({
	multipart: true,
	formidable: {
		keepExtensions: true,
		hash: 'sha1'
	}
}))

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

// mock here
router.get('/random', function*() {
	this.body = {
		code: 200,
		data: Mock.Random.guid()
	}
})

app.listen(port)