var dbPromised = idb.open("football", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("tables", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
  });

function saveForLater(key) {
    dbPromised
      .then(async function(db) {
        const tx = db.transaction("tables", "readwrite");
        const store = tx.objectStore("tables");
        console.log(key);
        await store.add(key.standings[0].table);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }


// function saveForLater(key) {
//     dbPromised
//       .then(function(db) {
//         const tx = db.transaction("articles", "readwrite");
//         const store = tx.objectStore("articles");
//         console.log(key);
//         await store.add(key.standings[0].table);
//         await tx.done;
//       })
//       .then(function() {
//         console.log("Artikel berhasil di simpan.");
//       });
//   }

  // function saveForLater(articles) {
  //   dbPromised
  //     .then(function (db) {
  //       let tx = db.transaction("articles", "readwrite");
  //       let store = tx.objectStore("articles");
  //       console.log(articles);
  //       store.add(articles);
  //       return tx.complete;
  //     })
  //     .then(function () {
  //       console.log("articles berhasil disimpan.");
  //       M.toast({
  //         html: `Added to favorite.`
  //       });
  //     })
  //     .catch(error => console.log(error));
  // }