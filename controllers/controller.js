const Users = require('../models/User');


// @desc       Get All User
// @route      GET /api/user
// @access     Public

exports.user = async (req, res, next) => {
    try {

        const User = await Users.find();

        return res.status(200).json({
            success: true,
            count: User.length,
            data: User
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "server Error"
        })        
    }
} 


// @desc       Add New User
// @route      POST /api/user/new
// @access     Public

exports.addUser = async (req, res, next) => {
    
    try {
        const {name, email} = req.body;

        const newUser = await Users.create(req.body);

        return res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (err) {
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message)

            return res.status(400).json({
                success: false,
                error: message
            });

        }else{

            return res.status(500).json({
                success: false,
                msg: "server Error"
            }) 
        }
    }
} 





// @desc       Delete User
// @route      DELETE /api/user/new
// @access     Public

exports.updateUser = async (req,res,next) => {
    
    try {
        
        const id  = req.body;
        const update  = req.body;

        const updateUser = await Users.findByIdAndUpdate(id, update)

        return res.status(200).json({
            success:true,
            data: updateUser
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "server Error"
        })
    }
}




exports.deleteUser = async (req,res,next) => {
    
    try {
        const deleteUser = await Users.findById(req.params.id);

        if (!deleteUser) {
            res.status(404).json({
                success:false,
                msg: "No Record Found"
            })
        }

        await deleteUser.remove();

        res.status(200).json({
            success:true,
            data:{}
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "server Error"
        })
    }
}

 