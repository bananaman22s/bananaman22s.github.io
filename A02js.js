// Main page
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
var candies = ["vodka", "Jagermeister", "cointreau", "blacklabel", "cordonBleu", "singleton"]; // Array of candy colors
var board = []; // 2D array to represent the game board
var rows = 9; // Number of rows on the board (default 9)
var columns = 9; // Number of columns on the board (default 9)
var score = 0; // Player's score

var currTile; // Reference to the tile currently being dragged
var otherTile; // Reference to the tile that the current tile is dropped on

// Initialize the game when the window loads
window.onload = function() {
    startGame(); // Set up the initial board

    // Set a repeating interval (every 100ms) to handle game updates
    window.setInterval(function() {
        crushCandy(); // Check and crush matching candies
        slideCandy(); // Make candies slide down to fill blank spaces
        generateCandy(); // Generate new candies at the top
        if (!hasValidMoves()) { // Check if there are any valid moves left
            reshuffleBoard(); // Reshuffle the board if no valid moves are found
        }
    }, 100);
};

// Function to return a random candy color from the candies array
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; // 0 - 5.99
}

// Function to set up the initial game board
function startGame() {
    for (let r = 0; r < rows; r++) { // Loop through each row
        let row = []; // Create an array for the row
        for (let c = 0; c < columns; c++) { // Loop through each column
            let tile = document.createElement("img"); // Create an image element for the candy
            tile.id = r.toString() + "-" + c.toString(); // Set the id to the row and column
            tile.src = "./images/" + randomCandy() + ".png"; // Set the source to a random candy image

            // Add drag-and-drop event listeners to the tile
            tile.addEventListener("dragstart", dragStart); // Initialize drag process
            tile.addEventListener("dragover", dragOver); // Allow dragging over another tile
            tile.addEventListener("dragenter", dragEnter); // Dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); // Leaving candy over another candy
            tile.addEventListener("drop", dragDrop); // Dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); // After drag process completed, swap candies

            document.getElementById("board").append(tile); // Append the tile to the board in the HTML
            row.push(tile); // Add the tile to the current row array
        }
        board.push(row); // Add the row array to the board array
    }

    console.log(board); // Log the board to the console for debugging
}

// Function to start the drag process
function dragStart() {
    currTile = this; // Store the tile being dragged
}

// Prevent default behavior for drag over event
function dragOver(e) {
    e.preventDefault();
}

// Prevent default behavior for drag enter event
function dragEnter(e) {
    e.preventDefault();
}

// Placeholder function for drag leave event
function dragLeave() {}

// Function to handle dropping a tile
function dragDrop() {
    otherTile = this; // Store the tile being dropped onto
}

// Function to handle the end of a drag
function dragEnd() {
    // Return if either tile is blank
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    // Get coordinates of current tile
    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    // Get coordinates of other tile
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // Check if the tiles are adjacent
    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        // Swap the images of the two tiles
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        // Check if the move is valid
        let validMove = checkValid();
        if (!validMove) {
            // Revert the swap if not valid
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

// Function to crush candies and update the score
function crushCandy() {
    //crushFive(); // Placeholder for future functionality
    //crushFour(); // Placeholder for future functionality
    crushThree(); // Crush sets of three matching candies
    document.getElementById("score").innerText = score; // Update the score display
}

// Function to crush sets of three matching candies
function crushThree() {
    // Check rows for sets of three matching candies
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30; // Increase the score by 30
            }
        }
    }

    // Check columns for sets of three matching candies
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30; // Increase the score by 30
            }
        }
    }
}

// Function to check if there are any valid moves
function checkValid() {
    // Check rows for sets of three matching candies
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

    // Check columns for sets of three matching candies
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

    return false; // Return false if no valid moves are found
}

// Function to slide candies down to fill in blanks
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

// Function to generate new candies at the top
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}

// Function to check if there are any valid moves on the entire board
function hasValidMoves() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (c < columns - 1) {
                // Swap right
                swapTiles(r, c, r, c + 1);
                if (checkValid()) {
                    swapTiles(r, c, r, c + 1); // Swap back
                    return true;
                }
                swapTiles(r, c, r, c + 1); // Swap back
            }
            if (r < rows - 1) {
                // Swap down
                swapTiles(r, c, r + 1, c);
                if (checkValid()) {
                    swapTiles(r, c, r + 1, c); // Swap back
                    return true;
                }
                swapTiles(r, c, r + 1, c); // Swap back
            }
        }
    }
    return false; // Return false if no valid moves are found
}

// Helper function to swap the images of two tiles
function swapTiles(r1, c1, r2, c2) {
    let tempSrc = board[r1][c1].src;
    board[r1][c1].src = board[r2][c2].src;
    board[r2][c2].src = tempSrc;
}

// Function to reshuffle the board if no valid moves are left
function reshuffleBoard() {
    let allCandies = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            allCandies.push(board[r][c].src);
        }
    }

    // Shuffle array
    for (let i = allCandies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCandies[i], allCandies[j]] = [allCandies[j], allCandies[i]];
    }

    // Reassign shuffled candies back to the board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c].src = allCandies.pop();
        }
    }
}




	



