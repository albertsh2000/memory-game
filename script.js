const cards = document.querySelectorAll('.card')
let cardOne
let cardTwo
let disableDeck = false
let compareCardCount = 0

function flipCard(e) {
    let clickedCard = e.target

    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip-card')

        if (!cardOne) {
            return cardOne = clickedCard
        }
        cardTwo = clickedCard

        disableDeck = true

        let cardOneImg = cardOne.querySelector('img').src
        let cardTwoImg = cardTwo.querySelector('img').src
        compareCards(cardOneImg, cardTwoImg)
    }
}

function compareCards(img1, img2) {
    if (img1 === img2) {
        compareCardCount++
        if (compareCardCount == 8) {
            setTimeout(() => {
                return shuffleCard()
            }, 900)
        }

        cardOne.removeEventListener('click', flipCard)
        cardTwo.removeEventListener('click', flipCard)
        cardOne = ""
        cardTwo = ""

        return disableDeck = false
    } else {
        setTimeout(() => {
            cardOne.classList.add('shake')
            cardTwo.classList.add('shake')
        }, 400)

        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip-card')
            cardTwo.classList.remove('shake', 'flip-card')
            cardOne = ""
            cardTwo = ""

            disableDeck = false
        }, 1200)
    }
}

function shuffleCard() {
    compareCardCount = 0
    cardOne = ""
    cardTwo = ""

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, index) => {
        card.classList.remove('flip-card')
        let imgTag = card.querySelector('img')
        card.addEventListener('click', flipCard)
        imgTag.src = `images/img-${arr[index]}.png`
    })
}

shuffleCard()

cards.forEach(card => {
    card.addEventListener('click', flipCard)
})