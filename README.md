# Gemini Integration API

This project provides an API for integrating with Google's Generative AI model, Gemini. It uses `express` for creating server routes, `cors` for handling Cross-Origin Resource Sharing, and `dotenv` for managing environment variables. The API allows users to send prompts to the Gemini model and receive generated content in response.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)

## Features
- Integration with Google's Generative AI model, Gemini.
- RESTful API with endpoints for sending prompts and receiving generated content.
- Error handling for API requests.
- Configurable using environment variables.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Fadilix/gemini-integration-api.git
    cd gemini-integration-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your API key and port:
    ```env
    API_KEY=your_google_generative_ai_api_key
    PORT=8081
    ```
    * You can get an api key [here](https://aistudio.google.com/app/apikey?hl=en)

4. Start the server:
    ```bash
    nodemon index.js
    ```

## Usage

Once the server is running, you can interact with the API using any HTTP client like Postman, Insomnia, or `curl`.

## Endpoints

### `GET /`
- **Description**: A simple endpoint to test if the server is running.
- **Response**: 
    - `200 OK`: `{ msg: "This is a gemini integration api" }`

### `POST /gemini`
- **Description**: Sends a prompt to the Gemini model and returns the generated content.
- **Request Body**:
    - `prompt` (string): The input prompt to send to the Gemini model.
- **Response**:
    - `200 OK`: `{ result: "Generated content from Gemini" }`
    - `500 Internal Server Error`: `{ message: "Internal Server Error" }`
