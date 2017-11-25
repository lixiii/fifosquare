# fifo Square

To start server, run `sudo npm start`

## Data Structure and API calls

```
[
    {user: String,
    time: Time,
    groupSize: Number},
    {

    }
]

```

| API URL | API Call type | Expected data structure |
| -------- | ------ | ------------ |
| `/example` | GET | {username: String, password: String} | 
| `/models/booth.js` | GET | {boothname: String, password: String, email: String, qblksize: Number} |
| `/routes/Q.js` | PUT | {user: String, phone: String} |