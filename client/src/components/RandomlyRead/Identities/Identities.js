const Identities = [{
  alias: "Home",
  navigation: true,
  pathname: [ "/therapy/splash/introduction", "/therapy/splash/techniques", "/therapy/splash/practice" ],
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdXRpbmVzIjpbIjYxYzBiNTBjMGZhZjAwMGFiZTkxMDkxYSJdLCJpbnRlcmFjdGlvblNldHRpbmdzIjpbXSwiY2xpZW50cyI6W10sInVzZXJuYW1lIjoiZXhlcmNpc2V1c2VyMDA5IiwiZmlyc3ROYW1lIjoiRXhlcmNpc2UiLCJsYXN0TmFtZSI6IlVzZXIwMDkiLCJpc0FjdGl2ZSI6dHJ1ZSwiaWQiOiI1ZmVlNmQ2M2VkZjM5MjBkODg4NDZhMGEifSwiaWF0IjoxNjQwMDE5MjUwLCJleHAiOjg4MDM5OTMyODUwfQ.sSP9uWhym9mryU4lLC6zqhRXyt9zeHGxvFQfb2ztz0o",
  user: {
    "routines": [],
    "interactionSettings": [],
    "clients": [],
    "username": "exerciseuser009",
    "firstName": "Exercise",
    "lastName": "User009",
    "isActive": false,
    "id": "5fee6d63edf3920d88846a0a"
  }
},{
  alias: "Beginner",
  navigation: true,
  pathname: [ "/therapy/beginner/introduction", "/therapy/beginner/techniques", "/therapy/beginner/practice" ],
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdXRpbmVzIjpbIjVmZWQxMWJkZWRmMzkyMGQ4ODg0Njc3NSJdLCJpbnRlcmFjdGlvblNldHRpbmdzIjpbXSwiY2xpZW50cyI6W10sInVzZXJuYW1lIjoiZXhlcmNpc2V1c2VyMDAxIiwiZmlyc3ROYW1lIjoiRXhlcmNpc2UiLCJsYXN0TmFtZSI6IlVzZXIwMDEiLCJpc0FjdGl2ZSI6ZmFsc2UsImlkIjoiNWZlZDExOWVlZGYzOTIwZDg4ODQ2Nzc0In0sImlhdCI6MTYxODAxNjYyNiwiZXhwIjo4ODAxNzkzMDIyNn0.cq2RSFajG2EJlvvaQy6ykyrZ4hjIJDDrpPmsiQhcfxw",
  user: {
    "routines": [
      "5fed11bdedf3920d88846775"
    ],
    "interactionSettings": [],
    "clients": [],
    "username": "exerciseuser001",
    "firstName": "Exercise",
    "lastName": "User001",
    "isActive": false,
    "id": "5fed119eedf3920d88846774"
  }
},{
  alias: "Intermediate",
  navigation: true,
  pathname: [ "/therapy/intermediate/introduction", "/therapy/intermediate/techniques", "/therapy/intermediate/practice" ],
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdXRpbmVzIjpbIjYwNmEzMzRhY2M5Y2Y1MjM1YzI4MjA3ZSIsIjYwNzM4ODNjZjkzOTgzNTI0MDMzOTk1MSIsIjYwNzM5YzRlZjkzOTgzNTI0MDMzOTk1MiIsIjYwNzM5YzU4ZjkzOTgzNTI0MDMzOTk1MyIsIjYwN2NiNTllMjczZjBhNWQ2OGY1MTBiYSIsIjYwN2NiNWI2MjczZjBhNWQ2OGY1MTBiYiIsIjYwN2NiNWM0MjczZjBhNWQ2OGY1MTBiYyIsIjYwN2NiNWQ0MjczZjBhNWQ2OGY1MTBiZCJdLCJpbnRlcmFjdGlvblNldHRpbmdzIjpbXSwiY2xpZW50cyI6W10sInVzZXJuYW1lIjoiZXhlcmNpc2V1c2VyMDAyIiwiZmlyc3ROYW1lIjoiRXhlcmNpc2UiLCJsYXN0TmFtZSI6IlVzZXIwMDIiLCJpc0FjdGl2ZSI6ZmFsc2UsImlkIjoiNWZlZTZjZjdlZGYzOTIwZDg4ODQ2YTAzIn0sImlhdCI6MTYxODc4NjM5MywiZXhwIjo4ODAxODY5OTk5M30.jwPltIy4kZuxeu_ViuKvj7uSTNEbisV1Pz9hRWkkF2I",
  user: {
    "routines": [],
    "interactionSettings": [],
    "clients": [],
    "username": "exerciseuser002",
    "firstName": "Exercise",
    "lastName": "User002",
    "isActive": false,
    "id": "5fee6cf7edf3920d88846a03"
  }
},{
  alias: "Advanced",
  navigation: true,
  pathname: [ "/therapy/advanced/introduction", "/therapy/advanced/techniques", "/therapy/advanced/practice" ],
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdXRpbmVzIjpbXSwiaW50ZXJhY3Rpb25TZXR0aW5ncyI6W10sImNsaWVudHMiOltdLCJ1c2VybmFtZSI6ImV4ZXJjaXNldXNlcjAwMyIsImZpcnN0TmFtZSI6IkV4ZXJjaXNlIiwibGFzdE5hbWUiOiJVc2VyMDAzIiwiaXNBY3RpdmUiOnRydWUsImlkIjoiNWZlZTZkMGVlZGYzOTIwZDg4ODQ2YTA0In0sImlhdCI6MTYyMjQzMjQwNiwiZXhwIjo4ODAyMjM0NjAwNn0.hdy4OTQB8NcblDcCPaatbzr_is4zY1k7lOu4UfoLW0I",
  user: {
    "routines": [],
    "interactionSettings": [],
    "clients": [],
    "username": "exerciseuser003",
    "firstName": "Exercise",
    "lastName": "User003",
    "isActive": false,
    "id": "5fee6cf7edf3920d88846a04"
  }
}];

export default Identities;
