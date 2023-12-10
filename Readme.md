# System details (written and tested on):

1. Node -v 18.16.1
2. npm -v 9.5.1
3. May need typescript and ts-node installed globally

# Running the project:

1. Install packages with "npm install"
2. To have ts-node installed globally. Use "npm install -g ts-node"
3. To run the project , run "npm start"
4. To run tests , run "npm run test"

# Notes:

1. Normally the .env file should not be committed to git, but for ease of use in this demo, it is being committed.

2. For the bonus requirement, exponential back-off is implemented with 3 tries before throwing an error.

3. For git management, I would have made a master for production releases, develop for development release and feature branches from develop. For brevity of time it has just been a master and a feature branch.

4. Also, the branches are not very strictly maintained for a single purpose. Usually I prefer having separate feature branches for each feature or purpose.

5. I am not super familiar with writing tests, so did my best with unit test and a integration test. I would love to know how you guys write and manage tests or any feedback about that. In this demo, I used Jest.

6. Running the tests takes a bit of time, please be patient and let it run.

7. Added console logs in the functions just to show that the code is running and for dramatic purposes only.
