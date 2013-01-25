Ext.application({

  name:'Example',

  controllers:['SimpleTree'],
  views:['SimpleTree'],
  stores:['SimpleTreeStore'],

  launch:function () {

    Ext.create('Example.view.SimpleTree');

  }
});
