let tv = new Swiper(`.trend__tv-slider`, {
    slidesPerView: 1,
    spaceBetween: 27,
    // slidesPerGroup: 3,
    loop: true,
    // loopFillGroupWithBlank: true,
    navigation: {
        nextEl: `.trend__tv-slider .swiper-button-next`,
        prevEl: `.trend__tv-slider .swiper-button-prev`,
    },
    breakpoints: {
        1440: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        960: {
            slidesPerView: 4,
        },
        720: {
            slidesPerView: 3,
        },
        500: {
            slidesPerView: 2,
        },
    }
});

let awaited = new Swiper(`.popular__actors-slider`, {
    slidesPerView: 1,
    spaceBetween: 27,
    // slidesPerGroup: 3,
    loop: true,
    // loopFillGroupWithBlank: true,
    navigation: {
        nextEl: `.popular__actors-slider .swiper-button-next`,
        prevEl: `.popular__actors-slider .swiper-button-prev`,
    },
    breakpoints: {
        1440: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        960: {
            slidesPerView: 4,
        },
        720: {
            slidesPerView: 3,
        },
        500: {
            slidesPerView: 2,
        },
    }
});

const headerBtn = document.querySelector('.header__btn'),
       headerItems = document.querySelector('.header__items'),
       headerAbs = document.querySelector('.header__abs'),
       anime = document.querySelector('.anime')


headerBtn.addEventListener('click',(e) => {
    e.preventDefault()
    headerBtn.classList.toggle('active')
    headerItems.classList.toggle('active')
    headerAbs.classList.toggle('active')
    body.classList.toggle('active')
})

headerAbs.addEventListener('click',(e) => {
    if(e.target == e.currentTarget){
        headerBtn.classList.remove('active')
        headerAbs.classList.remove('active')
        headerItems.classList.remove('active')

    }
})

// request 

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY"
const hostValue = "8cde03f0-6c7e-4b87-93a3-fdc689d260d5"

class Kino {
     date
     curYear
     months
     curMonth
    constructor() {
        this.date = new Date().getMonth()
        this.curYear = new Date().getFullYear()
        this.months = ['january','february','march','april','may','june','july','august','september','oktober','november','december']
        this.curMonth = this.months[this.date]
    
    }

    fOpen = async (url) => {
        let response = await fetch(url,{
            headers: {
                [hostName]: hostValue
            }
        })

        if(response.ok) return response.json()
         else throw new Error(`Connect access to ${url}`);
    }



    getTopMovies = (page) => this.fOpen(`${host}/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=${page}`)
    getSoloFilms = (id) => this.fOpen(`${host}/api/v2.2/films/${id}`)
 
    getMostAwaited = (month =  this.curMonth,year = this.curYear) => this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`)
    getPrimier = (month = this.curMonth,year = this.curYear) => this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`)

}

const db = new Kino()

console.log(db.fOpen())
console.log(db.getTopMovies(2))
console.log(db.getSoloFilms(257386))
console.log(db.getMostAwaited())



// render Trend and  awaited 

function renderTrendMovies(elem,fn,films,page ){
    anime.classList.add('active')
        let parent = document.querySelector(`${elem} .swiper-wrapper`)
        db[fn](page).then(data => {
            data[films].forEach(el => {
                let slide = document.createElement('div')
                slide.classList.add('swiper-slide')
                slide.innerHTML = `
                      <div class="movie__item">
                            <img src="${el.posterUrlPreview}" alt="" loading="lazy">
                        </div>
                `
                parent.append(slide)
            })
        })
    anime.classList.remove('active')
}

renderTrendMovies(".trend__tv-slider","getTopMovies","items",1)



  
// renderAwaited  


function renderAwaited(elem,fn,films){
    anime.classList.add('active')
    let parent = document.querySelector(`${elem} .swiper-wrapper`)
    console.log(parent)
    db.getMostAwaited()   
    db[fn]().then(data => {
        data[films].forEach(el => {
            let slide = document.createElement('div')
            slide.classList.add('swiper-slide')

            slide.innerHTML = `
                  <div class="movie__item">
                        <img src="${el.posterUrlPreview}" alt="" loading="lazy">
                    </div>
            `
            parent.append(slide)
        })
    })
    anime.classList.remove('active')
}

renderAwaited(".popular__actors-slider","getMostAwaited","items")


// render header


function randMovies(num) {
    return Math.trunc(Math.random() * num + 1)
}


function renderHeader(page){
    db.getTopMovies(page).then(data => {
        console.log(data)
        anime.classList.add('active')

        let max = randMovies(data.items.length)
        let kinopoiskId = data.items[max].kinopoiskId
        
        db.getSoloFilms(kinopoiskId).then(response => {
            console.log(response)

            let headerText = document.querySelector(".header__text")

            headerText.innerHTML = `
                <h1 class="header__title">${response.nameRu || response.nameEn}</h1>
                    <div class="header__balls">
                        <span class="header__year">${response.year}</span>
                        <span class="logo__span header__rating  header__year ">${response.ratingAgeLimits}+</span>
                        <div class="header__seasons header__year">${response.ratingAwaitCount}+</div>
                        <div class="header__stars header__year"><span class="icon-solid"></span><strong>${response.ratingImdb}</strong></div>
                    </div>
                    <p class="header__descr">
                       ${response.description}
                    </p>
                    <div class="header__buttons">
                        <a href="${response.webUrl}" class="header__watch"><span class="icon-solid"></span>watch</a>
                        <a href="#" class="header__more header__watch movie__item">More information</a>
                    </div>
            `
        })

        anime.classList.remove('active')
    })
}

let page = 13;
let rand = randMovies(page)
console.log(rand)
renderHeader(rand)

// current date 

const popularActorsTitle = document.querySelector('.popular__actors-title strong')
const comingSoonBlock = document.querySelector('.coming__soon-block img')
const year = document.querySelector('.year')

popularActorsTitle.innerHTML = `${db.curMonth} ${db.curYear}`
year.innerHTML = `${db.curYear}`

db.getPrimier().then(res => {
    console.log(res)
    let rand = randMovies(res.total)
    comingSoonBlock.src = res.items[rand].posterUrlPreview
})


