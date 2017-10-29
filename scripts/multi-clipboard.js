let MultiClipboard = function() {};

MultiClipboard.prototype.storeClipboardHistory = function(store, clip) {
    if (store.has('clipHistory')) {
      history = store.get('clipHistory');
    } else {
      history = [];
    }

    if (!(clip === history[0]) && clip.trim().length > 0) {
      console.log(clip.length);
      history = [clip, ...history.slice(0, 9)];
      store.set('clipHistory', history);
      console.log('stored ' + clip );
    }
};

MultiClipboard.prototype.watchClipboard = function(store, clipboard) {
  setInterval(() => {
    let clip = clipboard.readText();
    
    this.storeClipboardHistory(store, clip);
  }, 500);
};


exports.MultiClipboard = MultiClipboard;
