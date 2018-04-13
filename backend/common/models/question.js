'use strict';

module.exports = function (Question) {
  Question.beforeRemote('find', function (ctx, instance, next) {
    if (!ctx.args.filter || !ctx.args.filter.limit) {
      console.log('forcing limit!');
      if (!ctx.args.filter) ctx.args.filter = {};
      ctx.args.filter.limit = 10;
    }else if (ctx.args.filter.limit > 50) {
      ctx.args.filter.limit = 50;
    }
    next();
  });
};
