function basic (user, pwd) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {(err?:Error) => void} next
   * 
   */
  function mw(req, res, next) {
    if(!req.headers.authorization) {
      res.set('WWW-Authenticate', 'Basic realm="Our Site"').sendStatus(401);
    } else {
      let split = req.headers.authorization.split(' ');
      if(split[0].toLowerCase() === 'basic') {
        let data = Buffer.from(split[1], 'base64').toString('utf8');
        let pat = /^(.+?):(.+?)$/gm;
        let m = pat.exec(data);
        let username = m[1];
        let password = m[2];

        if(username === user && password === pwd) next();
        else res.set('WWW-Authenticate', 'Basic realm="Our Site"').sendStatus(401);
      }
    }
  }

  return mw;
}

module.exports = basic;