# Contributing

We welcome contributions to Glint! To help us help you be successful, please follow this basic approach:

- For bugs, please [file an issue]() before opening a PR to fix it.
- For a feature idea, please [start a discussion](https://github.com/typed-ember/glint/discussions/categories/ideas) before opening a PR to implement it.
- For questions, please [start a discussion](https://github.com/typed-ember/glint/discussions/categories/q-a) rather than filing an issue.

## Working on the project

Glint is a family of packages which all live in this repo as a Yarn workspace. To be most successful here, you should:

- Install [Volta](https://volta.sh), a JavaScript toolchain manager we use to make sure everyone working on the project is using the same versions of Node and Yarn.
- Clone the repo.
- Run `yarn` in the root of the repo to install all the package dependencies. If you have Volta installed, it will automatically fetch and use the correct versions of Node and Yarn for you.
- Run `yarn build` in the root of the repository to build all of the projects the first time. This will make sure that once you start working on one of the packages, you are working with an up to date version of the other packages in the project it depends on. (For example: )

Once you have the changes made and added tests to confirm they work correctly, you can then open a PR and we'll work with you to polish it up and get it landed!
