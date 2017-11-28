const express = require('express');
let db = require ('../helpers/db');
let route = express.Router();

route.get('/getUser/:param',(req,res)=>{
    db.connect().then((obj)=>{
        obj.one('SELECT * FROM test where ced = $1',[parseInt(req.params.param)]).then((data)=>{
            console.log(data);
            res.send({data:data,
                        status:200});
            obj.done();                
        }).catch((error)=>{
            console.log(error);
            res.send({error:error,
                msg:'No Record Found',
                status:404});
            obj.done();    
        });
    }).catch((error)=>{
        console.log(error);
        res.send({error:error,
            msg:'not Created',
            status:500});
    });   
});
route.post('/createUser',(req,res)=>{
    db.connect().then((obj)=>{
        obj.one('INSERT INTO test (ced,name,lastname,age) VALUES($1,$2,$3,$4) RETURNING ced',
        [parseInt(req.body.ced),
        req.body.name,
        req.body.lastname,
        parseInt(req.body.age)]).then((data)=>{
            console.log(data);
            res.send({data:data,
                        status:200});
            obj.done();                
        }).catch((error)=>{
            console.log(error);
            res.send({error:error,
                msg:'Not Created',
                status:500});
            obj.done();    
        });
    }).catch((error)=>{
        console.log(error);
        res.send({error:error,
            msg:'not Created',
            status:500});
    });   
});
module.exports = route;