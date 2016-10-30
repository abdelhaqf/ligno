express=require('express')
pug=require('pug')

app=express()
app.set('view engine','pug')

app.get('/',function(req,res){
	//res.send('hello there')
	res.render('index')
})

app.use(express.static('public'))

app.listen(8080,function(){
	console.log('>listening!')
})