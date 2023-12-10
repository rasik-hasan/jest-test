## About API KEY

# System details:

1. Node -v 18.16.1
2. npm -v 9.5.1
3. May need typescript and ts-node installed globally

# Running the project:

1. To run the project , run "npm start"
2. To run tests , run "npm run test

# Notes:

1. Normally the .env file should not be committed to git, but for ease of use in this demo, it is being committed.

2. For the bonus requirement, by resilient, does it mean the app won't crash and exit gracefully? If so, this is resilient because of try catch. No solution like exponential step-back etc. has been implemented.

3. For git management, I would have made a master for prodution releases, develop for development release and feature branches from develop. For brevity of time it has just been a master and a feature branch.

4. This is the first time I am writing tests, so did my best with unit test and a integration test. I would love to know how you guys write and manage tests.
