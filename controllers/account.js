import jwt from 'jsonwebtoken' 
import config from '../config.js';

      //acessar o token com req.cookies.token - ok
      //extrair jwt do token - (não entendi onde é necessário)
      //usar o jwt.verify - ok
      //salvar token na memória req.token = token - (não entendi o que devo fazer)

export default function verifyAuth(req, res, next){

    if(req.path == '/api/users/auth/steam/return' || req.path == '/api/users/auth/steam') {
      next(); //se for uma rota de login eu deixo o cara acessar
    } 

    else 
    {
      if(!req.cookies.token) {
        return res.status(401).send('NÃO AUTORIZADO')
      }
    
      jwt.verify(req.cookies.token, config.SECRET_KEY, (err, decoded) => {
        if (err){
          console.log(err);
          req.authenticated = false;
          req.decoded = null;
          return res.status(500).send('ERRO')
      } else {
          //console.log("Deu certo");
          req.decoded = decoded;
          req.authenticated = true;
          next();
      }
      })
    }

  }