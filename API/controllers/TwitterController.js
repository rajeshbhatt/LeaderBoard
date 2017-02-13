module.exports = {
  getData: function(req, res){
    res.json({obj : 'Adios!!'})
  },

  getApi : function(req, res){
    res.json({obj : 'Voila!'})
  }
}
