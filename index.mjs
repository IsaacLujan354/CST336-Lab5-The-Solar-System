const solarSystem = (await import('npm-solarsystem')).default;

import express from 'express';

// express is an API engine
// it lets you make your own APIs
const app = express();

// EJS is a way to dynamically build html pages
// and easily substitute data into them
app.set("view engine", "ejs");

// public folder
app.use(express.static("public"));

app.get('/', async (req, res) => {
   try {
      const pixabayData = await fetch('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar system');

      if (!pixabayData.ok) {
         throw new Error("Error accessing API endpoint");
      }

      const pixabayResponse = await pixabayData.json();
      console.log(pixabayResponse);

      res.render('home.ejs', { pixabayResults: pixabayResponse });

   } catch (err) {
      res.render('home.ejs', { pixabayResults: null });
   } //catch
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;

   if (planet === "jupiter") {
      let jupiterData = solarSystem.getJupiter();
      res.render('planet.ejs', { planetName: "Jupiter", planetData: jupiterData });
   } else if (planet === "mars") {
      let marsData = solarSystem.getMars();
      res.render('planet.ejs', { planetName: "Mars", planetData: marsData });
   } else if (planet === "earth") {
      let earthData = solarSystem.getEarth();
      res.render('planet.ejs', { planetName: "Earth", planetData: earthData });
   } else if (planet === "mercury") {
      let mercuryData = solarSystem.getMercury();
      res.render('planet.ejs', { planetName: "Mercury", planetData: mercuryData });
   } else if (planet === "venus") {
      let venusData = solarSystem.getVenus();
      res.render('planet.ejs', { planetName: "Venus", planetData: venusData });
   } else if (planet === "saturn") {
      let saturnData = solarSystem.getSaturn();
      res.render('planet.ejs', { planetName: "Saturn", planetData: saturnData });
   } else if (planet === "uranus") {
      let uranusData = solarSystem.getUranus();
      res.render('planet.ejs', { planetName: "Uranus", planetData: uranusData });
   } else if (planet === "neptune") {
      let neptuneData = solarSystem.getNeptune();
      res.render('planet.ejs', { planetName: "Neptune", planetData: neptuneData });
   } else if (planet === "pluto") {
      let plutoData = solarSystem.getPluto();
      res.render('planet.ejs', { planetName: "Pluto", planetData: plutoData });
   }
});


// Not used anymore
app.get('/jupiter', (req, res) => {
   let jupiterPicture = "";
   res.render('planet.ejs', { name: "Jupiter", image: jupiterPicture });
});

app.get('/mars', (req, res) => {
   let marsPicture = "https://en.wikipedia.org/wiki/Jupiters";
   res.render('planet.ejs', { name: "Mars", image: marsPicture });
});


app.get('/catDetails', (req, res) => {
   let catInfo = {
      name: "meowers",
      breed: "calico",
      age: 2
   }
   res.json(catInfo);
});

app.listen(3000, () => {
   console.log('server started');
});