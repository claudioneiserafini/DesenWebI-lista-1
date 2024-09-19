document.getElementById("image-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;
  const quantity = document.getElementById("quantity").value;

  if (width < 100 || width > 1920 || height < 100 || height > 1080) {
    alert("Valores de largura e altura devem estar entre 100 e 1920px e 100 e 1080px, respectivamente.");
    return;
  }

  generateImages(width, height, quantity);
});

function generateImages(width, height, quantity) {
  const imageGrid = document.getElementById("image-grid");
  imageGrid.innerHTML = ""; // Limpar o grid anterior

  for (let i = 0; i < quantity; i++) {
    const imageId = Math.floor(Math.random() * 1000); // Gerar um ID aleatório para manter a imagem consistente
    const imageUrl = `https://picsum.photos/id/${imageId}/${width}/${height}.webp`; // URL correta para a imagem com ID

    const imageContainer = document.createElement("div");

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = `Imagem aleatória de ${width}x${height}px da API Picsum`;

    const actions = document.createElement("div");
    actions.classList.add("image-actions");

    // Baixar imagem em Full HD, agora abrindo em nova guia
    const downloadLink = document.createElement("a");
    const downloadUrl = `https://picsum.photos/id/${imageId}/1920/1080.webp`; // Usar o mesmo ID para o download
    downloadLink.href = downloadUrl;
    downloadLink.innerHTML = '<i class="fa fa-download"></i>';
    downloadLink.target = "_blank"; // Abrir em nova guia

    // Copiar link da imagem
    const copyLink = document.createElement("a");
    copyLink.href = "#";
    copyLink.innerHTML = '<i class="fa fa-copy"></i>';
    copyLink.onclick = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(imageUrl).then(() => {
        alert("Link copiado para a área de transferência!");
      });
    };

    // Compartilhar no WhatsApp
    const shareLink = document.createElement("a");
    shareLink.href = `https://wa.me/?text=${encodeURIComponent(imageUrl)}`;
    shareLink.target = "_blank";
    shareLink.innerHTML = '<i class="fa fa-share"></i>';

    actions.appendChild(downloadLink);
    actions.appendChild(copyLink);
    actions.appendChild(shareLink);

    imageContainer.appendChild(image);
    imageContainer.appendChild(actions);
    imageGrid.appendChild(imageContainer);
  }
}
