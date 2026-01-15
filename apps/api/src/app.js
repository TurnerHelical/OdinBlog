import express from "express";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', () => {
    console.log('Working');
});

app.listen(3001, () => {
    console.log('running')
})