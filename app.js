import express from 'express';
import helloRouter from './hello.js'
import postRouter from './routers/post.js'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/posts', postRouter)

const middleware1 = (req, res, next) => {
    req.test = 'this is set by middleware1';
    next();
}

const middleware2 = (req, res, next) => {
    console.log(req.test)
    req.test2 = 'this is set by middleware2';
    throw new Error('error!')
}

app.get('/', middleware1, middleware2, (req,res)=> {
    res.json([req.test, req.test2]);
});

app.use((err, req, res, next)=> {
    res.status(500).json({message: err.message})
})

export default app;