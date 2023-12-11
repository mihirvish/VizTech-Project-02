let table;
let w = 10;
let h = 10;
let margin = 75;
let selectedGenre = null;

// Defining Genres
const genres = ['Rock', 'Pop', 'Electronic', 'Hip Hop', 'Jazz', 'Blues', 'Country', 'Funk'];

function preload() {
  table = loadTable('rollingstones.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1470, 810);
  background(0);

  // Title
  textAlign(LEFT, CENTER);
  fill(255);
  textSize(20);
  text("Rolling Stones Top 500 Albums", margin, margin / 2);

  // Subtitle
  textSize(14);
  text("Project by Mihir Vishwasrao", margin, margin);

  // Legend at the bottom
  drawLegend();
}

function draw() {
  background(0);

  // Looping through table object
  for (let r = 0; r < table.getRowCount(); r++) {
    let Ranking = table.getNum(r, 'Ranking');
    let Year = table.getNum(r, 'Year');
    let Album = table.getString(r, 'Album');
    let Artist = table.getString(r, 'Artist');
    let Genre = table.getString(r, 'Genre');
    let Subgenre = table.getString(r, 'Subgenre');
    let YearRange = map(Year, 1955, 2010, margin, width - margin);
    let rRanking = map(Ranking, 1, 500, margin, height - 30 - margin);

    if (selectedGenre && Genre !== selectedGenre) {
      continue;
    }

    let genreColor = pickColor(Genre); // Calling pickColor function to get color based on genre

    textAlign(CENTER, TOP);
    noStroke();
    fill(genreColor); // Using the color based on genre
    rect(YearRange, rRanking, w, h);

    // Mouse hover
    if (mouseX > YearRange && mouseX < YearRange + w && mouseY > rRanking && mouseY < rRanking + h) {
      // Displaying details with a background rectangle
      fill(0, 150);
      let detailsBoxWidth = 150;
      let detailsBoxHeight = 60;
      rect(mouseX - detailsBoxWidth / 2, mouseY - detailsBoxHeight, detailsBoxWidth, detailsBoxHeight);

      fill(255);
      textSize(12);
      text(`${Album}\n${Artist}\nRanking: ${Ranking}`, mouseX, mouseY - detailsBoxHeight + 10);
    }
  }

  // Drawing y-axis with margin
  stroke(255, 128); // Reduced opacity to 50%
  strokeWeight(1);
  line(margin, margin, margin, height - 30 - margin);

  // Draw tick marks and labels for each ranking with margin_multiples of 100
  for (let ranking = 1; ranking <= 500; ranking += 100) {
    let yPosition = map(ranking, 1, 500, margin, height - 30 - margin);
    line(margin - 5, yPosition, margin, yPosition);
    textAlign(RIGHT, CENTER);
    noStroke();
    fill(255, 128);
    textSize(10);
    text(ranking, margin - 10, yPosition);
  }

  // Drawing x-axis with margin
  stroke(255, 128);
  strokeWeight(1);
  line(margin, height - 30 - margin, width - margin, height - 30 - margin);

  // Drawing tick marks and labels for each year with margin
  for (let year = 1955; year <= 2011; year += 5) {
    let xPosition = map(year, 1955, 2010, margin, width - margin);
    line(xPosition, height - 30 - margin, xPosition, height - 25 - margin);
    textAlign(CENTER, TOP);
    noStroke();
    fill(255, 128);
    textSize(10);
    text(year, xPosition, height - 20 - margin);
  }

  // Drawing legend at the bottom
  drawLegend();
}

function pickColor(genre) {
  let genreColor;

  // Assigning colors based on genres
  switch (genre) {
    case 'Rock':
      genreColor = color('#FF3333'); // Red for Rock
      break;
    case 'Pop':
      genreColor = color('#FF10f0'); // Magenta for Pop
      break;
    case 'Funk':
      genreColor = color('#DCD427'); // Yellow for Funk
      break;
    case 'Electronic':
      genreColor = color('#8968CD'); // Purple for Electronic
      break;
    case 'Hip Hop':
      genreColor = color('#228B22'); // Green for Hip Hop
      break;
    case 'Jazz':
      genreColor = color('#FFd98e'); // Pale Yellow for Jazz
      break;
    case 'Blues':
      genreColor = color('#0F9DDD'); // Blue for Blues
      break;
    case 'Country':
      genreColor = color('#B4D9EF'); // Light Blue for Country
      break;

    default:
      genreColor = color('#808080');
  }

  return genreColor;
}

function drawLegend() {
  const legendX = margin;
  const legendY = height - 20;

  // Equidistant spacing for genres in the legend
  const legendSpacing = (width - 2 * margin) / genres.length;

  for (let i = 0; i < genres.length; i++) {
    const genreColor = pickColor(genres[i]);

    // Checking if the mouse is over the legend rectangle
    if (
      mouseX > legendX + i * legendSpacing &&
      mouseX < legendX + i * legendSpacing + 15 &&
      mouseY > legendY &&
      mouseY < legendY + 15
    ) {
      fill(255, 200); // Semi-transparent white background
      rect(legendX + i * legendSpacing, legendY, 15, 15);

      // Checking if the legend rectangle is clicked
      if (mouseIsPressed) {
        selectedGenre = selectedGenre === genres[i] ? null : genres[i]; // Toggle the selected genre
      }
    } else {
      fill(genreColor);
      rect(legendX + i * legendSpacing, legendY, 15, 15);
    }

    textAlign(LEFT, CENTER);
    fill(255);
    textSize(12);
    text(genres[i], legendX + i * legendSpacing + 20, legendY + 7.5);
  }
}