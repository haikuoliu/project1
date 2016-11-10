# API Manual

## Users

1. Register POST (done)

    URL: `/api/users/register`

    POST:

    ```
    {
        "email": "name@gmail.com",
        "birth": "2000-02-13",
        "password": "aldfjal",
        "sex": "male" | "female",
        "name": "Nick Name"
    }
    ```

    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": null,
      // fail
      "result": {
          "code": 1, // 1 means user name exists, 0 otherwise
          "msg": "User name exists!"
      }
    }
    ```

2. Login POST (done)

    URL: `/api/users/login`

    POST:

    ```
    {
      "email": "name@gmail.com",
      "password": "aldfjal",
    }
    ```

    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": {
        "uid": 23111,
        "email": "name@gmail.com",
        "birth": "2000-02-13",
        "sex": "male" | "female",
        "name": "Nick Name",
        "follows": 123,
      }
      // fail
      "result": {
        "code": 0,
        "msg": "User None Exist"
      }
    }
    ```

3. View Profile of Other Users GET (done)

    URL: `/api/users/view_profile`

    GET:

    ```
    ?myid=1&otherid=2311
    ```

    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": {
        "uid": 23111,
        "isFollow": true | false,
        "email": "name@gmail.com",
        "birth": "742449600.0",
        "sex": "male" | "female",
        "name": "Nick Name",
        "follows": 123,
      }
      // fail
      "result": {
        "code": 0,
        "msg": "User None Exist"
      }
    }
    ```

4. Get User's Subscribes (GET) (done)

    URL: `/api/users/subscribes`

    GET:

    ```
    ?id=1
    ```
    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": ["science", "movie"]
      // fail
      "result": {
        "code": 0,
        "msg": "Some msg"
      }
    }
    ```

## Follows

1. User1 follows User2 (GET) (done)

    URL: `/api/users/follow`

    GET:

    ```
    ?sour=22&dest=12&isFollow=1
    ```

    ```
    isFollow: 0 - Cancel Follows
              1 - Follows
    ```

    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": null
      // fail
      "result": {
        "code": 0,
        "msg": "Unknown"
      }
    }
    ```

2. Retrieve the user list that a specific user follows (done)

    URL: `/api/users/follow/list`

    GET:

    ```
    ?uid=1
    ```

    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": [
        {
          "uid": 23111,
          "email": "name@gmail.com",
          "birth": "742449600",
          "sex": "male" | "female",
          "name": "Nick Name",
          "follows": 123,
        }
      ]
      // fail
      "result": {
        "code": 0,
        "msg": "Unknown"
      }
    }
    ```

## Events & Comments

### Single Event

1. Create/Delete/Edit Events Doc|Pic

    1. Create/Edit (POST) (done)

        URL: `api/event/create`

        POST:

        ```
        {
          "eid": -1 | 123, // null for create
          "event_type": "blog" | "picture",
          "description": "some thing",
          "uid": 2311,
          "username": "haikuo",
          "topics": ["science", "sport"],
          // picture
          "url": "http:0.0.0.0/abcd",
          // blog
          "content": "Some Content",
          "title": "Title"
        }
        ```

        Return:

        ```
        {
          "status": "success" | "fail",
          // success
          "result": {
            "eid": 1021
          }
          // fail
          "result": {
            "code": 0,
            "msg": "Unknown"
          }
        }
        ```

    2. Delete (POST) (done)

        URL: `api/event/delete`

        POST:

        ```
        {
          "uid": 1211,
          "eid": 1021
        }d
        ```

        Return:

        ```
        {
          "status": "" | "fail",
          // success
          "result": null
          // fail
          "result": {
            "code": 0,
            "msg": "Unknown"
          }
        }
        ```

2. View Events & Comments GET (done)

    1. Get Blog | Picture

        URL: `api/event`

        GET:

        ```
        ?eid=12&myid=1 // 0 for visitors
        ```

        Return:

        ```
        {
          "status": "success" | "fail",
          // success
          "result": {
            "eid": 12,
            "event_type": "blog" | "picture",
            "description": "some thing",
            "uid": 2311,
            "user_name": "haikuo"
            "likes": 2,
            "topics": ["science", "sport"],
            "islike": true | false,
            // picture
            "url": "http:0.0.0.0/abcd",
            // blog
            "content": "Some Content",
            "title": "Title"
          }
          // fail
          "result": {
            "code": 0,
            "msg": "Unknown"
          }
        }
        ```

    2. Get Comments (GET) (done)

        URL: `api/event/comments`

        GET:

        ```
        ?eid=12
        ```

        Return:

        ```
        {
          "status": "success" | "fail",
          // success
          "result": {
            "comments": [{
                "eid": 12,
                "uid": 12,
                "user_name": "haikuo",
                "timestamp": 1023023984938,
                "content": "Some Comments"
              }]
          }
          // fail
          "result": {
            "code": 0,
            "msg": "Unknown"
          }
        }
        ```

3. Create Comments POST (done)

    URL: `api/event/comments`

    POST:

    ```
    {
      "uid": 21,
      "eid": 1211,
      "content": "Apple Tree!"
    }
    ```

    Return:

    ```
    {
      "status": "success" | "fail",
      // success
      "result": null,
      // fail
      "result": {
        "code": 0,
        "msg": "Unknown"
      }
    }
    ```

### Events/Ads List

1. Retrieve Feeds GET (done)

URL: `api/posts/feeds`

GET:

```
?uid=12&offset=0&count=10&timestamp=1202323213
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    feeds: [
      {
        "eid": 12,
        "event_type": "blog" | "picture",
        "description": "some thing",
        "uid": 2311,
        "user_name": "haikuo",
        "likes": 23,
        "islike" true | false,
        "topics": ["science", "sport"],
        // picture
        "url": "http:0.0.0.0/abcd",
        // blog
        "title": "Title"
      }
    ]
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

2. Retrieve Users's Posts GET (done)

URL: `api/posts/user`

GET:

```
?uid=12&myid=1
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    feeds: [
      {
        "eid": 12,
        "event_type": "blog" | "picture",
        "description": "some thing",
        "uid": 2311,
        "user_name": "haikuo",
        "likes": 23,
        "islike": true | false,
        "topics": ["science", "sport"],
        // picture
        "url": "http:0.0.0.0/abcd",
        // blog
        "content": "Some contents",
        "title": "Title"
      }
    ]
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

3. Retrieve All Events of Specific Topics (done)

URL: `api/posts/topic`

GET:

```
?topicName=science&myid=1
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "eid": 12,
    "event_type": "blog" | "picture",
    "description": "some thing",
    "uid": 2311,
    "user_name": "haikuo",
    "likes": 23,
    "islike": true | false,
    "topics": ["science", "sport"],
    // picture
    "url": "http:0.0.0.0/abcd",
    // blog
    "content": "Some content",
    "title": "Title"
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

4. Retrieve Users's Ads (GET) (done)

URL: `api/ads/user`

GET:

```
?uid=1&num=4
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "ads": [
      {
        "sid": 12,
        "sponsor_name": "apple",
        "url": "http:..."
        "description": "this is ..."
      }
    ]
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

## Topics & Belongs & Subscribes

1. Retrieve All Topics (done)

URL: `api/topics/all`

GET:

```
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    topics: [
      {
        "topic_name": "science",
        "description": "Some Description",
        "count": 231
      }
    ]
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

2. User subscribes topic (done)

URL: `api/topics/subscribes`

GET:

```
?uid=1&topicName=science
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": null
    ]
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

## Likes (done)

1. User likes/dislikes an event.

URL: `api/likes`

GET:

```
?uid=12&eid=21&isLike=0
```

```
isLike = 0 - Cancel Likes
         1 - Likes
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": null,
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

2. Check whether user likes an event or not. (done)

URL: `api/likes/islike`

GET:

```
?uid=11&eid=1
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": true | false,
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```


## Sponsors

1. Return All Sponsors List (GET) (done)

URL: `/api/sponsors`

GET:

```
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "sponsors": [
      {
        "sid": 123,
        "name": "apple"
      }
    ]
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

## Ads

1. Create a new ad (POST) (done)

URL: `/api/ads/create`

POST:

```
{
  "sid": 123,
  "url": "http:1.1.1.1/abdc",
  "description": "something"
}
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "aid": 111
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

2. Retrieve Sponsor's Ads List (GET) (done)

URL: `/api/ads/sponsor`

GET:

```
?sid=12
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "ads": [
      {
        "sponsor_name": "apple",
        "url": "http:...",
        "description": "some description"
      }
    ]
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

## User_Sets

1. Create a new User_Sets (POST) (done)

URL: `api/user_sets/create`
POST:

```
{
  "sid": 123,
  "filters": {
    "age": [18, 30],
    "sex": ["male", "female"]
  },
  "description": "haha"
}
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "set_id": 123,
    "sid": 123,
    "filters": {
      "age": [18, 30],
      "sex": "male" // Here sex is either male or female
    },
    "description": "haha",
    "size": 100
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

2. Delete a new User_Sets (GET) (Done)

URL: `api/user_sets/delete`
GET: `?set_id=1

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": null
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

3. Get Sponsor's all User_Sets List (GET) (done)

URL: `api/user_sets/sponsor`
GET: `?sid=123`

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "user_sets": [
      {
        "sid": 1,
        "set_id": 2,
        "filters": {
          "age": "18-30"
        },
        "description": "haha",
        "size": 100
      }
    ]
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

4. Get User Sets (GET) (done)

URL: `api/user_sets/get`

GET: `?set_id=1`

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "user_sets":{
        "sid": 123,
        "filters": {
          "age": "18-30"
        },
        "description": "haha",
        "size": 100
      }
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

## Pushes

1. Create a new push (done)

URL: `api/pushes/create`

POST:

```
{
  "sid": 1
  "aid": 1,
  "set_id": 2
}
```

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "sid": 1,
    "aid": 1,
    "price": 11,
    "size": 1000,
    "description": "haha",
    "time": 1349374939
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

2. Retrieve sponsor's pushes list (GET) (done)

URL: `api/pushes/sponsor`

GET: `?sid=1`

Return:

```
{
  "status": "success" | "fail",
  // success
  "result": {
    "pushes": [
      {
        "set_id": 1,
        "sid": 1,
        "aid": 1,
        "price": 11,
        "size": 1000,
        "description": "haha",
        "time": 1349374939
      }
    ]
  }
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```
