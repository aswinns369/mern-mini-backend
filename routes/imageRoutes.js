const express = require('express');

const multer = require('multer');
const uniqid = require('uniqid');
const router = express.Router();


router.use(express.static('public'));
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,`${uniqid()}-${file.originalname}`);
    }
})

const upload=multer({storage:storage});
router.post('/upload-image',upload.single('img'),(req,res)=>{
    try{
        return res.status(201).json({
            message:'image uploaded succefully',
            url:`http://localhost:8000/images/${req.file.filename}`
        })

    }catch(e){
         return res.status(400).json({message:'no file uploaded'})
    }

})


module.exports = router;