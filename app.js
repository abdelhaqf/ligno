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
function addOvertimesarray(req,res){
	is_error=false
	for(i=0;i<req.body.length;i++){
		t_date=req.body[i].date_modified.substring(3,5)
		t_month=req.body[i].date_modified.substring(0,2)
		t_year=req.body[i].date_modified.substring(6,10)
		t_mysql_date=t_year+'-'+t_month+'-'+t_date
		temp=connection.query(
			"insert into overtimes(employee_id,date,duration,info) values(?,?,?,?)",
			[
				req.body[i].emp_id.id,
				t_mysql_date,
				req.body[i].duration,
				req.body[i].info
			],function(err,results){
				if(err){
					is_error=true
				}
		})
	}
	if(is_error){
		res.statusCode=400
		res.send('error')
	}else {
		res.send('ok')
	}
}
 
app.set('view engine','pug')

//route start
app.get('/',function(req,res){
	res.render('index')
})
app.get('/overtime',function(req,res){
	res.render('overtime')
})
app.get('/showovertime',function(req,res){
	res.render('showovertime')
})
app.get('/overtime/show',function(req,res){
	getOvertimes(res)
})
app.post('/overtime/addarray',function(req,res){
	addOvertimesarray(req,res)
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