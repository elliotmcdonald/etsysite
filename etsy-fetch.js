
 
const apiKey = 'unjjvkxhuselud5do76kfe05';  // Replace 'YOUR_API_KEY' with your actual Etsy API key
const userId = '46540310'; // Replace 'your_user_id' with your Etsy user ID

const url = `https://openapi.etsy.com/v2/shops/${etsyShopName}/listings/active?api_key=${etsyApiKey}&includes=MainImage`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const productsGrid = document.querySelector('.products-grid');
    
    data.results.forEach(item => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.setAttribute('data-dimensions', 'A4'); // Adjust dimensions as needed
      productCard.setAttribute('data-material', 'Paper'); // Adjust material as needed
      productCard.setAttribute('data-description', item.description);

      productCard.innerHTML = `
        <img src="${item.MainImage.url_570xN}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Price: $${item.price}</p>
        <button class="open-etsy" onclick="window.open('${item.url}', '_blank')">Open in Etsy</button>
      `;

      productsGrid.appendChild(productCard);
    });

    // Add the event listeners to the fetched product cards
    document.querySelectorAll('.product-card').forEach((product) => {
      product.addEventListener('click', () => {
        let title = product.querySelector('h3').textContent;
        let price = product.querySelector('p').textContent;
        let imageUrl = product.querySelector('img').getAttribute('src');
        let altText = product.querySelector('img').getAttribute('alt');
        let dimensions = product.getAttribute('data-dimensions');
        let material = product.getAttribute('data-material');
        let description = product.getAttribute('data-description');

        let modal = document.createElement('div');
        modal.classList.add('modal');
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `
          <h3>${title}</h3>
          <img src="${imageUrl}" alt="${altText}" style="width: 500px; height: 500px;">
          <p>Dimensions: ${dimensions}</p>
          <p>Material: ${material}</p>
          <p>${price}</p>
          <p>Full description: ${description}</p>
          <button class="close-modal">Close</button>
        `;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.style.display = 'block';

        modal.querySelector('.close-modal').addEventListener('click', () => {
          modal.style.display = 'none';
        });
      });

      product.querySelector('.open-etsy').addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  })
  .catch(error => console.error('Error fetching Etsy data:', error));
