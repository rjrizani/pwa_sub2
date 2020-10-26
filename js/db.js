var dbPromised = idb.open("football", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("tables", {
    keyPath: "team.id"
  });
  articlesObjectStore.createIndex("id_team", "team.id", { unique: false });
});

function saveForLater(key) {
  dbPromised
    .then(function(db) {
      const tx        = db.transaction("tables", "readwrite");
      const store     = tx.objectStore("tables");
      const standings = key.standings[0].table;

      standings.forEach(item =>{
        store.put(item);
      });

      return tx.complete;
    })
    .then(function() {
      console.log("Data berhasil di simpan dan ditampilkan ke halaman note.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("tables", "readonly");
        const store = tx.objectStore("tables");
        return store.getAll();
      })
      .then(function(tables) {
        resolve(tables);
      });
  });
}

// function delete team
function clearTeam() {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("tables", "readwrite");
      let store = tx.objectStore("tables");
      store.clear();
      return tx.complete;
    })
    .then(function () {
      console.log("Database berhasil dihapus.");
      M.toast({
        html: `Removed from Database.`
      });
    })
    .catch(error => console.log(error));
}

// function getById(id) {
//   return new Promise(function(tables, reject) {
//     dbPromised
//       .then(function(db) {
//         var tx = db.transaction("tables", "readonly");
//         var store = tx.objectStore("tables");
//         return store.get(id);
//       })
//       .then(function(tables) {
//         resolve(tables);
//       });
//   });
// }
