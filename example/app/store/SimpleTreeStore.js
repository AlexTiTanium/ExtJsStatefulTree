Ext.define('Example.store.SimpleTreeStore', {
    extend: 'Ext.data.TreeStore',
    storeId:'SimpleTreeSrore',
    autoLoad: true,
    root: {
        expanded: true,
        children: [
            { id: '1', text: "detention", leaf: true },
            { id: '2', text: "homework", children: [
                { id: '3', text: "book report", leaf: true },
                { id: '4', text: "alegrbra", leaf: true}
            ] },
            { id: '5', text: "buy lottery tickets", leaf: true }
        ]
    }
});