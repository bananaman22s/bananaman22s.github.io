// Main page

// Function to enter fullscreen mode
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

// Function to exit fullscreen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

// Attach the function to the button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
});

// Other existing JavaScript code for your website
// For example, your slider functionality and other interactions can go here


//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideall();
function hideall(){ //function to hide all pages
	for(let onepage of allpages){ //go through all subtopic pages
		onepage.style.display="none"; //hide it
	}
}
function show(pgno){ //function to show selected page no
	hideall();
	//select the page based on the parameter passed in
	let onepage=document.querySelector("#page"+pgno);
	//show the page
	onepage.style.display="block";
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
	show(1);
});
page2btn.addEventListener("click", function () {
	show(2);
});
page3btn.addEventListener("click", function () {
	show(3);
});


document.addEventListener('DOMContentLoaded', function() {
    const hamBtn = document.querySelector('#hamIcon');
    const navList = document.querySelector('.nav-list');

    // Toggle menu when hamburger icon is clicked
    hamBtn.addEventListener('click', function() {
        navList.classList.toggle('active'); // Toggle the menu
        hamBtn.classList.toggle('active'); // Toggle the hamburger icon
    });

    // Close the menu if clicking outside of it
    document.addEventListener('click', function(event) {
        if (!hamBtn.contains(event.target) && !navList.contains(event.target)) {
            navList.classList.remove('active'); // Hide menu
            hamBtn.classList.remove('active'); // Reset hamburger icon
        }
    });
});



//Page 2
let currentIndex = 0; // Initial index of the slide

// Slide data (text content for each slide)
const slideTexts = [
    "Margarita - Tequila, tripple sec, lime juice",
    "EspressoMartini - Espresso, coffee liqueur, vodka",
    "Mojito - White rum, sugar, lime zest, soda water",
    "PinaColada - coconut cream, white rum, pineapple juice",
    "SexOnTheBeach - vodka, peach schnapps, cranberry, orange juice",
    "Classic Negroni - gin, vermouth, campari",
    "Old Fassion - whisky, bitters, soda water, orange zest",
    "Pimms - mint leaves, cucumber, orange, strawberry, pomegranate, ginger ale"
];

function showSlide(index) {
    const slides = document.querySelectorAll('.slide'); // Get all slides
    if (index >= slides.length) {
        currentIndex = 0; // Loop back to first slide
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Loop back to last slide
    } else {
        currentIndex = index; // Set current slide index
    }
    
    const offset = -currentIndex * 100; // Calculate translation offset
    document.querySelector('.slider-wrapper').style.transform = 'translateX(' + offset + '%)';

    // Update the text box content based on the current slide index
    const textBox = document.querySelector('#cocktail-text-box p'); // Select the text box outside the slider
    if (textBox) {
        textBox.textContent = slideTexts[currentIndex]; // Update text content
        console.log('Text box updated with:', slideTexts[currentIndex]); // Debugging
    } else {
        console.error('Text box not found for slide index:', currentIndex); // Debugging
    }
}

function nextSlide() {
    showSlide(currentIndex + 1); // Show next slide
}

function prevSlide() {
    showSlide(currentIndex - 1); // Show previous slide
}

// Attach event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentIndex); // Show initial slide

    const nextSlideBtn = document.getElementById('nextSlideBtn');
    const prevSlideBtn = document.getElementById('prevSlideBtn');

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function() {
            nextSlide(); // Show next slide on button click
        });
    }

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function() {
            prevSlide(); // Show previous slide on button click
        });
    }
});


// Page 3
// Create an IntersectionObserver instance
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) { 
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

// Select all elements with the class 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(function(el) {
    observer.observe(el); // Observe each element
});


// Game
var candies = ["vodka", "Jagermeister", "cointreau", "blacklabel", "cordonBleu", "singleton"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function() {
    startGame();
    window.setInterval(function() {
        crushCandy();
        slideCandy();
        generateCandy();
        if (!hasValidMoves()) {
            reshuffleBoard();
        }
    }, 100);
};

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Add drag-and-drop event listeners
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Add touch event listeners for mobile
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

// Touch event handlers for mobile
function touchStart(e) {
    currTile = e.target;
}

function touchMove(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.tagName === 'IMG') {
        otherTile = element;
    }
}

function touchEnd(e) {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}

function hasValidMoves() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (c < columns - 1) {
                swapTiles(r, c, r, c + 1);
                if (checkValid()) {
                    swapTiles(r, c, r, c + 1);
                    return true;
                }
                swapTiles(r, c, r, c + 1);
            }
            if (r < rows - 1) {
                swapTiles(r, c, r + 1, c);
                if (checkValid()) {
                    swapTiles(r, c, r + 1, c);
                    return true;
                }
                swapTiles(r, c, r + 1, c);
            }
        }
    }
    return false;
}

function swapTiles(r1, c1, r2, c2) {
    let tempSrc = board[r1][c1].src;
    board[r1][c1].src = board[r2][c2].src;
    board[r2][c2].src = tempSrc;
}

function reshuffleBoard() {
    let allCandies = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            allCandies.push(board[r][c].src);
        }
    }

    for (let i = allCandies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCandies[i], allCandies[j]] = [allCandies[j], allCandies[i]];
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c].src = allCandies.pop();
        }
    }
}




	



