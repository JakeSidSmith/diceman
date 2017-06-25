# Diceman [![CircleCI](https://circleci.com/gh/JakeSidSmith/diceman/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/diceman/tree/master)
**Random Item Picker - HipChat Integration**

## Deployment & integration

1. Deploy to Heroku. More info [here](https://devcenter.heroku.com/articles/git).

1. Add integration to HipChat with `/diceman` as the command. More info [here](https://blog.hipchat.com/2015/02/11/build-your-own-integration-with-hipchat/).

## Usage

* Ask a yes or no question

    ```
    /diceman are you as awesome as everybody says?
    ```

* Pick a random item from a list

    ```
    /diceman 1, 2, 3 or 4
    ```

* Ask a question followed by a list of options

    ```
    /diceman can you pick one of these? Yes, absolutely, I'd be happy to
    ```
