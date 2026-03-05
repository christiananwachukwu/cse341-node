const express = require('express');
const router = express.Router();

router.get('/professional', (req, res) => {
  res.json({
    professionalName: 'Christiana Nwachukwu',
    base64Image: '',
    nameLink: {
      firstName: 'Christiana',
      url: 'https://github.com/christiananwachukwu'
    },
    primaryDescription: ' is a Web Developer studying at BYU-Idaho',
    workDescription1: 'I am passionate about building amazing web applications and learning new technologies every day.',
    workDescription2: 'Currently studying Web Development and Services at BYU-Idaho, expanding my skills in Node.js and MongoDB.',
    linkTitleText: 'Find me on social media:',
    linkedInLink: {
      text: 'LinkedIn',
      link: 'https://linkedin.com/in/christiana-nwachukwu-3ab796151'
    },
    githubLink: {
      text: 'GitHub',
      link: 'https://github.com/christiananwachukwu'
    },
    facebookLink: {
        text: 'Facebook',
        link: 'https://www.facebook.com/christy.nwachukwu'
    }
  });
});

module.exports = router;