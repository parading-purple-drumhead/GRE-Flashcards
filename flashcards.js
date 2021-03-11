$(document).ready(async function () {
    $('select').formSelect();
    // $('.modal').modal();

    //https://jsonkeeper.com/b/1WOH
    words = await ($.getJSON("flashcards.json "))


    $("select").on('change', function () {
        difficulty = $("select").val();
        difficultyArray = words[difficulty];
        shuffle(difficultyArray);
        index = 0;
        console.log(difficultyArray);
        var numberOfWords = $("#number");
        numberOfWords.text(difficultyArray.length);
        var card = $(".card");
        card.slideUp(300);
        setTimeout(nextWord, 300);
        setTimeout(function () {
            $("#array-length").text(difficultyArray.length);
            var cardReveal = $(".card-reveal");
            cardReveal.css('transform', 'translateY(0%)');
        }, 300);
        card.slideDown();
    });

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function prevWord() {
        if (index > 1) {
            var nextWord = difficultyArray[--index - 1];
            showWord(nextWord["word"], nextWord["meaning"]);
            $("#current-index").text(index);
        }
    }

    function nextWord() {
        if (index < difficultyArray.length) {
            var nextWord = difficultyArray[++index - 1];
            showWord(nextWord["word"], nextWord["meaning"]);
            $("#current-index").text(index);
        }
    }

    function showWord(word, meaning) {
        if (!$("#flipped").prop("checked")) {
            var wordTitle = $("#word");
            wordTitle.css("font-size", "5rem");
            wordTitle.text(word);
            var wordMeaningTitle = $("#word-meaning-title");
            wordMeaningTitle.text(word);
            var wordMeaning = $("#word-meaning");
            wordMeaning.text(meaning);
        }
        else {
            var wordTitle = $("#word");
            wordTitle.css("font-size", "3rem");
            wordTitle.text(meaning);
            var wordMeaningTitle = $("#word-meaning-title");
            wordMeaningTitle.text(meaning);
            var wordMeaning = $("#word-meaning");
            wordMeaning.text(word);
        }
    }

    $("#next").click(function () {
        var card = $(".card");
        card.slideUp(300);
        setTimeout(nextWord, 300);
        setTimeout(function () {
            var cardReveal = $(".card-reveal");
            cardReveal.css('transform', 'translateY(0%)');
        }, 300);
        card.slideDown();
    });

    $("#previous").click(function () {
        var card = $(".card");
        card.slideUp(300);
        setTimeout(prevWord, 300);
        setTimeout(function () {
            var cardReveal = $(".card-reveal");
            cardReveal.css('transform', 'translateY(0%)');
        }, 300);
        card.slideDown();
    });

    $("#shuffle").click(function () {
        var card = $(".card");
        card.slideUp(300);
        shuffle(difficultyArray)
        setTimeout(function () {
            index = 0;
            console.log(difficultyArray);
            nextWord();
            var cardReveal = $(".card-reveal");
            cardReveal.css('transform', 'translateY(0%)');
        }, 300);
        card.slideDown();
    })


    $("#add-word-button").on('click', function () {
        var newWord = $("#word-input");
        var newMeaning = $("#meaning-input");
        if (newWord.val() != '' && newMeaning.val() != '') {
            console.log(newWord.val(), newMeaning.val());
            var modal = document.querySelector(".modal");
            M.Modal.getInstance(modal).close();
            newWord.val('');
            newMeaning.val('');
        }
    })

    $("#dismiss-modal").on('click', function () {
        var newWord = $("#word-input");
        var newMeaning = $("#meaning-input");
        newWord.val('');
        newMeaning.val('');
    })

    window.addEventListener('keydown', e => {
        if (e.keyCode == 39) {
            var card = $(".card");
            card.slideUp(300);
            setTimeout(nextWord, 300);
            setTimeout(function () {
                var cardReveal = $(".card-reveal");
                cardReveal.css('transform', 'translateY(0%)');
            }, 300);
            card.slideDown();
        }
        if (e.keyCode == 37) {
            var card = $(".card");
            card.slideUp(300);
            setTimeout(prevWord, 300);
            setTimeout(function () {
                var cardReveal = $(".card-reveal");
                cardReveal.css('transform', 'translateY(0%)');
            }, 300);
            card.slideDown();
        }
    })

});