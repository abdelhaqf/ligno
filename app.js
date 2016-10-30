express=require('express')

app=express()

app.get('/',function(req,res){
	res.send('hello there')
})

app.use(express.static('public'))

app.listen(8080,function(){
	console.log('>listening!')
})