import passport from 'passport';
import { Strategy } from 'passport-steam';
import User from '../models/userModel.js';

const strategyOptions = {
  returnURL: `http://localhost:5000/api/auth/steam/return`,
  realm: `http://localhost:5000/api/`,
  apiKey: "64E6444F84EAC46E4F893426767A2F33",
};

const Testing = app => {
    passport.use(
      new Strategy(strategyOptions, async (identifier, profile, done) => {
        profile.identifier = identifier;

        //console.log(profile); //log
        
        let user = await User.findOne({ steamId: profile.id });
  
        if (!user) {
          user = await new User({
            steamid: profile._json.steamid,
            username: profile._json.personaname,
          }).save();
        }
  
        return done(null, user);
      }),
    );
  
    app.use(passport.initialize());
  };

export default Testing;
