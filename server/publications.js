Meteor.publish('accessories', function (visibility) {
  check(visibility, Match.OneOf('all', 'active', 'passive'));

  this.enableScope();

  this.autorun((computation) => {
    this.setData('all', Collections.Accessories.find({}).count());
  });

  this.autorun((computation) => {
    this.setData('remaining', Collections.Accessories.find({status: false}).count());
  });

  if (visibility === 'active') {
    return Collections.Accessories.find({status: false});
  }
  else if (visibility === 'passive') {
    return Collections.Accessories.find({status: true});
  }
  // visibility === 'all'
  else {
    return Collections.Accessories.find({});
  }
});
