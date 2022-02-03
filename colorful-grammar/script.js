// const wordpos = new WordPOS({
//   dictPath: 'https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict',
// });

// document.addEventListener("DOMContentLoaded", () => {
//   function updateBackground() {
//     let sentence = document.querySelector('#sentence').value;
//
//     wordpos.getPOS(sentence.toLowerCase()).then((types) => {
//       let color = 
//         types.verbs.length +
//         types.adverbs.length +
//         types.nouns.length +
//         types.adjectives.length +
//         types.rest.length;
//       document.querySelector('body').style.backgroundColor = `hsl(${color}, 100%, 50%)`;           
//     });
//   }
//   updateBackground();
//   document.querySelector('#sentence').addEventListener('keydown', updateBackground);
// });

// $(document).ready(function () {
//   function updateBackground() {
//     let sentence = $('#sentence').val();
//
//     wordpos.getPOS(sentence).then(function (types) {
//       let color = 
//         types.verbs.length +
//         types.adverbs.length +
//         types.nouns.length +
//         types.adjectives.length +
//         types.rest.length;
//       $('body').css('background-color', `hsl(${color}, 100%, 50%)`);           
//     });
//   }
//   updateBackground();
//   $('#sentence').on('keydown', updateBackground);
// });


const wordpos = new WordPOS({
  dictPath: 'https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict'
})

$(document).ready(function () {
  function updateBackground() {
    let sentence = $('#sentence').val()

    wordpos.getPOS(sentence).then(function (types) {
      var color =
        types.verbs.length +
        types.adverbs.length +
        types.nouns.length +
        types.adjectives.length +
        types.rest.length

      $('body').css('background-color', `hsl(${color}, 100%, 50%)`)
    })
  }
  updateBackground()
  $('#sentence').on('keydown', updateBackground)
})
