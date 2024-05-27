export function renderFunction(data) {
  console.log(data.length);
  return data
    .map(
      item => `<a class="section-item" data-id=${item.id} href ='${item.largeImageURL}'> 
            <img 
            class="section-img"
            src="${item.webformatURL}"
            alt="${item.tags}"
            >
            <div class="section-soc">
             <div class="section-info">
                <p class="section-props">Likes</p>
                <span class="section-props-count">${item.likes}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Views</p>
                <span class="section-props-count">${item.views}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Comments</p>
                <span class="section-props-count">${item.comments}</span>
              </div>
              <div class="section-info">
                <p class="section-props">Downloads</p>
                <span class="section-props-count">${item.downloads}</span>
              </div>
            </div>
          </a>`
    )
    .join('');
}
