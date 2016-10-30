express=require('express')
pug=require('pug')
stylus=require('express-stylus')
nib=require('nib')
bootstrap=require('bootstrap-styl')

app=express()
app.set('view engine','pug')

app.get('/',function(req,res){
	res.render('index')
})

app.use(stylus({
	src:'public',
	use:[nib(),bootstrap()],
	import:['nib','bootstrap']
}))
app.use(express.static('public'))

app.listen(8080,function(){
	console.log('>listening!')
})