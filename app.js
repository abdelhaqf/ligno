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
function addOvertimes(req,res){
	console.log(req.body.date)
	x = req.body.date.replace("T"," ")
	x = x.substring(0, x.length - 5); 
	console.log('abdel : '+x)
	t_date=req.body.date_modified.substring(3,5)
	t_month=req.body.date_modified.substring(0,2)
	t_year=req.body.date_modified.substring(6,10)
	t_mysql_date=t_year+'-'+t_month+'-'+t_date
	console.log('last : '+t_mysql_date)
	console.log(typeof(req.body.date))
	temp=connection.query(
		"insert into overtimes(employee_id,date,duration,info) values(?,?,?,?)",
		[
			req.body.emp_id,
			t_mysql_date,
			req.body.duration,
			req.body.info
		],function(err,results){
			if(!err)res.send('OK')
			else {
				//console.log(err)
				res.statusCode=400
				res.send('error')
			}
	})
}
function addOvertimesarray(req,res){
	console.log(req.body)
	is_error=false
	for(i=0;i<req.body.length;i++){
		t_date=req.body[i].date_modified.substring(3,5)
		t_month=req.body[i].date_modified.substring(0,2)
		t_year=req.body[i].date_modified.substring(6,10)
		t_mysql_date=t_year+'-'+t_month+'-'+t_date
		console.log('last : '+t_mysql_date)
		console.log(typeof(req.body.date))
		temp=connection.query(
			"insert into overtimes(employee_id,date,duration,info) values(?,?,?,?)",
			[
				req.body[i].emp_id,
				t_mysql_date,
				req.body[i].duration,
				req.body[i].info
			],function(err,results){
				if(err){
					is_error=true
					//console.log(err)
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
app.get('/overtime/show',function(req,res){
	getOvertimes(res)
})
app.post('/overtime/add',function(req,res){
	addOvertimes(req,res)
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