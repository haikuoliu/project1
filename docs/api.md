# API Manual

## Users

1. Register POST

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
      "status": "succ" | "fail",
      // succ
      "result": null,
      // fail
      "result": {
          "code": 0
          "msg": "User name exists!"
      }
    }
    ```

2. Login POST

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
      "status": "succ" | "fail",
      // succ
      "result": {
        "uid": 23111,
        "email": "name@gmail.com",
        "birth": "2000-02-13",
        "sex": "male" | "female",
        "name": "Nick Name",
        "follows": 123,
        "topics": ["science", "movie"]
      }
      // fail
      "result": {
        "code": 0,
        "msg": "User None Exist"
      }
    }
    ```

3. View Profile of Other Users GET

    URL: `/api/users`

    GET:

    ```
    ?id=2311
    ```

    Return:

    ```
    {
      "status": "succ" | "fail",
      // succ
      "result": {
        "uid": 23111,
        "isFollow": true | false,
        "email": "name@gmail.com",
        "birth": "2000-02-13",
        "sex": "male" | "female",
        "name": "Nick Name",
        "follows": 123,
        "topics": ["science", "movie"]
      }
      // fail
      "result": {
        "code": 0,
        "msg": "User None Exist"
      }
    }
    ```

## Follows

1. User1 follows User2 (GET)

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
      "status": "succ" | "fail",
      // succ
      "result": null
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

    1. Create/Edit (POST)

        URL: `api/event/create`

        POST:

        ```
        {
          "eid": null | 123, // null for create
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
          "status": "succ" | "fail",
          // succ
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

    2. Delete (POST)

        URL: `api/event/delete`

        POST:

        ```
        {
          "uid": 1211,
          "eid": 1021
        }
        ```

        Return:

        ```
        {
          "status": "succ" | "fail",
          // succ
          "result": null
          // fail
          "result": {
            "code": 0,
            "msg": "Unknown"
          }
        }
        ```

2. View Events & Comments GET

    1. Get Blog | Picture

        URL: `api/event`

        GET:

        ```
        ?eid=12
        ```

        Return:

        ```
        {
          "status": "succ" | "fail",
          // succ
          "result": {
            "eid": 12,
            "event_type": "blog" | "picture",
            "description": "some thing",
            "uid": 2311,
            "user_name": "haikuo"
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

    2. Get Comments (GET)

        URL: `api/event/comments`

        GET:

        ```
        ?eid=12
        ```

        Return:

        ```
        {
          "status": "succ" | "fail",
          // succ
          "result": {
            "comments": [ {
                "cid": 102,
                "uid": 12,
                "user_name": "haikuo",
                "timestamp": 1023023984938,
                "content": "Some Comments"
              } ]
          }
          // fail
          "result": {
            "code": 0,
            "msg": "Unknown"
          }
        }
        ```

3. Create Comments POST

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
      "status": "succ" | "fail",
      // succ
      "result": null,
      // fail
      "result": {
        "code": 0,
        "msg": "Unknown"
      }
    }
    ```

### Events/Ads List

1. Retrieve Feeds GET

URL: `api/posts/feeds`

GET:

```
?uid=12&offset=0&count=10&timestamp=1202323213
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    feeds: [
      {
        "eid": 12,
        "event_type": "blog" | "picture",
        "description": "some thing",
        "uid": 2311,
        "user_name": "haikuo",
        "likes": 23,
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

2. Retrieve Users's Posts GET

URL: `api/posts/user`

GET:

```
?uid=12
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    feeds: [
      {
        "eid": 12,
        "event_type": "blog" | "picture",
        "description": "some thing",
        "uid": 2311,
        "user_name": "haikuo",
        "likes": 23,
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

3. Retrieve All Events of Specific Topics

URL: `api/posts/topic`

GET:

```
?topicName=science
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "eid": 12,
    "event_type": "blog" | "picture",
    "description": "some thing",
    "uid": 2311,
    "user_name": "haikuo",
    "likes": 23,
    // picture
    "url": "http:0.0.0.0/abcd",
    // blog
    "title": "Title"
  },
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

4. Retrieve Users's Ads (GET)

URL: `api/ads/user`

GET:

```
?uid=123
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "ads": [
      {
        "sid": 12,
        "sponsor_name": "apple",
        "url": "http:..."
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

1. Retrieve All Topics

URL: `api/topics/all`

GET:

```
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
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

## Likes

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
  "status": "succ" | "fail",
  // succ
  "result": null,
  // fail
  "result": {
    "code": 0,
    "msg": "Unknown"
  }
}
```

## Sponsors

1. Return All Sponsors List (GET)

URL: `/api/sponsors`

GET:

```
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
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

1. Create a new ad (POST)

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
  "status": "succ" | "fail",
  // succ
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

2. Retrieve Sponsor's Ads List (GET)

URL: `/api/ads/sponsor`

GET:

```
?sid=12
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "ads": [
      {
        "sid": 12,
        "sponsor_name": "apple",
        "url": "http:..."
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

1. Create a new User_Sets (POST)

URL: `api/user_sets/create`
POST:

```
{
  "sid": 123,
  "filters": {
    "age": "18-30"
  },
  "description": "haha"
}
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "set_id": 123,
    "sid": 123,
    "filters": {
      "age": "18-30"
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

2. Delete a new User_Sets (GET)

URL: `api/user_sets/delete`
GET: `?set_id=123`

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": null
  // fail
  "result": {
    "code": 0,
    "msg": "User None Exist"
  }
}
```

3. Get Sponsor's all User_Sets List (GET)

URL: `api/user_sets/sponsor`
GET: `?sid=123`

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "user_sets": [
      {
        "sid": 123,
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

4. Get User Sets (GET)

URL: `api/user_sets/get`

GET: `?set_id=1`

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "user_sets": [
      {
        "sid": 123,
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

## Pushes

1. Create A new 

URL: `api/pushes/create`

POST:

```
{
  "sid": 1,
  "aid": 1,
}
```

Return:

```
{
  "status": "succ" | "fail",
  // succ
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

2. Retrieve sponsor's pushes list (GET)

URL: `api/pushes/sponsor`

GET: `?sid=1`

Return:

```
{
  "status": "succ" | "fail",
  // succ
  "result": {
    "pushes": [
      {
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