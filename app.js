express=require('express')
pug=require('pug')
stylus=require('express-stylus')
nib=require('nib')
bootstrap=require('bootstrap-styl')
mysql=require('mysql')

connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'ligno'
})
connection.connect(function(err){
	if(err) console.log('db connection failed!')
	else console.log('db connected!')
})
function getEmployees(res){
	connection.query('select * from employees',function(err,rows,fields){
		res.send(rows)
	})
}

app=express()
app.set('view engine','pug')

//route start
app.get('/',function(req,res){
	res.render('index')
})
app.get('/overtime',function(req,res){
	res.render('overtime')
})
app.get('/employees',function(req,res){
	connection.query('select * from employees',function(err,rows,fields){
		getEmployees(res)
	})
})
//route end

app.use(stylus({
	src:'public',
	use:[nib(),bootstrap()],
	import:['nib','bootstrap']
}))
app.use(express.static('public'))

app.listen(8080,function(){
	console.log('>listening!')
})