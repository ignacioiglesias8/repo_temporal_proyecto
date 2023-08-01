import { Router} from 'express';

const router = Router();

const users = [
    {
        name: "Nacho",
        course: "Backend",
    }
];

router.get('/', (req,res)=>{
    res.send(users)
})

router.post('/', (req,res)=> {
    const user = {
        name: req.body.name ?? 'Sin nombre',
        course : req.body.course ?? 'Sin curso',
    }

    users.push(user);

    res.status(201).send ('Usuario creado correctamente')
})

export default router;