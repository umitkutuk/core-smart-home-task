Methods = {};

Methods.Accessories = {};


Methods.Accessories.Add = new ValidatedMethod({
  name: 'accessories.add',
  validate(args) {
    check(args, {
      accessory: {
        title: Match.NonEmptyString,
        status: Boolean,
      },
    });
  },
  run({accessory}) {
    accessory.timestamp = new Date();
    return Collections.Accessories.insert(accessory);

  },
});

Methods.Accessories.Remove = new ValidatedMethod({
  name: 'accessories.remove',
  validate(args) {
    check(args, {
      accessoryId: Match.DocumentId,
    });
  },
  run({accessoryId}) {
    return Collections.Accessories.remove(accessoryId);
  },
});

Methods.Accessories.SetTitle = new ValidatedMethod({
  name: 'accessories.set-title',
  validate(args) {
    check(args, {
      accessoryId: Match.DocumentId,
      title: Match.NonEmptyString,
    });
  },
  run({accessoryId, title}) {
    return Collections.Accessories.update(accessoryId, {$set: {title}});
  },
});

Methods.Accessories.SetStatus = new ValidatedMethod({
  name: 'accessories.set-status',
  validate(args) {
    check(args, {
      accessoryId: Match.DocumentId,
      status: Boolean,
    });
  },
  run({accessoryId, status}) {
    return Collections.Accessories.update(accessoryId, {$set: {status}});
  },
});

Methods.Accessories.AllStatus = new ValidatedMethod({
  name: 'accessories.all-status',
  validate(args) {
    check(args, {
      status: Boolean,
    });
  },
  run({status}) {
    return Collections.Accessories.update({}, {$set: {status}}, {multi: true});
  },
});

Methods.Accessories.RemoveStatus = new ValidatedMethod({
  name: 'accessories.remove-status',
  validate(args) {
    check(args, {});
  },
  run() {
    return Collections.Accessories.remove({status: true});
  },
});
