/**
* TreeStateful plugin for ExtJs 4.1
* 
* @site https://github.com/AlexTiTanium/ExtJsStatefulTree 
* @author Alex Kucherenko <kucherenko.email@gmail.com>
* @copyright 2012 Alex Kucherenko
* @version 1.0.0
*
* MIT LICENSE
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Ext.define('Core.plugin.TreeStateful', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.treestateful',

  init : function(view) {

    var me = this;

    view.addStateEvents('afteritemcollapse', 'afteritemexpand');

    view['getState'] = me.getState;
    view['saveState'] = me.saveState;

    view.getTreeStore().on("load",  me.applyState, view);
  },

  saveState: function() {

    var me = this,
        id = me.stateful && me.getStateId(),
        state;

    if (id) {
      state = me.getState() || [];    //pass along for custom interactions

      if(state.length != 0){
        Ext.state.Manager.set(id, state);
      }
    }
  },

  getState: function(){

    var ids = [];
	
	// Warning! Use private API: tree.flatten()
    var expanded = Ext.Array.filter(this.getTreeStore().tree.flatten(), function (node) {
      return node.get('expanded') == true;
    });

    Ext.each(expanded, function (node) {
      if(node.getId()=='root') return;
      ids.push(node.getId());
    });

    if(ids.length == 0){ ids = null; }

    return ids;
  },

  applyState: function(){

    var me = this,
    id = me.stateful && me.getStateId(),
    state,
    store = me.getTreeStore(),
    node;

    if (id) {

      state = Ext.state.Manager.get(id);

      if (state) {
        state = Ext.apply([], state);

        Ext.each(state, function (id) {
          node = store.getNodeById(id);
          if(node){
            node.bubble(function(node){node.expand()});
          }
        });
      }
    }

  }

});