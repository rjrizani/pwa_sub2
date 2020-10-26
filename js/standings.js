const base_url = "https://api.football-data.org/v2/competitions/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getData() {
    return new Promise(function(resolve, reject) {
  
    if ("caches" in window) {
      caches.match(base_url+"2021/standings").then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var articleHTML = `
            <div class="card">
              <div class="card-content">
                <span class="card-title">${data.standings[0].table[0].team.name}</span>
                <span class="card-title">${data.standings[0].table[1].team.name}</span>
                <span class="card-title">${data.standings[0].table[2].team.name}</span>
                <span class="card-title">${data.standings[0].table[3].team.name}</span>
                <span class="card-title">${data.standings[0].table[4].team.name}</span>
                <span class="card-title">${data.standings[0].table[5].team.name}</span>
                <span class="card-title">${data.standings[0].table[6].team.name}</span>
                <span class="card-title">${data.standings[0].table[7].team.name}</span>
                <span class="card-title">${data.standings[0].table[8].team.name}</span>
                <span class="card-title">${data.standings[0].table[9].team.name}</span>
                <span class="card-title">${data.standings[0].table[10].team.name}</span>             
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
  
    fetch(base_url+"2021/standings",
      { method: "GET",
        headers: {
                "X-Auth-Token": "2562d52563c540fd88386a0342752e78"}
            })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
        <div class="card">
          <div class="card-content">
            <span class="card-title">${data.standings[0].table[0].team.name}</span>
            <span class="card-title">${data.standings[0].table[1].team.name}</span>
            <span class="card-title">${data.standings[0].table[2].team.name}</span>
            <span class="card-title">${data.standings[0].table[3].team.name}</span>
            <span class="card-title">${data.standings[0].table[4].team.name}</span>
            <span class="card-title">${data.standings[0].table[5].team.name}</span>
            <span class="card-title">${data.standings[0].table[6].team.name}</span>
            <span class="card-title">${data.standings[0].table[7].team.name}</span>
            <span class="card-title">${data.standings[0].table[8].team.name}</span>
            <span class="card-title">${data.standings[0].table[9].team.name}</span>
            <span class="card-title">${data.standings[0].table[10].team.name}</span>             
          </div>
        </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
    });
  }

