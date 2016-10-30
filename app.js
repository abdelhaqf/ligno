express=require('express')
pug=require('pug')
stylus=require('express-stylus')

app=express()
app.set('view engine','pug')

app.get('/',function(req,res){
	res.render('index')
})

app.use(stylus({
	src:'public'
}))
app.use(express.static('public'))

app.listen(8080,function(){
	console.log('>listening!')
})