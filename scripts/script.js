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
const hostValue = "f93dc692-5336-4064-81f0-3dda437ccf95"

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
   

}

const db = new Kino()

console.log(db.fOpen())
console.log(db.getTopMovies(2))
console.log(db.getSoloFilms(257386))
console.log(db.getMostAwaited())



// render Trend and  awaited 



function renderTrendMovies(elem =[],fn = [],films = [],page = []){
    anime.classList.add('active')

    elem.forEach((item,i) => {
        let parent = document.querySelector(`${item} .swiper-wrapper`)
        console.log(db[fn[i]](page[i]))
        db[fn[i]](page[i]).then(data => {
            data[films[i]].forEach(el => {
                console.log(el)
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

    })

    anime.classList.remove('active')
}

renderTrendMovies([".trend__tv-slider",".popular__actors-slider"],["getTopMovies","getMostAwaited"],["items","items"],[1,1])








