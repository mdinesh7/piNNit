import app from './api/app.js';

// declaring a port for our website to run

const port = 3003;

// port listen made on 3003
app.listen(port, ()=>{
    console.log(`Notes app listening at http://localhost:${port}`);
});


