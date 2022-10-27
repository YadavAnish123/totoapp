const express=require("express")
const app=express()
const port=80
const path=require("path")
const fs = require("fs");
//backed store data form function
app.use(express.urlencoded({ extended: true }))
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
})

app.get('/Add_Task', (req, res)=>{
    res.status(200).render('Add_Task.pug');
})

app.post('/Add_Task', (req, res)=>{
    work = req.body.work
    
    let outputToWrite = ` ${work}`
    // fs.writeFileSync('output.txt', outputToWrite)
    fs.appendFileSync("output.csv",  outputToWrite+"\n");
    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('index.pug', params);
})

app.get('/List_of_Tasks', (req, res)=>{
    const data = fs.readFileSync('output.csv','utf8');
    res.status(200).render('List_of_Tasks.pug', {data});
})
 


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
