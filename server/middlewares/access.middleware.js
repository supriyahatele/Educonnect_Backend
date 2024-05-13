
const access = (...roles) => {
    return (req, res, next) => {
        const role = req.role;
        if(roles.includes(role)){
            next();
        }else{
            res.status(403).json({message : 'you cant access this resource'})
        }
    }
}

module.exports = {
    access
}