module.exports = function(router) {
	router.get('/simple/get', (req, res) => {
		res.json({
			msg: 'simple request res'
		})
	})
	router.get('/base/get', (req, res) => {
		res.json(req.query)
	})
	router.post('/base/post', (req, res) => {
		res.json(req.body)
	})
	router.post('/base/buffer', (req, res) => {
		let msg = []
		req.on('data', chunk => {
			if (chunk) {
				msg.push(chunk)
			}
		})

		req.on('end', () => {
			let buf = Buffer.concat(msg)
			res.json(buf.toJSON())
		})
	})
	
	router.get('/error/get', (req, res) => {
		if (Math.random() > 0.5) {
			res.json({
				msg: `请求成功hello world`
			})
		} else {
			res.status(500)
			res.end()
		}
	})
	router.get('/error/timeout', function(req, res) {
		setTimeout(() => {
			res.json({
				msg: `超时了啊，hello world`
			})
		}, 3000)
	})
	
	router.get('/extend/get', function(req, res) {
		res.json({
			msg: 'extend get request res'
		})
	})
	router.options('/extend/options', function(req, res) {
		res.end()
	})
	router.head('/extend/head', function(req, res) {
		res.end()
	})
	router.delete('/extend/delete', function(req, res) {
		res.end()
	})	
	router.post('/extend/post', function(req, res) {
		res.json(req.body)
	})	
	router.put('/extend/put', function(req, res) {
		res.json(req.body)
	})	
	router.patch('/extend/patch', function(req, res) {
		res.json(req.body)
	})

	// 拦截器部分
	router.get('/interceptor/get', (req, res) => {
		res.end('hello result')
	})

	// 配置
	router.post('/config/post', (req, res) => {
		res.json(req.body)
	})
}