document.addEventListener("DOMContentLoaded", function () {
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  let localStorageKey = "photos";
  let photos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  let modal = document.getElementById("location-modal");
  let span = document.getElementsByClassName("close")[0];

  // Iniciar a câmera
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      });
    });
  } else {
    document.getElementById("upload-photo").style.display = "block"; // Mostrar input de upload se não houver câmera
  }

  // Tirar foto
  document.getElementById("take-photo").addEventListener("click", function () {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.style.display = "block";
  });

  // Obter localização
  document.getElementById("get-location").addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let locationInput = document.getElementById("manual-location");
        locationInput.value = `${position.coords.latitude}, ${position.coords.longitude}`;
      });
    } else {
      alert("Geolocalização não é suportada por este navegador.");
    }
  });

  // Salvar registro
  document.getElementById("photo-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let title = document.getElementById("photo-title").value;
    let description = document.getElementById("photo-description").value || "Sem descrição";
    let location = document.getElementById("manual-location").value || "Localização não informada";
    let date = new Date().toLocaleString();
    let photoData = canvas.toDataURL("image/png");

    let newPhoto = {
      id: Date.now(),
      title: title,
      description: description,
      location: location,
      date: date,
      photo: photoData,
    };

    photos.push(newPhoto);
    localStorage.setItem(localStorageKey, JSON.stringify(photos));
    renderPhotoTable();
  });

  // Renderizar a tabela de fotos salvas
  function renderPhotoTable() {
    let photoTableBody = document.querySelector("#photo-table tbody");
    photoTableBody.innerHTML = "";
    photos.forEach((photo, index) => {
      let row = `
        <tr>
          <td>${index + 1}</td>
          <td>${photo.title}</td>
          <td>${photo.description}</td>
          <td>${photo.location}</td>
          <td>${photo.date}</td>
          <td class="actions">
            <button onclick="viewPhoto(${photo.id})">Ver</button>
            <button onclick="editPhoto(${photo.id})">Editar</button>
            <button onclick="deletePhoto(${photo.id})">Excluir</button>
            <button onclick="viewLocation(${photo.id})">Ver Localização</button>
          </td>
        </tr>`;
      photoTableBody.innerHTML += row;
    });
  }

  // Inicializar a tabela ao carregar a página
  renderPhotoTable();

  // Função para exibir o modal com a localização no mapa
  window.viewLocation = function (id) {
    let photo = photos.find((p) => p.id === id);
    if (photo && photo.location) {
      let location = photo.location.split(",");
      let lat = parseFloat(location[0]);
      let lon = parseFloat(location[1]);

      modal.style.display = "block";

      let map = L.map('map').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup(photo.title)
        .openPopup();
    }
  };

  // Fechar o modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Funções para ver, editar e excluir fotos
  window.viewPhoto = function (id) {
    let photo = photos.find((p) => p.id === id);
    if (photo) {
      let newWindow = window.open();
      newWindow.document.write(`<img src="${photo.photo}" alt="${photo.title}" />`);
    }
  };

  window.editPhoto = function (id) {
    let photo = photos.find((p) => p.id === id);
    if (photo) {
      document.getElementById("photo-title").value = photo.title;
      document.getElementById("photo-description").value = photo.description;
      document.getElementById("manual-location").value = photo.location;
      photos = photos.filter((p) => p.id !== id); // Remover para editar
      localStorage.setItem(localStorageKey, JSON.stringify(photos));
      renderPhotoTable();
    }
  };

  window.deletePhoto = function (id) {
    if (confirm("Tem certeza que deseja excluir esta foto?")) {
      photos = photos.filter((p) => p.id !== id);
      localStorage.setItem(localStorageKey, JSON.stringify(photos));
      renderPhotoTable();
    }
  };
});
