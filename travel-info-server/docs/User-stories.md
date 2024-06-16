<center>

# User Stories

</center>

## Core Features

### User Authentication

1. **As a** new user, **I want to** register an account by sending my details to the backend, **so that** I can access personalized features like favourite locations.
2. **As a** user, **I want to** log in by sending my credentials to the backend, **so that** I can authenticate myself and access my account securely.
3. **As a** logged-in user, **I want to** change my password through the backend, **so that** I can maintain the security of my account.
4. **As a** user, **I want to** be authenticated on every request I make, **so that** my interactions with the backend services remain secure and personalized.

### Favourite Locations

5. **As a** logged-in user, **I want to** retrieve my stored favourite locations from the backend, **so that** I can easily access them whenever I need.
6. **As a** logged-in user, **I want to** add new locations to my list of favourites through the backend, **so that** I can personalize my experience based on places I care about.
7. **As a** logged-in user, **I want to** remove locations from my favourites list through the backend, **so that** my list remains relevant to my current interests.

## Additional Features

### JSON Web Token Authentication

8. **As a** user, **I want to** receive a JSON Web Token (JWT) upon logging in, **so that** I can use it for all subsequent requests to ensure they are secure and authenticated.

### Proxy Services

#### Weather API Proxy Service

9. **As a** frontend developer, **I want to** make requests to a backend service for weather information, **so that** I can obtain weather data without exposing the API key in the frontend application.

#### Hotel API Proxy Service

10. **As a** frontend developer, **I want to** make requests to a backend service for hotel information, **so that** I can obtain hotel data without exposing the API key in the frontend application.