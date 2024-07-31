let inpWord = document.querySelector('input'),
    word    = document.querySelector('.word h2'),
    button  = document.querySelector('button'),
    sound   = document.querySelector('audio')


button.addEventListener('click', function(){
       getDictionary(inpWord.value)
})
inpWord.addEventListener('keyup',function(e){
       if(e.keyCode === 13){       
              getDictionary(inpWord.value)
       }
})


async function getDictionary(word){
       let dictionaryAPI = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
       dictionaryAPI = await dictionaryAPI.json()

       let wordTitle = dictionaryAPI[0].word 
       let soundWord = /^https:/.test(dictionaryAPI[0].phonetics[0].audio) ? dictionaryAPI[0].phonetics[0].audio : /^https:/.test(dictionaryAPI[0].phonetics[1].audio) ? dictionaryAPI[0].phonetics[1].audio : 'nothing'
       let txt       = dictionaryAPI[0].phonetics[0].text 
       let paragraph = dictionaryAPI[0].meanings[0].definitions[0].definition

       displayDictionary(wordTitle,txt,paragraph,soundWord)
}


function displayDictionary(Dictionary,txt,paragraph,soundWord){
       let box = `
              <div class="word">
                     <h2>${Dictionary}</h2>
                     <button class="audio" onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
              </div>

              <div class="details">
                     <p>${txt}</p>
                     <p class="paragraph">${paragraph}</p>
              </div>
       `
       document.querySelector('.output').innerHTML = box
       
       if (soundWord != 'nothing') {
              sound.setAttribute('src',soundWord)
              document.querySelector('.audio').removeAttribute('disabled')
       }else {
              document.querySelector('.audio').setAttribute('disabled','disabled')
       }
}

function playSound(){
       sound.play()
}
