Plugin for Sencha ExtJS 4.1 for saving tree folders collapsed / expanded state.

How to use:
===========

First you need init state provider:

    Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
      expires: new Date(new Date().getTime()+(1000*60*60*24*7)) //7 days from now
    }));

Your tree view:

    Ext.define('app.view.Tree', {
      extend:'Ext.tree.Panel',
      title: 'Stateful tree',
    
      viewConfig: {
    
        stateful: true,   // Require
        stateId: 'my_id', //Require, your tree id 
        
        plugins:  [ Ext.create('Core.plugin.TreeStateful') ]
      },
    
      store: 'productsTreeStore' // store id
    });



Known issues:
-----------

 - Use private API: 
 
        getTreeStore().tree.flatten();
    

 - If child node is expanded, parent node will be expanded too. 
   Use ctrl + click for collapse all child nodes. 