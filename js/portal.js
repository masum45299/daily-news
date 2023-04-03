
const allCatagory=async()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`
    const res=await fetch(url)
    const data=await res.json()
    showNav(data.data.news_category)
}

const showNav=users=>{
    const ulContainer=document.getElementById('ul-container');
    users.forEach(user=>{
        const liCreate=document.createElement('li');
        liCreate.classList.add('nav-item');
        liCreate.innerHTML=`
        <a onclick=loadNews('${user.category_id}') class="nav-link active " style="color:#0d6efd" href="#">${user.category_name}</a>
        `;
    ulContainer.appendChild(liCreate);
    })
    
}

allCatagory();



const loadNews=async(catagoryId)=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${catagoryId}`
    const res= await fetch(url)
    const data=await res.json()
    displayNews(data.data)
}
const displayNews=portals=>{
    // console.log(portals);
    spinnerLoader(true)

    const noResult=document.getElementById('No-result');
    if(portals.length==0){
        noResult.classList.remove('d-none')
    }
    else{
        noResult.classList.add('d-none')
    }

    const resultFound=document.getElementById('found-result');
    resultFound.innerHTML=`
    <div class="container">  <p style="margin-bottom:0px">${portals.length} items found for this catagory</p></div>
    `;


    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML=``;
    portals.forEach(portal=>{
        // console.log(portal)
        const createDiv=document.createElement('div');
        createDiv.classList.add('card');
        createDiv.classList.add('mb-3');
        createDiv.innerHTML=`
        <div class="row g-0 ">
            <div class="col-md-4 media">
                <img src="${portal.thumbnail_url}" class="img-fluid     rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${portal.title}</h5>
                    <p class="card-text mb-5">${portal.details.slice(0,450)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img class="rounded-circle" src="${portal.author.img}"alt="" height="50px" width="50px">
                    <div class="mb-0">
                      <p style="margin-bottom:0px ;margin-left:5px">${portal.author.name ? portal.author.name:"No name"}</p>
                      <p style="margin-bottom:0px ; margin-left:5px;">${portal.author.published_date ? portal.author.published_date :"No release date added"}</p>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div><i class="fa-solid fa-eye"></i></div>
                    <p style="margin-left:5px; margin-bottom:0px ;">${portal.total_view ? portal.total_view :"No view"}</p>
                  </div>
                  <div><i style="cursor: pointer;" onclick=loadId("${portal._id}") class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>  
                    </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(createDiv)
    })


    spinnerLoader(false);

}

const loadId=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data=>displayId(data.data[0]))
    .catch(error => console.log(error))
    
}

const displayId=async(idDetails)=>{
    const displayTitleField=document.getElementById('display-title-field');
    displayTitleField.innerText=idDetails.title;
    const displayModalBody=document.getElementById('display-modal-body');
    displayModalBody.innerHTML=`
    <h4>Name : ${idDetails.author.name ? idDetails.author.name :"No name"}</h4>
    <h6>Published date : ${idDetails.author.published_date ? idDetails.author.published_date :"No release date added"}</h6>
    <h6>Details : ${idDetails.details.slice(0,450)}...</h6>
    <small>Total view : ${idDetails.total_view ? idDetails.total_view :"No view"}</small>
    `;
    spinnerLoader(false);
}

const spinnerLoader=isLoader=>{
    const spinner=document.getElementById('spinner')
    if(isLoader== true){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

loadNews("01")




