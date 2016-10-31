express=require('express')
pug=require('pug')
stylus=require('express-stylus')
nib=require('nib')
bootstrap=require('bootstrap-styl')
mysql=require('mysql')
bodyparser=require('body-parser')


app=express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

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
function getOvertimes(res){
	connection.query('select * from overtimes join employees on overtimes.employee_id=employees.id',function(err,rows,fields){
		res.send(rows)
	})	
}
function addOvertimes(res){
	connection.query('select * from overtimes join employees on overtimes.employee_id=employees.id',function(err,rows,fields){
		res.send(rows)
	})	
}

app.set('view engine','pug')

//route start
app.get('/',function(req,res){
	res.render('index')
})
app.get('/overtime',function(req,res){
	res.render('overtime')
})
app.get('/overtime/show',function(req,res){
	getOvertimes(res)
})
app.post('/overtime/add',function(req,res){
	addOvertimes(res)
	console.log(req.body)
})
app.get('/employees',function(req,res){
	getEmployees(res)
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