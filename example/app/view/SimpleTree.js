Ext.define('Example.view.SimpleTree', {
  extend:'Ext.tree.Panel',

  height:300,
  width:200,

  title:'Simple Tree',
  viewConfig:{

    stateful:true, // Require
    stateId:'my_id', //Require, your tree id

    plugins:[ 'treestateful' ]
  },

  store:'SimpleTreeStore',
  renderTo:Ext.getBody()
});