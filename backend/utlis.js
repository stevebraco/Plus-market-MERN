import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt : user.createdAt,
        },
        process.env.JWT_SECRET || "somethingsecret",
        {
            expiresIn: "1d",
        }
    )
}
export const isAuth = (req, res, next) => {
    // const authorization = req.headers.authorization;
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token < 500

    let decodedData;

    if (token && isCustomAuth) {
      // const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      decodedData = jwt.verify(token, 'somethingsecret')
      console.log('DECODED', decodedData);
    req.user_id = decodedData
      // jwt.verify(
      //   token,
      //   process.env.JWT_SECRET || 'somethingsecret',
      //   (err, decode) => {
      //     if (err) {
      //       res.status(401).send({ message: 'Invalid Token' });
      //     } else {
      //       req.user = decode;
      //       next();
      //     }
      //   }
      // );
    } else {
      // res.status(401).send({ message: 'No Token' });
      decodedData = jwt.decode(token)
      console.log('decoded', decodedData);
      //GOOGLE
      req.user = decodedData
      //NORMAL
    //   req.user_idd = decodedData?._id
    //   req.picture = decodedData?.picture
    //   req.name = decodedData?.name
      
    }
    next()
  };

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message : 'Invalid Admin Token' })
    }
}