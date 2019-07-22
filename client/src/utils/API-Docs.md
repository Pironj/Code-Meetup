# API Endpoints

## (Work in progress)

## Users

User Schema: 
```javascript
 {
    google_id: {
      type: String,
      unique: true,
      required: true
    },
    first_name: {
      type: String,
      required: false
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    // location: { // TODO
    //   type: pointSchema,
    //   required: true
    // }
  },
```

| Method | URL | Description |
| ---    | --- | ---         |
GET  | /api/users     | Find all users
POST | /api/users     | Create user
GET  | /api/users/:id | Find user by id
PUT  | /api/users/:id | Update user by id
DELETE | /api/users/:id | Delete user by id


## Events

Event Schema
```javascript
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 10000,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }
    // location: { // TODO
    //   type: pointSchema,
    //   required: true
    // }
  },
  ```
| Method | URL | Description |
| ---    | --- | ---         |
GET  | /api/events     | Find all events
POST | /api/events     | Create event (Also creates a UserEvent document for the event creator with their event)
GET  | /api/events/:id | Find event by id
PUT  | /api/events/:id | Update event by id
DELETE  | /api/events/:id | Delete event by id (Also deletes all UserEvent docs with an event_id === id)

## UserEvents
UserEvent entries are a record of a user attending an event.

UserEvent Schema
```javascript
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event_id: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    }
  },
```

| Method | URL | Description |
| ---    | --- | ---         |
GET  | /api/userEvents     | Find all UserEvents
POST | /api/userEvents     | Create UserEvent
GET  | /api/userEvents/:id     | Find UserEvent by id
DELETE  | /api/userEvents/:id     | Delete UserEvent by id
GET  | /api/userEvents/user/:user_id | Find all events for a user id
GET  | /api/userEvents/event/:event_id | Find all users for an event id
DELETE | api/userEvents/delete/:user_id/:event_id | Delete UserEvent with user id and event id
GET | api/userEvents/:user_id/:event_id | find UserEvent by User id and event id

## Comments

Comment Schema
```javascript
  {
    creator: {
      type: Schema.Types.ObjectId,
      required: true
    },
    event: {
      type: Schema.Types.ObjectId,
      required: true
    },
    body: {
      type: String,
      required: false,
      trim: true,
    },
    // location: { // TODO
    //   type: pointSchema,
    //   required: true
    // }
  },
  ```
| Method | URL | Description |
| ---    | --- | ---         |
GET  | /api/comments     | Find all comments
POST | /api/comments     | Create comment
GET  | /api/comments/:id | Find comment by id
PUT  | /api/comments/:id | Update comment by id
DELETE  | /api/comments/:id | Delete comment by id
GET  | /api/comments/user/:user_id | Find comments for user id
GET  | /api/comments/event/:event_id | Find comments for event id

