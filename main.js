const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
})
// app.use( async ctx  => {
//   // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   //   if (err) throw err;
//   //     var dbo = db.db("runoob");
//   //     dbo.collection("site").find({}).skip(6).limit(2).toArray(function(err, result) { // 返回集合中所有数据
//   //         if (err) throw err;
//   //         console.log(result);
//   //         ctx.body = result
//   //         db.close();
//   //     });
//   // });
//   ctx.body = 'Hello World111111111'
// })
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  console.log(ctx)
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>';
});

app.use(router.routes());
app.listen(3000,()=>{
  console.log("server is running at 3000 port");
})

function* asyncRequest(requestArr=[]){
  let i = 0;
  while(i< requestArr.length){
    yield requestArr[i++]()
  }
}
var requestArr = [
  ()=>{
    setTimeout(()=>{
      console.log(1)
      fn.next()
    },2000)
  },
  ()=>{
    setTimeout(()=>{
      console.log(2)
      fn.next()
    },1000)
  }
]
var fn = asyncRequest(requestArr)
fn.next()

new Promise(function (resolve, reject) {
  console.log('Promise');
  resolve();
  new Promise(function (resolve, reject) {
    console.log('Promise>>>');
    resolve();
  }).then(function () {
    console.log('resolved.>>>');
  })
}).then(function () {
  console.log('resolved.');
})




// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("runoob");
//   var myobj = { name: "菜鸟教程1122221", url: "www.runoob" };
//   dbo.collection("site").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("文档插入成功");
//       db.close();
//   });
// });
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("runoob");
//   var myobj =  [
//       { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
//       { name: 'Google', url: 'https://www.google.com', type: 'en'},
//       { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//      ];
//   dbo.collection("site").insertMany(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("插入的文档数量为: " + res.insertedCount);
//       db.close();
//   });
// });
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//     var dbo = db.db("runoob");
//     dbo.collection("site").find({}).skip(6).limit(2).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '10.32.5.32',
//   user     : 'developer_public',
//   password : 'shinho123',
//   database : 'ecstore'
// });
 
// connection.connect();
 
// connection.query("SELECT `product_id`, `portion_peoples` FROM `sdb_multidelivery_products` WHERE `product_id` IN ('3038', '3938', '6161', '4298', '3706', '6598', '7484', '14217', '7236', '7235', '6525', '7237', '7290', '7128', '6674', '985', '984', '7126', '7329', '3850')", function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });


// 'dsn' => 'mysql:10.32.5.32; dbname=ecstore',
// 'username' => 'developer_public',
// 'password' => 'shinho123',
 