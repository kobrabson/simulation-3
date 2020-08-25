const bcrypt = require('bcrypt');
const { default: Post } = require('../src/Components/Post/Post');

module.exports = {
  login: async (req, res) => {
      const db = req.app.get('db');
      const { username, password } = req.body;
      const user = await db.check_username(username);
      if(!user[0]) {
          return res.status(404).send('Username not found, sorry try another one');
      } else {
          const authenticated = bcrypt.compareSync(password, user[0].password);
          if(authenticated) {
              req.session.user = {
              userId: user[0].user_id,
              username: user[0].username
            }
            res.status(200).send(req.session.user)
          } else {
              res.status(401).send('Password incorrect')
          }
      }
  },

  register: async (req, res) => {
      const db = req.app.get('db');
      const { username, password, profilePic } = req.body;
      const existingUser = await db.check_username(username);
      if( existingUser[0] ) {
          return res.status(409).send('User already exists')
      }
      const salt = bcrypt.genSaltSync(15);
      const hash = bcrypt.hashSync(password, salt)
      const [newUser] = await db.create_user([username, profilePic, hash])
      req.session.user  = {
          userId: newUser.user_id,
          username: newUser.username,
          profilePic: newUser.profile_pic
      }
      res.status(200).send(req.session.user)
  },
  logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
  },
  getUser: (req, res) => {
      if(req.session.user){
          res.status(200).send(req.session.user)
      } else {
          res.sendStatus(404)
      }
  },

  searchPosts: async (req, res) => {
    const { userposts, search } = req.query;
    const db = req.app.get("db");
    const allPosts = await db.get_posts();
    let filtered = null;
    console.log(allPosts);

    if (userposts === "true" && search) {
      filtered = allPosts.filter((e, i) => {
        if (e.title.includes(search)) return true;
      });
    } else if (userposts === "false" && search) {
      filtered = allPosts.filter((e, i) => {
        if (e.author_id !== req.session.id && e.title.includes(search))
          return true;
      });
    } else if (userposts === "true" && !search) {
      filtered = allPosts;
    } else {
      filtered = allPosts.filter((e, i) => {
        if (e.author_id !== req.session.userId) return true;
      });
    }
    res.status(200).send(filtered);
  },

  getPost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let post = await db.get_post(+id);
    post = post[0];
    res.status(200).send(post);
  },
  addPost: (req, res) => {
    const { title, image, content } = req.body;
    const db = req.app.get("db");
    db.add_post(title, image, content, req.session.userId);
    res.sendStatus(200);
  },

}