import React, { useState } from 'react';
import './App.css';
import { getStorage, ref, listAll } from 'firebase/storage';
import app from './common/firebase';

function App() {
  const [listItems, setListItems] = useState(null);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(app, 'gs://b2bal-c1612.appspot.com');

  // Points to the root reference
  const storageRef = ref(storage);

  const click = () =>
    listAll(storageRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        const items = res.items.map((item, i) => (
          //All the items under listRef.
          <li key={item.name}>{item.name}</li>
        ));
        console.log('a');
        setListItems(items);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={() => click()}>
          Get List
        </button>
        <ul>{listItems}</ul>
      </header>
    </div>
  );
}

export default App;
