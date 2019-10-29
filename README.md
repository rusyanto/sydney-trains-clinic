## Overview

Domo custom app for Sydney Trains. It's just a simple form with a few questionnaire fields.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to deploy

> **Note:** We assume you are familiar with [Domo Dev Studio](https://developer.domo.com/docs/dev-studio/dev-studio-overview) for deployment to a Domo instance.

Please follow below steps:

 1. Clone or download this project to your local machine.
 2. Find the file `manifest.json` from `public` directory.
 3. Open the file and remove the `id` value.
 4. From your command line, type `domo login` to login to the instance that you're going to deploy the app.
 5. Cd to the project directory, then type `npm run upload` to publish the app.
 6. If publish is successful, you should have a `build` directory created.
 7. Find the file `manifest.json` from this directory.
 8. Open the file, copy the `id` value and paste it to the `manifest.json` in `public` directory.
