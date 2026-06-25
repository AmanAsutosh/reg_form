# Step 1: Use an official runtime environment as the base image
FROM node:18-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy dependency files first (optimizes Docker build caching)
COPY package*.json ./

# Step 4: Install your application dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Inform Docker which port the application listens on
EXPOSE 3000

# Step 7: Define the command to start the application inside the container
CMD ["node", "server.js"]
