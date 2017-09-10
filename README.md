# Meta Charles World
Charles world re-implemented as a web application to work cross-platform. 
# Mechanism
The code runs dynamically in browser and it corelates function names like `on_ball` and `step` to internal implementations. The code runs only once and generates an array of *snapshots* of how Charles world looks like after every change (see `state-manager.ts` for details), a `render` method then takes every snapshot and draws the state of the world one snapshot at a time with a delay between the drawings.
# Installation
```
clone https://github.com/Zaid-Ajaj/MetaCharlesWorld.git meta-charles
cd meta-charles
npm install
npm run watch
``` 
This will start `webpack-dev-server` in the background in watch mode for auto re-compilations of the typescript project (using ts-loader). You can navigate to `http://localhost:8080` to start using the app.