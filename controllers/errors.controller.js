exports.invalidPathwayError = (req, res, next) => {

    res.status(404).send({ message: 'invalid pathway'});

};

exports.customError = (err, req, res, next) => {

    //console.log(err);

    if (err.status && err.message) {
        res.status(err.status).send({message: err.message })
    }
    else {

        next(err);
    }
};

exports.psqlError400 =(err, req, res, next) => {

    if (err.code === '22P02') {
        res.status(400).send({ message: "invalid id" })
    }

    else if (err.code === '23503')
    {
        res.status(404).send({ message: "not found" })

    }

    else if (err.code === '23502')
    {
        res.status(404).send({ message: "missing property" })

    }

    else {

        next(err);
    }


};


exports.serverError500 = (err, req, res, next) => {

    console.log(err);

    res.status(500).send({ message: 'Holy guacamole, internal server error!'});
    
};