module.exports = {
  msg: function() {
    var args = Array.from(arguments);
    args.unshift('netflixer:');
    console.log.apply(console, args);
  },
  err: function() {
    var args = Array.from(arguments);
    args.unshift('netflixer:');
    console.error.apply(console, args);
  }
}
