const Allcategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => addCategories(data.data.news_category))
        .catch(error => console.log(error));
}
const addCategories = categories => {
    categories.forEach(categorie => {
        // console.log(categorie);
        const addcategoriesId = document.getElementById('add-categories');
        const creatdiv = document.createElement('div');
        creatdiv.classList.add('col');
        creatdiv.innerHTML = `
            <div class="col single-style">
                 <button class="btn" onclick="newsfile('${categorie.category_id}')">${categorie.category_name}</button>
            </div>
        `
        addcategoriesId.appendChild(creatdiv);
        // togglebar(true)
    })
    // '${categorie}'
}
const newsfile = (category_id) => {
    togglebar(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => singlenews(data.data))
    // console.log(data);
}

const singlenews = finds => {
    finds.sort((a, b) => {
        return b.total_view - a.total_view
    })
    const showNews = document.getElementById('show-all-news').innerText = finds.length;
    const newssection = document.getElementById('news-section');
    if (finds.length === 0) {
        alert('No news found')
    };
    newssection.innerHTML = ``;
    finds.forEach(find => {
        console.log(find)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add = "card mb-3 bg-white p-4";
        newsDiv.innerHTML = `
        <div class="row g-0 mt-4"  data-bs-toggle="modal" data-bs-target="#searchOnNews"    onclick="personalId('${find._id}')">
        <div class="col-md-2">
        <img src="${find.image_url}" class="img-fluid w-100 h-100 p-2 rounded-start" alt="...">
    </div>
    <div class="col-md-10 container-fluid">
        <div class="card-body d-flex flex-column h-100 justify-content-between">
        <h5 class="card-title">${find.title}</h5>
        <p class="card-text" id="news-details">${find.details ? find.details : 'nothing found'}</p>
            
            <div class="d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                    <img class="aurthor-img" src="${find.author.img}" alt="...">
                    <div class="aurthor-info">
                        <p class="mt-2">${find.author.name ? find.author.name : "No Author Name Found"}</p>
                        <p>${find.author.published_date}</p>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <p><i class="fa-regular fa-eye"></i></p>
                    <p>${find.total_view ? find.total_view : '0'}</p>
                </div>
                <div>
                    <p class="pointer-cursor" onclick="loadDetails('${find._id}')" data-bs-toggle="modal"
                    data-bs-target="#exampleModalScrollable"><i class="fa-solid fa-arrow-right-long"></i></p>
                </div>
            </div>
            
        </div>
    </div>
        </div>
        `;
        newssection.appendChild(newsDiv);
    });
    togglebar(false);



}
const togglebar = isloading => {
    const loadingbar = document.getElementById('loading');
    if (isloading) {
        loadingbar.classList.remove('d-none');
    }
    else {
        loadingbar.classList.add('d-none')
    }
}
const personalId = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))
}
// const 
const displayModal = allnews => {

    allnews.forEach(news => {
        const modalTitle = document.getElementById('exampleModalLabel')
        modalTitle.innerText = news.title;
        const modalBody = document.getElementById('modal-body')
        modalBody.innerHTML = ` 
      <img class="img-fluid" src="${news.author.img}" alt="">
      <P>${news.author.name ? news.author.name : 'No found name'} </br> ${news.author.published_date}
      <hr>
      <p>${news.total_view ? news.total_view : 'No data available'} </p>
      <p>${news.title}</p>
      <img class="img-fluid" src="${news.thumbnail_url}" alt="">
      `
    })
}


Allcategories()
newsfile('05');
