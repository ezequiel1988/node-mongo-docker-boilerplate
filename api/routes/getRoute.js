module.exports = router => {
   
    router.get('/', async (req, res) => {

        res.send({
            'Hello, thanks for using my apiRest, any questions or queries can be found at this email: ezequiel.leo.olivera@gail.com'
        })
    })
  
  };
  