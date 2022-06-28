## IQ-TranS Dashboard

This is the React frontend for the IQ-TranS Dashboard.

## Env variables

```
REACT_APP_API_ENDPOINT
```

## Run the App
First create a `.env` file with all required variables inside your root directory.\
Run `npm install` then `npm start`.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Mock Backend
There is no backend for the IQ-TranS Dashboard yet. 
To mock a REST API we use [Mockoon](https://mockoon.com/). \
To get it running download Mockoon and import the configuration file. \
The configuration file is located in the root directory of this repository.
```
rest_api_mock.json
```

Make sure the env variable `REACT_APP_API_ENDPOINT` is the same as the port of the mocked REST API. 

## Styling

For styling the [styled components library](https://styled-components.com/) is being used.
Also [Material UI React](https://material-ui.com/) is used as a component library.


## Build App for production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
