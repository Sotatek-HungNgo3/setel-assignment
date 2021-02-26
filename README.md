# Setel Practical Assignment

Microservice with NestJS backend and React frontend.

## Installation

```bash
git clone https://github.com/Sotatek-HungNgo3/setel-practical-assignment.git setel-pratical-assignment

cd setel-pratical-assignment

cd ./orders && npm i
cd ../client && npm i
cd ../payments && npm i
cd ../
```

## Usage

This application still in development. For now, I just use `docker-compose` to create Mongodb

```bash
docker-compose up --build
```

Leave that and you can go to next step

The installation in development need a few step, please follow the guide step by step

### Step 1: Start Order service

```bash
cd ./orders
npm run start:dev
```

It will show the error, but don't worry, we will fix it.

### Step 2: Start Payment service

```bash
cd ../payments
npm run start:dev
```

### Step 3: Restart Order Service

Now you can go back to the order service, shutdown the development server and start it again

```bash
cd ../orders
npm run start:dev
```

### Step 4: Start React Application

```bash
cd ../client
npm start
```

Now you ready to go.

## Testing

This application also tested, you can run the test to see the result.

## Test for Order service

```bash
cd ../orders
npm run test
```

## Test for Payment service

```bash
cd ../payments
npm run test
```

## Technology

Here is all the tech I have use in this project:

- Frontend: [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- Backend: [NestJS](https://nestjs.com/) + Database [Mongodb](https://www.mongodb.com/)
- Lib CSS: [Material UI](https://material-ui.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
